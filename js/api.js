const fakeProducts = [
  // Мужчины
  {
    id: 1,
    title: "Кожаная куртка",
    price: 8999,
    category: "Мужчины",
    image: "https://picsum.photos/300/300?random=1",
    sizes: ["M", "L", "XL"],
    discount: 15,
  },
  {
    id: 2,
    title: "Джинсы классические",
    price: 3499,
    category: "Мужчины",
    image: "https://picsum.photos/300/300?random=2",
    sizes: ["46", "48", "50"],
  },

  // Женщины
  {
    id: 3,
    title: "Вечернее платье",
    price: 12999,
    category: "Женщины",
    image: "https://picsum.photos/300/300?random=3",
    sizes: ["S", "M"],
    exclusive: true,
  },
  {
    id: 4,
    title: "Кожаная юбка",
    price: 5999,
    category: "Женщины",
    image: "https://picsum.photos/300/300?random=4",
    sizes: ["XS", "S"],
  },

  // Дети
  {
    id: 5,
    title: "Детский комбинезон",
    price: 2999,
    category: "Дети",
    image: "https://picsum.photos/300/300?random=5",
    sizes: ["104", "110"],
  },

  // Дом
  {
    id: 6,
    title: "Диванный плед",
    price: 1999,
    category: "Дом",
    image: "https://picsum.photos/300/300?random=6",
  },

  // Скидки
  {
    id: 7,
    title: "Рубашка офисная",
    price: 2499,
    category: "Мужчины",
    image: "https://picsum.photos/300/300?random=7",
    discount: 30,
  },

  // Услуги
  {
    id: 8,
    title: "Индивидуальный пошив",
    price: 15000,
    category: "Услуги",
    service: true,
  },

  // Эксклюзив
  {
    id: 9,
    title: "Золотое платье",
    price: 45999,
    category: "Эксклюзив",
    image: "https://picsum.photos/300/300?random=8",
    exclusive: true,
  },
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeProducts), 500);
  });
};
