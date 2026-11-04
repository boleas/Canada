# Canada / Roadbook

Map-first November driving companion for the 6–19 November 2026 Vancouver–Rockies loop, based on the supplied booking vouchers. Return travel ends in Gran Canaria on 21 November.

## Run

Requires Node 22+. No npm dependencies or API keys are needed for the initial app.

```sh
npm run build
npm test
npm run dev
```

Open http://localhost:3000. Build generates a self-contained Cloudflare Worker ESM in `dist/server/index.js`, including the frontend and read-only API routes. `.openai/hosting.json` binds the private Sites project. `src/` is the editable source; do not edit generated `worker/index.js`.

## Features

- Eight booked stays with dates, hotel coordinates, phones, check-in times and route navigation.
- Interactive OpenStreetMap/Leaflet map, planned driving corridors and selected-leg highlight.
- 24 short stops, indoor alternatives and fuel/food breaks. Arrival-day forecasts rank indoor/outdoor suggestions; they do not determine safety or opening.
- Open-Meteo current conditions and 16-day forecast. Trip forecast shown only when the exact arrival date exists. All temperatures Celsius, winds km/h. Long-range uncertainty is stated.
- DriveBC Open511 active notices, filtered approximately to the selected corridor. Includes notices on nearby roads. Approximate geometry and feed limits are disclosed; never interprets an empty response as confirmation of safe/open roads.
- Server fetches official Parks Canada and BC Parks pages, exposing source links and bulletin links where extraction succeeds. Fetching a page is explicitly separate from confirming current opening. Parsing failures keep the official source visible.
- Alberta 511 official link. Automated Alberta incidents require an Alberta 511 developer API key and are not implemented or simulated.
- Refresh every ten minutes while open, refresh on returning to the app when stale, manual refresh and explicit unavailable states.
- Browser-local saved stops and checklist, JSON export, responsive touch-friendly UI, device geolocation on request.

## Data and privacy

No original PDFs, booking references, traveller birth dates, tickets, email addresses or credentials are included. Public hotel and service contact details and trip dates are transcribed from vouchers. This is a personal itinerary: deploy privately. Browser storage does not sync between devices. Export keeps a copy; offline map tiles are not cached by the app. Download offline maps in a navigation app before travelling.

External resources: Leaflet (vendored, BSD-2-Clause), OpenStreetMap map tiles, Google Fonts, Open-Meteo, DriveBC and official park pages. They require internet and may fail independently. The frontend falls back to a usable list and external navigation links when the map library fails. Weather is fetched directly by the browser; road and park requests run through same-origin read-only endpoints. Upstream failures are never represented as all-clear.

## Planning limits

Distances and times are estimates without stops or winter delays. Dashed lines follow coarse highway waypoints, not routable road geometry. Google Maps navigation is provided for detailed routing and must be checked against official closures. Conditions describe now, not future travel dates. No automatic rerouting or safe-trail claims. Opening hours and seasonal operations require checking. The 19 November rental return is only two hours before departure; confirm check-in deadlines and allow a larger buffer.

## Deployment

Sites: deploy `dist/` as a Worker artifact, retaining `.openai/hosting.json`. The Sites source helper is unavailable in this environment; the same verified source commit is pushed to the Site repository and packaged as Worker ESM.

Vercel alternative: `vercel.json` rewrites the application and APIs to `api/index.mjs`, which invokes the same Worker-compatible handler. Import this repository to Vercel, choose Other framework, run `npm run build`, use `public` as the output directory, and enable deployment protection before using personal trip dates. The Vercel adapter has no provider secrets. Server fetches depend on provider/upstream access.

## Verification

`npm test` verifies contiguous booked nights, coordinate ranges, source-link parsing, failure states and Worker response routes. Browser QA and live provider verification depend on the execution environment and are separately reported in the task handoff.

## CarPlay navigation

Tap **Google Maps** on a driving leg. All navigation uses Google Maps. Open the hotel directly, or open each highway waypoint in order to follow the planned corridor. Each link navigates from the device’s current position; it does not hard-code yesterday’s hotel as the starting point. Hotel and discovery navigation links also open Google Maps.

The website does not run on CarPlay or automatically install/save routes in a maps account. Start navigation on your iPhone, connect to CarPlay, and use Google Maps there. Google Maps must be installed and enabled for CarPlay. Approximate highway anchors are not guaranteed safe stopping places. Download offline maps separately.

## Publish on Vercel

Import `boleas/Canada` into your Vercel account, select branch `main`, and keep the repository’s `vercel.json` settings: Other framework, `npm run build`, output `public`, Node 22 or newer. No environment variables are required for this version. The root and condition endpoints are explicitly rewritten to the serverless adapter; unrecognised paths return 404. Enable Vercel deployment protection if you want access restricted: the Sites sign-in gate does not carry over to Vercel.

[Deploy this repository to Vercel](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Fboleas%2FCanada)

## Daylight-first experience plan

The route and hotel panels use an offline standard sunrise/sunset approximation (solar altitude −0.833°) on the actual transfer date for the origin, corridor anchors and destination. The window starts at the latest sunrise plus 15 minutes and ends at the earliest sunset minus 45 minutes. Useful light can be shorter in mountain shade and poor visibility. Live weather does not override these limits or certify safe driving.

