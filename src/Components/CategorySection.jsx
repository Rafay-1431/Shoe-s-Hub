import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "Sneakers",
    tagline: "Performance & Urban Streetwear",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    size: "lg:col-span-2 lg:row-span-2", // Large feature card
  },
  {
    id: 2,
    title: "Formal & Dress Shoes",
    tagline: "Oxfords, Loafers & Derbies",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    size: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    title: "Boots",
    tagline: "Rugged & Weatherproof",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80",
    size: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 4,
    title: "Sandals & Slides",
    tagline: "Summer Relaxation & Comfort",
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80",
    size: "lg:col-span-2 lg:row-span-1",
  },
];

export default function CategorySection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle) => {
    // Navigate to products page with selected category parameter
    navigate(`/products?category=${encodeURIComponent(categoryTitle)}`);
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
              02 / CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight mt-1">
              Shoes Collections
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
            Explore our curated footwear collections crafted for athletic performance, formal elegance, and outdoor endurance.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-70">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.title)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl ${cat.size}`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white z-10">
                <div className="flex justify-end">
                  <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <div>
                  <p className="text-xs font-mono text-gray-300 tracking-wider uppercase mb-1">
                    {cat.tagline}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {cat.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}