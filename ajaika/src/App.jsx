import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import SingleProduct from "./components/SingleProduct";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const[pid,setPid]=useState(0);
  const products = [
    { id: 1, name: "Basic Tee", imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg", imageAlt: "Front of men's Basic Tee in black.", price: "$35", color: "Black" },
    { id: 2, name: "Stylish Jacket", imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg", imageAlt: "Front of stylish jacket in brown.", price: "$79", color: "Brown" },
    { id: 3, name: "Casual Sneakers", imageSrc: "https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg", imageAlt: "Casual sneakers for daily wear.", price: "$50", color: "White" },
  ];

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} products={products} pid={pid} setPid={setPid} />
      <Routes>
        <Route path="/" element={<ProductList cartItems={cartItems} setCartItems={setCartItems} products={products} />} />
        <Route path="/product/:name" element={<SingleProduct cartItems={cartItems} setCartItems={setCartItems} pid={pid} products={products} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
