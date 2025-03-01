import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (state) => state.cart
  );

  return (
    <div
      style={{ padding: "24px" }}
      className="w-full lg:w-[30%] h-auto lg:h-[80%] bg-[#f4e5ec] rounded-lg shadow-lg"
    >
      <h2
        style={{ marginBottom: "16px" }}
        className="text-2xl font-bold text-gray-900"
      >
        Order Summary
      </h2>
      <div>
        <div
          style={{ marginBottom: "8px" }}
          className="flex justify-between text-lg text-gray-600"
        >
          <p>Total Items:</p>
          <p className="font-semibold text-gray-800">{selectedItems}</p>
        </div>
        <div
          style={{ marginBottom: "8px" }}
          className="flex justify-between text-lg text-gray-600"
        >
          <p>Total Price:</p>
          <p className="font-semibold text-gray-800">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <div
          style={{ marginBottom: "8px" }}
          className="flex justify-between text-lg text-gray-600"
        >
          <p>Tax ({(taxRate * 100).toFixed(2)}%):</p>
          <p className="font-semibold text-gray-800">${tax.toFixed(2)}</p>
        </div>
        <div
          style={{ marginTop: "12px", paddingTop: "8px" }}
          className="flex justify-between text-lg font-bold text-gray-900 border-t"
        >
          <p>Grand Total:</p>
          <p>${grandTotal.toFixed(2)}</p>
        </div>
        <div style={{ marginTop: "16px" }} className="flex flex-col gap-3">
          <button
            style={{ padding: "10px" }}
            className="bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
          <button
            style={{ padding: "10px" }}
            className="bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
