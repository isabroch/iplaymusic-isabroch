// Imports
import observe from "./observe.js";

// FETCH
xfetch.init({
  address: "https://reqres.in/api/",
  key: ""
});

xfetch.get("users")
  .then(result => {
    const users = result.data;

    let albums = [];

    for (const user of users) {
      let album = {
        img: user.avatar,
        name: user.first_name,
        artist: user.last_name,
        songCount: user.id,
        songs: ['a', 'b', 'c']
      }

      albums.push(album)
    }

    featuredAlbums(albums);
    newReleases(albums);
  });

function featuredAlbums(albums) {
  const viewContainer = document.querySelector('#featured-albums');
  const viewTemplate = document.querySelector('#view__thumbnails');
  const viewClone = viewTemplate.content.cloneNode(true);

  const itemContainer = viewClone.querySelector('.music-section');
  const itemTemplate = document.querySelector('#item__thumbnails');

  for (const album of albums) {
    const itemClone = itemTemplate.content.cloneNode(true);

    const itemFields = ['.thumbnails__item-img', '.thumbnails__item-link'].map(query => itemClone.querySelector(query));

    itemFields[0].dataset.lazysrc = album.img;
    itemFields[0].alt = `${album.name} by ${album.artist}`;
    itemFields[1].href = `/album-details?album=${album.name}`;

    itemContainer.appendChild(itemClone);
  }

  viewContainer.appendChild(viewClone);

  observe(
    ['.thumbnails__item-img'],
    function (el) {
      el.src = el.dataset.lazysrc;
    },
    true,
    '50% 0px 50% 0px'
  );
}

function newReleases(albums) {
  const viewContainer = document.querySelector('#new-releases');
  const viewTemplate = document.querySelector('#view__album-list');
  const viewClone = viewTemplate.content.cloneNode(true);

  const itemContainer = viewClone.querySelector('.music-section');
  const itemTemplate = document.querySelector('#item__album-list');

  for (const album of albums) {
    const itemClone = itemTemplate.content.cloneNode(true);

    const itemFields = ['.album-list__item-img', '.album-list__item-name', '.album-list__item-artist', '.album-list__item-song-count', '.album-list__item-link'].map(query => itemClone.querySelector(query));

    itemFields[0].dataset.lazysrc = album.img;
    itemFields[1].textContent = album.name;
    itemFields[2].textContent = album.artist;
    itemFields[3].textContent = `${album.songs.length} Songs`;
    itemFields[4].href = `/album-details?album=${album.name}`;

    itemContainer.appendChild(itemClone);
  }

  viewContainer.appendChild(viewClone);

  observe(
    ['.album-list__item-img'],
    function (el) {
      console.log(el);
      el.src = el.dataset.lazysrc;
    },
    true,
    '50% 0px 50% 0px'
  );
}