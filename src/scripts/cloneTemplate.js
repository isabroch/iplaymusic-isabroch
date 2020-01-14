import qs from './multi-qs.js';

/** @module cloneTemplate */

/**
 * Perform action on an unknown target
 *
 * @callback useTemplate
 * @param {Object} template - A map of template fields. See example. Takes the object from {@link module:multi-qs}
 * @example
 * (template) => {
      template.title.textContent = `${item.name}`;
      template.type.textContent = `${item.type}`;
      template.link.href = `#${item.link}`;
      template.background.dataset.image = `http://placekitten.com/200/300?image=${item.image}`
    }
 */

/**
 * Clones an HTML template and appends it to an existing HTML element
 * @param {HTMLElement} container - Where the template will be inserted
 * @param {HTMLElement} template - HTML template element to copy
 * @param {string} prefix - see {@link module:multi-qs}
 * @param {string[]} parts - see {@link module:multi-qs}
 * @param {Function} cb - a callback function which takes the fields returned from {@link module:multi-qs} and does something with them. See example.
 */
const cloneTemplate = (container, template, prefix, parts, cb) => {
  const clone = template.content.cloneNode(true);

  const field = qs(clone, prefix, parts);

  cb(field);

  container.appendChild(clone);
}

export default cloneTemplate;