Essential breaks and one hour of contingency are reserved. Up to 20 extra minutes are offered for one scenic stop only when the suggested departure leaves enough room. The latest-departure label assumes no optional sightseeing. The app flags an infeasible day instead of recommending departure before daylight. Jasper–100 Mile House on 15 November needs agency review under the conservative budget. The initial airport transfer is necessarily after dark with the booked flight/rental times. No routes or reservations are changed automatically.

“Daylight & highlights” gives one memorable option, a weather fallback and what to skip. Longer experiences use the existing non-driving days. Download offline maps separately; this app does not monitor position or provide live turn-by-turn directions/remaining-drive ETAs.

## Clothing

Clothing opens a per-person packing checklist with suggested quantities and a mid-trip laundry assumption. Progress is browser-local and exported with the itinerary. “What to wear” covers 6–21 November, including non-driving days and return flights. It uses the exact date’s available town forecasts (both endpoints on a transfer), with explicit seasonal fallback when forecasts are missing. Mountain-pass conditions may differ; rain, snow, freezing lows and wind add appropriate clothing notes but never imply safe trail access. Return connections on 20–21 November use flight-layer guidance rather than Vancouver weather.

## Hotel parking

The P button and hotel cards show source-linked parking guidance for all eight stays, reviewed 3 November 2026. Prefer hotel guest parking; Vancouver and Whistler include researched public alternatives, including access/height/overnight restrictions. Sources are published listings and vouchers, not live availability or reservations. Conflicting Belmont prices are not represented as a confirmed rate. Super 8 parking is explicitly based on a booking listing pending hotel confirmation. Each transfer reserves 20 minutes for parking and reaching reception, separately from the weather contingency.

The original Lobstick closure conflict has been superseded by the agency’s Chateau Jasper replacement, accepted by the traveller. The app uses the new hotel and its parking details, with a reminder to obtain the revised voucher.

## Daily rhythm and exercise

Day plan offers suggested local wake, meal and sleep times and a planned 30-minute movement block on every trip date. Hotel exercise is outside transfer driving budgets, with quiet indoor alternatives when a gym is unconfirmed or unavailable. The 15 November workout is before the drive, preserving the unresolved daylight warning. Non-driving days combine time-limited walks with landmarks; travel days are flexible, and 21 November prioritises sleep after the 00:30 return. A daily completion tick is browser-local and exported.

Fitness facilities and published hours are source-linked for Sandman Penticton, Sutton Place Revelstoke, Banff Caribou Lodge and Pinnacle Whistler, reviewed 3 Nov 2026. Belmont and Super 8 gyms are unconfirmed; Chateau Jasper fitness access needs local verification. Outdoor walks require open, suitable paths, and account for travel to the start separately. The suggested 22:00 bedtime and 06:45–07:00 wake time are practical trip planning, not a universal Canadian routine or medical prescription.

## Vancouver parking update and Arc’teryx

The hotel message supplied 4 November 2026 supersedes older parking listings for both Belmont stays: the hotel does not operate/manage parking. It recommends the independent public pay lot at 1001 Seymour St and the gated facility at 930 Seymour St. Brief luggage unloading is permitted where lawful; the Guest Experience Team supplies gated directions/access. Rates, overnight permission, clearance and gate terms remain to be confirmed. Previous suggested lots have been replaced.

Discover’s Arc’teryx filter and blue shop pins show Robson St (closest verified brand store, not an outlet), McArthurGlen (recommended for airport-side convenience) and North Vancouver (alternative factory outlet). Official listings, addresses, phone numbers and published hours are linked, reviewed 4 November. Outlet stock and savings are not guaranteed. Pins are approximate and navigation uses published addresses. These optional Vancouver-day visits do not modify transfer corridors or airport buffers. Robson can be reached on foot; use the 7th/8th for a longer outlet excursion. Existing saved stop IDs are preserved.

## Jasper replacement update · 4 November 2026

The agency reports moving the reservation to Chateau Jasper but asks for acceptance before proceeding. The traveller subsequently accepted; the app now shows Chateau Jasper as the **accepted replacement, with a revised voucher to obtain**, for the existing 13–15 Nov dates, standard room with 2 queen beds, room only. This is not an agency acceptance or a confirmation of fulfilment. The booking reference from the message is intentionally excluded from tracked source and public hosting.

The local hotel endpoint, phone, parking and exercise guidance are updated provisionally. Official published GPS: 52°53′09″N, 118°04′49″W, address 96 Geikie Street. Website check-in/out are 16:00/11:00 pending revised voucher. Free heated garage parking is limited and first come; operator terms restrict clearance to under 6′1″ (about 1.85m). Ask reception for permitted overflow. Tourism Alberta mentions a gym but the hotel amenities page does not currently confirm one; access remains unverified. The agency corridor and dates remain unchanged, and the long 15 November daylight warning remains.

### Acceptance confirmed by user

The traveller has now accepted Chateau Jasper. The app marks it as the accepted replacement and updates hotel, route endpoint, parking and daily plans. Keep a reminder to obtain the revised voucher; no acceptance message was sent by this app.
