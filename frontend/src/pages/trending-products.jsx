import { useState } from "react";
import ProductCard from "../componets/product-card";

import products from "../data/products.json";
import { useGetTrandingProductsQuery } from "../redux/features/products-slice";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const lodeMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 10);
  };

  const { data, isError, isLoading } = useGetTrandingProductsQuery();
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <section className=" section__container produt__container">
      <h2 className=" section__header">Trending Products</h2>
      <p style={{ marginBottom: "40px" }} className=" section__subheader ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quis
        repudiandae recusandae ducimus magnam.
      </p>

      {/* Product Cards */}

      <ProductCard products={data?.products?.slice(0, visibleProducts)} />

      {/* lode more button */}
      <div style={{ marginTop: "40px" }} className=" product__btn">
        {visibleProducts < products.length && (
          <button onClick={lodeMoreProducts} className=" btn">
            Lode More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
