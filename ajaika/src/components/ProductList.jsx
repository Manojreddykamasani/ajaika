import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList({ cartItems, setCartItems, products }) {
  const navigate = useNavigate();
  const itemsPerCategory = 4; // Show limited items per category

  // Group products by category
  const categorizedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const getCartItem = (productId) => cartItems.find((item) => item.id === productId) || { quantity: 0 };

  const addToCart = (productId) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      return existingItem
        ? prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
        : [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {Object.entries(categorizedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="mb-12">
            {/* Category Heading with "Show All" Link */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{category}</h2>
              <button
                className="text-blue-600 text-lg font-semibold hover:underline"
                onClick={() => navigate(`/category/${category.replace(/\s+/g, "-").toLowerCase()}`)}
              >
                Show All →
              </button>
            </div>

            {/* Display Limited Items Per Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.slice(0, itemsPerCategory).map((product) => {
                const { quantity } = getCartItem(product.id);

                return (
                  <div
                    key={product.id}
                    className="relative group cursor-pointer transition-transform duration-300 transform hover:scale-105"
                    onClick={() => navigate(`/product/${product.title.replace(/\s+/g, "-").toLowerCase()}`)}
                  >
                    {/* Product Image (Ensuring Proper Fit) */}
                    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden flex justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="mt-3 flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900 truncate w-3/4">{product.title}</h3>
                      <p className="text-lg font-semibold text-gray-700">{`$${product.price}`}</p>
                    </div>

                    {/* Add to Cart Section */}
                    <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 p-3 hidden group-hover:flex flex-col items-center gap-2">
                      {quantity > 0 ? (
                        <div className="flex items-center">
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded-md"
                            onClick={(e) => { e.stopPropagation(); removeFromCart(product.id); }}
                          >
                            -
                          </button>
                          <span className="mx-2 text-lg font-semibold">{quantity}</span>
                          <button
                            className="px-3 py-1 bg-green-500 text-white rounded-md"
                            onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-blue-700"
                          onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
