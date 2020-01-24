( function colorMode(selector) {
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

    document.querySelector('body').dataset.colormode = `${mode}`;

    return mode;
  }

  document.querySelector(selector).addEventListener('click', () => {
    colorMode(true);
  })

  return colorMode(false);
})('.js-toggle-colormode');

