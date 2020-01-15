import qs from './multi-qs.js';

/** @module cloneTemplate */

/**
 * Perform action on an unknown target
 *
 * @callback useTemplate
 * @param {HTMLElement[]} template - An array of template fields. See example. Takes from {@link module:multi-qs}
 * @example
 * (template) => {
      template[0].textContent = `${item.name}`;
      template[1].textContent = `${item.type}`;
      template[2].href = `#${item.link}`;
      template[3].dataset.image = `http://placekitten.com/200/300?image=${item.image}`
    }
 */

/**
 * Clones an HTML template and appends it to an existing HTML element
 * @param {HTMLElement} container - Where the template will be inserted
 * @param {HTMLElement} template - HTML template element to copy
 * @param {string[]} parts - see {@link module:multi-qs}
 * @param {Function} cb - a callback function which takes the fields returned from {@link module:multi-qs} and does something with them. See example.
 */
const cloneTemplate = (container, template, parts, cb) => {
  const clone = template.content.cloneNode(true);

  const field = qs(clone, parts);

  cb(field);

  container.appendChild(clone);
}

export default cloneTemplate;