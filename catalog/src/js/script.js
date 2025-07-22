import { getAllPaints }  from './api.js';
import {
  renderProductCards,
  totalAmountProduct,
  filterProduct
}  from './product.js';
import {
  addToCart,
  renderCartItems,
  updateCartTotal,
  updateCartCount,
  updateLocalStorage
} from './cart.js';

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
  item.addEventListener('click', (e) => {
    filter.classList.remove('filter-container_active');
    wrapper.classList.remove('menu__active');
    body.classList.remove('stop-scroll');
    const category = e.target.id
    filterProduct(category);
  })
});

btnCloseFilter.addEventListener('click', (e) => {
  if (e.target === btnCloseFilter || e.target.closest('.btn-close_filter')){
    filter.classList.toggle('filter-container_active');
    wrapper.classList.toggle('menu__active');
    body.classList.toggle('stop-scroll');
  }
})

document.addEventListener('DOMContentLoaded', async function() {
  const cartButton = document.querySelector('.control__btn_cart');
  // const overlay = document.querySelector('.overlay');
  // const cartSidebar = document.querySelector('.cart-sidebar');
  const cartClose = document.querySelector('.cart-close');
  // const btnIncrease = document.querySelectorAll('.cart-item__increase');
  // const btnDecrease = document.querySelectorAll('.cart-item__decrease');
  // const removeItems = document.querySelectorAll('.cart-item__remove');
  const clearCartBtn = document.querySelector('.cart-clear');
  const addToCartBtn = document.querySelectorAll('.card__add-to-cart');

  const cartContainer = document.querySelector('.cart-items');

  renderCartItems();
  const paints = await getAllPaints();
  totalAmountProduct(paints);
  renderProductCards(paints);

  // Открытие корзины
  cartButton.addEventListener('click', (e) => {
    if (e.target === burger || e.target.closest('.control__btn_cart')){
      body.classList.toggle('cart-open');
      body.classList.toggle('stop-scroll');
    }
  });

  // Закрытие корзины по крестику
  cartClose.addEventListener('click', (e) => {
    if (e.target === cartClose || e.target.closest('.cart-close')){
      body.classList.remove('cart-open');
      wrapper.classList.remove('menu__active');
      body.classList.toggle('stop-scroll');
    }
  })

  // Изменение количества товаров в корзине.
  // Сложность в перерендинге товаров(приходиться делегировать события)
  cartContainer.addEventListener('click', (e) => {
    const target = e.target;
    // Увеличение количества товара на одну единицу
    if (target.classList.contains('cart-item__increase') || target.closest('.cart-item__increase')) {
      const button = target.classList.contains('cart-item__increase') ? target : target.closest('.cart-item__increase');
      const quantityElement = button.previousElementSibling;
      quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
      updateCartTotal();
      updateCartCount();
      updateLocalStorage(button.closest('.cart-item'), 'increase');
    }
    // Уменьшение количества товара на одну единицу
    else if (target.classList.contains('cart-item__decrease') || target.closest('.cart-item__decrease')) {
      const button = target.classList.contains('cart-item__decrease') ? target : target.closest('.cart-item__decrease');
      const quantityElement = button.nextElementSibling;
      const currentQuantity = parseInt(quantityElement.textContent);
      if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
        updateCartTotal();
        updateCartCount();
        updateLocalStorage(button.closest('.cart-item'), 'decrease');
      }
    }
    // Удаление товара из корзины
     else if (target.classList.contains('cart-item__remove') || target.closest('.cart-item__remove')) {
      const button = target.classList.contains('cart-item__remove') ? target : target.closest('.cart-item__remove');
      const cartItem = button.closest('.cart-item');
      cartItem.remove();
      updateCartTotal();
      updateCartCount();
      updateLocalStorage(cartItem, 'remove');
    }
  });

  // Очистка корзины
  clearCartBtn.addEventListener('click', () => {
    document.querySelector('.cart-items').innerHTML = '';
    localStorage.removeItem('cart');
    updateCartTotal();
    updateCartCount();
  });

  addToCartBtn.forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.target.classList.contains('card__add-to-cart')) {
        const card = e.target.closest('.card');
        console.log(card);
        addToCart({
          id: card.dataset.id,
          name: card.dataset.name,
          price: card.dataset.price,
          image: card.dataset.image,
          quantity: 1
        });
      }
    })
  });
});