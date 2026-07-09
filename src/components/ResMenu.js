import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { generateMockMenu } from "../utils/mockMenu";


const ResMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);


const fetchMenu = async () => {
  const menuData = generateMockMenu(resId);
  setResInfo(menuData);
};

  if (resInfo === null) {
    return <div>Loading...</div>;
  }

  // Restaurant details
  const { name, cuisines, costForTwoMessage, avgRating, totalRatingsString } =
    resInfo?.data?.cards[2]?.card?.card?.info;

  // Menu categories — find() is safer than a hardcoded index here,
  // since this array's position can shift depending on offers/ads on the page
  const regularCards =
    resInfo?.data?.cards?.find(
      (c) => c?.groupedCard
    )?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = regularCards.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <p>
        {avgRating} ({totalRatingsString})
      </p>

      {categories.map((category) => {
        const { title, itemCards } = category.card.card;
        return (
          <div key={title}>
            <h2>{title}</h2>
            <ul>
              {itemCards.map((item) => (
                <li key={item.card.info.id}>
                  {item.card.info.name} - ₹{item.card.info.price / 100}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ResMenu;