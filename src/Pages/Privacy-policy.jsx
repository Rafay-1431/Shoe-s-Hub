import React from "react";
import { ShieldCheck, Lock, Eye, FileText, Bell } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "September 24, 2026";

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-16 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal & Security</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          <p>
            Welcome to <strong>Luxe Store</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Information We Collect
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              When you interact with our platform, we collect information necessary to complete transactions and improve your shopping experience.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 pl-11 space-y-1">
              <li><strong>Personal Info:</strong> Name, email address, shipping address, and phone number.</li>
              <li><strong>Payment Data:</strong> Securely processed payment details (we do not store full card numbers).</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and browsing activity.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                How We Use Your Information
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              Your information is used strictly for fulfilling orders and enhancing customer service:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 pl-11 space-y-1">
              <li>To process and deliver your orders efficiently.</li>
              <li>To send order updates, tracking links, and customer support messages.</li>
              <li>To detect and prevent fraudulent transactions.</li>
              <li>To send promotional offers (only if you opt-in).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Data Security & Sharing
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              We employ SSL encryption and trusted payment gateways to ensure your sensitive data remains protected. We <strong>never sell or rent</strong> your personal information to third parties. We only share necessary details with trusted logistics partners (e.g., DHL, FedEx) to fulfill deliveries.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Cookies & Tracking
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              Our website uses essential cookies to keep track of items in your cart and remember your preferences. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Rights
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-11">
              You have the right to request access to your personal data, request corrections, or ask for account deletion. For any privacy-related requests, please contact our support team at <a href="mailto:privacy@luxestore.com" className="text-indigo-600 dark:text-indigo-400 underline">privacy@luxestore.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}