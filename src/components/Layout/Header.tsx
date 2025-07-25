import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { CartButton } from "@/components/Cart/CartButton";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-heading font-bold text-primary">
              Delicious Bakers
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/menu") ? "text-primary" : "text-foreground"
              }`}
            >
              Menu
            </Link>
            <Link
              to="/order"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/order") ? "text-primary" : "text-foreground"
              }`}
            >
              Order
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
          <CartButton />
          <Button asChild>
            <Link to="/order">Order Now</Link>
          </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;