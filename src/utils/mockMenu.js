// Mock data shaped exactly like Swiggy's real
// /dapi/menu/pl response, so it plugs into your existing
// ResMenu.js parsing logic with zero changes:
//
//   resInfo?.data?.cards[2]?.card?.card?.info               -> restaurant details
//   resInfo?.data?.cards.find(c => c?.groupedCard)
//     ?.groupedCard?.cardGroupMap?.REGULAR?.cards            -> menu categories
//
// Import MOCK_RESTAURANTS so restaurant details (name, cuisines,
// rating, cost) automatically match what was shown on the home page.

import MOCK_RESTAURANTS from "./mockRestaurants";

// Pool of menu items grouped by cuisine keyword.
// generateMockMenu() picks items matching each restaurant's
// cuisines array, so every restaurant gets a relevant, distinct menu.
const ITEM_POOL = {
  Biryani: [
    { name: "Chicken Dum Biryani", price: 29900, description: "Slow-cooked basmati rice layered with spiced chicken." },
    { name: "Mutton Biryani", price: 39900, description: "Traditional mutton biryani with salan and raita." },
    { name: "Veg Biryani", price: 21900, description: "Fragrant basmati rice with mixed vegetables and spices." },
    { name: "Egg Biryani", price: 18900, description: "Boiled eggs tossed in aromatic biryani rice." },
  ],
  "South Indian": [
    { name: "Masala Dosa", price: 9900, description: "Crispy rice crepe filled with spiced potato masala." },
    { name: "Idli Sambar (4 pcs)", price: 7900, description: "Steamed rice cakes served with sambar and chutney." },
    { name: "Filter Coffee", price: 4900, description: "South Indian style decoction coffee." },
  ],
  Andhra: [
    { name: "Andhra Chicken Curry", price: 24900, description: "Spicy chicken curry cooked in Andhra style." },
    { name: "Gongura Mutton", price: 34900, description: "Mutton cooked with tangy sorrel leaves." },
  ],
  "North Indian": [
    { name: "Butter Chicken", price: 32900, description: "Creamy tomato-based chicken curry." },
    { name: "Paneer Butter Masala", price: 24900, description: "Cottage cheese cubes in rich tomato gravy." },
    { name: "Dal Makhani", price: 19900, description: "Slow-cooked black lentils with butter and cream." },
    { name: "Garlic Naan", price: 6900, description: "Leavened bread topped with garlic and butter." },
  ],
  Mughlai: [
    { name: "Chicken Korma", price: 29900, description: "Chicken cooked in a rich, mildly spiced gravy." },
    { name: "Mutton Rogan Josh", price: 37900, description: "Aromatic mutton curry in Kashmiri style." },
  ],
  Chinese: [
    { name: "Veg Hakka Noodles", price: 17900, description: "Stir-fried noodles with fresh vegetables." },
    { name: "Chilli Chicken", price: 24900, description: "Crispy chicken tossed in spicy chilli sauce." },
    { name: "Manchow Soup", price: 12900, description: "Spicy, tangy soup topped with crispy noodles." },
  ],
  Pizzas: [
    { name: "Margherita Pizza", price: 19900, description: "Classic pizza with mozzarella and basil." },
    { name: "Farmhouse Pizza", price: 27900, description: "Loaded with onion, capsicum, tomato and mushroom." },
    { name: "Pepperoni Pizza", price: 32900, description: "Topped with spicy pepperoni and cheese." },
  ],
  Italian: [
    { name: "Pasta Alfredo", price: 22900, description: "Creamy white sauce pasta with herbs." },
    { name: "Garlic Bread", price: 9900, description: "Toasted bread with garlic butter and herbs." },
  ],
  "Fast Food": [
    { name: "Classic Veg Burger", price: 8900, description: "Crispy veg patty with lettuce and sauces." },
    { name: "French Fries", price: 9900, description: "Crispy golden fries served with dip." },
  ],
  Burgers: [
    { name: "Chicken Zinger Burger", price: 14900, description: "Crispy fried chicken fillet burger." },
    { name: "Cheese Loaded Burger", price: 16900, description: "Double cheese with a juicy patty." },
  ],
  American: [
    { name: "BBQ Chicken Wings", price: 21900, description: "Smoky barbecue glazed chicken wings." },
    { name: "Loaded Nachos", price: 18900, description: "Nachos topped with cheese, jalapenos and salsa." },
  ],
  Continental: [
    { name: "Grilled Chicken Steak", price: 34900, description: "Grilled chicken breast with pepper sauce." },
  ],
  Sweets: [
    { name: "Gulab Jamun (2 pcs)", price: 6900, description: "Soft milk-based dumplings soaked in sugar syrup." },
    { name: "Rasgulla (2 pcs)", price: 6900, description: "Spongy cottage cheese balls in light syrup." },
  ],
  Desserts: [
    { name: "Belgian Chocolate Waffle", price: 15900, description: "Warm waffle topped with molten chocolate." },
    { name: "Vanilla Ice Cream Tub", price: 12900, description: "Classic creamy vanilla ice cream." },
  ],
  Waffles: [
    { name: "Nutella Waffle", price: 16900, description: "Crisp waffle loaded with Nutella and nuts." },
  ],
  Beverages: [
    { name: "Cold Coffee", price: 8900, description: "Chilled coffee blended with milk and ice cream." },
    { name: "Masala Chai", price: 3900, description: "Classic spiced Indian tea." },
    { name: "Fresh Lime Soda", price: 5900, description: "Refreshing lime soda, sweet or salted." },
  ],
  Mexican: [
    { name: "Chicken Tacos (2 pcs)", price: 17900, description: "Soft tacos with spiced chicken and salsa." },
    { name: "Veg Burrito Bowl", price: 19900, description: "Rice bowl with beans, corn and guacamole." },
  ],
  Cafe: [
    { name: "Cappuccino", price: 9900, description: "Espresso topped with steamed milk foam." },
    { name: "Blueberry Muffin", price: 9900, description: "Soft muffin loaded with blueberries." },
  ],
  Punjabi: [
    { name: "Sarson Ka Saag with Makki Roti", price: 21900, description: "Mustard greens curry with corn flatbread." },
  ],
  Tibetan: [
    { name: "Steamed Chicken Momos (6 pcs)", price: 14900, description: "Juicy chicken dumplings served with chutney." },
  ],
  Momos: [
    { name: "Fried Veg Momos (6 pcs)", price: 12900, description: "Crispy fried vegetable dumplings." },
  ],
  Wraps: [
    { name: "Chicken Roll", price: 12900, description: "Spiced chicken wrapped in a soft paratha." },
  ],
  Rolls: [
    { name: "Egg Roll", price: 9900, description: "Egg and onion wrapped in a crisp paratha." },
  ],
  Kebabs: [
    { name: "Chicken Seekh Kebab", price: 22900, description: "Grilled minced chicken skewers." },
  ],
  Snacks: [
    { name: "Samosa (2 pcs)", price: 4900, description: "Crispy pastry filled with spiced potatoes." },
  ],
  "Ice Cream": [
    { name: "Kesar Pista Ice Cream", price: 11900, description: "Saffron and pistachio flavored ice cream." },
  ],
};

