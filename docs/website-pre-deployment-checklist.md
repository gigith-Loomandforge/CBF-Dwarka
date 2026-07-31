# Website Pre-Deployment and Launch Checklist

Use this checklist for CBF Dwarka, Medhyam, and other public websites. Copy it into the project, assign an owner to every applicable item, and attach evidence such as a screenshot, test output, ticket, or URL.

This is an engineering and content-readiness checklist, not legal advice. Privacy, consumer, accessibility, employment, healthcare, financial, child-safety, and sector-specific obligations must be reviewed for the countries and services involved.

## Project Record

- [ ] Project:
- [ ] Production domain:
- [ ] Staging URL:
- [ ] Repository and release branch:
- [ ] Hosting provider and account owner:
- [ ] CMS and account owner:
- [ ] Primary product/content owner:
- [ ] Engineering owner:
- [ ] Design owner:
- [ ] Legal/privacy reviewer:
- [ ] Accessibility reviewer:
- [ ] Analytics owner:
- [ ] DNS owner:
- [ ] Planned launch date and rollback window:
- [ ] Launch decision recorded as `GO`, `NO-GO`, or `GO WITH ACCEPTED RISKS`:

## Severity and Sign-Off

- `P0`: launch blocker; security, data-loss, inaccessible production, wrong domain, or legally unsafe processing.
- `P1`: serious user, privacy, revenue, SEO, or operational failure; resolve before launch.
- `P2`: material quality issue with a documented owner and near-term fix.
- `P3`: polish or optimization that may follow launch.
- [ ] Every P0 and P1 is closed and retested.
- [ ] Every accepted P2/P3 has an owner, due date, and written risk acceptance.
- [ ] The final release commit, deployment ID, environment, and test evidence are recorded.

## Purpose, Audience, and Content

- [ ] The site has a one-sentence purpose and a defined primary audience.
- [ ] Primary user journeys and conversion actions are documented.
- [ ] Every navigation item has a useful destination.
- [ ] No placeholder, lorem ipsum, sample testimonial, fake metric, fake profile, or fake content remains.
- [ ] Names, roles, qualifications, claims, dates, prices, schedules, addresses, and contact details are verified.
- [ ] Claims that need evidence link to an authoritative source or approved internal record.
- [ ] Time-sensitive content has an owner and review date.
- [ ] Empty, loading, error, offline, expired, archived, and no-results states have suitable copy.
- [ ] Content uses consistent terminology, capitalization, date format, time zone, currency, and units.
- [ ] Contact actions use monitored email addresses and phone numbers.
- [ ] Email, telephone, WhatsApp, map, download, social, and external links work.
- [ ] External links that open a new tab are identified appropriately and use safe `rel` attributes.
- [ ] Copyright and licensed assets have documented permission.
- [ ] Image subjects have approved publication consent where required.
- [ ] AI-assisted content has been fact-checked and does not expose confidential information.
- [ ] User-generated or CMS content has moderation and publishing ownership.

## Information Architecture and Navigation

- [ ] The current page is clearly indicated in desktop and mobile navigation.
- [ ] Mobile navigation opens, closes, traps no content, and remains reachable after scrolling.
- [ ] Logo links to home without layout movement between routes.
- [ ] Header height and gutters are consistent across routes and breakpoints.
- [ ] Breadcrumbs are present where hierarchy is deeper than one level.
- [ ] Footer includes the essential contact, legal, accessibility, and ownership links.
- [ ] Hidden or campaign-only pages are intentionally `noindex` and omitted from navigation/sitemap.
- [ ] Removed or renamed pages have redirects; there are no redirect chains or loops.
- [ ] Custom 404 and error experiences help users recover.
- [ ] Anchor links land below sticky headers and have stable IDs.

## Responsive UI and Interaction

