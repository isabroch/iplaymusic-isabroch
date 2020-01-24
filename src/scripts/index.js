// Imports
import observe from "./observe.js";
import auth from "./authentication.js";
import loading from "./loading.js";

// FETCH
( async function getData() {
  const token = await auth();

  xfetch.init({
    address: "https://api.spotify.com/v1/",
    key: token
  });

  const playlists = (await xfetch.get(`search?q=%22music%22&type=playlist&limit=10`)).playlists.items;

  console.log(playlists);

  const featuredItems = []

  for (const item of playlists) {
    featuredItems.push(
      {
        name: item.name,
        type: item.type,
        id: item.id,
        img: item.images[0].url
      }
    )
  }

  createCards(featuredItems);
} )();

function createCards(items) {
  const cardContainer = document.querySelector('.featured-card-grid');
  const cardTemplate = document.querySelector('#feature-card');

  for (const item of items) {
    const cardClone = cardTemplate.content.cloneNode(true);

    const cardFields = ['.feature-card__title', '.feature-card__type', '.feature-card__link', '.feature-card__background'].map(query => cardClone.querySelector(query));

    cardFields[0].textContent = item.name;
    cardFields[1].textContent = item.type;
    cardFields[2].href = `/playlists?id=${item.id}`;
    cardFields[3].dataset.image = item.img;

    cardContainer.appendChild(cardClone);
  }

  loading.end(cardContainer);

  observe(
    ['.feature-card__background'],
    function (el) {
      el.style = `--card-bg: url(${el.dataset.image})`;
    },
    true,
    '0px 0px 50% 0px'
  );
}