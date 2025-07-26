import { supabase } from "./supabase";

export async function uploadProductImage(file: File, productId: string) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${productId}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return publicUrl;
}
