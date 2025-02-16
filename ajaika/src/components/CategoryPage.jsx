import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function CategoryPage({ products }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { category } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 items per page

  useEffect(() => {
    let filtered = products;

    if (query) {
      filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    } else if (category) {
      // Convert hyphenated category back to original format
      const normalizedCategory = category.replace(/-/g, " ");
      filtered = products.filter((product) => 
        product.category.toLowerCase() === normalizedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 when search/category changes
  }, [query, category, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {query ? `Search results for: "${query}"` : `Category: ${category.replace(/-/g, " ")}`}
      </h2>

      {displayedProducts.length > 0 ? (
        <>
          {/* Grid Layout: 3 columns for desktop, 2 for medium screens, 1 for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => navigate(`/product/${product.title.replace(/\s+/g, "-").toLowerCase()}`)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain mx-auto"
                />
                <h3 className="mt-2 text-center font-semibold text-gray-900">{product.title}</h3>
                <p className="text-center text-lg font-bold text-gray-700">${product.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1 ? "bg-yellow-500 text-white" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}
