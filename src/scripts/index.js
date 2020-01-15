// Imports
import observe from "./observe.js";
import cloneTemplate from "./cloneTemplate.js";

// Actually using the modules
[1, 2, 3, 4, 5, 6].forEach((item) => {
  cloneTemplate(
    document.querySelector('.featured-card-grid'),
    document.getElementById('feature-card'),
    ['.feature-card__title', '.feature-card__type', '.feature-card__link', '.feature-card__background'],
    (template) => {
      template[0].textContent = `${item.name}`;
      template[1].textContent = `${item.type}`;
      template[2].href = `#${item.link}`;
      template[3].dataset.image = `http://placekitten.com/200/300?image=${item.image}`

      observe(
        template[3],
        function (el) {
          console.log(el);
          el.style = `--card-bg: url(${el.dataset.image})`;
        },
        true,
        '0px 0px -50% 0px'
      );
    }
  );
})