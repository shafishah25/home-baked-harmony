import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The best cakes in town! My family loves everything from Delicious Bakers.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      text: "Fresh, delicious, and always on time. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      text: "Amazing quality and taste. These bakers really know their craft!",
      rating: 5,
    },
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true);

      if (error) {
        console.error("Error fetching featured products:", error.message);
      } else {
        console.log("✅ Featured Products Fetched:", data); // Debug log
        setFeaturedProducts(data || []);
      }

      setLoading(false);
    };

    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6">
            Freshly Baked with Love
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            From Our Home to Yours
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link to="/menu">View Menu</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/order">Order Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-semibold text-center mb-12">
            Featured Products
          </h2>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : featuredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No featured products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={
                      product.image_url?.startsWith("http")
                        ? product.image_url
                        : "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">
                        Rs. {product.price}
                      </span>
                      <Button size="sm" asChild>
                        <Link to="/order">Order</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bakery-gradient py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-semibold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4 text-yellow-500 text-xl">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
