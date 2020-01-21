// Imports
import observe from "./observe.js";
import encodeParams from "./encodeParams.js";

// FETCH
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

  console.log(response);
}

auth();

xfetch.init({
  address: "https://reqres.in/api/",
  key: ""
});

xfetch.get("users")
  .then(result => {
    const users = result.data;


    for (const user of users) {
      const cardContainer = document.querySelector('.featured-card-grid');
      const cardTemplate = document.querySelector('#feature-card');
      const cardClone = cardTemplate.content.cloneNode(true);

      const cardFields = ['.feature-card__title', '.feature-card__type', '.feature-card__link', '.feature-card__background'].map(query => cardClone.querySelector(query));

      cardFields[0].textContent = `${user.first_name} ${user.last_name}`;
      cardFields[1].textContent = `${user.email}`;
      cardFields[2].href = `#${user.id}`;
      cardFields[3].dataset.image = `${user.avatar}`;

      cardContainer.appendChild(cardClone);
    }

    observe(
      ['.feature-card__background'],
      function (el) {
        el.style = `--card-bg: url(${el.dataset.image})`;
      },
      true,
      '0px 0px 50% 0px'
    );
  });