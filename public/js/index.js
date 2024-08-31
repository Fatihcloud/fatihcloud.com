const styles = `
  /* Anlık çalan şarkı için stiller */
  #spotify-now-playing .spotify-container {
    position: relative;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: fadeIn 0.5s ease-in-out;
  }

  #spotify-now-playing .spotify-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    filter: blur(2px);
    opacity: 0.3;
    transition: transform 0.3s ease-in-out;
    transform: scale(1);
  }

  #spotify-now-playing .spotify-content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    backdrop-filter: blur(2px);
    padding: 12px;
    transition: all 0.3s ease-in-out;
  }

  #spotify-now-playing .spotify-image img {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-in-out;
  }

  #spotify-now-playing .spotify-text {
    flex: 1;
    padding: 8px;
    text-align: left;
  }

  #spotify-now-playing .spotify-text .song-name {
    color: white;
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
  }

  #spotify-now-playing .spotify-text .artist-name {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    margin: 0;
    cursor: pointer;
    text-decoration: underline;
  }

  #spotify-now-playing .spotify-text .album-name {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
  }

  #spotify-now-playing .spotify-progress {
    width: 100%;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    margin-top: 8px;
  }

  #spotify-now-playing .spotify-progress-bar {
    height: 100%;
    background-color: #1DB954;
    border-radius: 2px;
  }

  #spotify-now-playing .spotify-link a {
    color: #1DB954;
    text-decoration: underline;
    font-size: 0.875rem;
    transition: color 0.3s ease-in-out;
  }

  /* Recently Played için stiller */
  #spotify-recently-played {
    display: flex;
    flex-wrap: wrap; /* Sıraları sar */
    justify-content: space-between; /* Alanı eşit dağıt */
  }

  #spotify-recently-played .spotify-container {
    width: calc(50% - 8px); /* 2 sütun için genişlik ayarı */
    margin: 4px; /* Kenar boşluğu ekleyin */
    position: relative;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: fadeIn 0.5s ease-in-out;
  }

  #spotify-recently-played .spotify-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    filter: blur(2px); /* Daha fazla bulanıklık ekleyebilirsiniz */
    opacity: 0.3; /* Arka planın daha soluk görünmesi için */
    z-index: 1; /* İçerik arkasında kalması için */
  }

  #spotify-recently-played .spotify-content {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* İçerik arka plan rengi */
    border-radius: 16px;
    backdrop-filter: blur(2px);
    padding: 12px;
    position: relative;
    z-index: 2; /* İçeriği ön plana almak için */
    transition: all 0.3s ease-in-out;
  }

  #spotify-recently-played .spotify-image img {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    margin-right: 8px;
  }

  #spotify-recently-played .spotify-text {
    flex: 1;
    padding: 8px;
    text-align: left;
  }

  #spotify-recently-played .spotify-text .song-name {
    color: white;
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
  }

  #spotify-recently-played .spotify-text .artist-name {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    margin: 0;
  }

  #spotify-recently-played .spotify-link a {
    color: #1DB954;
    text-decoration: underline;
    font-size: 0.875rem;
    transition: color 0.3s ease-in-out;
  }

  /* Mobil uyumluluk */
  @media (max-width: 768px) {
    #spotify-now-playing .spotify-container {
      padding: 12px;
    }

    #spotify-now-playing .spotify-text {
      padding: 4px;
    }

    #spotify-now-playing .spotify-image img {
      width: 48px;
      height: 48px;
    }

    #spotify-recently-played .spotify-container {
      width: calc(100% - 16px); /* 1 sütun için genişlik ayarı */
      margin: 8px 0; /* Üst ve alt kenar boşlukları */
    }

    #spotify-recently-played .spotify-image img {
      width: 40px;
      height: 40px;
    }

    #spotify-recently-played .spotify-text {
      padding: 4px;
    }
  }
`;

async function fetchSpotifyData(action) {
  const response = await fetch('https://gucdydqpcumzkdpesnrx.supabase.co/functions/v1/spot-cloud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Y2R5ZHFwY3VtemtkcGVzbnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwOTQ3NjksImV4cCI6MjA0MDY3MDc2OX0.4supRC-Gc1DVmSNbilY_DV4g4mCMPxq-QuD8unmIPww', // Anonim anahtarınızı buraya ekleyin
    },
    body: JSON.stringify({ action }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error('Failed to fetch data from Supabase function:', response.status);
    return null;
  }
}

