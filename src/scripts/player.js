/* SPOTIFY Web playback API */
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQAzuVhTWyHMslw9aR7L0R1QA60bFaBV0g0MD_aG9QQihhoLYIFOm8iSIgHs9Y3E4BpPj6DJRmvNEaPW4ATgStTb0CeGKqrPEOVaFsxeyhQsImjD1lErt7sr6JBouzBvKuCw5w-IWNQZLmRBbANe5FgeinChiiM';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};