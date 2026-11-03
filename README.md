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

Tap **CarPlay / Maps** on a driving leg. Choose Apple Maps or Google Maps (the choice is saved in this browser). Open the hotel directly, or open each highway waypoint in order to follow the planned corridor. Each link navigates from the device’s current position; it does not hard-code yesterday’s hotel as the starting point. Hotel and discovery navigation links use the same app preference.

The website does not run on CarPlay or automatically install/save routes in a maps account. Start navigation on your iPhone, connect to CarPlay, and use the chosen navigation app there. Google Maps must be installed and enabled for CarPlay. Approximate highway anchors are not guaranteed safe stopping places. Download offline maps separately.

## Publish on Vercel

Import `boleas/Canada` into your Vercel account, select branch `main`, and keep the repository’s `vercel.json` settings: Other framework, `npm run build`, output `public`, Node 22 or newer. No environment variables are required for this version. The root and condition endpoints are explicitly rewritten to the serverless adapter; unrecognised paths return 404. Enable Vercel deployment protection if you want access restricted: the Sites sign-in gate does not carry over to Vercel.

[Deploy this repository to Vercel](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Fboleas%2FCanada)
