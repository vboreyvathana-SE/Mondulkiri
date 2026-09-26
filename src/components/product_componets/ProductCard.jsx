
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

export function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <div className="main-bg">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#292321] rounded-lg overflow-hidden text-white shadow-lg"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-[#171311] overflow-hidden">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {/* Optional badge */}
              <div className="absolute top-3 left-3 bg-[#211c19] px-3 py-1 rounded-full">
                <span className="text-[10px] font-semibold tracking-wider text-[#f5b44c]">
                  {product.product_code}
                </span>
              </div>
            </div>

            {/* Product Information */}
            <div className="p-5">

              {/* Category + Price */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold tracking-widest text-[#f5b44c] uppercase">
                  {product.product_type}
                </span>

                <span className="text-lg font-semibold text-[#f5b44c]">
                  ${product.price}
                </span>
              </div>

              {/* Product Name */}
              <h2 className="text-xl font-serif text-white mb-2">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-sm leading-5 text-gray-300 line-clamp-2">
                {product.description}
              </p>

              {/* Roast Profile */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] tracking-widest text-gray-400 uppercase">
                    Roast Profile
                  </span>

                  <span className="text-[10px] font-medium text-[#f5b44c]">
                    {product.roast_profile}
                  </span>
                </div>

                <div className="h-1.5 bg-[#1d1917] rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-[#f5b44c] rounded-full"></div>
                </div>
              </div>

              {/* Flavor Notes */}
              <div className="flex flex-wrap gap-2 mt-4">
                {product.flavor_notes?.split(",").map((note, index) => (
                  <span
                    key={index}
                    className="bg-[#211d1b] px-2 py-1 rounded text-[10px] text-gray-300"
                  >
                    {note.trim()}
                  </span>
                ))}
              </div>

              {/* Grind + Weight */}
              <div className="grid grid-cols-2 gap-4 mt-5">

                <div>
                  <span className="block text-[9px] tracking-widest text-gray-400 uppercase mb-2">
                    Grind
                  </span>

                  <div className="bg-[#211d1b] px-3 py-2 rounded text-sm text-gray-200">
                    {product.grind}
                  </div>
                </div>

                <div>
                  <span className="block text-[9px] tracking-widest text-gray-400 uppercase mb-2">
                    Weight
                  </span>

                  <div className="bg-[#211d1b] px-3 py-2 rounded text-sm text-gray-200">
                    {product.weight}
                  </div>
                </div>

              </div>

              {/* Add to Cart */}
              <button
                className="mt-5 w-full bg-[#f5b44c] hover:bg-[#ffc15c] text-[#292321] rounded-md py-3 text-sm font-semibold transition"
              >
                 ADD TO BAG • ${product.price}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
}