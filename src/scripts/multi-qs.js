 /**
  * @module multi-qs
  */

 /**
  * Select multiple elements from one target
  * @param {HTMLElement} target - Element e.g. document, which is the parent of the CSS selectors.
  * @param {string} prefix - The first part of a CSS selector, can also be left with an empty string ''. Great for BEM styling.
  * @param {string[]} parts - Elements will be found by [prefix + part], and then stored in the returned object via the string they're given.
  * @returns {Object} A map of nodes, with the elements mapped to their relevant 'part'.
  */
 function qs(target, prefix, parts) {
   let nodes = {};

   for (const part of parts) {
     nodes[part] = target.querySelector(prefix + part)
   }

   return nodes;
 }

 export default qs;