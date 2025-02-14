import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Search } from "lucide-react";

export default function SearchBar({ products, pid, setPid }) {
  const [expanded, setExpanded] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [query, setQuery] = useState(""); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredItems([]);
    } else {
      const matches = products
        .filter((product) => product.name.toLowerCase().includes(value.toLowerCase()))
        .map((product) => ({ name: product.name, id: product.id })); 

      setFilteredItems(matches.length > 0 ? matches : [{ name: "No items found", id: null }]);
    }
  };

  const handleSelect = (selectedProduct) => {
    if (selectedProduct.id) {
      setPid(selectedProduct.id); 
      setQuery(selectedProduct.name); 
      setFilteredItems([]);
      setExpanded(false);
      navigate(`/product/${selectedProduct.id}`); 
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <div className="relative bg-white p-2 rounded-full flex items-center transition-all duration-300 border border-gray-300 shadow-sm w-full sm:w-64">
        <Search className="text-gray-600 cursor-pointer mx-2" size={20} />
        <input
          type="text"
          className="bg-transparent outline-none text-gray-900 w-full placeholder-gray-500 transition-all min-w-[150px]"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          onFocus={() => setExpanded(true)}
        />
      </div>

      {expanded && query && filteredItems.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white text-gray-900 rounded-md shadow-lg border border-gray-300 z-10 max-h-40 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 ${item.id ? "hover:bg-gray-200 cursor-pointer" : "text-gray-500 cursor-default"}`}
              onClick={() => item.id && handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
