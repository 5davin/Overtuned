# Workspace Apps

This workspace contains two separate browser apps with separate Python entrypoints:

- `python3 app.py` — Moonhall, the Werewolf game
- `python3 car_care_app.py` — SiagaMobil, the standalone bilingual car condition learning app

The Moonhall server also serves the standalone harmony-practice tool at `/harmony`.

## SiagaMobil

SiagaMobil is a mobile-first educational app that teaches drivers how to check a car's condition with localized Indonesian guidance.

Included in this implementation:

- Bahasa Indonesia and English language support
- Brio Satya-friendly dashboard defaults with editable vehicle data
- Source-backed health scoring and recommendations localized for Indonesian driving conditions
- Guided lessons for oil, coolant, brakes, battery, tires, wipers, lights, AC, dashboard warnings, pre-trip checks, and post-flood checks
- Vehicle garage with kilometer-based odometer tracking
- Inspection logging with notes and optional photos
- Reminder setup for day-based and kilometer-based maintenance intervals
- PWA shell with offline caching for the app assets
- Installed Codex skill at `~/.codex/skills/indonesian-car-condition-analyst` for reusable Indonesian car-condition analysis

## Moonhall: Online Werewolf MVP

Moonhall remains a self-contained browser game where one player creates a room, shares a link, and the system runs the Werewolf game loop for everyone else.

### Features

- Guest nickname join flow via share link
- Room setup for player count, role distribution, timers, and role reveal behavior
- System-run gameplay phases: lobby, night, day discussion, voting, and match end
- Built-in classic roles: Villager, Werewolf, Seer, Doctor
- Private night actions, real-time polling updates, public chat, and werewolf pack chat
- Automatic elimination handling and win detection

## Run locally

```bash
python3 app.py
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser for Moonhall.
Open [http://127.0.0.1:8000/harmony](http://127.0.0.1:8000/harmony) for the Suara 2 / Suara 3 Practice Generator.

To run SiagaMobil separately:

```bash
python3 car_care_app.py
```

Then open [http://127.0.0.1:8010](http://127.0.0.1:8010) in your browser.

## Notes

- The current implementation stores rooms and matches in memory, so restarting the server clears all games.
- The frontend uses simple polling rather than WebSockets to stay dependency-free in this environment.
- The room creator configures the match, but the system handles role assignment and phase progression after the game starts.
- SiagaMobil is now standalone and is no longer routed through the Werewolf server.
- The project now includes `vercel.json` and `api/index.py` so the same app can be routed through a single Vercel Python function.
- Important deployment caveat: because room state is still in memory, a Vercel deployment is suitable for demos but not durable multiplayer production use. For reliable public hosting, the next step is moving room/game state to shared storage such as Redis, Postgres, or Vercel KV.
# Overtuned