- [ ] Test at minimum: 320, 360, 390, 768, 1024, 1440, and 1920 CSS pixels.
- [ ] Test portrait and landscape where the experience is used on mobile/tablet.
- [ ] No unintended horizontal scrolling exists.
- [ ] Text, buttons, inputs, cards, tables, maps, images, and dialogs do not overlap or clip.
- [ ] Touch targets are large enough and have adequate spacing.
- [ ] Hover, focus, active, selected, disabled, loading, success, and error states are designed.
- [ ] Interaction does not depend on hover alone.
- [ ] Controls use familiar icons and accessible names.
- [ ] Forms preserve user input after recoverable errors.
- [ ] Destructive or irreversible actions require suitable confirmation.
- [ ] Motion is restrained, does not cause layout shift, and respects reduced-motion preferences.
- [ ] Smooth scrolling does not break keyboard navigation, anchors, back/forward, or browser find.
- [ ] Carousels have working controls, keyboard access, clear state, and pause behavior if automatic.
- [ ] Images use intentional `cover`/`contain`, focal points, aspect ratios, and responsive sources.
- [ ] Embedded maps/video have usable fallbacks.
- [ ] Device testing covers at least one real iOS and one real Android device.

## Accessibility

- [ ] One descriptive H1 exists per page and heading levels form a logical outline.
- [ ] Landmarks (`header`, `nav`, `main`, `footer`, sections) are meaningful and labelled where needed.
- [ ] A keyboard user can reach and operate every interactive element.
- [ ] Focus order follows the visual and reading order.
- [ ] Focus is visible and not hidden behind sticky UI.
- [ ] A skip link is provided for repetitive navigation when appropriate.
- [ ] Forms have programmatic labels, instructions, autocomplete, and field-level errors.
- [ ] Errors identify the problem, announce through an appropriate live region, and move focus when useful.
- [ ] Color contrast meets WCAG 2.2 AA for text and interactive components.
- [ ] Color is not the only way information or status is conveyed.
- [ ] Informative images have useful alt text; decorative images use empty alt text.
- [ ] Video has captions; important audio-only content has a transcript or equivalent.
- [ ] Page zoom to 200% and text zoom/reflow to 400% remain usable.
- [ ] Screen-reader smoke tests cover navigation, headings, forms, dialogs, and dynamic status.
- [ ] Reduced motion, high contrast, and forced-colors behavior is reviewed where relevant.
- [ ] An accessibility statement gives users a contact and alternative-format route.
- [ ] Automated accessibility tooling is supplemented by keyboard and screen-reader testing.

## Forms, RSVP, and User Data

- [ ] Every collected field has a documented purpose and is genuinely necessary.
- [ ] Required and optional fields are clearly distinguished.
- [ ] Client and server validation agree.
- [ ] Empty strings, whitespace, nulls, booleans, arrays, malformed objects, large values, decimals, negative values, and boundary values are tested.
- [ ] Names support the required languages and punctuation without spreadsheet/formula injection.
- [ ] Request body size is limited before expensive parsing or processing.
- [ ] Repeat submission and double-click behavior is idempotent.
- [ ] Timeouts, retries, partial failures, and provider outages do not create duplicates or false success.
- [ ] Bot controls are appropriate: honeypot, completion-time check, rate limiting, CAPTCHA, WAF, or equivalent.
- [ ] Origin/CSRF protections match the actual production, preview, and local domains.
- [ ] Success is shown only after durable storage or a documented queued state.
- [ ] Failure messages do not expose secrets, internal IDs, stack traces, or provider details.
- [ ] Personal data never appears in URLs, analytics events, logs, error trackers, or public CMS documents.
- [ ] Test submissions use a test event/storage destination and are removed after verification.
- [ ] Concurrency tests cover expected peak traffic and a safety margin.
- [ ] Export, correction, deletion, and annual archival procedures are tested.
- [ ] Access to responses follows least privilege and is reviewed when team membership changes.
- [ ] Backups and recovery are appropriate for the importance of the data.

## Privacy and Legal

