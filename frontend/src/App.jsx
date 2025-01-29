import { Outlet } from "react-router-dom";
import "../src/App.css";
import Header from "./componets/header";
import Footer from "./componets/footer";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <div className=" footer__bar">
        Copyright ©️ 2025 Soahm Chogale. All Right Reserved
      </div>
    </div>
  );
};

export default App;
