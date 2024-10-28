const express = require('express');
const path = require('path');
const { Restaurants, selectRandomCuisine, generateRandomMenuItem, generateMenu, Cuisines, } = require('./utils/restaurantUtils');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  // Generate a random restaurant and menu item
  const randomRestaurantIndex = Math.floor(Math.random() * Restaurants.length);
  const randomRestaurant = Restaurants[randomRestaurantIndex];
  const randomCuisine = selectRandomCuisine(Cuisines);
  const randomMenuItem = generateRandomMenuItem(randomCuisine);
  const restaurantName = randomRestaurant.name;

  res.render('index', {
    restaurants: Restaurants,
    randomMenuItem: randomMenuItem,
    randomRestaurant: randomRestaurant,
    restaurantName: restaurantName
  });
});

app.get('/restaurant', (req, res) => {
  const restaurantId = req.query.restaurantId;
  const selectedRestaurant = Restaurants.find(restaurant => restaurant.id === restaurantId);

  if (selectedRestaurant) {
    const randomCuisine = selectRandomCuisine(selectedRestaurant.cuisineType);
    const restaurantMenu = generateMenu(randomCuisine);
    res.render('menu', { restaurant: selectedRestaurant, menu: restaurantMenu });
  } else {
    res.status(404).send('Restaurant not found!');
  }
});

app.get('/alerts', (req, res) => {
  const restaurantsWithAlerts = Restaurants.map(restaurant => {
    const menu = generateMenu(restaurant);
    return {
      specialMenuItems: menu.specialMenuItems,
      restaurantName: restaurant.name
    };
  }).filter(restaurant => restaurant.specialMenuItems.length > 0);

  res.render('alerts', { 
    restaurantsWithAlerts
   });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});