/* Switching color mode between light and dark */

/**
 *
 * @param {string} selector - The CSS selector for the elements that are targeted, as a string.
 */
const colorMode = (selector) => {
  function colorMode(toggle = false) {
    let mode = localStorage.getItem('colorMode');

    if (!mode) {
      mode = 'dark'
    };

    if (toggle) {
      switch (mode) {
        case 'dark':
          mode = 'light';
          break;

        case 'light':
          mode = 'dark';
          break;
      }
    }

    localStorage.setItem('colorMode', mode)
    document.querySelector('body').classList = `_${mode}`;

    return mode;
  }

  document.querySelector(selector).addEventListener('click', () => {
    colorMode(true);
  })

  return colorMode(false);
}

export default colorMode;