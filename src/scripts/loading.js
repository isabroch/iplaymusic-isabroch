export default (function loading() {

  function startLoading(loadingElement) {
    const loader = document.querySelector('#loading').content.cloneNode(true);

    loadingElement.innerHTML = '';
    loadingElement.appendChild(loader);
  }

  function endLoading(loadingElement) {
    const loader = loadingElement.querySelector('.loading');

    if (loader != null) {
      loadingElement.removeChild(loader);
    }
  }

  return {
    start: startLoading,
    end: endLoading
  }

})();