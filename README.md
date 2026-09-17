# ClearDesk Command

Mobile-first status dashboard for ClearDesk team progress. Free host (GitHub + jsDelivr). Shared password gate — no public lead dump.

## Phone URL

https://cdn.jsdelivr.net/gh/Nitrous-0xide/cleardesk-command@main/index.html

Password: `cleardesk` (change in `app.js` → `PASSWORD`, then commit + push)

## How teammates update status

**Read [UPDATE.md](./UPDATE.md)** — edit `status.json` on `main`, commit, wait ~1–2 min for CDN, tap Refresh on phone.

Schema: [`status.schema.json`](./status.schema.json)

The in-page “Append update” form is session-only on that device. Permanent updates go through `status.json`.

## GitHub Pages (optional)

Settings → Pages → Deploy from branch `main` / root → https://nitrous-0xide.github.io/cleardesk-command/
