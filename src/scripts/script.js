/* Switching color mode between light and dark */
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
}

colorMode(false);

document.querySelector('.js-toggle-colormode').addEventListener('click', () => {
  colorMode(true);
})