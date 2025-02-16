import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function SingleProduct({ cartItems, setCartItems, products }) {
  const { name } = useParams();
  const product = products.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!product) {
    return <h2 className="text-center text-red-500 text-xl mt-5">Product Not Found</h2>;
  }

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const addToCart = () => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      return existingItem
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { id: product.id, name: product.title, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = () => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (!existingItem) return prev;

      return existingItem.quantity > 1
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
          )
        : prev.filter((item) => item.id !== product.id);
    });
  };

  // Rating System
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col md:flex-row items-center mt-10 px-4 max-w-6xl mx-auto gap-8">
      
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-[400px] sm:max-w-[500px] max-h-[400px] sm:max-h-[500px] object-contain rounded-lg shadow-md"
        />
      </div>

      
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
        <p className="text-lg font-semibold text-gray-700 mt-1">${product.price}</p>
        <p className="text-gray-600 mt-2">{product.description}</p>
        
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-lg font-medium text-yellow-500">⭐ {product.rating.rate}</span>
          <span className="text-gray-600">({product.rating.count} reviews)</span>
        </div>

        <div className="mt-6">
          {quantity > 0 ? (
            <div className="flex items-center bg-gray-200 px-6 py-2 rounded-lg shadow-md w-fit">
              <button
                className="text-xl font-bold px-4 text-gray-700 hover:text-gray-900"
                onClick={removeFromCart}
              >
                -
              </button>
              <span className="mx-4 text-lg">{quantity}</span>
              <button
                className="text-xl font-bold px-4 text-gray-700 hover:text-gray-900"
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
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Leave a Review</h3>

          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
              key={star}
              size={30}
              className={`cursor-pointer transition ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            />
            ))}
          </div>

          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Write your review here..."
          ></textarea>

          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition w-full">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;