import encodeParams from "./encodeParams.js";
import randSample from "./randomFromArray.js";

const carousel = new Flickity('.carousel__track', {
  // options
  cellAlign: 'center',
  contain: true,
  // percentPosition: false,
  wrapAround: true,
  imagesLoaded: true,
  prevNextButtons: false,
  pageDots: false,
});

async function auth() {
  const paramString = encodeParams({
    'grant_type': 'client_credentials'
  });

  const data = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: paramString,
    headers: {
      'Authorization': 'Basic MjYyNTNlOWY5NWQ5NDgzNzhlMWU3MGQ5NTUyYTZlZmE6NjQ4OGE5MzU3MWViNGRkODhjOTkzNDQ0YTdmNGM3NWM=',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const response = await data.json();

  return `${response.token_type} ${response.access_token}`;
}

(async function doThings() {
  const token = await auth();

  xfetch.init({
    address: "https://api.spotify.com/v1/",
    key: token
  });

  const playlistId = new URLSearchParams(window.location.search).get('id');

  async function getPlaylistTracksById(id) {
    const data = (await xfetch.get(`playlists/${id}/tracks`)).items;

    console.log(data);

    const tracks = data.map(entry => {
      if (entry.track) {
        return {
          name: entry.track.name,
          artist: entry.track.artists[0].name,
          id: entry.track.id
        }
      }
    });


    for (const track of tracks) {
      if (track) {
        document.querySelector('.songs').innerHTML += `<li class="song"><a href="spotify:track:${track.id}">${track.name} by ${track.artist}</a></li>`;
      }
    }
  }

  getPlaylistTracksById(playlistId);
})();