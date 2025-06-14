const apiBase = '/api';

async function fetchProducts() {
  try {
    const res = await fetch(apiBase + '/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    displayProducts(products);
  } catch (err) {
    console.error(err);
    document.getElementById('product-list').innerText = 'Failed to load products.';
  }
}

function displayProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = 
      '<h3>' + product.name + '</h3>' +
      '<p>' + product.description + '</p>' +
      '<p>Price: $' + product.price.toFixed(2) + '</p>' +
      '<button onclick="addToCart(\'' + product._id + '\')">Add to Cart</button>';
    container.appendChild(card);
  });
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart');
}

window.onload = () => {
  fetchProducts();
};
