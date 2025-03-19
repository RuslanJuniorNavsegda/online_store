import { products } from "./products.js";
import { Cart } from "./cart.js";

const cart = new Cart();
let currentProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  renderProducts(products);
  setupEventListeners();
  cart.updateUI();
});

function initFilters() {
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");

  priceRange.max = Math.max(...products.map((p) => p.price));
  priceRange.value = priceRange.max;
  priceValue.textContent = `${Number(priceRange.value).toLocaleString()} ₽`;

  priceRange.addEventListener("input", filterProducts);
  document
    .getElementById("sortSelect")
    .addEventListener("change", filterProducts);
}

function filterProducts() {
  const category = document.querySelector(".nav-link.active").dataset.category;
  const sortType = document.getElementById("sortSelect").value;
  const maxPrice = document.getElementById("priceRange").value;

  let filtered = products.filter((p) => {
    const matchCategory =
      category === "all" ||
      (category === "sale" ? p.discount : p.category === category);
    return p.price <= maxPrice && matchCategory;
  });

  switch (sortType) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - b.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  currentProducts = filtered;
  renderProducts(filtered);
}

function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card" data-id="${product.id}">
            ${
              product.discount
                ? `<div class="discount-badge">-${product.discount}%</div>`
                : ""
            }
            <img src="${product.image}" alt="${
        product.title
      }" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="price-block">
                    ${
                      product.discount
                        ? `
                        <span class="old-price">${product.price.toLocaleString()} ₽</span>
                        <span class="new-price">${Math.round(
                          product.price * (1 - product.discount / 100)
                        ).toLocaleString()} ₽</span>
                    `
                        : `<span class="price">${product.price.toLocaleString()} ₽</span>`
                    }
                </div>
                <div class="product-actions">
                    ${
                      product.sizes
                        ? `
                    <select class="size-selector">
                        ${product.sizes
                          .map((s) => `<option>${s}</option>`)
                          .join("")}
                    </select>`
                        : ""
                    }
                    <button class="add-to-cart" data-id="${product.id}">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function setupEventListeners() {
  // Навигация
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      e.target.classList.add("active");
      filterProducts();
    });
  });

  // Мобильное меню
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navList").classList.toggle("active");
  });

  // Корзина
  document.getElementById("cartToggle").addEventListener("click", toggleCart);
  document.getElementById("closeCart").addEventListener("click", toggleCart);
  document.getElementById("cartOverlay").addEventListener("click", toggleCart);

  // Добавление в корзину
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find((p) => p.id === productId);
      const size = e.target
        .closest(".product-actions")
        ?.querySelector(".size-selector")?.value;

      cart.add({ ...product, size });
      animateAddToCart(e.target);
    }
  });
}

function toggleCart() {
  const cartModal = document.getElementById("cartModal");
  cartModal.classList.toggle("active");
  if (cartModal.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    renderCart();
  } else {
    document.body.style.overflow = "";
  }
}

function renderCart() {
  const itemsContainer = document.getElementById("cartItems");
  itemsContainer.innerHTML = cart.items
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${
        item.title
      }" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                ${item.size ? `<p>Размер: ${item.size}</p>` : ""}
                <p>${item.quantity} × ${item.price.toLocaleString()} ₽</p>
            </div>
            <button class="remove-btn" data-id="${item.id}">×</button>
        </div>
    `
    )
    .join("");

  document.getElementById("totalPrice").textContent =
    cart.total.toLocaleString();
}

function animateAddToCart(button) {
  const rect = button.getBoundingClientRect();
  const animation = document.createElement("div");
  animation.className = "cart-animation";
  animation.style.left = `${rect.left}px`;
  animation.style.top = `${rect.top}px`;
  animation.textContent = "+1";

  document.body.appendChild(animation);

  requestAnimationFrame(() => {
    animation.style.transform = `translate(-50%, -50%) scale(1.5)`;
    animation.style.opacity = "0";
  });

  setTimeout(() => animation.remove(), 1000);
}
