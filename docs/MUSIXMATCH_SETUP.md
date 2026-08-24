# Musixmatch Production Setup

## Why Musixmatch

Musixmatch is the production lyrics provider for Rap Quiz Game because it offers a licensed lyrics catalog intended for application use.

The game must access Musixmatch from server-side code only. Never expose the API key in browser JavaScript, a public repository, screenshots, logs, or client-visible environment variables.

## Current integration

The repository contains a provider module at:

`src/server/lyrics/musixmatch.mjs`

It currently supports:

- matching a track by artist/title or ISRC
- retrieving matched lyrics
- normalized track metadata
- explicit-content metadata
- provider tracking fields
- a connection test helper

## Account setup required

1. Create a Musixmatch developer account at `https://developer.musixmatch.com/`.
2. Select the API plan/license appropriate for a public lyrics quiz game.
3. Generate an API key.
4. Copy `.env.example` to your local environment file.
5. Set:

   `MUSIXMATCH_API_KEY=your_real_key_here`

6. Do not commit the real `.env` file. The repository `.gitignore` already excludes it.

## Deployment

When the app is deployed, add `MUSIXMATCH_API_KEY` as a server-side secret in the hosting provider (for example, Vercel project environment variables). Do not prefix the variable with `VITE_`, `NEXT_PUBLIC_`, or any other client-exposed prefix.

Optional:

`MUSIXMATCH_BASE_URL=https://api.musixmatch.com/ws/1.1`

## Usage example

```js
import {
  matchTrack,
  getMatchedLyrics,
} from './src/server/lyrics/musixmatch.mjs';

const track = await matchTrack({
  artist: 'Kendrick Lamar',
  title: 'HUMBLE.',
});

const lyrics = await getMatchedLyrics({
  artist: 'Kendrick Lamar',
  title: 'HUMBLE.',
});
```

## Production content rules

- Treat Musixmatch content as licensed provider content, not as repository-owned content.
- Do not commit retrieved lyrics to GitHub.
- Do not bulk scrape or pre-download the catalog.
- Do not create a permanent lyrics database unless the selected Musixmatch agreement explicitly allows it.
- Preserve any attribution, copyright notice, tracking URL, or display requirement required by the selected plan.
- Build the quiz system so provider data is transformed only as permitted by the applicable license.
- Keep mock/original lyric-like test content available for local development without API access.

## Next implementation step

Once the frontend/server stack is selected, expose a narrow internal server endpoint such as `/api/quiz/question` rather than allowing the browser to call Musixmatch directly. That endpoint should return only the exact question data the player needs, not the provider API key or unnecessary provider response fields.
