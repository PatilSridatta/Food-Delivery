import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import MOCK_RESTAURANTS from "../utils/mockRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTopRated, setIsTopRated] = useState(false);
  const [filterBtn, setFilterBtn] = useState("Top Rated Restaurants");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const restaurants = MOCK_RESTAURANTS?.data?.cards?.find(
      (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setListOfRestaurants(restaurants || []);
    setFilteredRestaurants(restaurants || []);
  };

  const isOnline = useOnlineStatus();
  if (isOnline === false)
    return <h1>🔴 You are offline, please check your internet connection!</h1>;

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body bg-blue-100">
      <div className="filter flex pl-28">
        <div className="m-4 p-4">
          <input
            id="search-box"
            type="text"
            className="search-box border-2 border-solid border-black p-2 rounded-lg bg-red-100"
            value={searchText}
            placeholder="Search for restaurants"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="border-2 border-solid border-black p-2 m-2 rounded-lg bg-red-100 px-3"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="mt-6 p-4">
          <button
            className="filter-btn flex border-2 border-solid border-black p-2 px-10 rounded-lg bg-red-100 items-center"
            onClick={() => {
              if (filteredRestaurants.length === listOfRestaurants.length) {
                setFilteredRestaurants(
                  listOfRestaurants.filter((res) => res.info.avgRating >= 4),
                );
                setFilterBtn("All Restaurants");
              } else {
                setFilteredRestaurants(listOfRestaurants);
                setFilterBtn("Top Rated Restaurants");
              }
            }}
          >
            {filterBtn}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurants.map((restaurant) =>
          restaurant.info?.avgRating < 4 ? (
            <RestaurantCardPromoted
              key={restaurant.info.id}
              resData={restaurant}
            />
          ) : (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ),
        )}
      </div>
    </div>
  );
};

export default Body;
