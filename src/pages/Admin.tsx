import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import { useCategories } from "@/hooks/useCatogories";
import "react-toastify/dist/ReactToastify.css";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_featured: boolean; // ✅ Add is_featured
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false); // ✅ checkbox state
  const [loading, setLoading] = useState(false);

  const { categories, loading: loadingCategories } = useCategories();

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      toast.error("Failed to fetch products");
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (error) {
      toast.error("Image upload failed");
      throw error;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !category || !image) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);
      const parsedPrice = parseFloat(price);

      if (isNaN(parsedPrice)) {
        toast.error("Invalid price format");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("products").insert([
        {
          name,
          description,
          price: parsedPrice,
          category,
          image_url: imageUrl,
          is_featured: isFeatured, // ✅ include featured value
        },
      ]);

      if (error) {
        toast.error("Failed to add product");
      } else {
        toast.success("Product added successfully");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImage(null);
        setIsFeatured(false);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-4 py-2 text-sm text-gray-700"
        >
          <option value="">Select Category</option>
          {loadingCategories ? (
            <option>Loading...</option>
          ) : (
            categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))
          )}
        </select>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
        />

        {/* ✅ Featured Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <label htmlFor="featured" className="text-sm text-gray-700">
            Mark as Featured Product
          </label>
        </div>
      </div>

      <Button onClick={handleAddProduct} disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </Button>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <img
                src={
                  product.image_url ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-sm text-gray-600">Rs. {product.price}</p>
              <p className="text-sm italic text-muted">{product.category}</p>
              {product.is_featured && (
                <p className="text-xs text-pink-600 font-semibold mt-1">
                  ⭐ Featured Product
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}
