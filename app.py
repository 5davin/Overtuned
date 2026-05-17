from __future__ import annotations

import json
import mimetypes
import os
import secrets
import threading
import time
from dataclasses import dataclass, field
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
RANDOM = secrets.SystemRandom()
SUPPORTED_ROLES = ("villager", "werewolf", "seer", "doctor", "bodyguard", "minion")
WOLF_TEAM_ROLES = {"werewolf", "minion"}


def now_ts() -> float:
    return time.time()


def slug_id(length: int = 8) -> str:
    return secrets.token_urlsafe(length).replace("-", "").replace("_", "")[:length]


def clamp(value: int, minimum: int, maximum: int) -> int:
    return max(minimum, min(maximum, value))


@dataclass
class Player:
    id: str
    nickname: str
    token: str
    is_creator: bool = False
    role: str | None = None
    alive: bool = True
    connected_at: float = field(default_factory=now_ts)


@dataclass
class Room:
    id: str
    title: str
    expected_players: int
    roles: dict[str, int]
    timers: dict[str, int]
    reveal_roles_on_death: bool
    created_at: float = field(default_factory=now_ts)
    creator_id: str | None = None
    players: dict[str, Player] = field(default_factory=dict)
    phase: str = "lobby"
    phase_deadline: float | None = None
    night_number: int = 0
    day_number: int = 0
    winner: str | None = None
    game_over_reason: str | None = None
    chat_messages: list[dict[str, Any]] = field(default_factory=list)
    night_actions: dict[str, dict[str, str]] = field(default_factory=lambda: {
        "werewolf": {},
        "doctor": {},
        "seer": {},
        "bodyguard": {},
    })
    votes: dict[str, str] = field(default_factory=dict)
    lock: threading.RLock = field(default_factory=threading.RLock, repr=False)

    def add_message(
        self,
        author: str,
        text: str,
        channel: str = "system",
        recipients: list[str] | None = None,
    ) -> None:
        self.chat_messages.append(
            {
                "id": len(self.chat_messages) + 1,
                "author": author,
                "text": text,
                "channel": channel,
                "recipients": recipients or [],
                "createdAt": now_ts(),
            }
        )
        self.chat_messages = self.chat_messages[-250:]

    def add_system(self, text: str, recipients: list[str] | None = None, channel: str = "system") -> None:
        self.add_message("System", text, channel=channel, recipients=recipients)

    def add_player(self, nickname: str, is_creator: bool = False) -> Player:
        player_id = slug_id(10)
        token = secrets.token_urlsafe(24)
        player = Player(id=player_id, nickname=nickname.strip(), token=token, is_creator=is_creator)
        self.players[player.id] = player
        if is_creator:
            self.creator_id = player.id
        self.add_system(f"{player.nickname} joined the room.")
        return player

    def get_player_by_token(self, token: str | None) -> Player | None:
        if not token:
            return None
        for player in self.players.values():
            if secrets.compare_digest(player.token, token):
                player.connected_at = now_ts()
                return player
        return None

    def sorted_players(self) -> list[Player]:
        return sorted(self.players.values(), key=lambda player: player.nickname.lower())

    def validate_can_start(self, player: Player) -> None:
        if self.phase != "lobby":
            raise ValueError("The game has already started.")
        if player.id != self.creator_id:
            raise ValueError("Only the room creator can start the game.")
        if len(self.players) != self.expected_players:
            raise ValueError("Player count must match the configured room size.")

    def begin_match(self) -> None:
        shuffled_players = list(self.players.values())
        RANDOM.shuffle(shuffled_players)
        deck: list[str] = []
        for role in SUPPORTED_ROLES:
            deck.extend([role] * self.roles.get(role, 0))
        RANDOM.shuffle(deck)
        for assigned_player, role in zip(shuffled_players, deck):
            assigned_player.role = role
            assigned_player.alive = True

        self.phase = "night"
        self.night_number = 1
        self.day_number = 0
        self.winner = None
        self.game_over_reason = None
        self.night_actions = {"werewolf": {}, "doctor": {}, "seer": {}, "bodyguard": {}}
        self.votes = {}
        self.phase_deadline = now_ts() + self.timers["nightSeconds"]
        self.add_system("The match has begun. Night 1 is now active.")

        for current in self.players.values():
            intro = {
                "villager": "You are a Villager. Survive, discuss, and vote out the werewolves.",
                "werewolf": "You are a Werewolf. Coordinate by instinct and remove the villagers.",
                "seer": "You are the Seer. Each night you may inspect one player.",
                "doctor": "You are the Doctor. Each night you may save one player from death.",
                "bodyguard": "You are the Bodyguard. Each night you may guard one other player from the werewolves.",
                "minion": "You are the Minion. You support the werewolf team and know who the werewolves are.",
            }[current.role or "villager"]
            self.add_system(intro, recipients=[current.id], channel="private")

        werewolves = [player.nickname for player in self.players.values() if player.role == "werewolf"]
        for current in self.players.values():
            if current.role == "werewolf":
                others = [name for name in werewolves if name != current.nickname]
                pack_copy = ", ".join(others) if others else "No other werewolves."
                self.add_system(f"Werewolf pack: {pack_copy}", recipients=[current.id], channel="private")
            if current.role == "minion":
                wolves_copy = ", ".join(werewolves) if werewolves else "No werewolves found."
                self.add_system(f"The werewolves are: {wolves_copy}", recipients=[current.id], channel="private")

    def start_game(self, player: Player) -> None:
        self.validate_can_start(player)
        self.begin_match()

    def restart_game(self, player: Player) -> None:
        if player.id != self.creator_id:
            raise ValueError("Only the room creator can restart the game.")
        if self.phase != "ended":
            raise ValueError("You can only restart after the match has ended.")
        if len(self.players) != self.expected_players:
            raise ValueError("The room needs the original number of players before restarting.")

        self.chat_messages = []
        self.add_system("The room creator restarted the match with the same settings.")
        self.begin_match()

    def alive_players(self) -> list[Player]:
        return [player for player in self.players.values() if player.alive]

    def alive_count_by_role(self, role: str) -> int:
        return sum(1 for player in self.players.values() if player.alive and player.role == role)

    def non_werewolf_alive_count(self) -> int:
        return sum(1 for player in self.players.values() if player.alive and player.role != "werewolf")

    def village_team_alive_count(self) -> int:
        return sum(1 for player in self.players.values() if player.alive and player.role not in WOLF_TEAM_ROLES)

    def wolf_team_alive_count(self) -> int:
        return sum(1 for player in self.players.values() if player.alive and player.role in WOLF_TEAM_ROLES)

    def required_night_roles(self) -> dict[str, list[Player]]:
        alive = self.alive_players()
        return {
            "werewolf": [player for player in alive if player.role == "werewolf"],
            "doctor": [player for player in alive if player.role == "doctor"],
            "seer": [player for player in alive if player.role == "seer"],
            "bodyguard": [player for player in alive if player.role == "bodyguard"],
        }

    def all_night_actions_submitted(self) -> bool:
        required = self.required_night_roles()
        for role, players in required.items():
            for player in players:
                if player.id not in self.night_actions[role]:
                    return False
        return True

    def all_votes_submitted(self) -> bool:
        alive_ids = {player.id for player in self.alive_players()}
        return alive_ids and alive_ids.issubset(self.votes.keys())

    def determine_winner(self) -> str | None:
        werewolves = self.alive_count_by_role("werewolf")
        villagers = self.village_team_alive_count()
        wolf_team = self.wolf_team_alive_count()
        if werewolves <= 0:
            return "Village"
        if wolf_team >= villagers:
            return "Werewolves"
        return None

    def finalize_game(self, winner: str, reason: str) -> None:
        self.phase = "ended"
        self.phase_deadline = None
        self.winner = winner
        self.game_over_reason = reason
        roles = ", ".join(f"{player.nickname}: {player.role}" for player in self.sorted_players())
        self.add_system(f"{winner} win. {reason}")
        self.add_system(f"Final roles: {roles}")

    def pick_werewolf_target(self) -> str | None:
        votes = list(self.night_actions["werewolf"].values())
        if not votes:
            return None
        tally: dict[str, int] = {}
        for target_id in votes:
            tally[target_id] = tally.get(target_id, 0) + 1
        highest = max(tally.values())
        candidates = sorted(target for target, count in tally.items() if count == highest)
        return candidates[0]

    def resolve_night(self) -> None:
        if self.phase != "night":
            return

        kill_target_id = self.pick_werewolf_target()
        saved_target_id = next(iter(self.night_actions["doctor"].values()), None)
        guarded_target_id = next(iter(self.night_actions["bodyguard"].values()), None)
        seer_actions = dict(self.night_actions["seer"])

        killed_player: Player | None = None
        protected_targets = {target_id for target_id in {saved_target_id, guarded_target_id} if target_id}
        if kill_target_id and kill_target_id not in protected_targets:
            killed_player = self.players.get(kill_target_id)
            if killed_player and killed_player.alive:
                killed_player.alive = False

        for seer_id, target_id in seer_actions.items():
            seer = self.players.get(seer_id)
            target = self.players.get(target_id)
            if not seer or not target:
                continue
            alignment = "Werewolf" if target.role == "werewolf" else "Not a Werewolf"
            self.add_system(
                f"Your vision reveals that {target.nickname} is {alignment}.",
                recipients=[seer.id],
                channel="private",
            )

        self.night_actions = {"werewolf": {}, "doctor": {}, "seer": {}, "bodyguard": {}}
        self.day_number += 1

        if killed_player:
            death_text = f"{killed_player.nickname} was found dead at dawn."
            if self.reveal_roles_on_death:
                death_text += f" They were the {killed_player.role}."
            self.add_system(death_text)
        else:
            self.add_system("Dawn breaks and no one died during the night.")

        winner = self.determine_winner()
        if winner:
            self.finalize_game(winner, "The balance of power has reached a decisive outcome.")
            return

        self.phase = "day_discussion"
        self.phase_deadline = now_ts() + self.timers["discussionSeconds"]
        self.add_system(f"Day {self.day_number} discussion has started. Debate before the vote begins.")

    def resolve_vote_target(self) -> str | None:
        alive_ids = {player.id for player in self.alive_players()}
        tally: dict[str, int] = {}
        for voter_id, target_id in self.votes.items():
            if voter_id not in alive_ids:
                continue
            tally[target_id] = tally.get(target_id, 0) + 1

        if not tally:
            return None

        highest = max(tally.values())
        leaders = sorted(target for target, count in tally.items() if count == highest)
        if len(leaders) != 1:
            return None
        target = leaders[0]
        if target == "abstain":
            return None
        if tally.get("abstain", 0) >= highest:
            return None
        return target

    def start_voting(self) -> None:
        if self.phase != "day_discussion":
            return
        self.phase = "voting"
        self.phase_deadline = now_ts() + self.timers["votingSeconds"]
        self.votes = {}
        self.add_system("Voting is now open. Choose one player to eliminate or abstain.")

    def resolve_voting(self) -> None:
        if self.phase != "voting":
            return

        eliminated_id = self.resolve_vote_target()
        eliminated_player = self.players.get(eliminated_id) if eliminated_id else None
        if eliminated_player and eliminated_player.alive:
            eliminated_player.alive = False
            result = f"{eliminated_player.nickname} was eliminated by the village."
            if self.reveal_roles_on_death:
                result += f" They were the {eliminated_player.role}."
            self.add_system(result)
        else:
            self.add_system("The vote ended without an elimination.")

        winner = self.determine_winner()
        if winner:
            self.finalize_game(winner, "The village vote concluded the match.")
            return

        self.phase = "night"
        self.night_number += 1
        self.phase_deadline = now_ts() + self.timers["nightSeconds"]
        self.votes = {}
        self.night_actions = {"werewolf": {}, "doctor": {}, "seer": {}, "bodyguard": {}}
        self.add_system(f"Night {self.night_number} has begun. Relevant roles may now act.")

    def tick(self) -> None:
        with self.lock:
            if self.phase in {"lobby", "ended"}:
                return
            if self.phase == "night" and self.all_night_actions_submitted():
                self.resolve_night()
                return
            if self.phase == "voting" and self.all_votes_submitted():
                self.resolve_voting()
                return
            if self.phase_deadline and now_ts() >= self.phase_deadline:
                if self.phase == "night":
                    self.resolve_night()
                elif self.phase == "day_discussion":
                    self.start_voting()
                elif self.phase == "voting":
                    self.resolve_voting()

    def can_use_public_chat(self, player: Player) -> bool:
        return self.phase in {"lobby", "day_discussion", "voting", "ended"} and player.alive

    def can_use_pack_chat(self, player: Player) -> bool:
        return self.phase == "night" and player.alive and player.role == "werewolf"

    def visible_messages_for(self, viewer: Player | None) -> list[dict[str, Any]]:
        visible: list[dict[str, Any]] = []
        for message in self.chat_messages:
            channel = message["channel"]
            if channel in {"system", "public"}:
                visible.append(message)
            elif channel == "private" and viewer and viewer.id in message["recipients"]:
                visible.append(message)
            elif channel == "pack" and viewer and viewer.role == "werewolf" and viewer.alive:
                visible.append(message)
        return visible[-80:]

    def role_targets_for(self, player: Player) -> list[dict[str, str]]:
        alive_players = [candidate for candidate in self.alive_players() if candidate.id != player.id]
        if player.role == "werewolf":
            alive_players = [candidate for candidate in alive_players if candidate.role != "werewolf"]
        elif player.role == "doctor":
            alive_players = self.alive_players()
        elif player.role == "bodyguard":
            alive_players = [candidate for candidate in self.alive_players() if candidate.id != player.id]
        return [{"id": candidate.id, "nickname": candidate.nickname} for candidate in alive_players]

    def public_player_view(self, viewer: Player | None) -> list[dict[str, Any]]:
        players_view: list[dict[str, Any]] = []
        for player in self.sorted_players():
            role: str | None = None
            if viewer and viewer.id == player.id and player.role:
                role = player.role
            elif self.phase == "ended" or (self.reveal_roles_on_death and not player.alive):
                role = player.role

            players_view.append(
                {
                    "id": player.id,
                    "nickname": player.nickname,
                    "alive": player.alive,
                    "isCreator": player.id == self.creator_id,
                    "role": role,
                }
            )
        return players_view

    def pending_prompt_for(self, player: Player | None) -> dict[str, Any] | None:
        if not player or not player.alive:
            return None

        if self.phase == "night" and player.role in {"werewolf", "doctor", "seer", "bodyguard"}:
            action_map = self.night_actions[player.role]
            action_type = {
                "werewolf": "Choose a victim",
                "doctor": "Choose someone to protect",
                "seer": "Choose someone to inspect",
                "bodyguard": "Choose someone to guard",
            }[player.role]
            return {
                "kind": "night",
                "title": action_type,
                "submittedTargetId": action_map.get(player.id),
                "targets": self.role_targets_for(player),
            }

        if self.phase == "voting":
            return {
                "kind": "vote",
                "title": "Cast your vote",
                "submittedTargetId": self.votes.get(player.id),
                "targets": [{"id": candidate.id, "nickname": candidate.nickname} for candidate in self.alive_players() if candidate.id != player.id]
                + [{"id": "abstain", "nickname": "Abstain"}],
            }

        return None

    def state_for(self, viewer: Player | None) -> dict[str, Any]:
        seconds_left = 0
        if self.phase_deadline:
            seconds_left = max(0, int(self.phase_deadline - now_ts()))
        return {
            "room": {
                "id": self.id,
                "title": self.title,
                "expectedPlayers": self.expected_players,
                "currentPlayers": len(self.players),
                "roles": self.roles,
                "timers": self.timers,
                "revealRolesOnDeath": self.reveal_roles_on_death,
            },
            "phase": self.phase,
            "dayNumber": self.day_number,
            "nightNumber": self.night_number,
            "secondsLeft": seconds_left,
            "winner": self.winner,
            "gameOverReason": self.game_over_reason,
            "viewer": None
            if not viewer
            else {
                "id": viewer.id,
                "nickname": viewer.nickname,
                "role": viewer.role,
                "alive": viewer.alive,
                "isCreator": viewer.id == self.creator_id,
            },
            "players": self.public_player_view(viewer),
            "messages": self.visible_messages_for(viewer),
            "prompt": self.pending_prompt_for(viewer),
            "canStart": bool(viewer and viewer.id == self.creator_id and self.phase == "lobby" and len(self.players) == self.expected_players),
            "canRestart": bool(viewer and viewer.id == self.creator_id and self.phase == "ended" and len(self.players) == self.expected_players),
            "canChatPublic": bool(viewer and self.can_use_public_chat(viewer)),
            "canChatPack": bool(viewer and self.can_use_pack_chat(viewer)),
        }


