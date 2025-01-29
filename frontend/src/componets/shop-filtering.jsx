import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  const [dropDown, setDropDown] = useState({
    category: true,
    colors: true,
    priceRanges: true,
  });

  // Check screen width on mount
  useEffect(() => {
    if (window.innerWidth < 600) {
      setDropDown({ category: false, colors: false, priceRanges: false });
    }
  }, []);

  return (
    <div className="space-y-5 flex-shrink-0 flex flex-col items-start justify-start gap-6 md:w-[15%]">
      <h3 className="text-xl font-medium mb-4">Filters</h3>

      {/* Filter by Category */}
      <div className="flex flex-col space-y-2 gap-1 w-full">
        <div
          style={{ padding: "10px 0px" }}
          className="flex items-center justify-between w-full border-b cursor-pointer"
          onClick={() =>
            setDropDown((prev) => ({ ...prev, category: !prev.category }))
          }
        >
          <h4 className="font-medium text-lg">Category</h4>
          <IoIosArrowDown
            className={`transition-transform ${
              dropDown.category ? "rotate-180" : ""
            }`}
          />
        </div>

        {dropDown.category &&
          filters.categories.map((category) => (
            <label
              key={category}
              className="capitalize cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                value={category}
                checked={filtersState.category === category}
                onChange={(e) =>
                  setFiltersState({ ...filtersState, category: e.target.value })
                }
              />
              <span>{category}</span>
            </label>
          ))}
      </div>

      {/* Filter by Colors */}
      <div className="flex flex-col space-y-2 gap-1 w-full">
        <div
          style={{ padding: "10px 0px" }}
          className="flex items-center justify-between w-full border-b cursor-pointer"
          onClick={() =>
            setDropDown((prev) => ({ ...prev, colors: !prev.colors }))
          }
        >
          <h4 className="font-medium text-lg">Colors</h4>
          <IoIosArrowDown
            className={`transition-transform ${
              dropDown.colors ? "rotate-180" : ""
            }`}
          />
        </div>

        {dropDown.colors &&
          filters.colors.map((color) => (
            <label
              key={color}
              className="capitalize cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                value={color}
                checked={filtersState.color === color}
                onChange={(e) =>
                  setFiltersState({ ...filtersState, color: e.target.value })
                }
              />
              <span>{color}</span>
            </label>
          ))}
      </div>

      {/* Filter by Price */}
      <div className="flex flex-col space-y-2 gap-1 w-full">
        <div
          style={{ padding: "10px 0px" }}
          className="flex items-center justify-between w-full border-b cursor-pointer"
          onClick={() =>
            setDropDown((prev) => ({ ...prev, priceRanges: !prev.priceRanges }))
          }
        >
          <h4 className="font-medium text-lg">Price Ranges</h4>
          <IoIosArrowDown
            className={`transition-transform ${
              dropDown.priceRanges ? "rotate-180" : ""
            }`}
          />
        </div>

        {dropDown.priceRanges &&
          filters.priceRanges.map((range) => (
            <label
              key={range.label}
              className="capitalize cursor-pointer flex items-center gap-2"
            >
              <input
                type="radio"
                value={`${range.min} - ${range.max}`}
                checked={
                  filtersState.priceRange === `${range.min} - ${range.max}`
                }
                onChange={(e) =>
                  setFiltersState({
                    ...filtersState,
                    priceRange: e.target.value,
                  })
                }
              />
              <span>{range.label}</span>
            </label>
          ))}
      </div>

      {/* Clear Filters Button */}
      <button
        style={{ padding: "5px 10px" }}
        className="bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        onClick={clearFilters}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
