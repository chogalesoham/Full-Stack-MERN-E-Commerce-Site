import { Link } from "react-router-dom";
import category1 from "../assets/category-1.jpg";
import category2 from "../assets/category-2.jpg";
import category3 from "../assets/category-3.jpg";
import category4 from "../assets/category-4.jpg";
const Categories = () => {
  const categories = [
    {
      name: "Accessories",
      path: "accessories",
      image: category1,
    },
    {
      name: "Accessories",
      path: "accessories",
      image: category2,
    },
    {
      name: "Accessories",
      path: "accessories",
      image: category3,
    },
    {
      name: "Accessories",
      path: "accessories",
      image: category4,
    },
  ];
  return (
    <>
      <div className=" product__grid p-3">
        {categories.map((item, index) => (
          <Link
            className=" categories__card border border-amber-600 rounded-xl py-3 hover:bg-orange-50"
            key={index}
            to={`/${item?.path}`}
          >
            <img src={item?.image} alt={item?.name} />
            <h4 className=" my-2">{item?.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