- [ ] The legal/operator identity and contact details are accurate.
- [ ] Privacy policy names each category of personal and technical data actually processed.
- [ ] Each purpose is specific, understandable, and limited to necessary data.
- [ ] The notice appears before or when data is requested, not only in the footer.
- [ ] Consent is affirmative, unbundled where needed, recorded, and as easy to withdraw as to give.
- [ ] Users can request access, correction, deletion, withdrawal, and grievance handling.
- [ ] A monitored privacy contact and response owner are assigned.
- [ ] Children’s data has an age rule, guardian authorization, and verifiable-consent process where applicable.
- [ ] Service providers/processors are documented: hosting, CMS, forms, storage, email, analytics, maps, video, payments, support, and error tracking.
- [ ] Cross-border processing and provider locations are disclosed where applicable.
- [ ] Retention periods or criteria are defined for each data category.
- [ ] Deletion is operationally possible in primary storage, exports, backups, CMS history, and third-party systems.
- [ ] Security safeguards and incident-notification responsibilities are documented.
- [ ] Cookie/local-storage inventory is completed in a clean browser before consent.
- [ ] No non-essential cookies, pixels, replay, advertising, or tracking load before required consent.
- [ ] A cookie banner is used only when required by actual technologies and jurisdictions.
- [ ] Terms cover acceptable use, account/submission responsibility, intellectual property, third parties, availability, liability limits, governing law, and changes.
- [ ] Refund, cancellation, shipping, returns, subscription, warranty, and consumer rights are included when relevant.
- [ ] Sector-specific notices are reviewed for healthcare, education, children, finance, employment, religion, biometrics, or location data.
- [ ] A qualified reviewer checks the final legal copy for the launch jurisdictions.
- [ ] The policy update date and change owner are recorded.

## Security

- [ ] Secrets are stored only in approved secret/environment-variable systems.
- [ ] No secret, API token, password, private key, webhook secret, or personal data exists in Git history or client bundles.
- [ ] Production and preview environment variables are independently reviewed.
- [ ] Public client keys are restricted by domain, API, quota, and least privilege.
- [ ] CMS datasets and assets use the intended public/private visibility.
- [ ] Studio/admin routes require authentication and are excluded from indexing.
- [ ] Admin accounts use MFA and individual identities; shared passwords are removed.
- [ ] Dependency, license, and secret scans are reviewed.
- [ ] Known critical/high vulnerabilities are fixed or have written exploitability analysis and risk acceptance.
- [ ] Framework, runtime, CMS, and package versions are supported.
- [ ] Security headers are verified on HTML and API responses.
- [ ] HTTPS, HSTS, secure redirects, and certificate renewal are verified.
- [ ] Content Security Policy is tested in report-only mode before enforcement.
- [ ] Permissions Policy disables unused browser capabilities.
- [ ] Referrer Policy and MIME sniffing protection are set.
- [ ] APIs set correct methods, status codes, content types, CORS, and `no-store` for sensitive responses.
- [ ] Authentication, authorization, object-level access, and privilege changes are tested.
- [ ] Uploads validate type, size, extension, content, storage path, and malware risk.
- [ ] Spreadsheet and CSV exports neutralize formula injection.
- [ ] Logs avoid request bodies and sensitive query parameters.
- [ ] Rate limits and provider quotas are monitored with actionable alerts.
- [ ] A vulnerability-reporting contact or `security.txt` exists when appropriate.
- [ ] Incident response includes containment, provider contacts, communication, and rollback.

## Technical SEO

- [ ] Exactly one preferred production origin is selected (`www` or apex).
- [ ] All alternatives redirect in one hop to the preferred HTTPS origin.
- [ ] Every indexable page has a unique, descriptive title and meta description.
- [ ] Canonicals use the production domain and resolve with 200 status.
- [ ] Canonicals, Open Graph, Twitter cards, hreflang, and sitemap URLs agree.
- [ ] `robots.txt` allows intended content and blocks admin/API paths.
- [ ] XML sitemap includes canonical indexable pages only and returns valid XML.
- [ ] Hidden, duplicate, filtered, preview, admin, legal-sensitive, or expired pages use intentional index controls.
- [ ] Pages return meaningful 200, 301/308, 404, 410, and 5xx statuses.
- [ ] No soft 404, infinite URL space, duplicate query variants, or accidental staging indexation exists.
- [ ] Internal links are crawlable anchors and important pages are not orphaned.
- [ ] Structured data matches visible content and uses valid canonical URLs.
- [ ] Organization/local entity data includes consistent name, address, phone, URL, logo, and verified same-as profiles.
- [ ] Event schema uses concrete dates, location, organizer, status, and visible event information.
- [ ] Video schema appears on pages where the video can actually be watched.
- [ ] Structured data passes Schema.org and Google Rich Results validation where supported.
- [ ] Important images have stable URLs, descriptive alt text, dimensions, and appropriate quality.
- [ ] Open Graph images render correctly at social-preview sizes.
- [ ] Search Console and Bing Webmaster Tools ownership is configured.
- [ ] Sitemaps are submitted and URL Inspection confirms rendered/indexable HTML.
- [ ] Domain migration includes redirects, change-of-address steps where applicable, and monitoring of old URLs.
- [ ] Google Business Profile and other local listings match the website’s name, address, phone, hours, and map location.
- [ ] There is no obsolete `meta keywords` work or keyword stuffing.