let globalItemId = 1000;

const buildCategory = (title, cuisineKey) => {
  const items = ITEM_POOL[cuisineKey];
  if (!items) return null;

  return {
    card: {
      card: {
        "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
        title,
        itemCards: items.map((item) => ({
          card: {
            info: {
              id: String(globalItemId++),
              ...item,
            },
          },
        })),
      },
    },
  };
};

// Generates a full mock menu response for a given restaurant ID,
// pulling matching restaurant info from MOCK_RESTAURANTS and
// building categories from its cuisines list.
export const generateMockMenu = (resId) => {
  const restaurant = MOCK_RESTAURANTS.data.cards[2]?.card?.card?.gridElements
    ?.infoWithStyle?.restaurants?.find((r) => r.info.id === String(resId));

  const info = restaurant?.info || {
    id: String(resId),
    name: "Restaurant Not Found",
    cuisines: ["North Indian"],
    avgRating: 4.0,
    totalRatingsString: "1K+ ratings",
    costForTwoMessage: "₹300 for two",
    sla: { slaString: "30 MINS" },
  };

  const categories = info.cuisines
    .map((cuisine, idx) => buildCategory(idx === 0 ? "Recommended" : cuisine, cuisine))
    .filter(Boolean);

  // Always add a Beverages and Desserts section for realism,
  // avoiding duplicates if already covered by the restaurant's cuisines.
  if (!info.cuisines.includes("Beverages")) {
    categories.push(buildCategory("Beverages", "Beverages"));
  }
  if (!info.cuisines.includes("Desserts")) {
    categories.push(buildCategory("Desserts", "Desserts"));
  }

  return {
    data: {
      cards: [
        {}, {}, // placeholder positions matching real API offsets
        {
          card: {
            card: {
              info,
            },
          },
        },
        {},
        {
          groupedCard: {
            cardGroupMap: {
              REGULAR: {
                cards: categories,
              },
            },
          },
        },
      ],
    },
  };
};

export default generateMockMenu;
