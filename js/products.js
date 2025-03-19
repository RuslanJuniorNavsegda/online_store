export const filterProducts = (category) => {
  const products = fakeProducts.filter((product) => {
    if (category === "all") return true;
    if (category === "Скидки") return product.discount;
    if (category === "Эксклюзив") return product.exclusive;
    if (category === "Услуги") return product.service;
    return product.category === category;
  });

  renderProducts(products);
};
