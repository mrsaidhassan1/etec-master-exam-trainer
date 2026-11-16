/**
 * ETEC Master Exam Trainer - anonymous usage collector.
 * Receives batches of events
 * from the app and appends them to the "events" sheet.
 *
 * 1. Set TOKEN below to a long random string (the same value goes in the app's TELEMETRY.TOKEN).
 * 2. Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
 * 3. Copy the web-app URL into the app's TELEMETRY.ENDPOINT.
 */
const TOKEN = "CHANGE_ME_TO_A_LONG_RANDOM_STRING";
const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";   // the long ID in the sheet URL: /d/<ID>/edit
const SHEET_NAME = "events";
const MAX_BATCH = 50;
const DEDUPE_LOOKBACK = 500;

const COLUMNS = ["received_at","eid","ts","uid","sid","v","event","day","device",
                 "route","mode","category","correct","confidence","n","pct","sec","data"];
const FLAT = COLUMNS.slice(1, COLUMNS.length - 1);   // everything except received_at and data

function doGet() { return ContentService.createTextOutput("ETEC usage collector: ok"); }

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.token !== TOKEN) return out_("forbidden");
    const events = (body.events || []).slice(0, MAX_BATCH);
    if (!events.length) return out_("empty");

    lock.waitLock(15000);
    const sheet = getSheet_();
    const last = sheet.getLastRow();
    const seen = {};
    if (last > 1) {
      const from = Math.max(2, last - DEDUPE_LOOKBACK + 1);
      sheet.getRange(from, 2, last - from + 1, 1).getValues().forEach(function (r) { seen[r[0]] = true; });
    }

    const now = new Date();
    const rows = [];
    events.forEach(function (ev) {
      if (!ev || typeof ev !== "object" || !ev.eid || seen[ev.eid]) return;
      seen[ev.eid] = true;
      const row = [now];
      FLAT.forEach(function (k) { row.push(clean_(ev[k])); });
      row.push(ev.data ? clean_(JSON.stringify(ev.data), 2000) : "");
      rows.push(row);
    });
    if (rows.length) sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, COLUMNS.length).setValues(rows);
    return out_("ok " + rows.length);
  } catch (err) {
    return out_("error");
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

// Strings are truncated and neutralised so a crafted value cannot become a spreadsheet formula.
function clean_(v, max) {
  if (v === null || v === undefined) return "";
  if (typeof v === "number" || typeof v === "boolean") return v;
  let s = String(v).slice(0, max || 120);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function out_(msg) { return ContentService.createTextOutput(msg); }
