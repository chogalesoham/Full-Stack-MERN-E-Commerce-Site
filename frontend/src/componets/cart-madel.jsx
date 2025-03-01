import { RxCross2 } from "react-icons/rx";
const CartModal = ({ products, isCartOpen, setIsCartOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-end ${
        isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-300 bg-black/50`}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{ transition: "transform 4.9s" }}
        className={`fixed right-0 top-0 sm:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pp-3 mm flex justify-between items-center">
          <h4 className=" text-2xl font-semibold">Your Shoping Cart</h4>
          <RxCross2
            className=" pp-2 text-2xl bg-red-600 text-white rounded-lg cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
        </div>
        <hr />
        <div>
          {products.map((product, index) => (
            <div
              key={index}
              className="pp-3 mm flex justify-between items-center"
            >
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  width={10}
                  height={10}
                  className="object-cover rounded-full"
                />
                <div className="pp-3">
                  <h4>{product.name}</h4>
                  <p>
                    {product.price} x {product.quantity}
                  </p>
                </div>
              </div>
              <div>
                <p>{product.price * product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
