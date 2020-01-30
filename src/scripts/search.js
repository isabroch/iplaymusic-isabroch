import auth from "./authentication.js";
import observe from "./observe.js";
import loading from "./loading.js";

const search = ( async () => {

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
    console.log(this.value);

    loading.start(search.results);

    if (this.value.length == '') {
      search.dataset.searchResultsShowing = 'false'
    } else {
      search.dataset.searchResultsShowing = 'true'
    }

    const searchResults = await getResults(this.value);

    console.log(searchResults);
  })

  async function getResults(input) {
    let data = await xfetch.get(`search?q=%22${input}%22&type=playlist,album,track,artist&limit=5`);

    let resultsArray = [];

    for (const type in data) {
      for (const item of data[type].items) {
        let resultImage = item.images;

        if (resultImage == undefined) {
          resultImage = item.album.images[0]
        } else {
          resultImage = item.images[0]
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

    return resultsArray;
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