/**
* @module multi-qs
*/

/**
* Select multiple elements from one target
* @param {HTMLElement} target - Element e.g. document, which is the parent of the CSS selectors.
* @param {string[]} parts - Elements will be found by [prefix + part], and then stored in the returned object via the string they're given.
* @returns {HTMLElement[]} An array of nodes.
*/
function qs(target, parts) {
  let nodes = [];

  for (const part of parts) {
    nodes.push(target.querySelector(part))
  }

  return nodes;
}

export default qs;