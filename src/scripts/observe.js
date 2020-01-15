/** @module observe */

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
 * @param {string | string[] | HTMLElement} [selector] - The target. If passed a string, use querySelector. If passed an array-wrapped string, use querySelectorAll. If passed a DOM Object, use that object.
 * @param {callback} [cb] - Action to perform on each element targeted by the selector.
 * @param {boolean} [firesOnce] - If true, will unobserve element after running the callback. False will not unobserve element.
 * @param {string} [rootMargin] - Root margin to be used with intersection observer API. Positive values are outset, negative values are inset. Read IO documentation for more information. All values must be px or %, even 0.
 * @param {number} [threshold] - How much of the element must be 'observed', from [0 (just a pixel), 1 (the entire element)]. Read IO documentation for more information.
 *
 * @return {HTMLCollection} List of all the elements being targeted by selector parameter.
 */
const observe = (
  selector = '.lazyLoad',
  cb = function (el) {
    console.log(`${el} has been spotted, and is doing nothing!`)
  },
  firesOnce = true,
  rootMargin = '0px 0px 50% 0px',
  threshold = 0,
  rootOpt = null
) => {
  const options = {
    root: rootOpt,
    rootMargin: rootMargin,
    threshold: threshold
  }

  const callback = (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        cb(entry.target);
        firesOnce && observer.unobserve(entry.target); // Read how this works at [https://blog.usejournal.com/mastering-javascripts-and-logical-operators-fd619b905c8f]
      }
    });
  }

  let elements;
  const io = new IntersectionObserver(callback, options);

  if (Array.isArray(selector)) {
    elements = document.querySelectorAll(selector);
    for (const element of elements) {
      io.observe(element);
    }
  } else if (typeof selector == "string") {
    elements = document.querySelector(selector);
    io.observe(elements);
  } else if (selector instanceof Element || selector instanceof HTMLDocument) {
    elements = selector;
    io.observe(elements);
  }

  return elements;
};

export default observe;