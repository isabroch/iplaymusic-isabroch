import auth from "./authentication.js";

/* Use SPOTIFY Web playback API */

window.onSpotifyWebPlaybackSDKReady = async () => {
  const token = await auth();

  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => {
      cb(token);
    }
  });

  /* TODO: // start player with a song
  const play = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
        id
      }
    }
  }) => {
    getOAuthToken(() => {
      xfetch.init({
        address: "https://api.spotify.com/v1/",
        key: token
      });

      xfetch.put(`me/player/play?device_id=${id}`, {
        uris: [spotify_uri]
      })
    });

    return playerInstance;
  }

  const player = play({
    playerInstance: new Spotify.Player({
      name: "iPlayMusic"
    }),
    spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
  }) */

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
  player.addListener('player_state_changed', state => {
    console.log(state);
  });

  // Ready
  player.addListener('ready', ({
    device_id
  }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({
    device_id
  }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

  document.querySelector('.controls').addEventListener('click', (e) => {

    let control = false;

    if (e.target.classList.contains('controls__icon')) {
      const actionRegex = /controls__icon--(\S+)/;
      [, control] = [e.target.classList].join(' ').match(actionRegex);
    }

    const playerWrapper = document.querySelector('.wrapper');
    let isPlaying = playerWrapper.dataset.isPlaying;

    switch (control) {
      case 'play':
        player.togglePlay();

        if (isPlaying == 'false') {
          playerWrapper.dataset.isPlaying = 'true';
        } else {
          playerWrapper.dataset.isPlaying = 'false';
        }
        break;

      default:
        break;
    }


  })
};