class WerewolfService:
    def __init__(self) -> None:
        self.rooms: dict[str, Room] = {}
        self.lock = threading.RLock()

    def list_rooms(self) -> list[Room]:
        with self.lock:
            return list(self.rooms.values())

    def get_room(self, room_id: str) -> Room:
        with self.lock:
            room = self.rooms.get(room_id)
            if not room:
                raise KeyError("Room not found.")
            return room

    def create_room(self, payload: dict[str, Any]) -> tuple[Room, Player]:
        title = str(payload.get("title", "")).strip() or "Werewolf Room"
        creator_name = str(payload.get("creatorName", "")).strip()
        if len(creator_name) < 2:
            raise ValueError("Creator nickname must be at least 2 characters.")

        expected_players = int(payload.get("expectedPlayers", 0))
        expected_players = clamp(expected_players, 4, 18)

        raw_roles = payload.get("roles") or {}
        roles = {role: clamp(int(raw_roles.get(role, 0)), 0, expected_players) for role in SUPPORTED_ROLES}
        if sum(roles.values()) != expected_players:
            raise ValueError("Role counts must add up to the selected player count.")
        if roles.get("werewolf", 0) < 1:
            raise ValueError("At least one werewolf is required.")
        if expected_players - roles.get("werewolf", 0) < 1:
            raise ValueError("At least one non-werewolf player is required.")

        raw_timers = payload.get("timers") or {}
        timers = {
            "nightSeconds": clamp(int(raw_timers.get("nightSeconds", 45)), 15, 180),
            "discussionSeconds": clamp(int(raw_timers.get("discussionSeconds", 90)), 20, 300),
            "votingSeconds": clamp(int(raw_timers.get("votingSeconds", 45)), 15, 180),
        }
        reveal_roles_on_death = bool(payload.get("revealRolesOnDeath", True))

        room = Room(
            id=slug_id(6).lower(),
            title=title,
            expected_players=expected_players,
            roles=roles,
            timers=timers,
            reveal_roles_on_death=reveal_roles_on_death,
        )
        creator = room.add_player(creator_name, is_creator=True)

        with self.lock:
            self.rooms[room.id] = room
        return room, creator


