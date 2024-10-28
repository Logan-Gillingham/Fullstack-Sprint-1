const { Cuisines, Dishes } = require("../../utils/data");
const { generateRandomMenuItem, generateMenu, selectRandomCuisine } = require("../../utils/restaurantUtils");

describe('Restaurant Functions', () => {
  describe('generateRandomMenuItem', () => {
    it('should return a random menu item with correct properties', () => {
      const cuisine = 'italian';
      const menuItem = generateRandomMenuItem(cuisine);

      expect(menuItem).toHaveProperty('name');
      expect(menuItem).toHaveProperty('description');
      expect(menuItem).toHaveProperty('price');
      expect(menuItem).toHaveProperty('isSpecial');
    });
  });

  describe('generateMenu', () => {
    it('should generate a menu with a random cuisine and menu items', () => {
      const menu = generateMenu();

      expect(menu).toHaveProperty('cuisine');
      expect(menu.menuItems).toBeInstanceOf(Array);
      expect(menu.menuItems.length).toBeGreaterThan(0);

      menu.menuItems.forEach(item => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('price');
        expect(item).toHaveProperty('isSpecial');
      });
    });
  });

  describe('selectRandomCuisine', () => {
    it('should return a random cuisine from the Cuisines array', () => {
      const randomCuisine = selectRandomCuisine();
      expect(Cuisines).toContain(randomCuisine);
    });
  });
});
