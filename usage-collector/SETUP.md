# Usage collection setup (about 10 minutes)

The trainer can send **anonymous** usage events to a Google Sheet that you own. It is **off by default**:
until `ENDPOINT` is filled in inside `index.html`, the app collects nothing and shows no banner.

## 1. Create the receiver
1. Create a Google Sheet and copy its ID from the URL (`/d/<ID>/edit`).
2. Create a standalone Apps Script project (script.new) and paste in `Code.gs`.
3. Set `TOKEN` to a long random string and `SPREADSHEET_ID` to the sheet ID. Save.
4. Deploy > New deployment > **Web app**: Execute as **Me**, Who has access **Anyone**. Authorize when asked.
5. Copy the web-app URL (ends in `/exec`). Opening it in a browser should say `ETEC usage collector: ok`.

## 2. Connect the app
In `index.html`, find the `TELEMETRY` block (search for `ENDPOINT:`) and set `ENDPOINT` to the URL and `TOKEN` to the same token.

> **Do not commit your real token to a public repository.** The token is visible in the page source of any copy that has it, and it only blocks casual spam. Keep the configured copy private, or rotate the token (edit `TOKEN`, redeploy a new version, update the app) if it leaks.

## 3. Test
Open the app, click **Allow**, use a few sections, then switch tabs for a few seconds. An `events` sheet appears with rows within a minute. Add `?notrack` to the URL to keep your own testing out of the data.

## What is collected
One row per event: `received_at, eid, ts, uid, sid, v, event, day, device, route, mode, category, correct, confidence, n, pct, sec, data`.

| event | meaning |
|---|---|
| app_open | app opened |
| view | section opened |
| study_start / session_complete | Learn, Practice, Daily or Retry session started / finished |
| answer / confidence | topic and right/wrong of an answer; confidence tapped afterwards |
| mock_start / mock_complete | Main Exam 1-3, with score and per-domain breakdown |
| certificate_created | certificate generated (name is never sent) |
| active | cumulative visible seconds in a visit (take the max per `sid`) |
| baseline | one-time counts of progress that existed before tracking |

`uid` is a random ID per browser, not a person: one colleague on two devices counts twice, and clearing browser data creates a new ID.

**Not collected:** names, emails, IP addresses, question text, or which option was chosen.
Users see a consent banner on first launch and can turn collection off from the sidebar; declining discards anything queued.
