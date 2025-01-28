import { Outlet } from "react-router-dom";
import "../src/App.css";
import Header from "./componets/header";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
