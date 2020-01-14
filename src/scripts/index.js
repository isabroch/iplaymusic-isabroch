// Imports
import toggleColorMode from "./toggleColorMode.js";
import observe from "./observe.js";
import cloneTemplate from "./cloneTemplate.js";

// Actually using the modules
toggleColorMode('.js-toggle-colormode');

[1, 2, 3, 4, 5, 6].forEach((item) => {
  cloneTemplate(
    document.querySelector('.featured-card-grid'),
    document.getElementById('feature-card'),
    '.feature-card__',
    ['title', 'type', 'link', 'background'],
    (template) => {
      template.title.textContent = `${item.name}`;
      template.type.textContent = `${item.type}`;
      template.link.href = `#${item.link}`;
      template.background.dataset.image = `http://placekitten.com/200/300?image=${item.image}`
    }
  );
})

observe(
  '.lazyLoad-background',
  function (el) {
    el.style = `--card-bg: url(${el.dataset.image})`;
  },
  true
);