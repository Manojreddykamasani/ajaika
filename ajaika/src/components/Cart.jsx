import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ open, setOpen, cartItems, products }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const extractPrice = (price) => {
    if (typeof price === "string") {
      const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    return typeof price === "number" ? price : 0;
  };

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    const price = extractPrice(product?.price);
    return total + price * (cartItem.quantity || 1);
  }, 0);

  const handleNavigate = (product) => {
    navigate(`/product/${product.title.replace(/\s+/g, "-").toLowerCase()}`)
    setOpen(false)
  };
  

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/20 transition-opacity"
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`relative w-80 sm:w-96 bg-white shadow-xl h-full overflow-y-auto transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b bg-gray-100">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-gray-900">
            ✖
          </button>
        </div>

        <div className="p-4 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((cartItem, index) => {
              const product = products.find((p) => p.id === cartItem.id);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2 cursor-pointer"
                  onClick={() => handleNavigate(product)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product?.image || "https://via.placeholder.com/50"}
                      alt={product?.title || "Unnamed Item"}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-gray-800 font-medium">{product?.title || "Unnamed Item"}</p>
                      <p className="text-gray-600 text-sm">${extractPrice(product?.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="text-gray-800 font-semibold">x{cartItem.quantity || 1}</span>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-100">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 bg-[#ffb800] text-white py-2 rounded-lg hover:bg-[#e69e00]">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
