# CBF Dwarka Launch Readiness

This file tracks the actions that cannot be completed by a code build alone. Complete it alongside `website-pre-deployment-checklist.md`.

## Completed in Code on July 30, 2026

- [x] Added canonical production metadata, Open Graph/Twitter metadata, `robots.txt`, XML sitemap, web manifest, and search-verification environment variables.
- [x] Added Organization, Church, Website, Event, and Video structured data only where corresponding visible content is available.
- [x] Added complete Privacy Policy, Terms & Conditions, and Accessibility pages and linked them from public footers.
- [x] Added an RSVP notice and affirmative consent before names and ages are submitted.
- [x] Added server-side type, boundary, size, event-status, origin, UUID, honeypot, and completion-time validation.
- [x] Added retry idempotency and spreadsheet formula-injection protection.
- [x] Removed the unused legacy RSVP endpoint and kept sensitive API responses uncached.
- [x] Added baseline response security headers and removed the framework-identification header.
- [x] Added a keyboard skip link, visible focus treatment, reduced-motion behavior, and a custom not-found page.
- [x] Removed broken language navigation and placeholder social/video links.
- [x] Updated the public YouTube fallback parser for the current channel markup and retained long-form filtering.
- [x] Added automated RSVP and YouTube parser regression tests.
- [x] Confirmed no API keys or webhook secrets are tracked in the current Git files.
- [x] Validated the local Sanity schema with zero errors and zero warnings.

## Current Launch Blockers

- [ ] Point `www.cbfdwarka.org` and `cbfdwarka.org` to the Vercel `cbf-dwarka` project.
- [ ] Choose `https://www.cbfdwarka.org` as the primary Vercel domain.
- [ ] Verify the apex domain redirects to `www` in one hop while preserving paths and query strings.
- [ ] Confirm Wix no longer serves the primary domain after DNS propagation.
- [ ] Verify every production route after cutover: `/`, `/about`, `/connect`, `/contact`, `/sermons`, `/easter-service`, `/christmas-service`, `/privacy`, `/terms`, and `/accessibility`.
- [ ] Confirm `/offsite` remains reachable only by direct link and contains `noindex`.
- [ ] Confirm `/studio` requires Sanity authentication and contains `noindex`.

## RSVP and Personal Data

- [ ] Redeploy `google-apps-script/Code.gs` as a new Apps Script web-app version after the lock/idempotency changes.
- [ ] Confirm the deployed Apps Script URL remains the value configured in Vercel.
- [ ] Create a temporary test event and test sheet.
- [ ] Test successful submission, duplicate retry, family members, child age, 12-member limit, invalid age, expired form, honeypot, oversized body, storage timeout, and closed event.
- [ ] Run a controlled concurrent write test against the temporary sheet, not a live attendee sheet.
- [ ] Remove the temporary event, spreadsheet, and test records.
- [ ] Assign a ministry-team owner for privacy requests sent to `cbfdwarka2021@gmail.com`.
- [ ] Decide and document an RSVP deletion/anonymization schedule.
- [ ] Review every yearly Offsite, Easter, and Christmas sheet after its event.
- [ ] Restrict Google Sheet sharing to named authorized ministry-team accounts.
- [ ] Remove access promptly when ministry responsibilities change.

## Legal Approval

- [ ] CBF Dwarka leadership confirms the operator name, contact details, and New Delhi jurisdiction statement.
- [ ] Leadership approves the purposes for collecting attendee names and ages.
- [ ] Leadership approves the children/guardian confirmation.
- [ ] Leadership approves the retention wording and adopts the matching operational process.
- [ ] A qualified Indian legal/privacy reviewer checks the final Privacy Policy and Terms before the DPDP notice and consent provisions take effect.
- [ ] Re-review the policy when analytics, contact forms, donations, payments, newsletters, prayer requests, or additional processors are added.

## Search and GEO

- [ ] Add `GOOGLE_SITE_VERIFICATION` to Vercel after creating the Google Search Console property.
- [ ] Add `BING_SITE_VERIFICATION` after creating Bing Webmaster Tools access.
- [ ] Submit `https://www.cbfdwarka.org/sitemap.xml` to both services after DNS cutover.
- [ ] Inspect the home, contact, Easter, Christmas, and one sermon URL in Search Console.
- [ ] Validate Organization/Church, Event, and Video JSON-LD against the rendered production HTML.
- [ ] Update Google Business Profile to match: Christian Believers Fellowship Dwarka, Taekwondo Room (Room 316), Mount Carmel School, Sector 22, Dwarka, New Delhi 110077.
- [ ] Ensure Google Business Profile phone, Sunday time, website, and map pin match the site.
- [ ] Confirm the official Instagram and YouTube profiles link back to the new domain.
- [ ] Request re-indexing only after Wix has stopped serving the primary domain.

## Security and Dependencies

- [ ] Enable MFA on GitHub, Vercel, Sanity, Google, the domain registrar, and the CBF email account.
- [ ] Rotate any API keys or passwords previously shared in chat, email, or screenshots.
- [ ] Restrict the YouTube API key to the YouTube Data API and approved use.
- [ ] Confirm Google Apps Script secret and Vercel secret match without exposing either value.
- [ ] Review Vercel logs to ensure RSVP request bodies are not recorded.
- [ ] Test the response security headers after deployment.
- [ ] Re-run `npm audit --omit=dev` immediately before launch.
- [ ] Record the remaining Sanity CLI and Sharp advisories with exploitability notes; do not force incompatible downgrades solely to silence the audit.
- [ ] Recheck for supported Sanity and Next/Sharp releases before final deployment.
- [ ] Test a Content Security Policy in report-only mode as a post-launch hardening task.

## Content and Operations

- [ ] Confirm current worship, Bible-study, address, phone, email, and map information with church leadership.
- [ ] Confirm Easter, Christmas, and Offsite years, dates, locations, images, and RSVP status in Sanity.
- [ ] Close previous-year RSVP toggles.
- [ ] Confirm all homepage CTAs open the intended Connect section.
- [ ] Confirm YouTube returns current long-form videos and does not display invented sermon titles.
- [ ] Add captions to newly published YouTube sermons and improve older priority videos where practical.
- [ ] Confirm Instagram and YouTube links are official and monitored.
- [ ] Assign owners for CMS updates, annual-event setup, YouTube, inbox responses, and legal review.

## Release Evidence

- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Sanity schema validation and deployment
- [ ] Mobile and desktop browser regression
- [ ] Keyboard and screen-reader smoke test
- [ ] Production route/status scan
- [ ] `robots.txt`, sitemap, manifest, canonical, social metadata, and structured-data validation
- [ ] RSVP test using temporary storage
- [ ] Dependency audit
- [ ] Git commit and GitHub push
- [ ] Vercel deployment ID and ready status
- [ ] Final production URL and screenshots
