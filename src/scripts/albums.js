// Imports
import cloneTemplate from "./cloneTemplate.js";
import observe from "./observe.js";


// Actually using the modules

const featuredAlbums = (() => {
  const albums = [
    {
      name: 'Album Uno',
      artist: 'El Spano',
      songs: ['Uno', 'Dos', 'Tres', 'Quatro'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album To',
      artist: 'El Dano',
      songs: ['En', 'To', 'Tre'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album San',
      artist: 'El Japajapa',
      songs: ['Ichi', 'Ni', 'San', 'Shi', 'Go'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album Uno',
      artist: 'El Spano',
      songs: ['Uno', 'Dos', 'Tres', 'Quatro'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album To',
      artist: 'El Dano',
      songs: ['En', 'To', 'Tre'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album San',
      artist: 'El Japajapa',
      songs: ['Ichi', 'Ni', 'San', 'Shi', 'Go'],
      img: 'http://placekitten.com/300/300'
    }
  ]

  // Creating thumbnail view
  cloneTemplate(
    document.querySelector('#featured-albums'),
    document.querySelector('#view__thumbnails'),
    ['.music-section', '#item'],
    (section) => {

      // Creating thumbnail view items
      for (const album of albums) {
        cloneTemplate(
          section[0],
          section[1],
          ['.thumbnails__item-img', '.thumbnails__item-link', '.thumbnails__item'],
          (item) => {
            item[0].dataset.lazysrc = album.img;
            item[0].alt = `${album.name} by ${album.artist}`;
            item[1].href = `/album-details?album=${album.name}`;

            observe(
              item[0],
              function (el) {
                console.log(el);
                el.src = el.dataset.lazysrc;
              },
              true,
              '0px 50% 0px 50%'
            );
          }
        )
      }
      // END: Creating thumbnail view items

    }
  )
  // END: Creating thumbnail view
})();

const newReleases = (() => {
  const albums = [
    {
      name: 'Album Uno',
      artist: 'El Spano',
      songs: ['Uno', 'Dos', 'Tres', 'Quatro'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album To',
      artist: 'El Dano',
      songs: ['En', 'To', 'Tre'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album Uno',
      artist: 'El Spano',
      songs: ['Uno', 'Dos', 'Tres', 'Quatro'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album To',
      artist: 'El Dano',
      songs: ['En', 'To', 'Tre'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album Uno',
      artist: 'El Spano',
      songs: ['Uno', 'Dos', 'Tres', 'Quatro'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album To',
      artist: 'El Dano',
      songs: ['En', 'To', 'Tre'],
      img: 'http://placekitten.com/300/300'
    },
    {
      name: 'Album San',
      artist: 'El Japajapa',
      songs: ['Ichi', 'Ni', 'San', 'Shi', 'Go'],
      img: 'http://placekitten.com/300/300'
    }
  ]
  // Creating list view
  cloneTemplate(
    document.querySelector('#new-releases'),
    document.querySelector('#view__album-list'),
    ['.music-section', '#item'],
    (section) => {

      // Creating list view items
      for (const album of albums) {
        cloneTemplate(
          section[0],
          section[1],
          ['.album-list__item-img', '.album-list__item-name', '.album-list__item-artist', '.album-list__item-song-count', '.album-list__item-link'],
          (item) => {
            item[0].dataset.lazysrc = album.img;
            item[1].textContent = album.name;
            item[2].textContent = album.artist;
            item[3].textContent = `${album.songs.length} Songs`;
            item[4].href = `/album-details?album=${album.name}`;

            observe(
              item[0],
              function (el) {
                console.log(el);
                el.src = el.dataset.lazysrc;
              },
              true,
              '50% 0px 50% 0px'
            );
          }
        )
      }
      // END: Creating list view items
    }
  )
  // END: Creating list view
})();