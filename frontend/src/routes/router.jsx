import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home.jsx";
import Categories from "../pages/categories.jsx";
import Search from "../pages/search.jsx";
import Shop from "../pages/shop.jsx";
import SingleProduct from "../pages/single-product.jsx";
import Cart from "../pages/cart.jsx";
import Login from "../pages/login.jsx";
import Register from "../pages/ragister.jsx";
import About from "../pages/about.jsx";
import Contact from "../pages/contact.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:categoryName",
        element: <Categories />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
