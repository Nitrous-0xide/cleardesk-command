const PASSWORD = "cleardesk";
const AUTH_KEY = "cleardesk_command_auth";
const LOCAL_FEED_KEY = "cleardesk_command_local_feed";

const gate = document.getElementById("gate");
const app = document.getElementById("app");
const gateForm = document.getElementById("gate-form");
const gateError = document.getElementById("gate-error");
const refreshBtn = document.getElementById("refresh");
const logoutBtn = document.getElementById("logout");
const updateForm = document.getElementById("update-form");

function unlocked() {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

function showApp() {
  gate.classList.add("hidden");
  app.classList.remove("hidden");
  loadStatus();
}

function showGate() {
  app.classList.add("hidden");
  gate.classList.remove("hidden");
}

gateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.getElementById("password").value;
  if (value === PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "1");
    gateError.classList.add("hidden");
    showApp();
  } else {
    gateError.classList.remove("hidden");
  }
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem(AUTH_KEY);
  showGate();
});

refreshBtn.addEventListener("click", () => loadStatus());

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("update-text").value.trim();
  const author = document.getElementById("update-author").value.trim();
  if (!text || !author) return;
  const item = {
    at: new Date().toISOString(),
    by: author,
    text
  };
  const local = JSON.parse(localStorage.getItem(LOCAL_FEED_KEY) || "[]");
  local.unshift(item);
  localStorage.setItem(LOCAL_FEED_KEY, JSON.stringify(local.slice(0, 50)));
  updateForm.reset();
  loadStatus();
});

function fmt(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}

function pillClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("live") || s === "yes" || s === "ready") return "live";
  if (s.includes("pending") || s.includes("opening") || s.includes("wait")) return "pending";
  return "off";
}

async function loadStatus() {
  const res = await fetch(`status.json?ts=${Date.now()}`, { cache: "no-store" });
  const data = await res.json();
  render(data);
}

function render(data) {
  const closes = data.closes || {};
  const earned = Number(closes.earned_usd || 0);
  const target = Number(closes.target_usd || 298);
  const closed = Number(closes.closed_slots || 0);
  const goal = Number(closes.goal_slots || 2);
  document.getElementById("closes-label").textContent = `$${earned} / $${target}`;
  document.getElementById("slots-label").textContent = `${closed} of ${goal} slots closed`;
  document.getElementById("closes-bar").style.width = `${Math.min(100, (earned / target) * 100)}%`;

  const grid = document.getElementById("channel-grid");
  grid.innerHTML = (data.channels || [])
    .map(
      (c) => `<article class="channel"><h3>${c.name}</h3><span class="pill ${pillClass(c.status)}">${c.status}</span></article>`
    )
    .join("");

  const offer = data.offer || {};
  const pay = data.pay || {};
  document.getElementById("offer-list").innerHTML = `
    <li><span>Offer</span><strong>${offer.live ? "Live" : "Off"}</strong></li>
    <li><span>Product</span><strong>${offer.name || "—"}</strong></li>
    <li><span>Price</span><strong>$${offer.price_usd ?? "—"}</strong></li>
    <li><span>Slots open</span><strong>${offer.slots_open ?? "—"}</strong></li>
    <li><span>Pay</span><strong>${pay.ready ? "Ready" : "Blocked"}</strong></li>
    <li><span>Method</span><strong>${pay.method || "—"}</strong></li>
  `;

  const last = data.last_action || {};
  document.getElementById("last-action").textContent = last.text || "—";
  document.getElementById("last-action-time").textContent = last.at ? fmt(last.at) : "";

  document.getElementById("blockers").innerHTML = (data.blockers || [])
    .map((b) => `<li><span>${b}</span></li>`)
    .join("") || "<li><span>None</span></li>";

  const local = JSON.parse(localStorage.getItem(LOCAL_FEED_KEY) || "[]");
  const feed = [...local, ...(data.feed || [])];
  document.getElementById("feed").innerHTML = feed
    .map(
      (f) => `<article class="feed-item"><div class="meta">${f.by || "team"} · ${fmt(f.at)}</div><div>${f.text}</div></article>`
    )
    .join("") || `<p class="muted">No updates yet.</p>`;
}

if (unlocked()) showApp();
