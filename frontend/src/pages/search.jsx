import { useState } from "react";
import productData from "../data/products.json";
import ProductCard from "../componets/product-card";

const Search = () => {
  const [searchQuery, setSearchQuuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = productData.filter(
      (item) =>
        item?.name.toLowerCase().includes(query) ||
        item?.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <section
        style={{ marginTop: "10px" }}
        className=" section__container bg-[#f4e5ec] rounded-lg"
      >
        <h2 className=" section__header capitalize">Search Products</h2>
        <p className=" section__subheader">
          consectetur adipisicing elit. Officiis doloremque delectus eum aperiam
          ut laudantium architecto iure molestias enim perspiciatis!
        </p>
      </section>
      <section className=" section__container">
        <div
          style={{ marginBottom: "50px" }}
          className=" w-full mb-10 flex items-center justify-center "
        >
          <input
            className=" search-bar w-full max-w-4xl p-2 border rounded-lg"
            value={searchQuery}
            type="text"
            onChange={(e) => setSearchQuuery(e.target.value)}
            placeholder="Search For Products..."
          />
          <button
            onClick={handleSearch}
            className="search-button  md:w-auto bg-red-600 text-white rounded-lg w-20"
          >
            Search
          </button>
        </div>

        <ProductCard products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
