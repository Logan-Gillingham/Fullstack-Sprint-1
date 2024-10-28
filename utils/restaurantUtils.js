const { Dishes, Cuisines, Restaurants } = require("./data");

function generateRandomMenuItem(cuisine) {
  const dishes = Dishes[cuisine];
  const randomIndex = Math.floor(Math.random() * dishes.length);
  const randomDish = dishes[randomIndex];

  const isSpecial = Math.random() < 0.5;

  return {
    name: randomDish.name,
    description: randomDish.description,
    price: Math.floor(Math.random() * 30) + 10, // Random price between 10 and 39
    isSpecial
  };
}

function selectRandomCuisine() {
  const randomIndex = Math.floor(Math.random() * Cuisines.length);
  return Cuisines[randomIndex];
}

function generateMenu(restaurant) {
  const cuisine = selectRandomCuisine(Cuisines);
  const menuItems = [];

  for (let i = 0; i < Math.floor(Math.random() * 6) + 5; i++) {
    menuItems.push(generateRandomMenuItem(cuisine));
  }

  const specialMenuItems = menuItems.filter(item => item.isSpecial);

  return {
    cuisine,
    menuItems,
    specialMenuItems
  };
}

module.exports = { generateRandomMenuItem, selectRandomCuisine, generateMenu, Restaurants };