import auth from "./authentication.js";
import observe from "./observe.js";
import loading from "./loading.js";

const search = (async () => {

  let throttleTimer;

  const throttle = function (func, delay) {
    // If setTimeout is already scheduled, no need to do anything
    if (throttleTimer) {
      return
    }

    // Schedule a setTimeout after delay seconds
    throttleTimer = setTimeout(function () {
      func()

      // Once setTimeout function execution is finished, throttleTimer = undefined so that in <br>
      // the next scroll event function execution can be scheduled by the setTimeout
      throttleTimer = undefined;
    }, delay)
  };

  const search = document.querySelector('.search');
  search.results = document.querySelector('.search__result-list');
  search.resultsContainer = document.querySelector('.search__result-list-container');
  search.button = document.querySelector('.search__button');
  search.bar = document.querySelector('.search__bar');

  const isTrue = (input) => {
    return input == 'true';
  };

  const token = await auth();

  xfetch.init({
    address: "https://api.spotify.com/v1/",
    key: token
  });

  search.button.addEventListener('click', function (e) {
    search.dataset.searchIsOpen = !isTrue(search.dataset.searchIsOpen)

    if (!isTrue(search.dataset.searchIsOpen)) {
      search.dataset.searchResultsShowing = 'false'
    } else {
      search.bar.value = '';
      search.bar.focus();
    }
  });

  search.bar.addEventListener('input', async function (e) {
    if (this.value.length == '') {
      search.dataset.searchResultsShowing = 'false'
    } else {
      search.dataset.searchResultsShowing = 'true'
    }

    /* STEPS:
    // 1. Get results
      2. Create result item from template for each result, append
        2A. Images are applied to data-lazysrc
      3. Observe images for lazy loading
    */

    const findNewResults = async () => {
      loading.start(search.results);

      const searchResults = await getResults(this.value);

      loading.end(search.results);

      for (const result of searchResults) {
        pushResultToHtml(result);
      }

      lazyload();
    }

    throttle(findNewResults, 600);
  })

  async function getResults(input) {
    let data = await xfetch.get(`search?q=%22${input}%22&type=playlist,album,track&limit=5`);

    let resultsArray = [];


    for (const type in data) {
      if (data[type].items.length > 0) {
        for (const item of data[type].items) {
          let resultImage = item.images;

          if (resultImage == undefined) {
            resultImage = item.album.images[0]
          } else {
            resultImage = item.images[0]
          }

          //  IF ITS SOMEHOW still undefined?!
          if (resultImage == undefined) {
            resultImage = ''
          } else {
            resultImage = resultImage.url
          }

          let searchResult = {
            name: item.name,
            id: item.id,
            type: item.type,
            image: resultImage
          }

          resultsArray.push(searchResult)
        }
      }
    }

    return resultsArray;
  }

  function pushResultToHtml(item) {
    /* item = {name: 'string', id: 'string', type: 'string', image: 'string'} */

    const resultContainer = document.querySelector('.search__result-list');
    const resultTemplate = document.querySelector('#search-result');
    const resultClone = resultTemplate.content.cloneNode(true);

    const resultFields = ['.search__result-media', '.search__result-title', '.search__result-detail', '.search__result-link'].map(query => resultClone.querySelector(query));

    let linkTo = `/player/?${item.type}=${item.id}`;

    if (item.type == 'playlist') {
      linkTo = `/playlists/?id=${item.id}`
    }

    resultFields[0].dataset.lazysrc = item.image;
    resultFields[1].textContent = item.name;
    resultFields[2].textContent = item.type;
    resultFields[3].href = linkTo;

    resultContainer.append(resultClone);
  }


  const lazyload = function () {
    observe(
      ['.search__result-media'],
      function (el) {
        el.src = el.dataset.lazysrc;
      },
      true,
      '0px 0px 50% 0px'
    )
  };

})();

export default search;