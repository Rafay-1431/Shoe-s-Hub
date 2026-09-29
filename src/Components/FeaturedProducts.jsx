import React, { useState, useEffect } from "react";
import { ShoppingBag, Star, Heart, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase"; // Apne Supabase client ka correct path check karein
import { useWishlist } from "../hooks/useWhishlist"; // Path adjust kar lein agar different ho
const categories = [
  "All",
  "Sneakers",
  "Formal & Dress Shoes",
  "Boots",
  "Sandals & Slides",
];

export default function FeaturedProducts() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [user, setUser] = useState(null);

  // User fetch aur Auth state track karein
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // Custom Wishlist Hook call
  const { wishlist, toggleWishlist } = useWishlist(user);

  // Supabase se products fetch karne ke liye useEffect
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        throw error;
      }

      if (data) {
        setProductsData(data);
      }
    } catch (error) {
      console.error("Error fetching products from Supabase:", error.message);
    } finally {
      setLoading(false);
    }
  }

  // Active category tab ke hisab se filter
  const filteredProducts =
    activeTab === "All"
      ? productsData
      : productsData.filter((item) => item.category === activeTab);

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#fafafa] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
              03 / FEATURED ITEMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight mt-1">
              Trending Footwear
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-xs font-mono text-gray-500 uppercase">Fetching products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 font-medium">No products found in this category.</p>
          </div>
        ) : (
          /* Product Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              // Check karein kya ye product wishlist mein already majood hai
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img
                      src={product.image_url || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {(product.isNew || product.is_new) && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold tracking-widest uppercase shadow-md">
                        NEW
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Toggle Wishlist"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110 active:scale-95"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors duration-200 ${
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between grow">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                        <span>{product.category?.toUpperCase()}</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          {product.rating || "4.5"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-5 mt-4 border-t border-gray-100 dark:border-gray-700/60">
                      <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                        {typeof product.price === "number" ? `$${product.price}` : product.price}
                      </span>

                      <button className="h-10 px-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all duration-300 shadow-sm active:scale-95">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}