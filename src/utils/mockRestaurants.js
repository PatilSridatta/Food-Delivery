// Mock data shaped exactly like Swiggy's real
// /dapi/restaurants/list/v5 response, so it plugs into
// your existing Body.js parsing logic with zero changes:
//
//   json?.data?.cards
//     ?.find(c => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
//     ?.card?.card?.gridElements?.infoWithStyle?.restaurants

const restaurantNames = [
  { name: "RNR Biryani - Taste of 1953", cuisines: ["Biryani", "South Indian"] },
  { name: "Meghana Foods", cuisines: ["Biryani", "Andhra"] },
  { name: "Truffles", cuisines: ["American", "Burgers", "Continental"] },
  { name: "Empire Restaurant", cuisines: ["Mughlai", "North Indian", "Chinese"] },
  { name: "Domino's Pizza", cuisines: ["Pizzas", "Italian", "Fast Food"] },
  { name: "McDonald's", cuisines: ["Burgers", "Fast Food", "Beverages"] },
  { name: "KFC", cuisines: ["Fast Food", "Burgers", "Biryani"] },
  { name: "Kanti Sweets", cuisines: ["Sweets", "North Indian", "Snacks"] },
  { name: "Nagarjuna", cuisines: ["Andhra", "South Indian", "Biryani"] },
  { name: "The Belgian Waffle Co.", cuisines: ["Desserts", "Waffles", "Beverages"] },
  { name: "Chinita Real Mexican Food", cuisines: ["Mexican", "American"] },
  { name: "Onesta", cuisines: ["Pizzas", "Italian", "Cafe"] },
  { name: "Punjabi Tadka", cuisines: ["North Indian", "Punjabi"] },
  { name: "Sri Krishna Sagar", cuisines: ["South Indian", "North Indian", "Chinese"] },
  { name: "Wow! Momo", cuisines: ["Tibetan", "Momos", "Chinese"] },
  { name: "Third Wave Coffee", cuisines: ["Beverages", "Cafe", "Desserts"] },
  { name: "Behrouz Biryani", cuisines: ["Biryani", "Mughlai", "Kebabs"] },
  { name: "Faasos", cuisines: ["Wraps", "Fast Food", "Rolls"] },
  { name: "Chaayos", cuisines: ["Beverages", "Cafe", "Snacks"] },
  { name: "Natural Ice Cream", cuisines: ["Desserts", "Ice Cream"] },
];

const areas = [
  "Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "BTM Layout",
  "Jayanagar", "JP Nagar", "Marathahalli", "Bellandur", "Electronic City",
];

const generateRestaurants = () =>
  restaurantNames.map((r, index) => {
    const id = String(100000 + index);
    return {
      info: {
        id,
        name: r.name,
        cloudinaryImageId: "sample-food-image", // placeholder, real API returns a Cloudinary hash
        cuisines: r.cuisines,
        avgRating: Number((3.5 + Math.random() * 1.4).toFixed(1)),
        avgRatingString: (3.5 + Math.random() * 1.4).toFixed(1),
        totalRatingsString: `${(Math.floor(Math.random() * 9) + 1)}${Math.random() > 0.5 ? "K" : "00"}+ ratings`,
        costForTwo: `₹${(200 + index * 15)} for two`,
        costForTwoMessage: `₹${(200 + index * 15)} for two`,
        deliveryTime: 20 + (index % 6) * 5,
        sla: {
          deliveryTime: 20 + (index % 6) * 5,
          slaString: `${20 + (index % 6) * 5} MINS`,
          lastMileTravel: 2.3,
        },
        locality: areas[index % areas.length],
        areaName: areas[index % areas.length],
        city: "Bangalore",
        veg: r.cuisines.includes("South Indian") && index % 3 === 0,
        offerText: index % 4 === 0 ? "50% OFF up to ₹100" : null,
      },
    };
  });

const MOCK_RESTAURANTS = {
  data: {
    cards: [
      {}, // ad card placeholder (position 0 in real API)
      {}, // carousel placeholder (position 1 in real API)
      {
        card: {
          card: {
            gridElements: {
              infoWithStyle: {
                restaurants: generateRestaurants(),
              },
            },
          },
        },
      },
    ],
  },
};

export default MOCK_RESTAURANTS;
