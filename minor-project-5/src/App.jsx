import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Smart Watch", price: 1999, image: "https://picsum.photos/300/200?1", desc: "Stylish smartwatch with fitness tracking." },
  { id: 2, name: "Wireless Headphones", price: 1499, image: "https://picsum.photos/300/200?2", desc: "Clear sound with comfortable design." },
  { id: 3, name: "Gaming Mouse", price: 799, image: "https://picsum.photos/300/200?3", desc: "Fast and accurate gaming mouse." },
  { id: 4, name: "Backpack", price: 999, image: "https://picsum.photos/300/200?4", desc: "Durable backpack for daily use." },
];

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert("Product added to cart!");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item, index) => index !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <h2>ShopZone</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to ShopZone</h1>
      <p>Your one-stop online shopping website</p>
      <Link to="/products" className="btn">Shop Now</Link>
    </div>
  );
}

function Products() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <Link to={`/product/${product.id}`} className="smallBtn">View Details</Link>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail() {
  const id = Number(window.location.pathname.split("/").pop());
  const product = products.find((p) => p.id === id);
  const { addToCart } = useContext(CartContext);

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <h2>₹{product.price}</h2>
        <p>{product.desc}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cartItem" key={index}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <h2>Total: ₹{total}</h2>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}