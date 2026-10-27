# Development notes

## Browser demo

The `web/` app is React 19 with Vite. `src/listings.mjs` owns the seed data, combined filters, and new-listing validation. `App.jsx` owns the UI and browser storage; `ItemArt.jsx` contains local vector illustrations. No image CDN or backend is required after the app is loaded.

State keys are `imarket-saved` (listing IDs) and `imarket-listings` (user-created demo listings). Malformed/non-array storage falls back to defaults. Storage write failures keep the session usable and display a message. Native HTML dialogs provide keyboard focus containment and Escape-to-close behavior.

All animations are decorative. The CSS reduced-motion rule disables the hero, card, and heart transitions. New-listing forms use native required/min/max constraints plus shared domain validation.

## Native source

The root `package.json` and lockfile describe the original Expo 40 application. Keep browser dependencies inside `web/`; do not install modern React into the native project by accident. A full native SDK migration is a separate task and should follow Expo's incremental upgrade guidance.

`app.config.js` reads `IMARKET_API_URL` when Expo evaluates the app configuration. The value is a public endpoint, not a secret. `app/api/client.js` reads that manifest setting. A physical device needs a reachable backend address and the original endpoint contract.

The existing `app/api/` modules reference `/auth`, `/users`, `/listings`, `/messages`, and `/expoPushTokens`; inspect those modules alongside the backend before changing their contract. The backend is not present here. Neither Docker nor the browser companion emulates authentication or actual seller communication.

The welcome-screen reveal uses React Native's `Animated` API and checks `AccessibilityInfo.isReduceMotionEnabled()`. Its animation and accessibility listener are cleaned up on unmount. Original Lottie upload/loader assets remain available to the mobile app.

## Validation

```bash
cd web
npm ci
npm test
npm run build
cd ..
./scripts/bootstrap.sh test
```

Browser checks: combined search/category filtering, save/unsave persistence, listing details, demo posting and reload, empty states, 375px layout, keyboard dialogs, and reduced-motion CSS. Native animation source can be compiled with the historical Babel preset; Android/iOS runtime verification still requires the matching Expo client and backend.
