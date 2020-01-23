import auth from "./authentication.js";

const carousel = new Flickity('.carousel__track', {
  // options
  cellAlign: 'center',
  contain: true,
  wrapAround: true,
  imagesLoaded: true,
  prevNextButtons: false,
  pageDots: false,
  initialIndex: '.is-initial-select'
});


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

/* PSUEDO CODE:

  GET DATA ON PAGE LOAD
    create playlists{} that holds playlistDetails (thumbnail, name)

    get a list of all user's playlists
    ~ look at [me/playlists] @ https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/

    for each playlist, create playlists[id] with playlistDetails{}

    if param ?id exists, get playlist
    ~ look at [playlists/{id}] @ https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/

    create playlists[?id] with playlistDetails{... current: true}

  CREATE PLAYLIST CAROUSEL
    for ${id} in playlists{}...
      clone template #carousel-cell

      set     .carousel__cell data-id     to    ${id}
      set     .ratio__img data-lazysrc    to    ${playlists[id].thumbnail}
      set     .ratio__img alt             to    ${playlists[id].name}

      if ${playlists[id].current} is true,

      set     .carousel__cell class       to    '.is-initial-select'

      append to .carousel__track [https://flickity.metafizzy.co/api.html#append]

    initialize carousel on .carousel__track
    ~ see const carousel on line 4

  ON CAROUSEL EVENTS
    as per https://flickity.metafizzy.co/events.html

    on change
      clear

    on settle






*/