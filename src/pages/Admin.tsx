import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    isFeatured: false
  });

  // Mock data - in real app, this would come from Supabase
  const orders = [
    {
      id: 1,
      customerName: "John Doe",
      email: "john@example.com",
      product: "Chocolate Cake",
      quantity: 1,
      deliveryDate: "2024-07-30",
      status: "pending"
    },
    {
      id: 2,
      customerName: "Jane Smith", 
      email: "jane@example.com",
      product: "Vanilla Cupcakes",
      quantity: 2,
      deliveryDate: "2024-07-31",
      status: "confirmed"
    }
  ];

  const messages = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      message: "I'd like to place a custom order for a birthday cake.",
      timestamp: "2024-07-25 10:30 AM"
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@example.com", 
      message: "Do you offer gluten-free options?",
      timestamp: "2024-07-25 02:15 PM"
    }
  ];

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would submit to Supabase products table
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Product Added!",
        description: "The product has been successfully added to the menu.",
      });

      // Reset form
      setProductForm({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        isFeatured: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-heading font-bold text-center mb-8">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-2 px-4 font-medium transition-colors ${
              activeTab === "products"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Manage Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 px-4 font-medium transition-colors ${
              activeTab === "orders"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            View Orders
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`pb-2 px-4 font-medium transition-colors ${
              activeTab === "messages"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Messages
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={productForm.category} 
                    onValueChange={(value) => setProductForm({...productForm, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cakes">Cakes</SelectItem>
                      <SelectItem value="Cupcakes">Cupcakes</SelectItem>
                      <SelectItem value="Cookies">Cookies</SelectItem>
                      <SelectItem value="Bread">Bread</SelectItem>
                      <SelectItem value="Brownies">Brownies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({...productForm, isFeatured: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Product"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-semibold">Recent Orders</h2>
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{order.customerName}</h3>
                      <p className="text-muted-foreground">{order.email}</p>
                      <p className="mt-2">
                        <span className="font-medium">Product:</span> {order.product} x{order.quantity}
                      </p>
                      <p>
                        <span className="font-medium">Delivery:</span> {order.deliveryDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        order.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                      <Button size="sm" variant="outline">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-semibold">Customer Messages</h2>
            {messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{message.name}</h3>
                      <p className="text-muted-foreground">{message.email}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="text-muted-foreground">{message.message}</p>
                  <div className="mt-4">
                    <Button size="sm">Reply</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;