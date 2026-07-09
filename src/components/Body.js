import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import MOCK_RESTAURANTS from "../utils/mockRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTopRated, setIsTopRated] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

 const fetchData = async () => {
  const restaurants =
    MOCK_RESTAURANTS?.data?.cards?.find(
      (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  setListOfRestaurants(restaurants || []);
  setFilteredRestaurants(restaurants || []);
};

const isOnline = useOnlineStatus();
if(isOnline === false) return <h1>🔴 You are offline, please check your internet connection!</h1>;

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            id="search-box"
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
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
        <button
  className="filter-btn"
  onClick={() => {
    if (filteredRestaurants.length === listOfRestaurants.length) {
      setFilteredRestaurants(
        listOfRestaurants.filter(
          (res) => res.info.avgRating > 4
        )
      );
    } else {
      setFilteredRestaurants(listOfRestaurants);
    }
  }}
>
  Top Rated Restaurants
</button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