## GEO and AI Discoverability

- [ ] Core facts are present as server-rendered text, not only images, video, canvas, or client-only UI.
- [ ] The organization, people, services, location, schedules, and contact details use consistent names across pages and verified profiles.
- [ ] About, service, event, and contact pages answer the questions visitors actually ask.
- [ ] Content is first-party, specific, experience-based, current, and attributable.
- [ ] Headings, short summaries, lists, and descriptive link text make passages independently understandable.
- [ ] Important factual claims have dates, owners, and primary-source links where appropriate.
- [ ] Organization, LocalBusiness/Place, Event, Article, FAQ, and Video structured data is used only when accurate and visible.
- [ ] Image and video content has surrounding explanatory text, captions, and metadata.
- [ ] AI crawlers are intentionally allowed or blocked according to the organization’s policy.
- [ ] Search snippets are not unintentionally restricted with `nosnippet`, `data-nosnippet`, or low preview limits.
- [ ] No speculative “GEO schema”, hidden AI text, doorway pages, mass-generated FAQs, or search-query permutations are published.
- [ ] An `llms.txt` file is not treated as a Google requirement; add one only for a defined product/documentation use case.
- [ ] Google Search Console and available AI-feature reporting are reviewed after launch.
- [ ] Brand/entity references on Google Business Profile, YouTube, social profiles, directories, and the website are reconciled.

## Performance and Core Web Vitals

- [ ] Lighthouse is run on representative mobile and desktop routes in production mode.
- [ ] LCP, INP, and CLS meet agreed targets at the 75th percentile.
- [ ] Above-the-fold/LCP imagery is prioritized and correctly sized.
- [ ] Below-the-fold images and embeds are lazy-loaded.
- [ ] Images use modern formats where beneficial and avoid unnecessary source dimensions.
- [ ] Fonts are licensed, subset, preloaded only when justified, and use suitable fallbacks.
- [ ] JavaScript bundles, third-party scripts, hydration, and long tasks are reviewed.
- [ ] CMS, API, video, map, and analytics failures do not block primary content.
- [ ] Caching and revalidation match content freshness requirements.
- [ ] Pages are tested on a slow mobile network and mid-range device profile.
- [ ] No console errors, hydration errors, broken requests, or repeated warnings remain.
- [ ] Performance budgets are documented for page weight, images, scripts, fonts, and requests.

## CMS and Editorial Operations

- [ ] Production schema is deployed and matches the code release.
- [ ] Required fields, validation, defaults, previews, and helpful descriptions are present.
- [ ] Draft, published, scheduled, archived, expired, and deleted behavior is understood.
- [ ] The frontend uses the intended published/draft perspective.
- [ ] Duplicate singleton or annual documents cannot unexpectedly override current content.
- [ ] Queries select current content by explicit status/date/year, not last edit alone.
- [ ] Time zones and recurrence calculations are tested around midnight, year-end, DST where applicable, and past dates.
- [ ] CMS changes appear within the documented cache/revalidation window.
- [ ] Missing CMS configuration, empty datasets, malformed fields, missing assets, and provider outages have safe fallbacks.
- [ ] Fallback content is factual and never masquerades as live CMS or external data.
- [ ] Editors can update content without exposing technical instructions publicly.
- [ ] Roles follow least privilege and departed users are removed.
- [ ] Content export/backup and restoration are tested.
- [ ] Editor training covers publishing, image alt text, SEO fields, date handling, RSVP closure, and annual archival.

## Analytics, Monitoring, and Operations

- [ ] Analytics purpose, owner, retention, consent requirement, and privacy disclosure are approved.
- [ ] Analytics excludes admin/studio, previews, internal traffic where appropriate, and personal data.
- [ ] Conversion events are named consistently and tested once per action.
- [ ] Error monitoring has source maps, release IDs, environment separation, and PII scrubbing.
- [ ] Uptime checks cover the home page and critical APIs.
- [ ] Alerts cover elevated 5xx, latency, failed forms, quota exhaustion, certificate/DNS expiry, and provider outages.
- [ ] Logs and dashboards have defined retention and access.
- [ ] Backup, restore, and rollback instructions are tested by someone other than the author.
- [ ] Support and escalation contacts are documented.
- [ ] A post-launch observation window and owner are assigned.

