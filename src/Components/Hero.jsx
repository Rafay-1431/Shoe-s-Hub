import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Flame } from "lucide-react";

// Shoes Products Data
const products = [
  {
    id: 1,
    category: "01 / SIGNATURE SNEAKER",
    name: "Air Max Retro High",
    description: "Classic high-top luxury sneakers designed for ultimate urban comfort.",
    price: "$189",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 2,
    category: "02 / RUNNING TECH",
    name: "Runner Pro Boost",
    description: "Lightweight mesh running shoes with maximum impact cushioning.",
    price: "$159",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 3,
    category: "03 / STREETWEAR",
    name: "Urban Street Vibe",
    description: "Trendy streetwear sneakers crafted with durable canvas & rubber soles.",
    price: "$145",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=90",
  },
  {
    id: 4,
    category: "04 / FORMAL LUXURY",
    name: "Classic Leather Oxford",
    description: "Handcrafted genuine Italian leather formal shoes for modern gents.",
    price: "$220",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=90",
  },
];

export default function Hero() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch Swipe States
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextProduct = () => {
    setActiveProduct((current) =>
      current === products.length - 1 ? 0 : current + 1
    );
  };

  const previousProduct = () => {
    setActiveProduct((current) =>
      current === 0 ? products.length - 1 : current - 1
    );
  };

  // 1. Auto-Play Timer Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextProduct();
    }, 4000); // Har 4 second baad slide change hogi

    return () => clearInterval(interval);
  }, [activeProduct, isPaused]);

  // 2. Touch Swipe Handlers (Mobile Support)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextProduct();
    } else if (distance < -minSwipeDistance) {
      previousProduct();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-10 lg:py-16 bg-[#fafafa] dark:bg-gray-950 text-gray-900 dark:text-white font-sans isolate transition-colors duration-300 select-none"
    >
      {/* Background Grid Accent Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[80px_80px] mask-[linear-gradient(to_bottom,black,transparent)] pointer-events-none -z-20" />

      {/* Shoe's Hub Watermark Background Text */}
      <div className="absolute left-[2%] bottom-[2%] text-[13vw] font-black leading-none tracking-tighter text-gray-900/5 dark:text-white/5 select-none pointer-events-none -z-10 uppercase">
        Shoe's Hub
      </div>

      {/* Top Metadata Line */}
      <div className="absolute top-6 left-6 right-6 lg:left-12 lg:right-12 flex justify-between text-gray-400 dark:text-gray-500 text-[10px] tracking-[3px] uppercase font-mono">
        <span>SPRING / SUMMER 2026</span>
        <span>ENGINEERED FOR MOVEMENT</span>
      </div>

      {/* LEFT CONTENT AREA */}
      <div className="relative z-10 w-full lg:w-[45%] max-w-xl text-center lg:text-left mt-12 lg:mt-0">
        
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full">
          <Flame className="w-3.5 h-3.5" />
          <span>NEW DROPS • LIMITED EDITION</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase">
          STEP INTO <br />
          <span className="text-indigo-600 dark:text-indigo-400">PERFECTION.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed font-normal">
          Premium sneakers, performance runners, and luxury leather shoes crafted for unmatched comfort and daily performance.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
          <button className="w-full sm:w-auto h-12 px-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all duration-300 shadow-md group">
            <span>Explore Kicks</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button className="w-full sm:w-auto h-12 px-8 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-3 hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm group">
            <span>View All Categories</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>

        {/* Info Tags */}
        <div className="hidden lg:flex gap-6 mt-16 text-gray-400 dark:text-gray-500 text-[10px] tracking-widest uppercase font-mono">
          <span>ERGO-CUSHION SOLE</span>
          <span>•</span>
          <span>100% AUTHENTIC GUARANTEED</span>
        </div>

      </div>

      {/* RIGHT CAROUSEL AREA (Hover & Touch enabled) */}
      <div 
        className="relative w-full lg:w-[50%] h-105 sm:h-125 mt-8 lg:mt-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Counter & Progress Indicator */}
        <div className="absolute top-2 right-4 flex items-center gap-3 text-gray-400 dark:text-gray-500 text-xs font-mono z-20">
          <span className="text-indigo-600 dark:text-indigo-400 text-lg font-bold">
            {String(activeProduct + 1).padStart(2, "0")}
          </span>
          <span className="w-8 h-px bg-gray-300 dark:bg-gray-700" />
          <span>{String(products.length).padStart(2, "0")}</span>
        </div>

        {/* Depth Stack Cards Carousel */}
        <div className="relative w-full h-full flex items-center justify-center perspective-distant">
          {products.map((product, index) => {
            let position = index - activeProduct;

            if (position > 2) position -= products.length;
            if (position < -2) position += products.length;

            let cardStyles = "opacity-0 scale-50 pointer-events-none";
            if (position === 0) {
              cardStyles = "z-20 opacity-100 translate-x-0 translate-z-0 scale-100 filter-none shadow-2xl shadow-gray-400/30 dark:shadow-black/60";
            } else if (position === 1) {
              cardStyles = "z-10 opacity-70 translate-x-[120px] sm:translate-x-[180px] scale-[0.82] brightness-75";
            } else if (position === -1) {
              cardStyles = "z-10 opacity-70 -translate-x-[120px] sm:-translate-x-[180px] scale-[0.82] brightness-75";
            } else if (position === 2) {
              cardStyles = "z-0 opacity-20 translate-x-[200px] sm:translate-x-[280px] scale-[0.65] brightness-50";
            } else if (position === -2) {
              cardStyles = "z-0 opacity-20 -translate-x-[200px] sm:-translate-x-[280px] scale-[0.65] brightness-50";
            }

            return (
              <article
                key={product.id}
                onClick={() => setActiveProduct(index)}
                className={`absolute w-72.5 sm:w-[320px] h-100 sm:h-115 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-700 ease-out ${cardStyles}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {position === 0 && (
                  <div className="absolute left-6 right-6 bottom-6 z-10 text-white pointer-events-none space-y-1">
                    <p className="text-indigo-400 text-[10px] font-mono font-semibold tracking-widest uppercase">
                      {product.category}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight uppercase">
                      {product.name}
                    </h2>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-lg font-black text-white font-mono">
                        {product.price}
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-indigo-600 px-2.5 py-0.5 rounded-full">
                        In Stock
                      </span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="absolute bottom-2 right-4 flex gap-3 z-30">
          <button
            onClick={previousProduct}
            aria-label="Previous product"
            className="w-11 h-11 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white flex items-center justify-center hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 hover:border-indigo-600 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextProduct}
            aria-label="Next product"
            className="w-11 h-11 rounded-full border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-white flex items-center justify-center hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 hover:border-indigo-600 transition-all duration-300 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Footer Bottom Label */}
      <div className="absolute bottom-4 left-6 right-6 lg:left-12 lg:right-12 hidden sm:flex items-center justify-between text-gray-400 dark:text-gray-500 text-[10px] tracking-[3px] uppercase font-mono">
        <span>SWIPE OR CLICK TO NAVIGATE</span>
        <div className="w-20 h-px bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
          <div className="w-8 h-full bg-indigo-600 dark:bg-indigo-400" />
        </div>
        <span>Shoe's Hub / 01</span>
      </div>
    </section>
  );
}