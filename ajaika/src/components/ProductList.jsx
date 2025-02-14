import React, { useState } from "react";
import { X } from "lucide-react";
import Product from "./Product";

export default function ProductList({cartItems,setCartItems,products}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getCartItem = (productId) => cartItems.find((item) => item.id === productId) || { quantity: 0 };

  const addToCart = (productId) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, { id: productId, quantity: 1 }];
      }
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            const { quantity } = getCartItem(product.id);

            return (
              <div key={product.id}>
                {selectedProduct === product.id ? (
                  <div className="relative product-modal flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white w-full max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                      onClick={() => setSelectedProduct(null)}
                    >
                      <X size={24} />
                    </button>
                    <img src={product.imageSrc} alt={product.imageAlt} className="w-full rounded-lg" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">{product.color}</p>
                    <p className="text-lg font-medium text-gray-900">{product.price}</p>

                    {quantity > 0 ? (
                      <div className="flex items-center mt-4">
                        <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => removeFromCart(product.id)}>-</button>
                        <span className="mx-2 text-lg font-semibold">{quantity}</span>
                        <button className="px-3 py-1 bg-green-500 text-white rounded-md" onClick={() => addToCart(product.id)}>+</button>
                      </div>
                    ) : (
                      <button
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}

                    <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-green-700">
                      Buy Now
                    </button>
                  </div>
                ) : (
                  <div onClick={() => setSelectedProduct(product.id)}>
                    <Product product={product} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
