# ClearDesk Command

Mobile-first status dashboard for ClearDesk team progress. Free GitHub Pages host. Shared password gate — no public lead dump.

## Password

Default shared password: `cleardesk`

Change it in `app.js` (`PASSWORD` constant), then commit + push.

## View locally

Open `index.html` via any static server from this folder, e.g.:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080` and enter the password.

## GitHub Pages

1. Repo Settings → Pages → Source: **Deploy from a branch**
2. Branch: `main` / folder: `/ (root)`
3. Live URL will be: `https://nitrous-0xide.github.io/cleardesk-command/`

## How teammates update status

1. Edit `status.json` (channels, closes, blockers, feed, last_action).
2. Commit and push to `main`.
3. Pages refreshes in ~1 minute — owner taps **Refresh** on phone.

The in-page “Append update” form only stores on that phone’s browser for the session demo. Permanent updates go through `status.json`.

## Status schema

See `status.json` for the shape Marketing / Business / CoS should keep filled in.
