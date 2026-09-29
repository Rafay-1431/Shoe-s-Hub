import React from "react";
import { RefreshCw, ShieldCheck, Clock, Truck, HelpCircle, AlertCircle } from "lucide-react";

export default function ReturnPolicy() {
  const lastUpdated = "September 24, 2026";

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-16 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider">
            <RefreshCw className="w-4 h-4" />
            <span>Customer Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
            Return & Refund Policy
          </h1>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Highlight Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 text-center space-y-2">
            <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">30-Day Returns</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Return items within 30 days of delivery.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 text-center space-y-2">
            <Truck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Easy Pickups</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pre-paid return labels provided.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 text-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Fast Refunds</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Processed within 5-7 business days.</p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-10">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Return Eligibility
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              To be eligible for a return, your item must meet the following conditions:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 pl-11 space-y-1">
              <li>Item must be unused, unworn, and in original condition.</li>
              <li>Must be in original packaging with all tags attached.</li>
              <li>Proof of purchase (Order ID or receipt) is required.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                How to Initiate a Return
              </h2>
            </div>
            <div className="pl-11 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Step 1:</strong> Visit our <a href="/contact" className="text-indigo-600 dark:text-indigo-400 underline">Contact Page</a> or email us at <strong>returns@luxestore.com</strong> with your Order ID.</p>
              <p><strong>Step 2:</strong> Once approved, we will send you a pre-paid return shipping label.</p>
              <p><strong>Step 3:</strong> Pack the item securely and drop it off at the nearest courier partner location.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Non-Returnable Items
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              Certain types of items cannot be returned due to hygiene and safety standards:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 pl-11 space-y-1">
              <li>Gift cards and downloadable products.</li>
              <li>Innerwear, socks, and swimwear.</li>
              <li>Items marked as "Final Sale" or clearance discounts over 50%.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Refunds & Processing Time
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              Once your return is received and inspected, we will send you an email notification. If approved, your refund will be processed back to your original payment method within <strong>5 to 7 business days</strong>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}