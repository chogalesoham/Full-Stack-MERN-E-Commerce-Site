import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <div className=" w-full bg-[#f5eff2]">
      <footer className=" section__container footer__container ">
        <div className=" footer__col">
          <h4 className=" uppercase">Conatct Info</h4>
          <p className=" flex items-center gap-1">
            <span>
              <FaMapMarkerAlt />
            </span>
            123, London Bridge Steet, London
          </p>
          <p className=" flex items-center  gap-1">
            <span>
              <IoMdMailUnread />
            </span>
            Chogalesoham74@gmail.com
          </p>
          <p className=" flex items-center  gap-1">
            <span>
              <FaPhone />
            </span>
            +91 70202 24131
          </p>
        </div>
        <div className=" footer__col">
          <h4 className=" uppercase">Company</h4>
          <Link to="/">Home</Link>
          <Link to="/">About Us</Link>
          <Link to="/">Work With Us</Link>
          <Link to="/">Our Blogs</Link>
          <Link to="/">Trems & Conditions </Link>
        </div>
        <div className=" footer__col">
          <h4 className=" uppercase">Useful Link</h4>
          <Link to="/">Help</Link>
          <Link to="/">Track Your Order</Link>
          <Link to="/">Men</Link>
          <Link to="/">Women</Link>
          <Link to="/">Dresses</Link>
        </div>
        <div className=" footer__col">
          <h4 className=" uppercase">Instagram</h4>
          <div className=" instagram__grid">
            <img className=" rounded-md" src={instaImg1} alt="Instagram" />
            <img className=" rounded-md" src={instaImg2} alt="Instagram" />
            <img className=" rounded-md" src={instaImg3} alt="Instagram" />
            <img className=" rounded-md" src={instaImg4} alt="Instagram" />
            <img className=" rounded-md" src={instaImg5} alt="Instagram" />
            <img className=" rounded-md" src={instaImg6} alt="Instagram" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
