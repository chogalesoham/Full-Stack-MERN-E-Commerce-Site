import { FaTruckFast } from "react-icons/fa6";
import { AiOutlineDollar } from "react-icons/ai";
import { RiUserVoiceFill } from "react-icons/ri";

const PromoBanner = () => {
  return (
    <section className=" section__container banner__container">
      <div className=" banner__card border border-orange-400 hover:bg-orange-50 pp-3 rounded-lg cursor-pointer">
        <span>
          <FaTruckFast />
        </span>
        <h4>Free Delivery</h4>
        <p>Offers convenience and ability to shop from anywhere, anytime.</p>
      </div>
      <div className=" banner__card border border-orange-400 hover:bg-orange-50 pp-3 rounded-lg cursor-pointer">
        <span>
          <AiOutlineDollar />
        </span>
        <h4>100% Money Back Guranty</h4>
        <p>Offers convenience and ability to shop from anywhere, anytime.</p>
      </div>
      <div className=" banner__card border border-orange-400 hover:bg-orange-50 pp-3 rounded-lg cursor-pointer">
        <span>
          <RiUserVoiceFill />
        </span>
        <h4>Strong Support</h4>
        <p>Offers convenience and ability to shop from anywhere, anytime.</p>
      </div>
    </section>
  );
};

export default PromoBanner;
