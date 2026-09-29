import React from "react";
import { ShieldCheck, Truck, RotateCcw, Heart } from "lucide-react";

export default function Footer({ onOpenPolicy }) {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Truck className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm uppercase">Fast Delivery</h4>
              <p className="text-xs text-gray-400">All Pakistan tracked shipping</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <RotateCcw className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm uppercase">Easy Returns</h4>
              <p className="text-xs text-gray-400">7 days hassle-free exchange policy</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm uppercase">100% Authentic</h4>
              <p className="text-xs text-gray-400">Guaranteed genuine product quality</p>
            </div>
          </div>
        </div>

        {/* Policy Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div>
            <h5 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Store</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#featured" className="hover:text-white transition">Trending Shoes</a></li>
              <li><a href="#categories" className="hover:text-white transition">All Categories</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Customer Care</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onOpenPolicy('shipping')} className="hover:text-white transition">Shipping Policy</button></li>
              <li><button onClick={() => onOpenPolicy('returns')} className="hover:text-white transition">Returns & Refunds</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Legal</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition">Privacy Policy</button></li>
              <li><button onClick={() => onOpenPolicy('terms')} className="hover:text-white transition">Terms of Service</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Contact Us</h5>
            <p className="text-xs text-gray-400 leading-relaxed">
              Email: support@footwearstore.com<br />
              WhatsApp: +92 300 1234567
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Footwear Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for performance
          </p>
        </div>
      </div>
    </footer>
  );
}