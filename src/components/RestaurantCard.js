import { Link } from "react-router-dom";

const RestaurantCard = ({ resData }) => {
  const { id, name, cuisines, avgRating, costForTwoMessage, sla } = resData.info;

  return (
    <Link to={"/restaurants/" + id} className="res-card flexflex-col items-center justify-center rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="res-card-content px-6 pt-[140px] m-4 w-[300px] h-[300px] border-2 bg-red-100 border-solid border-black rounded-lg">
        <h3 className="font-bold">{name}</h3>
        <p>{cuisines.join(", ")}</p>
        <p>{avgRating} stars</p>
        <p>{costForTwoMessage}</p>
        <p>{sla?.slaString}</p>
      </div>
    </Link>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute bg-black text-white px-2 py-1 rounded-lg z-10">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    )
  }
}

export default RestaurantCard;