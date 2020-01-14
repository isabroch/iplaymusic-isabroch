// Imports
import toggleColorMode from "./toggleColorMode.js";
import observe from "./observe.js"


// Actually using the modules
toggleColorMode('.js-toggle-colormode');

observe(
  '.lazyLoad-background',
  function(el) {
    el.style = `--card-bg: url(${el.dataset.image})`;
  },
  true
);