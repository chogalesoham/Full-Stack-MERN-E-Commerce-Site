const CartModal = ({ products, isCartOpen, setIsCartOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-end ${
        isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-300 bg-black/50`}
      onClick={() => setIsCartOpen(false)} // Close when clicking outside
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pp-3 mm">
          <h4>Your Cart</h4>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
