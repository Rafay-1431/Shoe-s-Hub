import React, { useState, useEffect } from "react";
import { ArrowUpRight, Copy, Check, Tag, Sparkles } from "lucide-react";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  // Countdown Timer State (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("LUXE30");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-6 lg:px-12 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white p-8 sm:p-12 lg:p-16 isolate shadow-2xl">
          
          {/* Background Decorative Accent Gradients */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Time Offer</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-none">
                Get <span className="text-indigo-400">30% Off</span> On Your Next Purchase
              </h2>

              <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Upgrade your luxury collection today with our exclusive seasonal discount. Apply the promo code at checkout.
              </p>

              {/* Coupon Code Box */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <span className="font-mono text-sm font-bold tracking-wider">
                    LUXE30
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-xs flex items-center gap-1"
                    title="Copy Promo Code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-300" />
                    )}
                  </button>
                </div>

                <button className="h-11 px-7 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-300 active:scale-95">
                  <span>Claim Offer</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Countdown Timer */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                Offer Ends In
              </span>

              <div className="flex items-center gap-3 font-mono">
                {/* Hours */}
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 min-w-[70px] sm:min-w-[80px]">
                  <span className="text-2xl sm:text-4xl font-extrabold text-white">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                    Hours
                  </span>
                </div>

                <span className="text-2xl font-bold text-indigo-400">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 min-w-[70px] sm:min-w-[80px]">
                  <span className="text-2xl sm:text-4xl font-extrabold text-white">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                    Mins
                  </span>
                </div>

                <span className="text-2xl font-bold text-indigo-400">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 min-w-[70px] sm:min-w-[80px]">
                  <span className="text-2xl sm:text-4xl font-extrabold text-indigo-400">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                    Secs
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}