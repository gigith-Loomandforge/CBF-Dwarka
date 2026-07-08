# Event CMS Guide

The event CMS is managed in Sanity Studio and displayed on the website homepage.

## Client workflow

1. Open `/studio` on the website.
2. Sign in with the Sanity account that has access to project `nyb83ihi`.
3. Open `Events`.
4. Create or edit an event.
5. Keep `Show on homepage` enabled for events that should appear on the website.
6. Click `Publish`.

Published event changes appear on the website after the Next.js cache refreshes. The homepage currently revalidates every 5 minutes.

## Website Display Rules

- The homepage shows up to 3 events.
- Events are sorted by their next upcoming date/time.
- One-time events use `Event date/time`.
- Weekly events use `Repeats weekly on` plus `Weekly recurrence time`.
- `Sort order` is only used as a tie-breaker when two events have the same upcoming date/time.
- Past one-time events are not rendered.
- Events missing a title or description are not rendered.
- If no Sanity events are available, the website falls back to the hard-coded default events.

## Field Notes

- `Title`: Main event title.
- `Event date/time`: Required for one-time or irregular events.
- `Repeats weekly on`: Use for weekly events, such as Sunday Worship.
- `Weekly recurrence time`: Use 24-hour `HH:mm` format, such as `10:30` or `19:30`.
- `Schedule label`: Text shown at the top of the event card, such as `Sun - 10:30 AM`.
- `Description`: Short homepage card copy. Keep it under 180 characters.
- `CTA label`: Button/link text.
- `CTA link`: Use a section link like `#visit`, a path like `/events`, or a full URL.
- `Homepage date label`: Text shown in the black homepage event card, such as `Every Sunday`.
- `Homepage time label`: Time shown in the black homepage event card, such as `10:30 AM`.
- `Sort order`: Tie-breaker only, lower numbers win when dates match.

## Existing Event Updates

For the current homepage behavior, update these existing CMS entries:

- `Sunday Worship`: set `Repeats weekly on` to `Sunday`, `Weekly recurrence time` to `10:30`, `Homepage date label` to `Every Sunday`, and `Homepage time label` to `10:30 AM`.
- Weekly events such as Bible Study should use `Repeats weekly on` plus `Weekly recurrence time`.
- Irregular events such as Christmas, year-end, or special prayer meetings should use `Event date/time`.

## Seeding Starter Events

To add starter event documents from code, create a Sanity write token and set it as `SANITY_API_TOKEN`, then run:

```bash
npm run sanity:seed
```
