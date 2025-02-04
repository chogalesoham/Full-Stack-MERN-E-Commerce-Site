import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import RatingStar from "../componets/rating-star";

const SingleProduct = () => {
  const { id } = useParams();
  // console.log("prosuct id", id);

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
          <RiArrowRightSLine />s
          <span className=" hover:text-red-600">
            <Link to="/shop">Shop</Link>
          </span>
          <RiArrowRightSLine />
          <span className=" hover:text-red-600">Products NAme</span>
        </div>
      </section>

      <section className=" section__container mt-8">
        <div className=" flex flex-col items-center md:flex-row gap-8">
          <div className=" md:w-1/2 w-full">
            <img
              className=" rounded-lg"
              src="https://plus.unsplash.com/premium_photo-1664298355914-bc65d2c9af64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div className=" md:w-1/2 w-full">
            <h3 className=" text-2xl font-semibold margin-b">Product Name</h3>
            <p className=" text-xl text-red-600 margin-b">
              $100 <s>$110</s>
            </p>
            <p className=" text-gray-700 margin-b">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias eos sint at, quaerat labore non! Sunt distinctio vero
              similique sapiente libero explicabo at voluptatum maxime
              laudantium! Consequuntur eum suscipit incidunt.
            </p>
            <div>
              <p className="margin-b">
                <strong>Category: </strong> Accessories
              </p>
              <p className=" margin-b">
                <strong>Color: </strong> Black
              </p>
              <div className=" flex gap-1 items-center margin-b">
                <strong>Rating: </strong>
                <RatingStar ratings={"4"} />
              </div>
            </div>
            <button className="search-button bg-red-600 text-white cursor-pointer hover:bg-red-800">
              Add to Card
            </button>
          </div>
        </div>
      </section>

      <section className=" section__container">Review Here</section>
    </>
  );
};

export default SingleProduct;
