import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const categories = ["All", "Cakes", "Cupcakes", "Cookies", "Bread", "Brownies"];

  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      description: "Rich, moist chocolate cake with chocolate frosting",
      price: 2500,
      category: "Cakes",
      image: "/placeholder.svg",
      isFeatured: true
    },
    {
      id: 2,
      name: "Vanilla Cupcakes",
      description: "Light and fluffy vanilla cupcakes with buttercream",
      price: 1800,
      category: "Cupcakes",
      image: "/placeholder.svg",
      isFeatured: true
    },
    {
      id: 3,
      name: "Chocolate Chip Cookies",
      description: "Classic cookies with premium chocolate chips",
      price: 1200,
      category: "Cookies",
      image: "/placeholder.svg",
      isFeatured: false
    },
    {
      id: 4,
      name: "Fresh Bread",
      description: "Artisan bread baked fresh daily",
      price: 800,
      category: "Bread",
      image: "/placeholder.svg",
      isFeatured: false
    },
    {
      id: 5,
      name: "Fudge Brownies",
      description: "Decadent brownies with a fudgy center",
      price: 1500,
      category: "Brownies",
      image: "/placeholder.svg",
      isFeatured: false
    },
    {
      id: 6,
      name: "Red Velvet Cake",
      description: "Classic red velvet with cream cheese frosting",
      price: 2800,
      category: "Cakes",
      image: "/placeholder.svg",
      isFeatured: true
    }
  ];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-heading font-bold text-center mb-8">
          Our Menu
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Discover our delicious selection of freshly baked goods, made with love and the finest ingredients.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-muted relative">
                {product.isFeatured && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
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
                  <Button 
                    size="sm"
                    onClick={() => addToCart({
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      category: product.category
                    })}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;