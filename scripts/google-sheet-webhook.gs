function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doGet() {
  return jsonResponse({ ok: true, service: "holidays-enquiries" });
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }

  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const existing = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  if (existing.length < headers.length) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function doPost(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Enquiries") ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet("Enquiries");

  const raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
  const data = JSON.parse(raw);
  const headers = data.headers || [
    "Timestamp",
    "Event ID",
    "Name",
    "Email",
    "Phone",
    "Destination",
    "Travelling With",
    "Why",
    "UTM Source",
    "UTM Campaign",
    "UTM Medium",
    "UTM Term",
    "HolidayOS Status",
    "API Pushed",
    "API Status",
    "API Error",
  ];

  ensureHeaders(sheet, headers);

  const values =
    data.values || [
      data.timestamp,
      data.eventId,
      data.name,
      data.email,
      data.phone,
      data.destination,
      data.travellers,
      data.why,
      data.utm_source,
      data.utm_campaign,
      data.utm_medium,
      data.utm_term,
      data.holidayosStatus,
      data.apiPushed,
      data.apiStatus,
      data.apiError,
    ];

  sheet.appendRow(values);
  return jsonResponse({ ok: true });
}
