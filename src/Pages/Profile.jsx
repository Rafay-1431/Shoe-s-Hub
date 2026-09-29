import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { 
  User, 
  Package, 
  LogOut, 
  Edit3, 
  Save, 
  Loader2, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail,
  AlertCircle,
  Heart,
  Trash2,
  ExternalLink
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Tabs: 'orders' ya 'wishlist'
  const [activeTab, setActiveTab] = useState("orders");

  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Wishlist State
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch Current User, Orders & Wishlist
  async function fetchUserProfile() {
    try {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        navigate("/login");
        return;
      }

      setUser(user);
      setFullName(user.user_metadata?.full_name || "");

      // Fetch Orders & Wishlist
      fetchUserOrders(user.id);
      fetchUserWishlist(user.id);
    } catch (err) {
      console.error("Error loading user profile:", err.message);
    } finally {
      setLoading(false);
    }
  }

  // Fetch Orders
  async function fetchUserOrders(userId) {
    try {
      setLoadingOrders(true);
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          products (
            name,
            image_url,
            price
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    } finally {
      setLoadingOrders(false);
    }
  }

  // Fetch Wishlist
  async function fetchUserWishlist(userId) {
    try {
      setLoadingWishlist(true);
      const { data, error } = await supabase
        .from("wishlists")
        .select(`
          id,
          product_id,
          created_at,
          products (
            id,
            name,
            price,
            image_url,
            category
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWishlist(data || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err.message);
    } finally {
      setLoadingWishlist(false);
    }
  }

  // Remove item from Wishlist
  async function handleRemoveFromWishlist(wishlistId) {
    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", wishlistId);

      if (error) throw error;

      setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
      setMessage({ type: "success", text: "Item removed from wishlist!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to remove item." });
    }
  }

  // Update Profile Info
  async function handleUpdateProfile(e) {
    e.preventDefault();
    setSavingProfile(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (error) throw error;

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setSavingProfile(false);
    }
  }

  // Logout Function
  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  }

  // Order Status Badge Helper
  function getStatusBadge(status) {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case "shipped":
      case "in-transit":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
            <Truck className="w-3.5 h-3.5" />
            Shipped
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-8">
          <div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
              USER DASHBOARD
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight mt-1">
              My Profile
            </h1>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Status Message */}
        {message.text && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-800"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Personal Information */}
          <div className="lg:col-span-4 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Personal Info</span>
              </h2>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-xl text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>

            {isEditing ? (
              /* Profile Edit Form */
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-600 text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                  >
                    {savingProfile ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFullName(user.user_metadata?.full_name || "");
                    }}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold text-xs uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Profile Display Mode */
              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-xs font-mono text-gray-400 uppercase">Full Name</span>
                  <p className="font-semibold text-gray-900 dark:text-white mt-0.5">
                    {user.user_metadata?.full_name || "N/A"}
                  </p>
                </div>

                <div>
                  <span className="block text-xs font-mono text-gray-400 uppercase">Email Address</span>
                  <p className="font-semibold text-gray-900 dark:text-white mt-0.5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Tabs (Orders vs Wishlist) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase transition-all ${
                  activeTab === "orders"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase transition-all ${
                  activeTab === "wishlist"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist ({wishlist.length})</span>
              </button>
            </div>

            {/* TAB 1: ORDERS SECTION */}
            {activeTab === "orders" && (
              <>
                {loadingOrders ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-3xl bg-gray-50 dark:bg-gray-900/40 border border-dashed border-gray-200 dark:border-gray-800 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
                    <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase">
                      No Orders Placed Yet
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                      You haven't purchased anything yet. Browse our products to place your first order!
                    </p>
                    <button
                      onClick={() => navigate("/product")}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 space-y-4 hover:border-indigo-500/50 transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/60 dark:border-gray-800 pb-3">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-gray-400 uppercase block">
                              Order ID: #{order.id.toString().slice(0, 8)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(order.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        <div className="flex items-center gap-4">
                          {order.products?.image_url && (
                            <img
                              src={order.products.image_url}
                              alt={order.products.name || "Product"}
                              className="w-16 h-16 rounded-xl object-cover bg-gray-200 dark:bg-gray-800 shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                              {order.products?.name || "Product"}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Quantity: {order.quantity || 1}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono text-gray-400 block uppercase">Total</span>
                            <span className="text-base font-extrabold text-gray-900 dark:text-white">
                              ${order.total_price}
                            </span>
                          </div>
                        </div>

                        {order.shipping_address && (
                          <div className="pt-3 border-t border-gray-200/60 dark:border-gray-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                              <span className="truncate">{order.shipping_address}</span>
                            </div>
                            {order.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                <span>{order.phone}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* TAB 2: WISHLIST SECTION */}
            {activeTab === "wishlist" && (
              <>
                {loadingWishlist ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                  </div>
                ) : wishlist.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-3xl bg-gray-50 dark:bg-gray-900/40 border border-dashed border-gray-200 dark:border-gray-800 space-y-4">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto" />
                    <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                      Save items you love here to easily purchase them later!
                    </p>
                    <button
                      onClick={() => navigate("/product")}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 flex items-center gap-4 hover:border-indigo-500/50 transition-all group relative"
                      >
                        <img
                          src={item.products?.image_url || "/placeholder.png"}
                          alt={item.products?.name}
                          className="w-20 h-20 rounded-xl object-cover bg-gray-200 dark:bg-gray-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase">
                            {item.products?.category || "Category"}
                          </span>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate mt-0.5">
                            {item.products?.name}
                          </h4>
                          <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-1">
                            ${item.products?.price}
                          </p>
                          
                          <button
                            onClick={() => navigate(`/product/${item.product_id}`)}
                            className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-2 hover:underline"
                          >
                            <span>View Product</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-all self-start"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}