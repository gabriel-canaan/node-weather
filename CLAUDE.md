# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

```sh
npm start        # starts Express server at localhost:3000
```

There are no tests and no lint scripts configured.

## Architecture

Express server (`src/app.js`) serves an HBS-templated frontend and a JSON weather API.

**Request flow for weather lookup:**
1. Browser (`public/js/app.js`) submits the form → `GET /weather?address=<input>`
2. Server calls `src/utils/geocode.js` → Mapbox Geocoding API → returns `{ latitude, longitude, location }`
3. Server calls `src/utils/forecast.js` → open-meteo API → returns a formatted weather string
4. Response JSON: `{ forcast, location, address }` (note: `forcast` is a typo in the codebase — don't fix it without updating `public/js/app.js` line 19 too)

**Templates** live in `templates/` (not the default `views/`). Views are under `templates/views/`, partials under `templates/partials/` (`header.hbs`, `footer.hbs`). This non-default path is explicitly configured in `src/app.js`.

**Static assets** are served from `public/` — CSS, images, and the client-side JS.

## Key details

- `PORT` env var overrides the default port 3000 (used for Heroku deployment).
- `geocode.js` has a hardcoded Mapbox public token.
- `forecast.js` uses the open-meteo API — `current_weather=true` for current conditions, `daily=temperature_2m_max,precipitation_probability_max` for today's high and rain probability.
- No `.env` support; credentials are inlined in source.
