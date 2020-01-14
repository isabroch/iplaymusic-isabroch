/* Switching color mode between light and dark */

const colorMode = ( () => {
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

  document.querySelector('.js-toggle-colormode').addEventListener('click', () => {
    colorMode(true);
  })

  return colorMode(false);
} )();

export default colorMode;