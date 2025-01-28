import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import RatingStar from "./rating-star";
const ProductCard = ({ products }) => {
  console.log("products:", products);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((item, index) => (
        <div key={index} className=" product__card relative shadow rounded-lg">
          <div>
            <Link to={`/shop/${item?._id}`}>
              <img
                style={{ padding: "10px" }}
                src={item?.image}
                alt={item?.name}
                className=" max-h-96 md:h-64 w-fit object-cover hover:scale-105 transition-all duration-300 rounded-lg"
              />
            </Link>
          </div>

          <div className=" product__card__content">
            <h4>{item?.name}</h4>
            <p>
              {item?.price}
              {item?.oldPrice ? <s>{item?.oldPrice}</s> : null}
            </p>
            <RatingStar ratings={item?.rating} />
          </div>
          <div className=" hover:block absolute bottom-3 right-3">
            <button>
              <MdAddShoppingCart
                style={{ padding: "4px" }}
                className=" bg-red-600 text-white hover:bg-red-700 h-8 w-8  rounded-lg cursor-pointer"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
