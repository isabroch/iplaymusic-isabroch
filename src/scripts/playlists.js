import auth from "./authentication.js";
import observe from "./observe.js";
import loading from "./loading.js";


async function getAllPlaylists() {
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

function createCarousel(playlists) {
  const lazyload = function () {
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
    cellElement.dataset.playlistName = playlists[id].name;
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
      ready: function () {
        lazyload();
      },
      change: function() {
        loading.start(document.querySelector('.playlist-info'));
      },
      settle: function() {
        loadNewPlaylist(this);
      }
    }
  });

  return carousel;
}

function playlistToUrl(id, name) {
  const query = new URLSearchParams(window.location.search);
  query.set('id', id);

  window.history.replaceState({}, name, `?${query.toString()}`);
}

async function loadNewPlaylist(el) {
  const [id, name] = [
    el.selectedElement.dataset.playlistId,
    el.selectedElement.playlistName
  ]

  playlistToUrl(id, name);

  const playlist = getPlaylistDetails(id);
  createPlaylistInfo(name, await playlist);
}

async function getPlaylistDetails(playlistId) {
  const token = await auth();

  xfetch.init({
    address: "https://api.spotify.com/v1/",
    key: token
  });

  const playlist = (await xfetch.get(`playlists/${playlistId}/tracks`)).items;

  const tracks = playlist.map(entry => {
    if (entry.track) {
      const duration = new Date(parseInt(entry.track.duration_ms));
      const [min, sec] = [
        (duration.getUTCMinutes()).toString().padStart(2, '0'),
        (duration.getUTCSeconds()).toString().padStart(2, '0')
      ]

      return {
        name: entry.track.name,
        artist: entry.track.artists[0].name,
        id: entry.track.id,
        duration: {min: min, sec: sec}
      }
    }
  });

  return tracks;
}

function createPlaylistInfo(playlistName, tracks){
  const playlistTemplate = document.querySelector('#playlist-info').content.cloneNode(true);
  const playlistContainer = document.querySelector('.playlist-info');

  const playlistNameEl = playlistTemplate.querySelector('.playlist-info__title');

  playlistNameEl.textContent = playlistName;

  for (const track of tracks) {
    const trackTemplate = playlistTemplate.querySelector('#track').content.cloneNode(true);
    const trackContainer = playlistTemplate.querySelector('.playlist-info__list');

    const [link, title, artist, mins, secs] = ['.track__link', '.track__title', '.track__artist', '.track__min', '.track__sec'].map(query => trackTemplate.querySelector(query));

    link.href = `/player?song=${track.id}`;

    title.textContent = track.name;
    artist.textContent = track.artist;
    mins.textContent = track.duration.min;
    secs.textContent = track.duration.sec;

    trackContainer.appendChild(trackTemplate);
  }

  // clear playlist container, prevents accidentally appending list more than once - and removes loader
  playlistContainer.innerHTML = '';

  playlistContainer.appendChild(playlistTemplate);
}

//  Executing codes
async function load() {
  const playlists = await getAllPlaylists();
  const carousel = createCarousel(playlists);
}

load();