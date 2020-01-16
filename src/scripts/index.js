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
        console.log(el);
        el.style = `--card-bg: url(${el.dataset.image})`;
      },
      true,
      '0px 0px 50% 0px'
    );
  });