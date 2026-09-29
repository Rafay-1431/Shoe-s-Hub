import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useWishlist(user) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync guest localStorage wishlist to DB upon user login and fetch database state
  const syncAndFetchWishlist = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch DB wishlist
      const { data, error } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", user.id);

      if (error) throw error;

      let dbWishlist = data ? data.map((item) => item.product_id) : [];

      // 2. Check local storage & sync un-saved items to DB
      const local = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (local.length > 0) {
        const newItems = local.filter((id) => !dbWishlist.includes(id));

        if (newItems.length > 0) {
          const insertPayload = newItems.map((productId) => ({
            user_id: user.id,
            product_id: productId,
          }));

          const { error: insertError } = await supabase
            .from("wishlists")
            .insert(insertPayload);

          if (!insertError) {
            dbWishlist = [...dbWishlist, ...newItems];
          } else {
            console.error("Error syncing local wishlist to DB:", insertError.message);
          }
        }

        // Clear local storage after sync attempt
        localStorage.removeItem("wishlist");
      }

      setWishlist(dbWishlist);
    } catch (err) {
      console.error("Error fetching wishlist:", err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      syncAndFetchWishlist();
    } else {
      const local = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(local);
      setLoading(false);
    }
  }, [user, syncAndFetchWishlist]);

  // Toggle item in wishlist (Optimistic update with rollback on DB error)
  const toggleWishlist = async (productId) => {
    const exists = wishlist.includes(productId);
    const updated = exists
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    // Optimistically update UI
    setWishlist(updated);

    if (user) {
      if (exists) {
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);

        if (error) {
          console.error("Error removing item from wishlist:", error.message);
          setWishlist(wishlist); // Revert state on error
        }
      } else {
        const { error } = await supabase
          .from("wishlists")
          .insert([{ user_id: user.id, product_id: productId }]);

        if (error) {
          console.error("Error adding item to wishlist:", error.message);
          setWishlist(wishlist); // Revert state on error
        }
      }
    } else {
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  };

  return { wishlist, toggleWishlist, loading };
}