import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ products }) {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const formatTitle = (title) => title.toLowerCase().replace(/\s+/g, "-");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectProduct = (product) => {
    navigate(`/product/${formatTitle(product.title)}`);
    setShowDropdown(false);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      if (filteredProducts.length > 0) {
        navigate(`/search?q=${query}`);
      }
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onKeyDown={handleEnterPress}
        placeholder="Search for products..."
        className="w-full p-2 border rounded-lg bg-[#ffb800] focus:ring-2 focus:ring-blue-400 text-black"
      />

      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectProduct(product)}
              >
                <img src={product.image} alt={product.title} className="h-10 w-10 object-contain mr-3" />
                <span className="text-sm">{product.title}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">No product found</div>
          )}
        </div>
      )}
    </div>
  );
}
