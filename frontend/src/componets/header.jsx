import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useLogoutUserMutation } from "../redux/features/auth-api-slice";
import { logout } from "../redux/features/auth-slice";

const Header = () => {
  const products = useSelector((state) => state.cart.products);
  const [showDropDown, setShowDropDown] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const adminDropDownMenus = [
    { lable: "Dashboard", path: "/dashboard/admin" },
    { lable: "Manage Items", path: "/dashboard/manage-products" },
    { lable: "All Orders", path: "/dashboard/manage-orders" },
    { lable: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  const userDropDownMenus = [
    { lable: "Dashboard", path: "/dashboard" },
    { lable: "Profile", path: "/dashboard/profile" },
    { lable: "Payments", path: "/dashboard/payments" },
    { lable: "Orders", path: "/dashboard/add-new-post" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
            {user && (
              <Link to="cart" className=" hover:text-[#ed3849] relative">
                <HiOutlineShoppingBag className=" text-xl" />

                <sup
                  className=" text-sm absolute h-5 w-5 to-10% text-white rounded-full bg-[#ed3849] text-center
            "
                >
                  {products.length}
                </sup>
              </Link>
            )}
          </span>
          <span style={{ marginBottom: "6px" }} className=" mb-3">
            {user ? (
              <div className="relative">
                <img
                  onClick={() => setShowDropDown(!showDropDown)}
                  className="size-8 rounded-full cursor-pointer shadow-gray-900 border border-gray-200"
                  src={user?.profileImage || avatarImg}
                  alt="User Avatar"
                />

                {showDropDown && (
                  <div
                    className="absolute right-0 bg-white shadow-md rounded-lg w-48 z-40 border border-gray-200"
                    style={{ marginTop: "8px", padding: "10px" }}
                  >
                    {/* <ul style={{ padding: "5px" }}>
                      {dropdownMenus.map((menu, index) => (
                        <li key={index} style={{ marginBottom: "4px" }}>
                          <Link
                            className="block w-full text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
                            to={menu.path}
                            style={{ padding: "8px 12px" }}
                          >
                            {menu.lable}
                          </Link>
                        </li>
                      ))}
                    </ul> */}

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white font-semibold hover:bg-red-100 hover:text-black rounded-md transition duration-200"
                      style={{ padding: "8px 12px", marginTop: "10px" }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="login">
                <FaRegUser className="text-xl" />
              </Link>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
