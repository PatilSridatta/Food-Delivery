import { Link } from "react-router-dom";

const RestaurantCard = ({ resData }) => {
  const { id, name, cuisines, avgRating, costForTwoMessage, sla } = resData.info;

  return (
    <Link to={"/restaurants/" + id} className="res-card">
      <div className="res-card-content">
        <h3>{name}</h3>
        <p>{cuisines.join(", ")}</p>
        <p>{avgRating} stars</p>
        <p>{costForTwoMessage}</p>
        <p>{sla?.slaString}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;