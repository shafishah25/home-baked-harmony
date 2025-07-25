import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CartItems = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button onClick={() => navigate('/menu')}>
          Browse Menu
        </Button>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/order');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b">
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <p className="font-semibold">Rs. {item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 ml-2"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Total:</span>
          <span>Rs. {getTotalPrice()}</span>
        </div>
        <div className="space-y-2">
          <Button onClick={handleCheckout} className="w-full">
            Proceed to Checkout
          </Button>
          <Button onClick={clearCart} variant="outline" className="w-full">
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};