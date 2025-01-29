import Banner from "../componets/banner";
import Categories from "../componets/categories";
import DealsSection from "../componets/deals-section";
import HeroSection from "../componets/hero-section";
import PromoBanner from "../componets/promo-banner";
import TrendingProducts from "./trending-products";

const Home = () => {
  return (
    <>
      <Banner />
      <Categories />
      <HeroSection />
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
    </>
  );
};

export default Home;