SERVICE = WerewolfService()


def validate_nickname(nickname: str) -> str:
    clean = " ".join(nickname.strip().split())
    if len(clean) < 2 or len(clean) > 24:
        raise ValueError("Nickname must be between 2 and 24 characters.")
    return clean


def read_json(handler: BaseHTTPRequestHandler) -> dict[str, Any]:
    length = int(handler.headers.get("Content-Length", "0"))
    raw_body = handler.rfile.read(length) if length else b"{}"
    if not raw_body:
        return {}
    try:
        parsed = json.loads(raw_body.decode("utf-8"))
        if not isinstance(parsed, dict):
            raise ValueError
        return parsed
    except (json.JSONDecodeError, UnicodeDecodeError, ValueError) as exc:
        raise ValueError("Invalid JSON body.") from exc


def json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict[str, Any]) -> None:
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


class WerewolfHandler(BaseHTTPRequestHandler):
    server_version = "WerewolfHost/0.1"

    def do_GET(self) -> None:
        try:
            parsed = urlparse(self.path)
            if parsed.path == "/health":
                json_response(self, HTTPStatus.OK, {"ok": True})
                return

            if parsed.path.startswith("/api/rooms/") and parsed.path.endswith("/state"):
                room_id = parsed.path.split("/")[3]
                room = SERVICE.get_room(room_id)
                room.tick()
                token = parse_qs(parsed.query).get("token", [None])[0]
                viewer = room.get_player_by_token(token)
                json_response(self, HTTPStatus.OK, room.state_for(viewer))
                return

            if parsed.path == "/harmony":
                self.serve_file(STATIC_DIR / "harmony" / "index.html", "text/html; charset=utf-8")
                return

            if parsed.path.startswith("/harmony/"):
                relative = parsed.path.replace("/harmony/", "", 1)
                if not relative or relative.endswith("/"):
                    self.serve_file(STATIC_DIR / "harmony" / "index.html", "text/html; charset=utf-8")
                    return
                self.serve_file(STATIC_DIR / "harmony" / relative)
                return

            if parsed.path == "/" or parsed.path.startswith("/room/"):
                self.serve_file(STATIC_DIR / "index.html", "text/html; charset=utf-8")
                return

            if parsed.path.startswith("/static/"):
                relative = parsed.path.replace("/static/", "", 1)
                self.serve_file(STATIC_DIR / relative)
                return

            json_response(self, HTTPStatus.NOT_FOUND, {"error": "Not found."})
        except KeyError:
            json_response(self, HTTPStatus.NOT_FOUND, {"error": "Room not found."})
        except Exception as exc:  # pragma: no cover - defensive server path
            json_response(self, HTTPStatus.INTERNAL_SERVER_ERROR, {"error": str(exc)})

    def do_POST(self) -> None:
        try:
            parsed = urlparse(self.path)
            if parsed.path == "/api/rooms":
                payload = read_json(self)
                room, creator = SERVICE.create_room(payload)
                room.tick()
                json_response(
                    self,
                    HTTPStatus.CREATED,
                    {
                        "roomId": room.id,
                        "token": creator.token,
                        "roomUrl": f"/room/{room.id}",
                    },
                )
                return

            if parsed.path.startswith("/api/rooms/"):
                parts = parsed.path.strip("/").split("/")
                if len(parts) < 4:
                    raise KeyError
                room_id, action = parts[2], parts[3]
                room = SERVICE.get_room(room_id)
                payload = read_json(self)
                self.handle_room_post(room, action, payload)
                return

            json_response(self, HTTPStatus.NOT_FOUND, {"error": "Not found."})
        except ValueError as exc:
            json_response(self, HTTPStatus.BAD_REQUEST, {"error": str(exc)})
        except KeyError:
            json_response(self, HTTPStatus.NOT_FOUND, {"error": "Room not found."})
        except Exception as exc:  # pragma: no cover - defensive server path
            json_response(self, HTTPStatus.INTERNAL_SERVER_ERROR, {"error": str(exc)})

    def handle_room_post(self, room: Room, action: str, payload: dict[str, Any]) -> None:
        room.tick()
        if action == "join":
            nickname = validate_nickname(str(payload.get("nickname", "")))
            with room.lock:
                if room.phase != "lobby":
                    raise ValueError("This room has already started.")
                if len(room.players) >= room.expected_players:
                    raise ValueError("This room is already full.")
                lowered = {player.nickname.lower() for player in room.players.values()}
                if nickname.lower() in lowered:
                    raise ValueError("That nickname is already taken in this room.")
                player = room.add_player(nickname)
            json_response(self, HTTPStatus.CREATED, {"token": player.token})
            return

        token = str(payload.get("token", ""))
        player = room.get_player_by_token(token)
        if not player:
            raise ValueError("Invalid player session.")

        with room.lock:
            if action == "start":
                room.start_game(player)
                json_response(self, HTTPStatus.OK, {"ok": True})
                return

            if action == "restart":
                room.restart_game(player)
                json_response(self, HTTPStatus.OK, {"ok": True})
                return

            if action == "action":
                if room.phase != "night":
                    raise ValueError("Night actions are not currently available.")
                if not player.alive:
                    raise ValueError("Eliminated players cannot act.")
                if player.role not in {"werewolf", "doctor", "seer", "bodyguard"}:
                    raise ValueError("Your role does not act during the night.")

                target_id = str(payload.get("targetId", ""))
                valid_targets = {target["id"] for target in room.role_targets_for(player)}
                if target_id not in valid_targets:
                    raise ValueError("Choose a valid target.")
                room.night_actions[player.role][player.id] = target_id
                target_name = room.players[target_id].nickname
                room.add_system(
                    f"You submitted your action targeting {target_name}.",
                    recipients=[player.id],
                    channel="private",
                )
                room.tick()
                json_response(self, HTTPStatus.OK, {"ok": True})
                return

            if action == "vote":
                if room.phase != "voting":
                    raise ValueError("Voting is not open right now.")
                if not player.alive:
                    raise ValueError("Eliminated players cannot vote.")
                target_id = str(payload.get("targetId", ""))
                valid_targets = {target["id"] for target in room.pending_prompt_for(player)["targets"]}
                if target_id not in valid_targets:
                    raise ValueError("Choose a valid vote target.")
                room.votes[player.id] = target_id
                room.tick()
                json_response(self, HTTPStatus.OK, {"ok": True})
                return

            if action == "chat":
                text = str(payload.get("text", "")).strip()
                channel = str(payload.get("channel", "public"))
                if not text:
                    raise ValueError("Message cannot be empty.")
                if len(text) > 240:
                    raise ValueError("Message is too long.")
                if channel == "public":
                    if not room.can_use_public_chat(player):
                        raise ValueError("Public chat is not available right now.")
                elif channel == "pack":
                    if not room.can_use_pack_chat(player):
                        raise ValueError("Pack chat is only available to living werewolves at night.")
                else:
                    raise ValueError("Unsupported chat channel.")
                room.add_message(player.nickname, text, channel=channel)
                json_response(self, HTTPStatus.OK, {"ok": True})
                return

        raise KeyError

    def serve_file(self, filepath: Path, content_type: str | None = None) -> None:
        if not filepath.exists() or not filepath.is_file():
            json_response(self, HTTPStatus.NOT_FOUND, {"error": "Not found."})
            return
        body = filepath.read_bytes()
        guessed_type = content_type or mimetypes.guess_type(filepath.name)[0] or "application/octet-stream"
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", guessed_type)
        self.send_header("Content-Length", str(len(body)))
        if filepath.suffix in {".js", ".css", ".html"}:
            self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A003
        return


def ticker() -> None:
    while True:
        for room in SERVICE.list_rooms():
            try:
                room.tick()
            except Exception:
                continue
        time.sleep(1)


def main() -> None:
    ticker_thread = threading.Thread(target=ticker, daemon=True)
    ticker_thread.start()

    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", "8000"))
    server = ThreadingHTTPServer((host, port), WerewolfHandler)
    print(f"Werewolf game server running at http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
