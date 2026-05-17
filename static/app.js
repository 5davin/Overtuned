const appRoot = document.getElementById("app");
const roomId = window.location.pathname.startsWith("/room/") ? window.location.pathname.split("/")[2] : null;

const state = {
  room: null,
  activeChannel: "public",
  pollHandle: null,
  busy: false,
  drafts: {
    joinNickname: "",
    chatMessage: "",
  },
};

function storageKey(id) {
  return `moonhall-token:${id}`;
}

function getToken() {
  return roomId ? window.localStorage.getItem(storageKey(roomId)) : null;
}

function setToken(token) {
  if (roomId) {
    window.localStorage.setItem(storageKey(roomId), token);
  }
}

function stopPolling() {
  if (state.pollHandle) {
    window.clearInterval(state.pollHandle);
    state.pollHandle = null;
  }
}

function shouldLivePoll() {
  return Boolean(getToken());
}

function startPolling() {
  if (state.pollHandle || !shouldLivePoll()) {
    return;
  }

  state.pollHandle = window.setInterval(async () => {
    try {
      await fetchState();
      renderRoomState();
    } catch (error) {
      stopPolling();
      appRoot.innerHTML = `<section class="panel panel-wide"><h2>Connection interrupted</h2><p>${error.message}</p></section>`;
    }
  }, 1500);
}

function clearApp() {
  appRoot.innerHTML = "";
}

function renderCreateScreen() {
  clearApp();
  const template = document.getElementById("create-template");
  appRoot.append(template.content.cloneNode(true));

  const form = document.getElementById("create-room-form");
  const expectedPlayers = document.getElementById("expectedPlayers");
  const summary = document.getElementById("role-summary");
  const roleInputs = Array.from(form.querySelectorAll('input[name^="role-"]'));

  function syncSummary() {
    const total = roleInputs.reduce((sum, input) => sum + Number(input.value || 0), 0);
    const expected = Number(expectedPlayers.value || 0);
    const diff = expected - total;
    summary.textContent = diff === 0
      ? `Role count matches player count: ${total} players configured.`
      : `Role count is ${total}. Adjust it so it matches the selected ${expected} players.`;
    summary.style.color = diff === 0 ? "var(--forest)" : "var(--accent-deep)";
  }

  expectedPlayers.addEventListener("input", syncSummary);
  roleInputs.forEach((input) => input.addEventListener("input", syncSummary));
  syncSummary();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.busy) {
      return;
    }
    state.busy = true;
    try {
      const formData = new FormData(form);
      const payload = {
        title: formData.get("title"),
        creatorName: formData.get("creatorName"),
        expectedPlayers: Number(formData.get("expectedPlayers")),
        revealRolesOnDeath: formData.get("revealRolesOnDeath") === "true",
        roles: {
          werewolf: Number(formData.get("role-werewolf")),
          seer: Number(formData.get("role-seer")),
          doctor: Number(formData.get("role-doctor")),
          bodyguard: Number(formData.get("role-bodyguard")),
          minion: Number(formData.get("role-minion")),
          villager: Number(formData.get("role-villager")),
        },
        timers: {
          nightSeconds: Number(formData.get("nightSeconds")),
          discussionSeconds: Number(formData.get("discussionSeconds")),
          votingSeconds: Number(formData.get("votingSeconds")),
        },
      };

      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to create room.");
      }

      window.localStorage.setItem(storageKey(data.roomId), data.token);
      window.location.href = data.roomUrl;
    } catch (error) {
      window.alert(error.message);
    } finally {
      state.busy = false;
    }
  });
}

function renderRoomShell() {
  clearApp();
  const template = document.getElementById("room-template");
  appRoot.append(template.content.cloneNode(true));

  document.getElementById("copy-link-btn").addEventListener("click", async () => {
    const shareLink = document.getElementById("share-link").value;
    await navigator.clipboard.writeText(shareLink);
  });

  document.getElementById("chat-public-toggle").addEventListener("click", () => {
    state.activeChannel = "public";
    renderRoomState();
  });

  document.getElementById("chat-pack-toggle").addEventListener("click", () => {
    state.activeChannel = "pack";
    renderRoomState();
  });

  document.getElementById("chat-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) {
      return;
    }
    try {
      await postRoomAction("chat", { text, channel: state.activeChannel });
      state.drafts.chatMessage = "";
      input.value = "";
    } catch (error) {
      window.alert(error.message);
    }
  });
}

