const sort = document.querySelector('.sort-dropdown');

const selected = sort.querySelector('.sort-dropdown__selected');
const current = sort.querySelector('.sort-dropdown__current');
const list = sort.querySelector('.sort-dropdown__list');
const items = sort.querySelectorAll('.sort-dropdown__item');
const overlay = document.querySelector('.dropdown-overlay');

// Обработчик клика по выбранному элементу
selected.addEventListener('click', (e) => {
  e.stopPropagation();
  sort.classList.toggle('sort-dropdown__active');
});

// Закрытие при клике вне списка
document.addEventListener('click', (e) => {
  if (!sort.contains(e.target)) {
    sort.classList.remove('sort-dropdown__active');
  }
});

// Обработчик выбора элемента из списка
items.forEach(item => {
  item.addEventListener('click', () => {
    current.textContent = item.textContent;
    sort.classList.remove('sort-dropdown__active');

    items.forEach(listItem => {
      listItem.classList.remove('sort-dropdown__item_selected');
    });

    item.classList.add('sort-dropdown__item_selected');

    // Здесь можно добавить логику сортировки
    const sortType = item.dataset.value;
    sortProducts(sortType);
  });
});

// Пример функции сортировки
function sortProducts(type) {
  console.log('Сортировка по:', type);
}