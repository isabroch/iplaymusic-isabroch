const genres = [
  {name: 'Alternative', subgenres: ['Dark', 'Light']},
  {name: 'Blues', subgenres: ['Dark', 'Light']},
  {name: 'Classical', subgenres: ['Dark', 'Light']},
  {name: 'Country', subgenres: ['Dark', 'Light']},
  {name: 'Dance', subgenres: ['Dark', 'Light']},
  {name: 'Electronic', subgenres: ['Dark', 'Light']},
  {name: 'Fitness', subgenres: ['Dark', 'Light']},
  {name: 'Hip-Hop', subgenres: ['Dark', 'Light']},
  {name: 'Metal', subgenres: ['Heavy', 'Iron', 'Gold']},
  {name: 'Pop', subgenres: ['Dark', 'Light']},
  {name: 'Rock', subgenres: ['Dark', 'Light']}
]

genres.forEach((genre) => {
  createCategory(genre.name, genre.subgenres);
})

function createCategory(genre, subgenres) {
  const genreContainer = document.querySelector('.category-list');
  const genreTemplate = document.querySelector('#category');
  const genreClone = genreTemplate.content.cloneNode(true);

  const genreField = genreClone.querySelector('.category-list__item-title');
  genreField.textContent = genre;

  const subGenreContainer = genreClone.querySelector('.category-list__sublist');
  const subGenreTemplate = genreClone.querySelector('#category-item');

  for (const subgenre of subgenres) {
    const subGenreClone = subGenreTemplate.content.cloneNode(true);

    const subGenreField = subGenreClone.querySelector('.category-list__subitem-link');

    subGenreField.href = `#${subgenre}`;
    subGenreField.textContent = subgenre;

    subGenreContainer.appendChild(subGenreClone);
  }

  genreContainer.appendChild(genreClone);
}