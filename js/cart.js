let cart = JSON.parse(localStorage.getItem("cart")) || [];

export const initCart = () => {
  updateCartCount();
};

export const addToCart = (product, size) => {
  const existing = cart.find(
    (item) => item.id === product.id && item.size === size
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      size: size || "N/A",
      quantity: 1,
    });
  }

  saveCart();
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

export const removeFromCart = (index) => {
  cart.splice(index, 1);
  saveCart();
  renderCartItems();
};

export const getCartTotal = () => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const updateCartCount = () => {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector(".cart-count").textContent = count;
};

export const renderCartItems = () => {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  container.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            <img src="${item.image || "images/placeholder.jpg"}" alt="${
        item.title
      }" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                ${item.size ? `<p>Размер: ${item.size}</p>` : ""}
                <p>${item.price}₽ x ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
        </div>
    `
    )
    .join("");

  totalElement.textContent = getCartTotal();
};

export const filterProducts = (category, products) => {
  const filtered = products.filter((product) => {
    if (category === "all") return true;
    if (category === "Скидки") return product.discount;
    if (category === "Эксклюзив") return product.exclusive;
    if (category === "Услуги") return product.service;
    return product.category === category;
  });

  renderProducts(filtered);
};
