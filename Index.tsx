
import { useState } from "react";
import { SearchFilter } from "@/components/SearchFilter";
import { ProductCard } from "@/components/ProductCard";
import { CartIcon } from "@/components/CartIcon";
import { CartDrawer } from "@/components/CartDrawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    description: "High-quality wireless headphones with noise cancellation",
    rating: 4.5
  },
  {
    id: 2,
    name: "Coffee Maker",
    price: 149.99,
    category: "Appliances",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    description: "Premium coffee maker with programmable settings",
    rating: 4.3
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 79.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    description: "Comfortable running shoes for daily workouts",
    rating: 4.7
  },
  {
    id: 4,
    name: "Smartphone",
    price: 699.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    description: "Latest smartphone with advanced camera features",
    rating: 4.6
  },
  {
    id: 5,
    name: "Desk Lamp",
    price: 39.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    description: "Modern LED desk lamp with adjustable brightness",
    rating: 4.2
  },
  {
    id: 6,
    name: "Backpack",
    price: 59.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    description: "Durable backpack perfect for travel and daily use",
    rating: 4.4
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  const handleSearch = (searchTerm: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handlePriceSort = (sortOrder: string) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.price - b.price;
      } else if (sortOrder === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });
    setFilteredProducts(sorted);
  };

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with title and profile avatar */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Product Catalog</h1>
            <p className="text-xl text-muted-foreground">Discover amazing products at great prices</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Admin
            </Button>
            
            <CartDrawer
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              getTotalPrice={getTotalPrice}
            >
              <CartIcon
                itemCount={getTotalItems()}
                onClick={() => {}}
              />
            </CartDrawer>
            
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop" alt="User Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Customer</p>
            </div>
          </div>
        </div>
        
        <SearchFilter
          categories={categories}
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          onPriceSort={handlePriceSort}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
