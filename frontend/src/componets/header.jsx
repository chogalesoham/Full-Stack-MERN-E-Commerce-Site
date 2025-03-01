import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const products = useSelector((state) => state.cart.products);

  return (
    <header className="fixed-nav-bar w-nav shadow bg-[#f5eff2]">
      <nav className=" container mx-auto px-4 flex justify-between items-center">
        <ul className=" nav__links">
          <li className=" link">
            <Link to="/">Home</Link>
          </li>
          <li className=" link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className=" link">
            <Link to="/about">About</Link>
          </li>
          <li className=" link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className=" nav__logo">
          <Link to="/">
            Lebaba <span>.</span>
          </Link>
        </div>
        <div className=" nav__icons relative">
          <span>
            <Link to="/search">
              <IoSearch className=" text-xl" />
            </Link>
          </span>
          <span>
            <Link to="cart" className=" hover:text-[#ed3849] relative">
              <HiOutlineShoppingBag className=" text-xl" />

              <sup
                className=" text-sm absolute h-5 w-5 to-10% text-white rounded-full bg-[#ed3849] text-center
            "
              >
                {products.length}
              </sup>
            </Link>
          </span>
          <span style={{ marginBottom: "6px" }} className=" mb-3">
            <Link to="login">
              <FaRegUser className=" text-xl" />
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
