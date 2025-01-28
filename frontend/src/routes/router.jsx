import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home.jsx";
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
        path: "/shop",
        element: <div>Shop page</div>,
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
