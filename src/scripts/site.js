(function colorMode(selector) {
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


(function backButton() {
  const button = document.querySelector('#goBack');

  if (button) {
    document.querySelector('#goBack').addEventListener('click', function (e) {
      console.log(window.location.origin);

      const history = window.history.back();

      console.log(history);
    })
  }
})()