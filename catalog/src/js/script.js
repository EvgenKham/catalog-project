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


document.addEventListener('DOMContentLoaded', function() {
  const cartButton = document.querySelector('.control__btn_cart');
  // const cartOverlay = document.querySelector('.cart-overlay');
  const overlay = document.querySelector('.overlay');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartClose = document.querySelector('.cart-close');

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

  // Закрытие корзины по затемненному фону
  overlay.addEventListener('click', (e) => {
    if (e.target === cartClose || e.target.closest('.cart-close')){
      body.classList.remove('cart-open');
      wrapper.classList.remove('menu__active');
      body.classList.toggle('stop-scroll');
    }
  })

  // Управление количеством товаров
  document.querySelectorAll('.cart-item__increase').forEach(button => {
    button.addEventListener('click', function() {
      const quantityElement = this.previousElementSibling;
      quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
      updateCartTotal();
    });
  });

  document.querySelectorAll('.cart-item__decrease').forEach(button => {
    button.addEventListener('click', function() {
      const quantityElement = this.nextElementSibling;
      const currentQuantity = parseInt(quantityElement.textContent);
      if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
        updateCartTotal();
      }
    });
  });

  // Удаление товара
  document.querySelectorAll('.cart-item__remove').forEach(button => {
    button.addEventListener('click', function() {
      this.closest('.cart-item').remove();
      updateCartTotal();
      updateCartCount();
    });
  });

  // Очистка корзины
  document.querySelector('.cart-clear').addEventListener('click', function() {
    document.querySelector('.cart-items').innerHTML = '';
    updateCartTotal();
    updateCartCount();
  });

  // Обновление итоговой суммы
  function updateCartTotal() {
    let total = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
      const price = parseInt(item.querySelector('.cart-item__price').textContent.replace(/\D/g, ''));
      const quantity = parseInt(item.querySelector('.cart-item__quantity').textContent);
      total += price * quantity;
    });

    document.querySelector('.cart-total__price').textContent =
      new Intl.NumberFormat('ru-RU').format(total) + ' ₽';
  }

  // Обновление счетчика товаров
  function updateCartCount() {
    const count = document.querySelectorAll('.cart-item').length;
    document.querySelector('.cart-count').textContent =
      count + ' ' + (count % 10 === 1 && count % 100 !== 11 ? 'товар' :
                     count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? 'товара' : 'товаров');
  }
});