async function fetchCurrentlyPlaying() {
  const spotifyNowPlaying = document.getElementById("spotify-now-playing");

  if (!spotifyNowPlaying) {
    console.error('Element with id "spotify-now-playing" not found.');
    return;
  }

  spotifyNowPlaying.innerHTML = `<p class="text-black dark:text-white">Loading...</p>`;

  const data = await fetchSpotifyData('currently-playing');

  if (data) {
    if (data.message === "No Song Playing" || !data.songName) {
      spotifyNowPlaying.innerHTML = `
        <div class="spotify-container">
          <div class="spotify-content">
            <div class="spotify-image">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" alt="No Song Playing" />
            </div>
            <div class="spotify-text">
              <p class="song-name">No Song Playing</p>
              <p class="artist-name">Feel free to play something on Spotify!</p>
              <div class="spotify-link">
                <a href="https://open.spotify.com" target="_blank" class="listen-button">Open Spotify</a>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      const { songName, artistName, albumImage, albumName, songUrl, progressPercentage } = data;

      spotifyNowPlaying.innerHTML = `
        <div class="spotify-container">
          <div class="spotify-background" style="background-image: url(${albumImage});"></div>
          <div class="spotify-content">
            <div class="spotify-image">
              <img src="${albumImage}" alt="Album Art">
            </div>
            <div class="spotify-text">
              <p class="song-name">${songName}</p>
              <p class="artist-name" onclick="alert('Sanatçı: ${artistName}')">by ${artistName}</p>
              <p class="album-name">Album: ${albumName}</p>
              <div class="spotify-progress">
                <div class="spotify-progress-bar" style="width: ${progressPercentage}%;"></div>
              </div>
            </div>
            <div class="spotify-link">
              <a href="${songUrl}" target="_blank">Listen on Spotify</a>
            </div>
          </div>
        </div>
      `;

      document.querySelector('.spotify-background').addEventListener("mouseover", function () {
        this.style.transform = "scale(1.05)";
      });

      document.querySelector('.spotify-background').addEventListener("mouseout", function () {
        this.style.transform = "scale(1)";
      });

      document.querySelector(".spotify-image img").addEventListener("mouseover", function () {
        this.style.transform = "scale(1.1)";
      });

      document.querySelector(".spotify-image img").addEventListener("mouseout", function () {
        this.style.transform = "scale(1)";
      });
    }
  } else {
    spotifyNowPlaying.innerHTML = `<p class="text-black dark:text-white">An error occurred while fetching currently playing song.</p>`;
  }
}

async function fetchRecentlyPlayed() {
  const spotifyRecentlyPlayed = document.getElementById("spotify-recently-played");

  if (!spotifyRecentlyPlayed) {
    console.error('Element with id "spotify-recently-played" not found.');
    return;
  }

  spotifyRecentlyPlayed.innerHTML = `<p class="text-black dark:text-white">Loading...</p>`;

  const data = await fetchSpotifyData('recently-played');

  if (data && data.length > 0) {
    const songsHtml = data
      .map(({ songName, artistName, albumImage, songUrl }) => {
        return `
          <div class="spotify-container">
            <div class="spotify-background" style="background-image: url(${albumImage});"></div>
            <div class="spotify-content">
              <div class="spotify-image">
                <img src="${albumImage}" alt="Album Art">
              </div>
              <div class="spotify-text">
                <p class="song-name">${songName}</p>
                <p class="artist-name">by ${artistName}</p>
                <div class="spotify-link">
                  <a href="${songUrl}" target="_blank" class="listen-button">Listen on Spotify</a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    spotifyRecentlyPlayed.innerHTML = songsHtml;
  } else {
    spotifyRecentlyPlayed.innerHTML = `<p class="text-black dark:text-white">No recently played songs found.</p>`;
  }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  fetchCurrentlyPlaying();
  fetchRecentlyPlayed();
  setInterval(fetchCurrentlyPlaying, 30000); // Her 30 saniyede bir
  setInterval(fetchRecentlyPlayed, 60000); // Her 60 saniyede bir
});