// Imports
import cloneTemplate from "./cloneTemplate.js";

// Actually using the modules
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
  cloneTemplate(
    document.querySelector('.category-list'),
    document.getElementById('category'),
    ['.category-list__item-title', '.category-list__sublist', '#category-item'],
    (category) => {
      category[0].textContent = genre.name;
      genre.subgenres.forEach( (subgenre) => {
        cloneTemplate(
          category[1],
          category[2],
          ['.category-list__subitem-link'],
          (categoryItem) => {
            categoryItem[0].href = `#${subgenre}`;
            categoryItem[0].textContent = subgenre;
          }
        )
      })
    }
  );
})