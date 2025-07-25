// Функция добавления товара в корзину
export function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Функция обновления интерфейса корзины
export function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  // const cartCount = document.querySelector('.cart-count');
  const navigatorCart = document.querySelector('.control__btn_cart');

  if (navigatorCart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    navigatorCart.textContent = totalItems;
  }

  renderCartItems();
}

export function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.querySelector('.cart-items');

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="cart-item__image">
        <img src="/assets/images/${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">${item.price} ₽</div>
      </div>
      <div class="cart-item__controls">
        <button class="cart-item__decrease" type="button">-</button>
        <span class="cart-item__quantity">${item.quantity}</span>
        <button class="cart-item__increase" type="button">+</button>
      </div>
      <button class="cart-item__remove" type="button">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  updateCartTotal();
  updateCartCount();
}

// Обновление итоговой суммы
export function updateCartTotal() {
  let total = 0;
  const cartItems = document.querySelectorAll('.cart-item')
  cartItems.forEach(item => {
    const itemPrice = item.querySelector('.cart-item__price');
    const itemQuantity = item.querySelector('.cart-item__quantity');
    const price = parseInt(itemPrice.textContent.replace(/\D/g, ''));
    const quantity = parseInt(itemQuantity.textContent);
    total += price * quantity;
  });

  document.querySelector('.cart-total__price').textContent = total + ' ₽';
}

// Обновление счетчика товаров
export function updateCartCount() {
  let count = 0;
  const navigatorCart = document.querySelector('.control__btn_cart');
  const products = document.querySelectorAll('.cart-item__quantity');
  products.forEach(item => count += Number(item.textContent));
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = `${count} товаров`;
  navigatorCart.textContent = count;
}

//Обновление корзины товаров в LocaleStorage
export function updateLocalStorage(cartItem, action) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemName = cartItem.querySelector('.cart-item__name').textContent;
  const itemIndex = cart.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
    if (action === 'increase') {
      cart[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
      cart[itemIndex].quantity -= 1;
    } else if (action === 'remove') {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}