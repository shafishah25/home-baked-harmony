// src/hooks/useCategories.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("name");
      if (!error && data) {
        setCategories(data.map((cat) => cat.name));
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}
