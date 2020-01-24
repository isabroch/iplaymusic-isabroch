import auth from "./authentication.js";


const getAllPlaylists = (async function() {
  const token = await auth();

  xfetch.init({
    address: "https://api.spotify.com/v1/",
    key: token
  });

  const createPlaylistObject = function(data, current = false) {
    const playlists = {};

    const createPlaylistItem = (item) => {
      playlists[item.id] = {name: item.name, img: item.images[0].url, current: current}
    }

    for (const playlist of data) {
      createPlaylistItem(playlist);
    }

    return playlists;
  }

  const getUserPlaylists = async function() {
    const userPlaylists = (await xfetch.get(`me/playlists`)).items;

    return createPlaylistObject(userPlaylists);
  }

  const getPagePlaylist = async function() {
    const pagePlaylistId = new URLSearchParams(window.location.search).get('id');

    if(pagePlaylistId) {
      const pagePlaylist = (await xfetch.get(`playlists/${pagePlaylistId}`));

      return createPlaylistObject([pagePlaylist], true);
    }

    return '';
  }

  const userPlaylists = await getUserPlaylists();
  const pagePlaylist = await getPagePlaylist();

  const playlists = {...userPlaylists, ...pagePlaylist};

  return playlists;
})();


/* PSUEDO CODE:

//  GET DATA ON PAGE LOAD
//    create playlists{} that holds playlistDetails (thumbnail, name)
//
//    get a list of all user's playlists
//    ~ look at [me/playlists] @ https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
//
//    for each playlist, create playlists[id] with playlistDetails{}
//
//    if param ?id exists, get playlist
//    ~ look at [playlists/{id}] @ https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
//
//    create playlists[?id] with playlistDetails{... current: true}

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