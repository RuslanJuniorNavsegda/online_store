import { fetchProducts } from "./api.js";
import {
  addToCart,
  renderCartItems,
  removeFromCart,
  initCart,
  filterProducts,
} from "./cart.js";

const initializeApp = async () => {
  const products = await fetchProducts();
  renderProducts(products);
  initCart();

  // Обработчики фильтрации
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      e.target.classList.add("active");
      const category = e.target.dataset.category;
      filterProducts(category, products);
    });
  });

  // Мобильное меню
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navList").classList.toggle("active");
  });

  // Корзина
  document.getElementById("cartButton").addEventListener("click", () => {
    document.getElementById("cartModal").classList.add("active");
  });

  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
};

const closeCart = () => {
  document.getElementById("cartModal").classList.remove("active");
};

const renderProducts = (products) => {
  const container = document.getElementById("productsContainer");
  container.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            ${
              product.discount
                ? `<div class="discount-badge">-${product.discount}%</div>`
                : ""
            }
            <img src="${product.image || "images/placeholder.jpg"}" alt="${
        product.title
      }" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">
                    ${
                      product.discount
                        ? `<span class="old-price">${product.price}₽</span> 
                           ${Math.round(
                             product.price * (1 - product.discount / 100)
                           )}₽`
                        : `${product.price}₽`
                    }
                </p>
                ${
                  product.sizes
                    ? `
                <select class="size-selector">
                    ${product.sizes
                      .map((size) => `<option value="${size}">${size}</option>`)
                      .join("")}
                </select>`
                    : ""
                }
                <button class="add-to-cart" 
                    data-id="${product.id}"
                    onclick="addToCartHandler(event)">
                    Добавить в корзину
                </button>
            </div>
        </div>
    `
    )
    .join("");
};

window.addToCartHandler = (event) => {
  const productId = parseInt(event.target.dataset.id);
  const product = fakeProducts.find((p) => p.id === productId);
  const sizeSelector =
    event.target.parentElement.querySelector(".size-selector");
  const size = sizeSelector ? sizeSelector.value : null;

  addToCart(product, size);
  renderCartItems();
};

document.addEventListener("DOMContentLoaded", initializeApp);
