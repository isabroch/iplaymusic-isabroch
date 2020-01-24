import auth from "./authentication.js";
import observe from "./observe.js";


const getAllPlaylists = async function () {
  const token = await auth();

  xfetch.init({
    address: "https://api.spotify.com/v1/",
    key: token
  });

  const createPlaylistObject = function (data, current = false) {
    const playlists = {};

    const createPlaylistItem = (item) => {
      playlists[item.id] = {
        name: item.name,
        img: item.images[0].url,
        current: current
      }
    }

    for (const playlist of data) {
      createPlaylistItem(playlist);
    }

    return playlists;
  }

  const getUserPlaylists = async function () {
    const userPlaylists = (await xfetch.get(`me/playlists`)).items;

    return createPlaylistObject(userPlaylists);
  }

  const getPagePlaylist = async function () {
    const pagePlaylistId = new URLSearchParams(window.location.search).get('id');

    if (pagePlaylistId) {
      const pagePlaylist = (await xfetch.get(`playlists/${pagePlaylistId}`));

      return createPlaylistObject([pagePlaylist], true);
    }

    return '';
  }

  const userPlaylists = await getUserPlaylists();
  const pagePlaylist = await getPagePlaylist();

  const playlists = {
    ...userPlaylists,
    ...pagePlaylist
  };

  return playlists;
}


// TODO: create playlist carousel

const createCarousel = function (playlists) {
  const lazyload = function() {
    observe(
      ['.carousel__cell-image'],
      function (el) {
        el.src = el.dataset.lazysrc;
      },
      true,
      '0px 0px 50% 0px'
    )
  };

  for (const id in playlists) {
    const cell = document.querySelector('#carousel-cell').content.cloneNode(true);
    const carousel = document.querySelector('.carousel__track');

    const [cellElement, cellImage] = ['.carousel__cell', '.carousel__cell-image'].map(query => cell.querySelector(query));

    if (playlists[id].current) {
      cellElement.classList.add('is-initial-select');
    }
    cellElement.dataset.playlistId = id;
    cellImage.dataset.lazysrc = playlists[id].img;
    cellImage.alt = playlists[id].name;

    carousel.appendChild(cell);
  }

  const carousel = new Flickity('.carousel__track', {
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
    imagesLoaded: true,
    prevNextButtons: false,
    pageDots: false,
    initialIndex: '.is-initial-select',
    on: {
      ready: lazyload()
    }
  });

  return carousel;
}


//  Executing codes
async function load() {

  const playlists = await getAllPlaylists();
  const carousel = createCarousel(playlists);

  console.log(carousel);

}

load();


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
      set     .ratio__img data-lazysrc    to    ${playlists[id].img}
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