import { products } from "./products.js";
import { cart } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = products.find((p) => p.id === productId);

  if (!product) {
    window.location.href = "/";
    return;
  }

  // Заполнение данных
  document.getElementById("productTitle").textContent = product.title;
  document.getElementById("productDescription").textContent =
    product.description || "Описание отсутствует";

  // Цены
  const price = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  document.getElementById(
    "productPrice"
  ).textContent = `${price.toLocaleString()} ₽`;

  if (product.discount) {
    document.getElementById(
      "productOldPrice"
    ).textContent = `${product.price.toLocaleString()} ₽`;
  }

  // Размеры
  const sizeContainer = document.getElementById("sizeOptions");
  if (product.sizes) {
    product.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.className = "size-btn";
      btn.textContent = size;
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".size-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
      sizeContainer.appendChild(btn);
    });
  }

  // Изображения
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.getElementById("thumbnails");

  [product.image, ...(product.images || [])].forEach((img, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.className = "thumbnail";
    thumbnail.src = img;
    thumbnail.alt = product.title;
    if (index === 0) mainImage.src = img;

    thumbnail.addEventListener("click", () => {
      mainImage.src = img;
    });

    thumbnails.appendChild(thumbnail);
  });

  // Добавление в корзину
  document.getElementById("addToCart").addEventListener("click", () => {
    const selectedSize =
      document.querySelector(".size-btn.selected")?.textContent;
    if (product.sizes && !selectedSize) {
      alert("Пожалуйста, выберите размер");
      return;
    }

    cart.add({
      ...product,
      size: selectedSize,
    });

    window.location.href = "/";
  });
});
