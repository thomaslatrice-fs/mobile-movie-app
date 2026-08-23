# Reel Notes — Mobile (React Native / Expo)

A React Native companion app for the Reel Notes movie collection, built with Expo. It talks to the **same live API** used by the web app — no new backend, no new database.

## How it reuses the existing API

This app makes no changes to the server. It calls the exact same endpoints as the web client:

- Base URL: `https://movie-app-h9a2.onrender.com/api/v1` (set in `src/api/config.js`)
- `GET /movies`, `GET /movies/:id`, `POST /movies`, `PUT /movies/:id`, `DELETE /movies/:id`

## Project structure

```
movie-mobile/
├── App.js
├── src/
│   ├── api/          axios calls + API base URL config
│   ├── theme/         shared colors/spacing (matches the web app's palette)
│   ├── components/    MovieCard, MovieForm (shared by Add/Edit screens)
│   ├── screens/       MovieListScreen, AddMovieScreen, EditMovieScreen
│   └── navigation/     stack navigator wiring the three screens together
```

## Front-end flow (matches the web app)

| Web page | Mobile screen |
|---|---|
| `/` — Collection | MovieListScreen |
| `/add` — Add Movie | AddMovieScreen |
| `/edit/:id` — Edit Movie | EditMovieScreen |

Same three actions (view, add, edit/delete), same color palette, same data — just a native interface instead of a browser.

## Local setup

```bash
npm install
npx expo start
```

This opens Expo's developer tools in your browser. From there:
- Press `i` to open in the iOS simulator (Mac only, requires Xcode)
- Press `a` to open in an Android emulator (requires Android Studio)
- Or scan the QR code with the **Expo Go** app on your own phone (easiest option — no simulator setup needed)

No `.env` file or local server needed — it points straight at your already-deployed Render API.

## Demonstrating from the `production` branch

Your assignment requires the app to run once pulled from a branch named `production`. From your existing `movie-app` git repo (or a new repo for the mobile app — see note below):

```bash
git checkout -b production
git add .
git commit -m "Add React Native mobile client"
git push -u origin production
```

Anyone (including your professor) can then run:

```bash
git clone -b production <your-repo-url>
cd movie-mobile
npm install
npx expo start
```

and the app will run immediately, since it only needs your already-live API — no environment setup or secrets required on their end.

**Note on repo structure:** you can either add this `movie-mobile/` folder as a new top-level folder inside your existing `movie-app` repo (alongside `client/` and `server/`), or push it as its own repository. Either is fine — just make sure the `production` branch contains this working code either way.
