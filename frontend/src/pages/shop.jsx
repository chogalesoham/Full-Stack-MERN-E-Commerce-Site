import { useEffect, useState } from "react";
import productData from "../data/products.json";
import ProductsCards from "../componets/product-card";
import ShopFiltering from "../componets/shop-filtering";
import { useGetAllProductsQuery } from "../redux/features/products-slice";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const Shop = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map((number) => number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useGetAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productPerPage,
  });

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  if (isLoading) {
    return <div>Loding....</div>;
  }
  if (error) {
    return <div>Erroor....</div>;
  }

  return (
    <>
      <section
        style={{ marginTop: "10px", padding: "2rem 1rem" }}
        className=" section__container bg-[#f4e5ec] rounded-lg"
      >
        <h2 className=" section__header capitalize">Shop</h2>
        <p className=" section__subheader">
          Officiis doloremque delectus eum aperiam ut laudantium architecto iure
          molestias enim perspiciatis!
        </p>
      </section>
      <section className=" section__container">
        <div className=" flex flex-col md:flex-row gap-8 ">
          {/* Left side */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Right side */}
          <div className="md:w-[80%]">
            <h3
              style={{ marginBottom: "10px" }}
              className=" text-xl font-medium"
            >
              Products Availables {products.length}
            </h3>
            <ProductsCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
