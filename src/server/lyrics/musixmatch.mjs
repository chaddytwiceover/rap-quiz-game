const DEFAULT_BASE_URL = 'https://api.musixmatch.com/ws/1.1';

function getConfig() {
  const apiKey = process.env.MUSIXMATCH_API_KEY;
  const baseUrl = process.env.MUSIXMATCH_BASE_URL || DEFAULT_BASE_URL;

  if (!apiKey) {
    throw new Error('MUSIXMATCH_API_KEY is not configured.');
  }

  return { apiKey, baseUrl: baseUrl.replace(/\/$/, '') };
}

function makeUrl(endpoint, params = {}) {
  const { apiKey, baseUrl } = getConfig();
  const url = new URL(`${baseUrl}/${endpoint}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  url.searchParams.set('apikey', apiKey);
  return url;
}

async function request(endpoint, params, { signal } = {}) {
  const response = await fetch(makeUrl(endpoint, params), {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Musixmatch HTTP error ${response.status}.`);
  }

  const payload = await response.json();
  const statusCode = payload?.message?.header?.status_code;

  if (statusCode !== 200) {
    throw new Error(`Musixmatch API error ${statusCode ?? 'unknown'}.`);
  }

  return payload.message.body;
}

export async function matchTrack({ artist, title, isrc, signal } = {}) {
  if (!isrc && (!artist || !title)) {
    throw new TypeError('Provide either isrc, or both artist and title.');
  }

  const body = await request(
    'matcher.track.get',
    {
      q_artist: artist,
      q_track: title,
      track_isrc: isrc,
    },
    { signal },
  );

  const track = body?.track;
  if (!track) return null;

  return {
    provider: 'musixmatch',
    trackId: track.track_id ?? null,
    commonTrackId: track.commontrack_id ?? null,
    title: track.track_name ?? title ?? null,
    artist: track.artist_name ?? artist ?? null,
    album: track.album_name ?? null,
    explicit: Boolean(track.explicit),
    hasLyrics: Boolean(track.has_lyrics),
    isrc: track.track_isrc ?? isrc ?? null,
  };
}

export async function getMatchedLyrics({ artist, title, isrc, signal } = {}) {
  if (!isrc && (!artist || !title)) {
    throw new TypeError('Provide either isrc, or both artist and title.');
  }

  const body = await request(
    'matcher.lyrics.get',
    {
      q_artist: artist,
      q_track: title,
      track_isrc: isrc,
    },
    { signal },
  );

  const lyrics = body?.lyrics;
  if (!lyrics) return null;

  return {
    provider: 'musixmatch',
    lyricsId: lyrics.lyrics_id ?? null,
    body: lyrics.lyrics_body ?? '',
    copyright: lyrics.lyrics_copyright ?? null,
    explicit: Boolean(lyrics.explicit),
    restricted: Boolean(lyrics.restricted),
    pixelTrackingUrl: lyrics.pixel_tracking_url ?? null,
    scriptTrackingUrl: lyrics.script_tracking_url ?? null,
    updatedTime: lyrics.updated_time ?? null,
  };
}

export async function testMusixmatchConnection({ signal } = {}) {
  const track = await matchTrack({
    artist: 'Kendrick Lamar',
    title: 'HUMBLE.',
    signal,
  });

  return Boolean(track?.trackId || track?.commonTrackId);
}
