/**
 * @file Module to use intersection observer, e.g. with lazy loading. Testing change.
 */

/**
 * Perform action on an unknown target
 *
 * @callback callback
 * @param {Element} el - The target of the callback
 */

/**
 * Use the {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API Intersection Observer (IO) API}.<br>
 * Perform an action on a list of elements that match the selector, when they are within the threshold.
 *
 * @param {string} [selector] - The CSS selector for the elements that are targeted, as a string.
 * @param {callback} [cb] - Action to perform on each element targeted by the selector.
 * @param {boolean} [firesOnce] - If true, will unobserve element after running the callback. False will not unobserve element.
 * @param {string} [rootMargin] - Root margin to be used with intersection observer API. Positive values are outset, negative values are inset. Read IO documentation for more information. All values must be px or %, even 0.
 * @param {number} [threshold] - How much of the element must be 'observed', from [0 (just a pixel), 1 (the entire element)]. Read IO documentation for more information.
 *
 * @return {HTMLCollection} List of all the elements being targeted by selector parameter.
 */
const observe = (
  selector = '.lazyLoad',
  cb = function(el) {
    console.log(`${el} has been spotted, and is doing nothing!`)
  },
  firesOnce,
  rootMargin = '0px 0px 50% 0px',
  threshold = 0
) => {
  const options = {
    rootMargin: rootMargin,
    threshold: threshold
  }

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cb(entry.target);
        firesOnce && observer.unobserve(entry.target);
      }
    });
  }

  let listOfElements = document.querySelectorAll(selector)

  for (const element of listOfElements) {
    new IntersectionObserver(callback, options).observe(element);
  }

  return listOfElements;
};

export default observe;