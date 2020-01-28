import auth from "./authentication.js";
import loading from "./loading.js";

async function getAllFrom(resource) {
  const token = await auth();

  xfetch.init({
    address: 'https://api.spotify.com/v1/',
    key: token
  });

  const data = await xfetch.get(resource);

  return data;
}

(async () => {
  loading.start(document.querySelector('.category-list'));

  const categories = (await getAllFrom('browse/categories?limit=50')).categories.items;

  const categoryMap = {};

  for (const category of categories) {
    const subCategories = (await getAllFrom(`browse/categories/${category.id}/playlists`)).playlists;

    if (subCategories && subCategories.total > 0) {
      categoryMap[category.id] = {
        name: category.name,
        subItems: subCategories.items
      }
    }
  }

  loading.end(document.querySelector('.category-list'))

  for (const key in categoryMap) {
    createCategory(categoryMap[key].name, categoryMap[key].subItems)
  }
})();

function createCategory(category, subcategory) {
  const itemContainer = document.querySelector('.category-list');
  const itemTemplate = document.querySelector('#category');
  const itemClone = itemTemplate.content.cloneNode(true);

  const itemField = itemClone.querySelector('.category-list__item-title');
  itemField.textContent = category;

  const subItemContainer = itemClone.querySelector('.category-list__sublist');
  const subItemTemplate = itemClone.querySelector('#category-item');

  for (const subItem of subcategory) {
    const subItemClone = subItemTemplate.content.cloneNode(true);

    const subItemField = subItemClone.querySelector('.category-list__subitem-link');

    subItemField.href = `/playlists/?id=${subItem.id}`;
    subItemField.textContent = subItem.name;

    subItemContainer.appendChild(subItemClone);
  }

  itemContainer.appendChild(itemClone);
}