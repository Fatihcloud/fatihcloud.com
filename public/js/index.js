const _0x3af16f = _0x5f1a;
function _0x4255() {
  const _0x3d74db = [
    "771245vEwZCT",
    "1560629GNyLjC",
    "37420hsqBoP",
    "fff4f3c30f95410bb0c699244cda3b11",
    "6UqfimW",
    "8vdPxut",
    "6YvTYit",
    "2694428DKWjrI",
    "BQDuCtgL2LWXLfHrfE0EUBo5ir5sOMXqCZUcE_5ymuT18PjC1wSceNcNDjAWZV13ja0v8m1zsUXp9qPKY_cJVjmI9HipR-UIFx3AeeSMSRMvvNNUG1Bvlxh3FLISDFZ3GWYLu-9lLmc0tNiXkCRKqijucWVDp0WhMw2s4fhdCbi3Z068dPTTS-ekx-MFeoiL9Fh4LbfYemNxnhlqGIa3Vw",
    "15736fLLomC",
    "2375300QsfcMH",
    "1085679PDFRTy",
    "c442a1930d1c4203bdf90baf952366d3",
    "21tgYzVA",
  ];
  _0x4255 = function () {
    return _0x3d74db;
  };
  return _0x4255();
}
(function (_0x398326, _0x5079b8) {
  const _0x109546 = _0x5f1a,
    _0x5b5f81 = _0x398326();
  while (!![]) {
    try {
      const _0x331049 =
        (parseInt(_0x109546(0x181)) / 0x1) *
          (parseInt(_0x109546(0x178)) / 0x2) +
        (-parseInt(_0x109546(0x17c)) / 0x3) *
          (parseInt(_0x109546(0x17f)) / 0x4) +
        (-parseInt(_0x109546(0x17d)) / 0x5) *
          (parseInt(_0x109546(0x175)) / 0x6) +
        (parseInt(_0x109546(0x17e)) / 0x7) *
          (parseInt(_0x109546(0x182)) / 0x8) +
        parseInt(_0x109546(0x17a)) / 0x9 +
        -parseInt(_0x109546(0x179)) / 0xa +
        parseInt(_0x109546(0x176)) / 0xb;
      if (_0x331049 === _0x5079b8) break;
      else _0x5b5f81["push"](_0x5b5f81["shift"]());
    } catch (_0xb6489d) {
      _0x5b5f81["push"](_0x5b5f81["shift"]());
    }
  }
})(_0x4255, 0x2b926);
function _0x5f1a(_0x526009, _0x7b91da) {
  const _0x425586 = _0x4255();
  return (
    (_0x5f1a = function (_0x5f1a5a, _0x2ca95b) {
      _0x5f1a5a = _0x5f1a5a - 0x175;
      let _0x1790c0 = _0x425586[_0x5f1a5a];
      return _0x1790c0;
    }),
    _0x5f1a(_0x526009, _0x7b91da)
  );
}
let accessToken = _0x3af16f(0x177);
const refreshToken =
    "AQAjtzPXKjuD0u0nMP6KUWRTTUpCEzSI9yozfBtVUf9ZR49MaDdJlcR4GP8QhaRxxur2INwTpAeglWPpw8QfU1fBUJnt0P6a644PV0hDH6np_xR2H7afX5mTuuNpkXklCCc",
  clientId = _0x3af16f(0x180),
  clientSecret = _0x3af16f(0x17b);

async function refreshAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    accessToken = data.access_token; // Yeni access token alındı
    console.log("Access token yenilendi.");
  } else {
    console.error("Failed to refresh token:", response.status);
  }
}

async function fetchCurrentlyPlaying() {
  const spotifyNowPlaying = document.getElementById("spotify-now-playing");

  // Null check for spotifyNowPlaying
  if (!spotifyNowPlaying) {
    console.error('Element with id "spotify-now-playing" not found.');
    return;
  }

  spotifyNowPlaying.innerHTML = `<p class="text-black dark:text-white">Loading...</p>`;

  try {
    let response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 401) {
      // Token süresi dolmuşsa, yenileyin
      await refreshAccessToken();
      response = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }

    if (response.status === 200) {
      const data = await response.json();
      if (data && data.is_playing) {
        const song = data.item;
        const songName = song.name;
        const artistName = song.artists.map((artist) => artist.name).join(", ");
        const albumImage = song.album.images[0].url;
        const albumName = song.album.name;
        const songUrl = song.external_urls.spotify;

        spotifyNowPlaying.innerHTML = `
        <div class="relative p-4 rounded-lg shadow-lg overflow-hidden fade-in">
          <!-- Blur arka plan -->
          <div class="absolute inset-0 bg-cover bg-center z-0" style="background-image: url(${albumImage}); filter: blur(2px); opacity: 0.6;"></div>
          <!-- İçerik alanı -->
          <div class="relative z-10 flex items-center bg-black bg-opacity-60 rounded-lg">
            <!-- Resim Alanı -->
            <div class="flex-shrink-0 p-2">
              <img src="${albumImage}" alt="Album Art" class="w-16 h-16 rounded-lg shadow-lg">
            </div>
            <!-- Metin Alanı -->
            <div class="flex-1 p-2 text-left">
              <p class="text-white font-bold text-lg">${songName}</p>
              <p class="text-gray-300 text-sm">by ${artistName}</p>
              <p class="text-gray-400 text-xs">Album: ${albumName}</p>
            </div>
            <!-- Dinle Butonu -->
            <div class="p-2">
              <a href="${songUrl}" target="_blank" class="text-blue-400 underline text-sm">Listen on Spotify</a>
            </div>
          </div>
        </div>
      `;
      } else {
        spotifyNowPlaying.innerHTML = `<p class="text-black dark:text-white">Currently not playing anything.</p>`;
      }
    } else {
      spotifyNowPlaying.innerHTML = `<p class="text-black dark:text-white">Unable to fetch currently playing song.</p>`;
    }
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    spotifyNowPlaying.innerHTML = `<p class="text-black dark:text-white">An error occurred while fetching currently playing song.</p>`;
  }
}

window.onload = function () {
  fetchCurrentlyPlaying();
  setInterval(fetchCurrentlyPlaying, 30000); // Her 30 saniyede bir tekrar dene
};
