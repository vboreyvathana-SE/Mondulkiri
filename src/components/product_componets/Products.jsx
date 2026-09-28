import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import HarvestFilterBar from "./HarvestFilterBar";
import ProductCard from "../ProductCard";

export function Products({ limit }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOption, setSortOption] = useState("product_code");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }
    loadProducts();
  }, []);

  const categories = [
    { id: "all", label: "All" },
    ...[...new Set(products.map((p) => p.product_type).filter(Boolean))].map((type) => ({
      id: type,
      label: type,
    })),
  ];

  const filteredProducts = products
    .filter((product) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        product.name?.toLowerCase().includes(searchText) ||
        product.product_code?.toLowerCase().includes(searchText) ||
        product.product_type?.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText) ||
        product.flavor_notes?.toLowerCase().includes(searchText);
      const matchesType = typeFilter === "all" || product.product_type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOption === "price-low") return Number(a.price) - Number(b.price);
      if (sortOption === "price-high") return Number(b.price) - Number(a.price);
      return (a.product_code || "").localeCompare(b.product_code || "");
    });

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <div className="main-bg">
      {!limit && (
        <HarvestFilterBar
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          categories={categories}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;  