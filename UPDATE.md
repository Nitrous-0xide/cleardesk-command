# How to update ClearDesk Command

Phone URL: https://nitrous-0xide.github.io/cleardesk-command/  
Password: `cleardesk`

## Permanent updates (do this)

1. Open [`status.json`](./status.json) on `main`.
2. Edit fields — keep the shape in [`status.schema.json`](./status.schema.json).
3. **Always** set `updated_at` to now (ISO-8601 with timezone).
4. Set `last_action` to what just happened.
5. Prepend a new object to `feed` (newest first). Cap ~20 rows.
6. Commit + push to `main`. Pages refreshes in about a minute — user taps **Refresh** on phone.

## Who updates what

| Role | Touch these fields |
|------|--------------------|
| Marketing | `channels`, offer copy notes in `feed` |
| Business | `closes`, `pay`, close-related `feed` + `blockers` |
| CoS | channel go-lives, high-level `last_action` |
| Programmers | delivery readiness in `feed` / `blockers` |

## Rules

- Never put PayPal usernames, lead names, or DMs in `status.json`.
- `pay.method` stays soft: e.g. `"PayPal invoice frame"`.
- When a slot closes: bump `closes.earned_usd` (+149), `closed_slots` (+1), drop `slots_open` by 1, clear that blocker, prepend feed.
- Indie Hackers / X / LinkedIn status values: `live` | `pending` | `blocked`.

## Quick paste for a feed row

```json
{
  "at": "2026-09-17T10:15:00+01:00",
  "by": "Business Manager",
  "text": "First OPS held — PayPal invoice sent."
}
```
