import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchResults({products}) {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  useEffect(() => {
    if (query) {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
      setCurrentPage(1);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

 
  const formatTitle = (title) => encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));

 
  const handleNavigation = (product) => {
    navigate(`/product/${formatTitle(product.title)}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>

      {filteredProducts.length === 0 ? (
        <p className="text-red-500 text-lg">No products found.</p>
      ) : (
        <>
     
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-md shadow-md hover:bg-gray-100 cursor-pointer transition text-center"
                onClick={() => handleNavigation(product)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-32 object-contain mx-auto mb-2"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600 font-medium mt-1">${product.price}</p>
              </div>
            ))}
          </div>

        
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
