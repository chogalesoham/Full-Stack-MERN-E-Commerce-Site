import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../componets/product-card";

const Categories = () => {
  const { categoryName } = useParams();
  const [filterdProducts, setFilterdProducts] = useState([]);

  useEffect(() => {
    const filterProducts = products.filter(
      (product) => product?.category == categoryName.toLocaleLowerCase()
    );
    setFilterdProducts(filterProducts);
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <section
        style={{ marginTop: "10px" }}
        className=" section__container bg-[#f4e5ec] rounded-lg"
      >
        <h2 className=" section__header capitalize">{categoryName}</h2>
        <p className=" section__subheader">
          consectetur adipisicing elit. Officiis doloremque delectus eum aperiam
          ut laudantium architecto iure molestias enim perspiciatis!
        </p>
      </section>

      {/* producrs cards */}
      <div className=" section__container">
        <ProductCard products={filterdProducts} />
      </div>
    </>
  );
};

export default Categories;
