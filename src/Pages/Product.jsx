import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { Star, Heart, Loader2, Search } from "lucide-react";
import { useWishlist } from "../hooks/useWhishlist"; // Path check kar lein

const CATEGORIES = [
  "All",
  "Sneakers",
  "Formal & Dress Shoes",
  "Boots",
  "Sandals & Slides",
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Auth State track karein
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Custom Wishlist Hook call
  const { wishlist, toggleWishlist } = useWishlist(user);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  async function fetchProducts() {
    try {
      setLoading(true);
      let query = supabase.from("products").select("*");

      // Category Filter Logic
      if (selectedCategory !== "All") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error loading products:", err.message);
    } finally {
      setLoading(false);
    }
  }

  // Client-side Search Filter
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-16 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
            Curated Footwear
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
            Our Shoes Collection
          </h1>
        </div>

        {/* Filters & Search Bar Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-indigo-600 dark:focus:border-indigo-500 text-xs text-gray-900 dark:text-white outline-none transition-all"
            />
          </div>

        </div>

        {/* Product Grid / Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-75">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-mono">
              Is category ya search keyword ke hisab se koi product nahi mila.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.is_new && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest">
                        NEW
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Navigation trigger hone se rokkta hai
                        toggleWishlist(product.id);
                      }}
                      aria-label="Toggle Wishlist"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors duration-200 ${
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700 dark:text-gray-200 hover:text-red-500"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between grow space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                        <span>{product.category?.toUpperCase()}</span>
                        {product.rating && (
                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            {product.rating}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 group-hover:underline">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}