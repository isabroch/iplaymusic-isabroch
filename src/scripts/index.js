// Imports
import toggleColorMode from "./toggleColorMode.js";
import observe from "./observe.js"


// Actually using the modules
toggleColorMode;

observe(
  '.lazyLoad-background',
  function(el) {
    el.style = `--card-bg: url(${el.dataset.image})`;
  }
);