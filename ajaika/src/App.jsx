import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import SingleProduct from "./components/SingleProduct";
import CategoryPage from "./components/CategoryPage";
import SearchResults from "./components/SearchResults"; // New component for paginated search results

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [pid, setPid] = useState(0);
  const [products, setProducts] = useState([]);

  // Fetch products from FakeStore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Store fetched products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} products={products} pid={pid} setPid={setPid} />
      <Routes>
        <Route path="/" element={<ProductList cartItems={cartItems} setCartItems={setCartItems} products={products} />} />
        <Route path="/product/:name" element={<SingleProduct cartItems={cartItems} setCartItems={setCartItems} pid={pid} products={products} />} />
        <Route path="/category/:category" element={<CategoryPage cartItems={cartItems} setCartItems={setCartItems} products={products} />} />
        <Route path="/search" element={<SearchResults products={products} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
