// Step 1: Prepare Google Sheet
// Open Google Sheets and create a new blank spreadsheet. Name the first row headers in row 1: A1="Timestamp", B1="Name", C1="Email", D1="Message".
​

// Step 2: Open Apps Script
// In the Sheet, click Extensions > Apps Script. Delete any default code and paste this handler script:

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const params = e.parameter;
    sheet.appendRow([new Date(), params.name, params.email, params.message]);
    
    MailApp.sendEmail("ankit.k.j1999@gmail.com", "New Contact Form Submission", 
      `Name: ${params.name}\nEmail: ${params.email}\nMessage: ${params.message}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: "Form submitted"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// Step 3: Deploy Web App
// Click Deploy > New deployment. Choose type "Web app", execute as "Me", access "Anyone". Copy the Web app URL (ends in /exec).