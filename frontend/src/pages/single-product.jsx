import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import RatingStar from "../componets/rating-star";
import { useDispatch } from "react-redux";
import { useGetSingleProductQuery } from "../redux/features/products-slice";
import { addToCart } from "../redux/features/cart-slice";
import toast from "react-hot-toast";
import ReviewSection from "../componets/review-section";

const SingleProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetSingleProductQuery(id);

  const SingleProduct = data?.product || {};
  const productReview = data?.reviews || {};

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart", {
      duration: 2000,
      position: "top-right",
    });
  };

  console.log(SingleProduct, productReview);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error....</div>;
  }
  return (
    <>
      <section
        style={{ marginTop: "10px" }}
        className=" section__container bg-[#f4e5ec] rounded-lg"
      >
        <h2 className=" section__header capitalize">Single Products Page</h2>
        <div className=" flex items-center justify-center section__subheader space-x-2">
          <span className=" hover:text-red-600">
            <Link to="/">Home</Link>
          </span>
          <RiArrowRightSLine />
          <span className=" hover:text-red-600">
            <Link to="/shop">Shop</Link>
          </span>
          <RiArrowRightSLine />
          <span className=" hover:text-red-600">{SingleProduct?.name}</span>
        </div>
      </section>

      <section className=" section__container mt-8">
        <div className=" flex flex-col items-center md:flex-row gap-8">
          <div className=" md:w-1/2 w-full">
            <img className=" rounded-lg" src={SingleProduct?.image} />
          </div>
          <div className=" md:w-1/2 w-full">
            <h3 className=" text-2xl font-semibold margin-b">
              {SingleProduct?.name}
            </h3>
            <p className=" text-xl text-red-600 margin-b">
              ${SingleProduct?.price}
              {"  "}
              {SingleProduct?.oldPrice && <s> ${SingleProduct?.oldPrice}</s>}
            </p>
            <p className=" text-gray-700 margin-b">
              {SingleProduct?.description}
            </p>
            <div>
              <p className="margin-b">
                <strong>Category: </strong> {SingleProduct?.category}
              </p>
              <p className=" margin-b">
                <strong>Color: </strong> {SingleProduct?.color}
              </p>
              <div className=" flex gap-1 items-center margin-b">
                <strong>Rating: </strong>
                <RatingStar ratings={SingleProduct?.rating} />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(SingleProduct);
              }}
              className="search-button bg-red-600 text-white cursor-pointer hover:bg-red-800"
            >
              Add to Card
            </button>
          </div>
        </div>
      </section>

      {/* Review Section */}

      <ReviewSection productReview={productReview} />
    </>
  );
};

export default SingleProduct;
