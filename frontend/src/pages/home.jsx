import Banner from "../componets/banner";
import Categories from "../componets/categories";
import HeroSection from "../componets/hero-section";
import TrendingProducts from "./trending-products";

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <HeroSection />
      <TrendingProducts />
    </>
  );
};

export default Home;
