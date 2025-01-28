import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RatingStar = ({ ratings }) => {
  const star = [];
  for (let i = 1; i <= 5; i++) {
    star.push(
      i <= ratings ? (
        <FaStar className="text-lg" key={i} />
      ) : (
        <FaRegStar className="text-lg" key={i} />
      )
    );
  }

  return (
    <div>
      <div className=" product__rating flex">{star}</div>
    </div>
  );
};

export default RatingStar;
