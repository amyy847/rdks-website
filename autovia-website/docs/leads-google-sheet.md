# Saving leads to a Google Sheet

Every enquiry and Register interest form adds a row to a Google Sheet. The website sends each lead to a
small Google Apps Script attached to the sheet; the script checks a shared password and adds the row.

## Setup (about 10 minutes, in the Google account that should own the leads)

1. Create a new Google Sheet, e.g. "RD.K website leads".
2. In the sheet: **Extensions > Apps Script**. Delete what's there and paste the script below. Save.
3. In Apps Script: **Project Settings** (gear icon) > **Script Properties** > **Add script property**:
   - Property: `SECRET`
   - Value: the same password as `SHEET_SECRET` in Vercel (ask the developer for it)
4. **Deploy > New deployment** > type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, allow the permissions Google asks for, and copy the **Web app URL**.
5. In Vercel (Project > Settings > Environment Variables) add `SHEET_WEBHOOK_URL` = that URL, for Production.
   Redeploy the site.

The first lead creates the header row. If you change the script later, use **Deploy > Manage deployments >
Edit > New version** so the URL stays the same.

## Script

```js
// RD.K website: adds each lead from the website as a row in this sheet.
const COLUMNS = ["Received", "Name", "Email", "Phone", "Project", "Interested in", "Message", "Wants news", "Form"];

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!secret || body.secret !== secret) return reply({ ok: false, error: "unauthorised" });

  const lead = body.lead || {};
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet.appendRow([
      new Date(lead.receivedAt || Date.now()),
      lead.name || "",
      lead.email || "",
      "'" + (lead.phone || ""), // keep the + and spaces, don't treat as a number
      lead.project || "",
      lead.interest || "",
      lead.message || "",
      lead.updates === true ? "Yes" : lead.updates === false ? "No" : "",
      lead.source || "",
    ]);
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```
