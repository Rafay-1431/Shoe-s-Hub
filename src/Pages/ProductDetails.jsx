import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { supabase } from "../lib/supabase";
import { sendOrderEmail } from "../Utils/emailService";
import {
  ShoppingBag,
  Star,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Truck,
  RefreshCw,
  Zap,
  X,
  CheckCircle,
  MapPin
} from "lucide-react";

// List of Pakistani Cities
const PAKISTAN_CITIES = [
  "Islamabad", "Rawal Town", "Tarnol", "Nilore", "Bhara Kahu", "Sihala", "Taramri", "Golra", "Bani Gala", "Humak",
  "Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah (Shaheed Benazirabad)", "Mirpur Khas", "Jacobabad", "Shikarpur",
  "Khairpur", "Dadu", "Thatta", "Badin", "Tando Adam", "Tando Allahyar", "Tando Muhammad Khan", "Umerkot", "Sanghar",
  "Ghotki", "Mirpur Mathelo", "Daharki", "Khanpur Mahar", "Rohri", "Pano Aqil", "Kandhkot", "Kashmore", "Tangwani",
  "Thul", "Garhi Khairo", "Qambar", "Shahdadkot", "Warah", "Ratodero", "Dokri", "Mehar", "Sehwan Sharif", "Johi",
  "Khairpur Nathan Shah", "Moro", "Naushahro Feroze", "Kandiaro", "Mehrabpur", "Bhiria City", "Sakrand", "Qazi Ahmed",
  "Daur", "Sinjhoro", "Shahdadpur", "Khipro", "Tando Jan Muhammad", "Digri", "Kot Ghulam Muhammad", "Jhuddo", "Kunri",
  "Samaro", "Pithoro", "Mithi", "Islamkot", "Diplo", "Chachro", "Nagarparkar", "Dahli", "Matli", "Talhar", "Tando Bago",
  "Golarchi", "Khoski", "Kario Ghanwar", "Sujawal", "Mirpur Bathoro", "Jati", "Gharo", "Mirpur Sakro", "Keti Bandar",
  "Makli", "Kotri", "Jamshoro", "Sehwan", "Manjhand", "Thano Bula Khan", "Nooriabad", "Tando Jam", "Hala", "Matiari",
  "Bhit Shah", "Bhan Saeedabad", "Ranipur", "Gambat", "Kot Diji", "Sobhodero", "Kingri", "Nara", "Ubauro", "Reti",
  "Saleh Pat", "Sangi", "Thari Mirwah", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot",
  "Bahawalpur", "Sargodha", "Sheikhupura", "Jhang", "Rahim Yar Khan", "Gujrat", "Sahiwal", "Okara", "Kasur",
  "Dera Ghazi Khan", "Muzaffargarh", "Khanewal", "Bahawalnagar", "Vehari", "Pakpattan", "Toba Tek Singh", "Chiniot",
  "Kamalia", "Mian Channu", "Lodhran", "Attock", "Jhelum", "Chakwal", "Talagang", "Mandi Bahauddin", "Hafizabad",
  "Narowal", "Shakargarh", "Wazirabad", "Kamoke", "Daska", "Sambrial", "Pasrur", "Kharian", "Lalamusa", "Phalia",
  "Malakwal", "Pind Dadan Khan", "Dina", "Sohawa", "Gujar Khan", "Kallar Syedan", "Kahuta", "Murree", "Taxila",
  "Wah Cantonment", "Hasan Abdal", "Fateh Jang", "Pindi Gheb", "Jand", "Chak Jhumra", "Jaranwala", "Samundri",
  "Tandlianwala", "Gojra", "Shorkot", "Ahmadpur East", "Hasilpur", "Yazman", "Fort Abbas", "Chishtian", "Haroonabad",
  "Minchinabad", "Arifwala", "Burewala", "Mailsi", "Dunyapur", "Kehror Pacca", "Kabirwala", "Jahanian", "Shujabad",
  "Jalalpur Pirwala", "Alipur", "Jatoi", "Kot Addu", "Taunsa", "Rajanpur", "Jampur", "Rojhan", "Liaquatpur", "Sadiqabad",
  "Khanpur", "Zahir Pir", "Ferozewala", "Muridke", "Nankana Sahib", "Sangla Hill", "Shahkot", "Safdarabad", "Pattoki",
  "Chunian", "Kot Radha Kishan", "Depalpur", "Renala Khurd", "Hujra Shah Muqeem", "Basirpur", "Mandi Ahmadabad",
  "Bhalwal", "Shahpur", "Sillanwali", "Kot Momin", "Bhera", "Farooka", "Khushab", "Jauharabad", "Noorpur Thal",
  "Quaidabad", "Mianwali", "Isa Khel", "Piplan", "Bhakkar", "Darya Khan", "Kallur Kot", "Layyah", "Karor Lal Esan",
  "Fatehpur", "Lalian", "Bhowana", "Shah Jiwana", "Pirmahal", "Kamir", "Chichawatni", "Harappa", "Yousafwala",
  "Qabula", "Fort Munro", "Peshawar", "Mardan", "Mingora", "Abbottabad", "Kohat", "Dera Ismail Khan", "Bannu",
  "Swabi", "Nowshera", "Mansehra", "Charsadda", "Haripur", "Kabal", "Barikot", "Timergara", "Chakdara", "Dir",
  "Upper Dir", "Chitral", "Drosh", "Batkhela", "Dargai", "Malakand", "Saidu Sharif", "Bahrain", "Kalam", "Shangla",
  "Alpuri", "Besham", "Puran", "Daggar", "Topi", "Zaida", "Tordher", "Takht Bhai", "Katlang", "Rustam", "Lund Khwar",
  "Shergarh", "Swat", "Hangu", "Thall", "Karak", "Banda Daud Shah", "Lakki Marwat", "Serai Naurang", "Sarai Gambila",
  "Tank", "Kulachi", "Paharpur", "Parachinar", "Sadda", "Jamrud", "Landi Kotal", "Bara", "Ali Masjid", "Havelian",
  "Lora", "Ghazi", "Khalabat", "Battagram", "Allai", "Oghi", "Balakot", "Kaghan", "Naran", "Shinkiari", "Baffa",
  "Darband", "Dassu", "Pattan", "Chilas", "Wana", "Makeen", "Razmak", "Mir Ali", "Miranshah", "Spinwam", "Datta Khel",
  "Birmal", "Ghalanai", "Ekka Ghund", "Prang Ghar", "Quetta", "Gwadar", "Turbat", "Khuzdar", "Chaman", "Sibi",
  "Zhob", "Loralai", "Dera Murad Jamali", "Dera Allah Yar", "Usta Muhammad", "Hub", "Uthal", "Bela", "Wadh",
  "Winder", "Ormara", "Pasni", "Jiwani", "Surbandar", "Panjgur", "Washuk", "Basima", "Awaran", "Mashkay", "Kalat",
  "Mastung", "Nushki", "Dalbandin", "Nok Kundi", "Taftan", "Kharan", "Killa Abdullah", "Gulistan", "Pishin",
  "Huramzai", "Qila Saifullah", "Muslim Bagh", "Khanozai", "Ziarat", "Harnai", "Duki", "Barkhan", "Kohlu", "Rakhni",
  "Dera Bugti", "Sui", "Pir Koh", "Sangan", "Gandava", "Jhal Magsi", "Bhag", "Sohbatpur", "Gandakha", "Jhatpat",
  "Rojhan Jamali", "Naseerabad", "Tamboo", "Kachhi", "Mach", "Dhadar", "Bolan", "Surab", "Zehri", "Naal", "Tump",
  "Mand", "Dasht", "Buleda", "Hoshab", "Apsar", "Muzaffarabad", "Mirpur", "Kotli", "Rawalakot", "Bagh", "Bhimber",
  "Palandri (Pallandri)", "Athmuqam", "Hattian Bala", "Hajira", "Abbaspur", "Forward Kahuta", "Sehnsa", "Charhoi",
  "Dadyal", "Chakswari", "Islamgarh", "Jatlan", "Barnala", "Samahni", "Nakyal", "Khuiratta", "Tatta Pani", "Dhirkot",
  "Arja", "Harigehl", "Trarkhel", "Mang", "Thorar", "Chikar", "Chinari", "Leepa", "Kel", "Sharda", "Dawarian",
  "Kundal Shahi", "Garhi Dupatta", "Sudhnoti", "Gilgit", "Skardu", "Hunza (Karimabad)", "Aliabad", "Nagar",
  "Astore", "Gorikot", "Khaplu", "Shigar", "Gahkuch", "Yasin", "Ishkoman", "Danyor", "Jutial", "Jaglot", "Sost",
  "Passu", "Gulmit", "Minapin", "Gupis", "Phander", "Punial", "Rondu", "Kharmang", "Tolti", "Darel", "Tangir",
  "Askole", "Hushe", "Mashabrum", "Gultari", "Basho", "Satpara"
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  // Buy Modal & Form States
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "Islamabad",
  });

  // Photon Address Autocomplete States
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    fetchCurrentUser();
  }, [id]);

  async function fetchCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user);
    }
  }

  async function fetchProductDetails() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product details:", err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle Buy Now Click
  async function handleBuyNow() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setCurrentUser(user);
    setIsBuyModalOpen(true);
  }

  // Handle Form Inputs
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Address Photon API fetch
    if (name === "address") {
      if (value.trim().length > 2) {
        fetchAddressSuggestions(value);
      } else {
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    }
  }

  // Fetch Address Suggestions from Photon Komoot API
  async function fetchAddressSuggestions(query) {
    try {
      setIsFetchingSuggestions(true);
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&bbox=60.87,23.63,77.84,37.08`
      );
      const data = await res.json();

      if (data && data.features) {
        const formattedList = data.features.map((item) => {
          const props = item.properties;
          return [props.name, props.street, props.district, props.city, props.state, props.country]
            .filter(Boolean)
            .join(", ");
        });
        setAddressSuggestions(formattedList);
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error("Error fetching address autocomplete:", err);
    } finally {
      setIsFetchingSuggestions(false);
    }
  }

  function handleSelectSuggestion(selectedAddress) {
    setFormData({ ...formData, address: selectedAddress });
    setShowSuggestions(false);
  }

  // Helper for displaying logged-in user name
  const getUserDisplayName = () => {
    return currentUser?.user_metadata?.full_name || currentUser?.email?.split("@")[0] || "Customer";
  };

  // Submit Order Form
async function handleOrderSubmit(e) {
  e.preventDefault();

  // Validate Pakistani Phone Number (03XXXXXXXXX - 11 digits)
  const phoneRegex = /^03\d{9}$/;
  if (!phoneRegex.test(formData.phone)) {
    alert("Please enter a valid Pakistani phone number starting with 03 (11 digits e.g. 03001234567).");
    return;
  }

  setIsSubmitting(true);

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    const customerName = getUserDisplayName();
    const totalPrice = (product.price * quantity).toFixed(2);

    // 1. Insert order into Supabase
    const { error } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        product_id: product.id,
        quantity: quantity,
        total_price: totalPrice,
        shipping_address: `${formData.address}, ${formData.city}`,
        phone: formData.phone,
        customer_name: customerName,
        status: "pending",
      },
    ]);

    if (error) throw error;

    // 2. Send Automated Confirmation Email via EmailJS
    try {
      await sendOrderEmail({
        customerName: customerName,
        email: user.email,
        totalAmount: `$${totalPrice}`,
        itemsSummary: `${quantity}x ${product.name}`,
      });
    } catch (emailErr) {
      // Log email error separately so user's order still goes through
      console.error("Order placed, but failed to send confirmation email:", emailErr);
    }

    setOrderSuccess(true);
  } catch (err) {
    console.error("Order submission error:", err.message);
    alert(`Failed to place order: ${err.message}`);
  } finally {
    setIsSubmitting(false);
  }
}
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs uppercase tracking-wider"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-16 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Product Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 aspect-square shadow-xl">
              <img
                src={product.image_url || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.is_new && (
                <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest shadow-md">
                  NEW ARRIVAL
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
                  {product.category}
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-500" />
                  {product.rating || "4.8"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
                {product.name}
              </h1>

              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                ${product.price}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {product.description ||
                  "Crafted with high-grade premium materials for exceptional style and everyday comfort."}
              </p>
            </div>

            {/* Quantity Selector & Actions */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-mono font-bold text-gray-900 dark:text-white text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="flex-1 h-12 rounded-xl border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-sm active:scale-95">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>
              </div>

              {/* BUY NOW BUTTON */}
              <button
                onClick={handleBuyNow}
                className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now • ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-col items-center text-center space-y-1">
                <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] font-mono text-gray-500 uppercase">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] font-mono text-gray-500 uppercase">Original Product</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1">
                <RefreshCw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[10px] font-mono text-gray-500 uppercase">30 Days Return</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BUY NOW CHECKOUT MODAL */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">

            {/* Close Modal Button */}
            <button
              onClick={() => {
                setIsBuyModalOpen(false);
                setOrderSuccess(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {orderSuccess ? (
              /* Success Screen */
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
                  Order Placed Successfully!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Thank you for your purchase, <span className="font-semibold text-indigo-600 dark:text-indigo-400">{getUserDisplayName()}</span>! We are preparing your shipment for delivery.
                </p>
                <button
                  onClick={() => {
                    setIsBuyModalOpen(false);
                    setOrderSuccess(false);
                  }}
                  className="mt-4 px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* Checkout Form */
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
                    Express Checkout
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight mt-1">
                    Complete Your Order
                  </h3>
                </div>

                {/* Logged in User Card */}
                <div className="mb-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">Ordering as:</span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{getUserDisplayName()}</span>
                </div>

                {/* Order Summary Box */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url || product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{product.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">

                  {/* Phone Input with 11 digits restriction */}
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">
                      Phone Number (11 Digits, starting with 03)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={11}
                      pattern="^03[0-9]{9}$"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03001234567"
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-600 text-sm font-mono"
                    />
                  </div>

                  {/* City Dropdown */}
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">
                      City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-600 text-sm"
                    >
                      {PAKISTAN_CITIES.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Address Input with Photon Autocomplete */}
                  <div className="relative">
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-1">
                      Shipping Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        onFocus={() => formData.address.trim().length > 2 && setShowSuggestions(true)}
                        placeholder="House no, Street name, Area..."
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-600 text-sm pr-10"
                      />
                      {isFetchingSuggestions && (
                        <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-3.5 text-gray-400" />
                      )}
                    </div>

                    {/* Photon API Suggestions Dropdown */}
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <ul className="absolute z-50 left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                        {addressSuggestions.map((item, idx) => (
                          <li
                            key={idx}
                            onClick={() => handleSelectSuggestion(item)}
                            className="px-4 py-2.5 hover:bg-indigo-50 dark:hover:bg-gray-700 text-xs text-gray-700 dark:text-gray-200 cursor-pointer flex items-center gap-2 border-b last:border-0 border-gray-100 dark:border-gray-700"
                          >
                            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>Confirm & Place Order</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}