async function fetchState() {
  const token = getToken();
  const tokenQuery = token ? `?token=${encodeURIComponent(token)}` : "";
  const response = await fetch(`/api/rooms/${roomId}/state${tokenQuery}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Unable to load room.");
  }
  state.room = data;
}

async function postRoomAction(action, payload = {}) {
  const token = getToken();
  const response = await fetch(`/api/rooms/${roomId}/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, token }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  await fetchState();
  renderRoomState();
}

function phaseLabel(current) {
  const phase = current.phase;
  if (phase === "lobby") return ["Lobby", "Players are gathering. Share the invite link and start when the room is full."];
  if (phase === "night") return [`Night ${current.nightNumber}`, "Relevant roles submit secret actions while the village waits for dawn."];
  if (phase === "day_discussion") return [`Day ${current.dayNumber} Discussion`, "Discuss suspicions in public chat before voting opens automatically."];
  if (phase === "voting") return [`Day ${current.dayNumber} Voting`, "Choose one player to eliminate or abstain before the timer ends."];
  return ["Match Ended", current.gameOverReason || "The game is complete."];
}

function formatRole(role) {
  if (!role) return "Hidden";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function joinFormMarkup(room) {
  return `
    <div class="empty-state">
      <h3>Join the room</h3>
      <p>${room.room.currentPlayers}/${room.room.expectedPlayers} seats filled.</p>
      <form id="join-form" class="form-grid">
        <label>
          <span>Nickname</span>
          <input
            id="join-nickname-input"
            name="nickname"
            type="text"
            maxlength="24"
            placeholder="Your nickname"
            value="${escapeHtml(state.drafts.joinNickname)}"
            required
          />
        </label>
        <button class="primary-btn" type="submit">Join room</button>
      </form>
    </div>
  `;
}

function roleCardMarkup(room) {
  if (!room.viewer) {
    return `<div class="empty-state"><h3>Waiting for player session</h3><p>Join the room to see your role and action prompts.</p></div>`;
  }

  const status = room.viewer.alive ? "Alive" : "Eliminated";
  return `
    <div class="role-card">
      <p class="meta-label">Your seat</p>
      <h3>${escapeHtml(room.viewer.nickname)}</h3>
      <p><strong>Role:</strong> ${room.viewer.role ? formatRole(room.viewer.role) : "Hidden until start"}</p>
      <p><strong>Status:</strong> ${status}</p>
    </div>
  `;
}

function configSummaryMarkup(room) {
  return `
    <div class="config-summary">
      <dl>
        <dt>Expected players</dt><dd>${room.room.expectedPlayers}</dd>
        <dt>Werewolves</dt><dd>${room.room.roles.werewolf}</dd>
        <dt>Seers</dt><dd>${room.room.roles.seer}</dd>
        <dt>Doctors</dt><dd>${room.room.roles.doctor}</dd>
        <dt>Bodyguards</dt><dd>${room.room.roles.bodyguard}</dd>
        <dt>Minions</dt><dd>${room.room.roles.minion}</dd>
        <dt>Villagers</dt><dd>${room.room.roles.villager}</dd>
        <dt>Night timer</dt><dd>${room.room.timers.nightSeconds}s</dd>
        <dt>Discussion timer</dt><dd>${room.room.timers.discussionSeconds}s</dd>
        <dt>Voting timer</dt><dd>${room.room.timers.votingSeconds}s</dd>
        <dt>Reveal roles on death</dt><dd>${room.room.revealRolesOnDeath ? "Yes" : "No"}</dd>
      </dl>
      <div class="settings-instructions">
        <h3>Game settings guide</h3>
        <p><strong>Set roles:</strong> the role totals must exactly match the player count, and every match needs at least one werewolf plus at least one village-side player.</p>
        <p><strong>New roles:</strong> Bodyguards guard one other player each night. Minions know the werewolves and win with them, but do not attack at night.</p>
        <p><strong>See roles:</strong> each player only sees their own role after the match starts. Eliminated roles are shown only when role reveal is enabled, and everyone sees all roles after the match ends.</p>
      </div>
    </div>
  `;
}

function renderActionPanel(room) {
  const actionPanel = document.getElementById("action-panel");
  const prompt = room.prompt;

  if (room.phase === "lobby") {
    const creatorCopy = room.canStart
      ? `<button id="start-game-btn" class="primary-btn" type="button">Start game</button>`
      : `<p>${room.room.currentPlayers}/${room.room.expectedPlayers} players are in the lobby.</p>`;
    actionPanel.innerHTML = `
      <div class="action-box">
        <h3>Lobby controls</h3>
        <p>The room creator can start once the configured number of players has joined.</p>
        ${creatorCopy}
      </div>
    `;

    const startButton = document.getElementById("start-game-btn");
    if (startButton) {
      startButton.addEventListener("click", async () => {
        try {
          await postRoomAction("start");
        } catch (error) {
          window.alert(error.message);
        }
      });
    }
    return;
  }

  if (!room.viewer) {
    actionPanel.innerHTML = `<div class="empty-state"><h3>Spectator view</h3><p>Join the room to play.</p></div>`;
    return;
  }

  if (!room.viewer.alive && room.phase !== "ended") {
    actionPanel.innerHTML = `<div class="empty-state"><h3>You are out of the round</h3><p>Watch the remaining players while the system continues the match.</p></div>`;
    return;
  }

  if (prompt) {
    const targets = prompt.targets
      .map(
        (target) => `
          <button
            class="vote-btn ${prompt.submittedTargetId === target.id ? "active" : ""}"
            data-target-id="${target.id}"
            type="button"
          >
            ${escapeHtml(target.nickname)}
          </button>
        `
      )
      .join("");
    actionPanel.innerHTML = `
      <div class="action-box">
        <h3>${prompt.title}</h3>
        <p>${prompt.kind === "night" ? "Submit your secret action before time runs out." : "Submit your vote once. You can change it until the phase ends."}</p>
        <div class="target-grid">${targets}</div>
      </div>
    `;

    actionPanel.querySelectorAll("[data-target-id]").forEach((button) => {
      button.addEventListener("click", async () => {
        const targetId = button.getAttribute("data-target-id");
        try {
          await postRoomAction(prompt.kind === "night" ? "action" : "vote", { targetId });
        } catch (error) {
          window.alert(error.message);
        }
      });
    });
    return;
  }

  if (room.phase === "ended") {
    const restartButton = room.canRestart
      ? `<button id="restart-game-btn" class="primary-btn" type="button">Restart game</button>`
      : "";
    actionPanel.innerHTML = `
      <div class="action-box">
        <h3>Match complete</h3>
        <p>${room.winner || "No winner"} ${room.gameOverReason ? `- ${room.gameOverReason}` : ""}</p>
        ${restartButton}
      </div>
    `;

    const restartGameButton = document.getElementById("restart-game-btn");
    if (restartGameButton) {
      restartGameButton.addEventListener("click", async () => {
        try {
          await postRoomAction("restart");
        } catch (error) {
          window.alert(error.message);
        }
      });
    }
    return;
  }

  actionPanel.innerHTML = `<div class="empty-state"><h3>Waiting</h3><p>The system is collecting actions and will advance automatically.</p></div>`;
}

function renderMessages(room) {
  const publicToggle = document.getElementById("chat-public-toggle");
  const packToggle = document.getElementById("chat-pack-toggle");
  const chatInput = document.getElementById("chat-input");
  const chatForm = document.getElementById("chat-form");

  packToggle.classList.toggle("hidden", !room.canChatPack && state.activeChannel !== "pack");
  publicToggle.classList.toggle("active", state.activeChannel === "public");
  packToggle.classList.toggle("active", state.activeChannel === "pack");

  if (state.activeChannel === "pack" && !room.canChatPack) {
    state.activeChannel = "public";
    publicToggle.classList.add("active");
    packToggle.classList.remove("active");
  }

  const messages = room.messages.filter((message) => {
    if (message.channel === "public") {
      return state.activeChannel === "public";
    }
    if (message.channel === "pack") {
      return state.activeChannel === "pack";
    }
    return state.activeChannel === "public";
  });

  document.getElementById("messages").innerHTML = messages.length
    ? messages
        .map(
          (message) => `
            <article class="message ${message.channel}">
              <div class="message-head">
                <strong>${escapeHtml(message.author)}</strong>
                <span>${new Date(message.createdAt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <p>${escapeHtml(message.text)}</p>
            </article>
          `
        )
        .join("")
    : `<div class="empty-state"><h3>No messages yet</h3><p>${state.activeChannel === "pack" ? "Pack chat will appear here." : "Room updates and public chat will appear here."}</p></div>`;

  const canSend = state.activeChannel === "public" ? room.canChatPublic : room.canChatPack;
  chatInput.disabled = !canSend;
  chatForm.querySelector("button").disabled = !canSend;
  chatInput.value = state.drafts.chatMessage;
  chatInput.placeholder = canSend
    ? state.activeChannel === "pack"
      ? "Message the pack..."
      : "Type a message..."
    : "Chat is disabled in this phase.";
}

function renderRoomState() {
  const room = state.room;
  if (!room) {
    return;
  }

  document.getElementById("room-title").textContent = room.room.title;
  document.getElementById("share-link").value = window.location.href;
  document.getElementById("phase-badge").textContent = room.phase.replace("_", " ");
  document.getElementById("timer-value").textContent = `${room.secondsLeft}s`;

  const [phaseTitle, phaseCopy] = phaseLabel(room);
  document.getElementById("phase-title").textContent = phaseTitle;
  document.getElementById("phase-copy").textContent = phaseCopy;

  document.getElementById("lobby-join-block").innerHTML = room.viewer ? "" : joinFormMarkup(room);
  document.getElementById("role-card").innerHTML = roleCardMarkup(room);
  document.getElementById("config-summary").innerHTML = configSummaryMarkup(room);

  document.getElementById("player-list").innerHTML = room.players
    .map(
      (player) => `
        <li class="${player.alive ? "" : "dead"}">
          <div>
            <strong>${escapeHtml(player.nickname)}</strong>
            <div>${player.role ? formatRole(player.role) : player.alive ? "Alive" : "Eliminated"}</div>
          </div>
          <div>
            ${player.isCreator ? '<span class="badge creator">Creator</span>' : ""}
            <span class="badge">${player.alive ? "Alive" : "Out"}</span>
          </div>
        </li>
      `
    )
    .join("");

  const joinForm = document.getElementById("join-form");
  if (joinForm) {
    const nicknameInput = document.getElementById("join-nickname-input");
    nicknameInput.addEventListener("input", () => {
      state.drafts.joinNickname = nicknameInput.value;
    });
    joinForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const nickname = new FormData(joinForm).get("nickname");
      try {
        const response = await fetch(`/api/rooms/${roomId}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nickname }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Unable to join room.");
        }
        setToken(data.token);
        state.drafts.joinNickname = "";
        await fetchState();
        startPolling();
        renderRoomState();
      } catch (error) {
        window.alert(error.message);
      }
    });
  }

  renderActionPanel(room);
  renderMessages(room);

  const chatInput = document.getElementById("chat-input");
  if (chatInput) {
    chatInput.addEventListener("input", () => {
      state.drafts.chatMessage = chatInput.value;
    });
  }
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function startRoom() {
  renderRoomShell();
  try {
    await fetchState();
    renderRoomState();
  } catch (error) {
    appRoot.innerHTML = `<section class="panel panel-wide"><h2>Room unavailable</h2><p>${error.message}</p></section>`;
    return;
  }

  if (shouldLivePoll()) {
    startPolling();
  }
}

if (roomId) {
  startRoom();
} else {
  renderCreateScreen();
}
