import auth from "./authentication.js";

/* Use SPOTIFY Web playback API */

window.onSpotifyWebPlaybackSDKReady = async () => {

  const token = await auth();

  xfetch.init({
    address: 'https://api.spotify.com/v1/',
    key: token
  });

  const player = new Spotify.Player({
    name: 'iPlayMusic',
    getOAuthToken: cb => {
      cb(token.split(' ')[1]);
    }
  });

  const audioPlayer = (() => {
    let isPlaying = false;
    let frequency = 100;
    let timestampCurr, timestampMaximum;

    function simulatePlaying() {
      if (isPlaying) {
        let currentValue = parseInt(audioPlayer.el.progressBar.value);
        let newValue = currentValue += frequency
        let time = new Date(newValue);
        let timestamp = `${(time.getUTCMinutes()).toString().padStart(2, '0')}:${
        (time.getUTCSeconds()).toString().padStart(2, '0')}`

        audioPlayer.el.progressBar.value = newValue;
        audioPlayer.el.timestampCurrent.textContent = timestamp;

        timestampCurr = newValue;
      }
    }

    setInterval(simulatePlaying, frequency);

    function updateSongDetails({
      paused,
      duration,
      position,
      track_window: {
        current_track: {
          name,
          artists,
          album: {
            images
          },
          id
        }
      }
    }) {
      window.history.replaceState({}, name, `?song=${id}`)

      audioPlayer.el.name.textContent = name;
      audioPlayer.el.artist.textContent = artists[0].name;
      audioPlayer.el.img[1].src = images[0].url;
      audioPlayer.el.img[0].src = images[0].url;

      audioPlayer.el.progressBar.value = position;

      timestampCurr = position;

      let timestampCurrent = new Date(parseInt(position));
      [timestampCurrent.min, timestampCurrent.sec] = [
        (timestampCurrent.getUTCMinutes()).toString().padStart(2, '0'),
        (timestampCurrent.getUTCSeconds()).toString().padStart(2, '0')
      ]

      audioPlayer.el.timestampCurrent.textContent = `${timestampCurrent.min}:${timestampCurrent.sec}`

      audioPlayer.el.wrapper.dataset.isPaused = paused;
      audioPlayer.el.progressBar.max = duration;

      timestampMaximum = duration;

      let timestampMax = new Date(parseInt(duration));
      [timestampMax.min, timestampMax.sec] = [
        (timestampMax.getUTCMinutes()).toString().padStart(2, '0'),
        (timestampMax.getUTCSeconds()).toString().padStart(2, '0')
      ]
      audioPlayer.el.timestampMax.textContent = `${timestampMax.min}:${timestampMax.sec}`
    }

    return {
      el: {
        wrapper: document.querySelector('.wrapper'),
        controls: document.querySelector('.controls'),
        progressBar: document.querySelector('.song-progress__bar'),
        timestampCurrent: document.querySelector('.song-progress__timestamp--curent'),
        timestampMax: document.querySelector('.song-progress__timestamp--max'),
        name: document.querySelector('.song__detail--name'),
        artist: document.querySelector('.song__detail--artist'),
        img: [document.querySelector('.album-img'), document.querySelector('.ratio__img')]
      },
      update: updateSongDetails,
      play: () => {
        isPlaying = true
      },
      pause: () => {
        isPlaying = false
      },
      time: () => {
        return timestampCurr
      },
      duration: () => {
        return timestampMaximum
      }
    }
  })();

  // Error handling
  player.addListener('initialization_error', ({
    message
  }) => {
    console.error(message);
  });
  player.addListener('authentication_error', ({
    message
  }) => {
    console.error(message);
  });
  player.addListener('account_error', ({
    message
  }) => {
    console.error(message);
  });
  player.addListener('playback_error', ({
    message
  }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener('player_state_changed', (state) => {
    console.log(state);

    audioPlayer.update(state)

    if (state.paused == false) {
      audioPlayer.play()
    } else {
      audioPlayer.pause()
    }
  });

  // Not Ready
  player.addListener('not_ready', ({
    device_id
  }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Ready
  player.addListener('ready', ({
    device_id
  }) => {
    console.log('Ready with Device ID', device_id);

    findAndPlay(device_id);
  });

  // Connect to the player!
  player.connect();

  function play(device_id, uri) {
    fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: uri
        }),
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json',
        }
      }
    )
  }


  audioPlayer.el.progressBar.addEventListener('change', function (e) {
    player.seek(this.value);
  });

  audioPlayer.el.controls.addEventListener('click', (e) => {

    let control = false;

    if (e.target.classList.contains('controls__icon')) {
      const actionRegex = /controls__icon--(\S+)/;
      [, control] = [e.target.classList].join(' ').match(actionRegex);
    }

    switch (control) {
      case 'play':
        player.togglePlay();
        break;

      case 'skip-forward':
        player.nextTrack();
        break;

      case 'skip-backward':
        player.previousTrack();
        break;

      case 'scrub-forward':
        let seekingForward = Math.min(audioPlayer.time() + 5000, audioPlayer.duration())
        player.seek(seekingForward);
        break;

      case 'scrub-backward':
        let seekingBackward = Math.max(audioPlayer.time() - 5000, 0)
        player.seek(seekingBackward);
        break;

      default:
        break;
    }


  })

  async function findAndPlay(device_id) {
    // If a playlistId exists, get the tracks and play.
    // Else if an albumId exists, get the tracks and play.
    // Else if a songId exists, play the given spotify URI on page.
    // Else see if there's a remembered queue. If none, go back home.

    let queue = localStorage.getItem('trackQueue');
    const playlistId = (new URLSearchParams(window.location.search)).get('playlist');
    const albumId = (new URLSearchParams(window.location.search)).get('album');
    const songId = (new URLSearchParams(window.location.search)).get('song');

    if (playlistId) {
      const data = await xfetch.get(`playlists/${playlistId}`);
      if ( data.hasOwnProperty('error') ) {
        window.location.href = window.location.origin;
      }
      queue = data.tracks.items.map(item => item.track.uri);
      play(device_id, queue);
    }

    else if (albumId) {
      const data = await xfetch.get(`albums/${albumId}/tracks`);
      if ( data.hasOwnProperty('error') ) {
        window.location.href = window.location.origin;
      }
      queue = data.items.map(item => item.uri);
      play(device_id, queue);
    }

    else if (songId) {
      queue = [`spotify:track:${songId}`];
      play(device_id, queue);
    }

    else if (queue) {
      queue = JSON.parse(queue);
      play(device_id, queue);
    }

    // create new 'queue' if not coming from a queue
    localStorage.setItem('trackQueue', JSON.stringify(queue));
  }
};