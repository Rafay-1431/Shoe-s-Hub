import React from "react";
import { 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Flame, 
  Footprints, 
  Award, 
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Footprints,
    title: "Ergonomic Sole Tech",
    description: "Engineered with high-response foam for all-day cushioning and joint support.",
  },
  {
    icon: Sparkles,
    title: "Sustainably Sourced",
    description: "Eco-conscious leather, organic cotton, and 100% recycled rubber outsoles.",
  },
  {
    icon: ShieldCheck,
    title: "100% Authentic Guaranteed",
    description: "Every pair undergoes a rigorous 12-point quality & authenticity inspection.",
  },
  {
    icon: Truck,
    title: "Insured Global Shipping",
    description: "Fast doorstep delivery with real-time tracking and double-boxed protection.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Vision Born",
    desc: "Started in a small studio with 3 iconic minimalist sneaker designs.",
  },
  {
    year: "2022",
    title: "Patent Cushioning",
    desc: "Developed our signature Cloud-Stride foam soles for maximum impact protection.",
  },
  {
    year: "2024",
    title: "Global Sneaker Community",
    desc: "Shipped over 100,000 pairs across 45+ countries worldwide.",
  },
];

export default function About() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Hero Banner / Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Engineered For Distinction</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight leading-[1.1]">
              Stepping Into <br />
              <span className="text-indigo-600 dark:text-indigo-400">The Future Of Shoes</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              We started with a simple belief: footwear should never compromise between high-fashion aesthetics and relentless everyday comfort. From performance marathon runners to handcrafted leather oxfords, every pair is designed to empower every step you take.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
                  100K+
                </span>
                <span className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">
                  Pairs Shipped
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
                  4.9★
                </span>
                <span className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">
                  Sneakerhead Rating
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
                  100%
                </span>
                <span className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">
                  Authentic Leather
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Visual Composite */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-4/3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
                alt="Crafting Premium Footwear"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs font-mono text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Precision Shoe Craftsmanship
                </p>
                <p className="text-xl font-bold uppercase tracking-wide">
                  Hand-stitched uppers & Impact-Response Soles.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Mission & Values */}
        <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Our Crafting Standard
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white uppercase">
                Built For Street & Court
              </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Shock-absorbing midsole technology",
                "Waterproof & breathable linings",
                "Non-slip vulcanized rubber grip",
                "Anatomical heel counter support",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase">
              The Sneakerhead Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Timeline / Milestones */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
              Our Journey
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase">
              How We Evolved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3"
              >
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 inline-block">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}