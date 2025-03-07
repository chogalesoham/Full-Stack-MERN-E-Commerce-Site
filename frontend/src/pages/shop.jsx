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

  const startProduct = (currentPage - 1) * productPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

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
              className=" text-xl font-semibold"
            >
              Showing {startProduct} to {endProduct} of {totalProducts} Products
            </h3>
            <hr style={{ marginBottom: "15px" }} className="text-gray-300" />
            <ProductsCards products={products} />

            {/* pagination controls */}
            <div style={{ marginTop: "40px" }} className="flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ padding: "8px 15px" }}
                className={` bg-gray-300 text-gray-700 rounded-md ${
                  currentPage === 1 ? " cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  onClick={() => handlePageChange(index + 1)}
                  style={{ padding: "8px 15px", margin: "0 5px" }}
                  className={` rounded-md cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ padding: "8px 15px" }}
                className={` bg-gray-300 text-gray-700 rounded-md ${
                  currentPage === totalPages
                    ? " cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
