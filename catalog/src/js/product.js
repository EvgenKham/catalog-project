
import { addToCart } from './cart.js';
import { getAllPaints, getPaintById } from './api.js';

const productsContainer = document.querySelector('.catalog__products');

// Функция для рендеринга карточек
export function renderProductCards(products) {

  productsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.product = 'data-product';
    card.dataset.id = product.id;
    card.dataset.name = product.name;
    card.dataset.price = product.price;
    card.dataset.image = `assets/images/products/${product.image}`;

    card.innerHTML = `
      <div class="card__image-container">
        <img src="assets/images/products/${product.image}" alt="${product.alt}" class="card__image" loading="lazy">
      </div>
      <div class="card__content">
        <p class="card__name">${product.name}</p>
        <div class="card__description">
          <p class="card__price">${product.price} ₽</p>
          <button class="card__add-to-cart" type="button" aria-label="Add to cart">+</button>
        </div>
      </div>
    `;

    const addToCartBtn = card.querySelector('.card__add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));

    fragment.appendChild(card);
  });

  productsContainer.appendChild(fragment);
}

// Функция для отображения общего количества товаров
export function totalAmountProduct(product) {
  const count = product.length;
  document.querySelector('.count-product').textContent = `${count} товар`;
}

export async function filterProduct(category) {
  const allProducts = await getAllPaints();
  const filteredProducts = allProducts.filter(product => {
    return product.categories.includes(category);
  });

  return filteredProducts;
}

export function sortProducts(type, products) {
  let sortedProducts = [...products];
  switch(type) {
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'rating-desc':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      break;
  }

  return sortedProducts;
}