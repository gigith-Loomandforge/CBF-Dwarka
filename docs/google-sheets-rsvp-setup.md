# Google Sheets RSVP Storage

Sanity manages the event content and RSVP availability. RSVP submissions are stored only in a private Google Sheet owned by CBF Dwarka.

## 1. Create the Apps Script

1. Sign in to [Google Apps Script](https://script.google.com/) using `cbfdwarka2021@gmail.com`.
2. Create a new project named `CBF Dwarka RSVP`.
3. Replace the generated `Code.gs` with [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
4. Open **Project Settings > Script properties**.
5. Add a property named `RSVP_WEBHOOK_SECRET` with a random value of at least 32 characters.

## 2. Deploy the web app

1. Select **Deploy > New deployment**.
2. Choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set access to **Anyone**.
5. Deploy and copy the URL ending in `/exec`.

The endpoint is publicly reachable, but requests are accepted only when they contain the server-side secret. The website sends that secret from its Vercel function; it is never included in browser code.

When `Code.gs` changes, open **Deploy > Manage deployments**, edit the active web app, select **New version**, and deploy it. This keeps the existing `/exec` URL and Vercel settings.

## 3. Configure the website

Add these values to `.env.local`:

```dotenv
GOOGLE_APPS_SCRIPT_RSVP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_APPS_SCRIPT_RSVP_SECRET=THE_SAME_SCRIPT_PROPERTY_VALUE
```

Run the integration test:

```bash
npm run rsvp:google:test -- 2026
```

The test creates one clearly labelled row in the Offsite spreadsheet. To test another service, include its service key:

```bash
npm run rsvp:google:test -- 2026 christmas
npm run rsvp:google:test -- 2027 easter
```

Confirm each spreadsheet exists in the CBF Google Drive, inspect the row, and then delete the test row.

## 4. Configure production

Add the same two variables to the Vercel Production environment and redeploy.

The Apps Script creates one spreadsheet per service and year on the first submission:

- `CBF Offsite RSVP 2026`
- `CBF Easter Service RSVP 2027`
- `CBF Christmas Service RSVP 2026`

Each attendee is stored on a separate row. Repeated webhook deliveries with the same submission ID are ignored. The original Offsite year-only spreadsheet property is reused automatically so existing Offsite records are not split into a second sheet.

RSVP names and ages must not be copied into Sanity. Review or export attendance from the yearly Google Sheet in the CBF Google Drive.

## 5. Start a new annual service

For Easter or Christmas:

1. Open the relevant service page in Sanity Studio.
2. Set **Event year** to the new year.
3. Update the service date and page content.
4. Turn on **Enable RSVP form** and publish.

The first RSVP creates a new private spreadsheet for that service and year. Turn the RSVP switch off and publish when registration closes. Previous yearly spreadsheets remain available in the CBF Google Drive.
