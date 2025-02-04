import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home.jsx";
import Categories from "../pages/categories.jsx";
import Search from "../pages/search.jsx";
import Shop from "../pages/shop.jsx";
import SingleProduct from "../pages/single-product.jsx";
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
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/about",
        element: <div>About page</div>,
      },
      {
        path: "/contact",
        element: <div>Contact page</div>,
      },
    ],
  },
]);

export default router;
