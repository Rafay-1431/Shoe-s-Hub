import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orderId: "",
    subject: "Order Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    
    // Simulate API Submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        orderId: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-16 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
            24/7 CUSTOMER SUPPORT
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
            Get In Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Have questions about an order, shipping, or returns? We are here to help. Reach out to our team anytime.
          </p>
        </div>

        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Support Cards Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 space-y-6">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
                Contact Information
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Email Us</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">support@luxestore.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Call Us</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">+1 (800) 555-LUXE</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Headquarters</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      742 Fifth Avenue, New York, NY 10019
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Working Hours</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Mon - Sat: 9:00 AM - 8:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Box */}
            <div className="p-6 rounded-2xl bg-indigo-600/5 dark:bg-indigo-400/5 border border-indigo-200 dark:border-indigo-900/40 flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Looking for quick answers?</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Check our Order Tracking or FAQ section to instantly get answers about returns, shipping rates, and order status.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
              
              {/* Success Notification Alert */}
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Thank you! Your message has been sent successfully. We will reply shortly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Order ID & Inquiry Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleChange}
                      placeholder="#ORD-98231"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors"
                    >
                      <option value="Order Inquiry">Order Status & Tracking</option>
                      <option value="Returns & Exchange">Returns & Exchange</option>
                      <option value="Product Question">Product Questions</option>
                      <option value="General Support">General Support</option>
                    </select>
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-mono text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe how we can assist you..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all duration-300 shadow-lg active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}