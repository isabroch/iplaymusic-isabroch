export default (function loading() {

  function startLoading(loadingElement) {
    const loader = document.querySelector('#loading').content.cloneNode(true);

    loadingElement.innerHTML = loader;
  }

  function endLoading(loadingElement) {
    const loader = loadingElement.querySelector('.loading');

    loadingElement.removeChild(loader);
  }

  return {
    start: startLoading,
    end: endLoading
  }

})();