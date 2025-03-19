export class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  add(item) {
    const existing = this.items.find(
      (i) => i.id === item.id && i.size === item.size
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }

    this.save();
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  get total() {
    return this.items.reduce((sum, item) => {
      const price = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return sum + price * item.quantity;
    }, 0);
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
    this.updateUI();
  }

  updateUI() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector(".cart-count").textContent = count;
  }
}
