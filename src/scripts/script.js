import toggleColorMode from "./toggleColorMode.js";
import lazyLoad from "./lazyLoad.js"

toggleColorMode;

lazyLoad(
  '.lazyLoad-background',
  function(el) {
    el.style = `--card-bg: url(${el.dataset.image})`;
  }
);