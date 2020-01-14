const lazyLoad = (elQuery = '.lazyLoad', cb = function(el){ console.log(`${el} has been spotted, and is doing nothing!`) }, rootMargin = '0px 0px 50% 0px', threshold = 0, ) => {
  const options = {
    rootMargin: rootMargin,
    threshold: threshold
  }

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cb(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }

  let listOfElements = document.querySelectorAll(elQuery)

  for (const element of listOfElements) {
    new IntersectionObserver(callback, options).observe(element);
  }

  return listOfElements;
};


export default lazyLoad;