## DNS, Email, and Domain

- [ ] Domain registrar access and MFA are verified.
- [ ] DNS records are exported before changes.
- [ ] TTL is lowered in advance when a time-sensitive migration requires it.
- [ ] Apex, `www`, and any subdomains point to the intended project.
- [ ] Old Wix/WordPress/hosting records no longer serve conflicting content.
- [ ] HTTPS certificate is issued for every public hostname.
- [ ] Preferred-host redirects work with paths and query strings.
- [ ] SPF, DKIM, DMARC, and MX records remain correct after DNS changes.
- [ ] Transactional/form email delivery, reply-to, spam placement, and monitored inbox ownership are tested.
- [ ] Domain renewal and billing contacts are current.

## Build, Release, and Deployment

- [ ] Worktree is reviewed; unrelated changes are not included.
- [ ] Lint, type-check, unit, integration, accessibility, and production build checks pass.
- [ ] Database/CMS migrations are backward compatible or sequenced safely.
- [ ] Environment variables are present in development, preview, and production as intended.
- [ ] Build and runtime use the supported Node/runtime version.
- [ ] Preview deployment is tested from the exact release commit.
- [ ] Source maps, debug flags, draft mode, test routes, and verbose logs are disabled or protected.
- [ ] Deployment produces the expected routes and static/dynamic behavior.
- [ ] The exact commit is pushed, built, and traceable to the deployment.
- [ ] Rollback target and rollback command/process are known.
- [ ] No destructive data migration is coupled to an unverified frontend release.
- [ ] CDN/cache invalidation and revalidation behavior are understood.

## Production Smoke Test

- [ ] Home, primary routes, legal pages, sitemap, robots, manifest, favicon, and 404 load on the production domain.
- [ ] Navigation, mobile menu, footer, logo, active states, and anchors work.
- [ ] Canonical, Open Graph, robots, structured data, and verification tags contain the production domain.
- [ ] Forms submit once, store correctly, show success, handle errors, and preserve privacy.
- [ ] One test record is verified end-to-end in the production destination and then removed.
- [ ] CMS publish, unpublish, future scheduling, annual selection, image replacement, and cache refresh are tested.
- [ ] External video, maps, social, email, phone, and messaging links work.
- [ ] Security headers and sensitive API cache headers are present.
- [ ] Browser console and network panel are clean on representative routes.
- [ ] Real mobile devices are tested over cellular data.
- [ ] Search engine and social preview validators can fetch the production pages.

## Launch and Post-Launch

- [ ] Stakeholders approve content, legal copy, data flows, and the final preview.
- [ ] DNS cutover occurs in the agreed window with rollback access available.
- [ ] Production deployment reaches a ready state before DNS is changed.
- [ ] Smoke tests run immediately after deployment and again after DNS propagation.
- [ ] Search Console/Bing sitemaps and important URLs are submitted.
- [ ] Old URLs and 404 logs are monitored for redirect needs.
- [ ] Forms, RSVP storage, inboxes, analytics, errors, performance, and uptime are monitored during the observation window.
- [ ] Test data and temporary accounts are removed.
- [ ] Accepted risks and deferred work are transferred to the backlog with owners.
- [ ] A 24-hour and 7-day review is completed.
- [ ] A post-launch summary records deployment, evidence, issues, fixes, and lessons.

## Handover

- [ ] Account ownership is organizational rather than personal where possible.
- [ ] Password-manager records and MFA recovery methods are current.
- [ ] Repository, hosting, CMS, DNS, analytics, storage, maps, social, and email access are documented.
- [ ] Environment-variable names and rotation procedures are documented without exposing secret values.
- [ ] Content editing and publishing instructions are current.
- [ ] RSVP/event-year creation, closure, export, retention review, and deletion are documented.
- [ ] Apps Script or webhook source changes are redeployed and tested separately from the website.
- [ ] Dependency and legal-policy review cadence is assigned.
- [ ] The client/team knows how to report content, accessibility, privacy, and security issues.
- [ ] Final design/source files, licenses, and approved assets are handed over.
