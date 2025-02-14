import React from "react";

function SingleProduct({ cartItems, setCartItems, pid, products }) {
  const product = products.find((p) => p.id === pid);

  if (!product) {
    return <h2 className="text-center text-red-500 text-xl mt-5">Product Not Found</h2>;
  }
  const cartItem = cartItems.find((item) => item.id === pid);
  const quantity = cartItem ? cartItem.quantity : 0;

  const addToCart = () => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === pid);
      if (existingItem) {
        return prev.map((item) =>
          item.id === pid ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id: pid, name: product.name, price: product.price, quantity: 1 }];
      }
    });
  };

  const removeFromCart = () => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === pid);
      if (!existingItem) return prev; 

      if (existingItem.quantity > 1) {

        return prev.map((item) =>
          item.id === pid ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {

        return prev.filter((item) => item.id !== pid);
      }
    });
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <img
        src={product.imageSrc}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-lg shadow-md"
      />
      <h2 className="mt-4 text-2xl font-bold text-center">{product.name}</h2>
      <p className="text-gray-500">{product.color}</p>
      <p className="text-lg font-medium text-gray-900">{product.price}</p>
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        {quantity > 0 ? (
          <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg shadow-md">
            <button
              className="text-xl font-bold px-3 text-gray-700 hover:text-gray-900"
              onClick={removeFromCart}
            >
              -
            </button>
            <span className="mx-3 text-lg">{quantity}</span>
            <button
              className="text-xl font-bold px-3 text-gray-700 hover:text-gray-900"
              onClick={addToCart}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={addToCart}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        )}

        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default SingleProduct;
