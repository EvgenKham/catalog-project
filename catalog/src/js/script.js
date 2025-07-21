const sort = document.querySelector('.sort-dropdown');

const selected = sort.querySelector('.sort-dropdown__selected');
const current = sort.querySelector('.sort-dropdown__current');
const list = sort.querySelector('.sort-dropdown__list');
const items = sort.querySelectorAll('.sort-dropdown__item');
const overlay = document.querySelector('.overlay');

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


const menu = document.querySelector('.header__nav');
const menuItem = document.querySelectorAll('.nav__item');
const burger = document.querySelector('.burger');
const wrapper = document.querySelector('.wrapper');
const body = document.body;
const btnCloseMenu = document.querySelector('.btn-close_menu')

burger.addEventListener('click', (e) => {
  if (e.target === burger || e.target.closest('.burger')){
    menu.classList.toggle('header__nav_active');
    wrapper.classList.toggle('menu__active');
    body.classList.toggle('stop-scroll');
  }
});

menuItem.forEach(item => {
  item.addEventListener('click', () => {
    menu.classList.toggle('header__nav_active');
    wrapper.classList.toggle('menu__active');
    body.classList.toggle('stop-scroll');
  })
});

btnCloseMenu.addEventListener('click', (e) => {
  if (e.target === btnCloseMenu || e.target.closest('.btn-close_menu')){
    menu.classList.toggle('header__nav_active');
    wrapper.classList.toggle('menu__active');
    body.classList.toggle('stop-scroll');
  }
})

const filter = document.querySelector('.filter-container');
const filterItem = document.querySelectorAll('.filter__item');
const filterMobileButton = document.querySelector('.filter-mobile__button');
const btnCloseFilter = document.querySelector('.btn-close_filter')

filterMobileButton.addEventListener('click', (e) => {
  if (e.target === filterMobileButton || e.target.closest('.filter-mobile__button')){
    filter.classList.toggle('filter-container_active');
    wrapper.classList.toggle('menu__active');
    body.classList.toggle('stop-scroll');
  }
});

filterItem.forEach(item => {
  item.addEventListener('click', () => {
    filter.classList.remove('filter-container_active');
    wrapper.classList.remove('menu__active');
    body.classList.remove('stop-scroll');
  })
});

btnCloseFilter.addEventListener('click', (e) => {
  if (e.target === btnCloseFilter || e.target.closest('.btn-close_filter')){
    filter.classList.toggle('filter-container_active');
    wrapper.classList.toggle('menu__active');
    body.classList.toggle('stop-scroll');
  }
})