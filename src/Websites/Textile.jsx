import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextileStore = () => {
  const [activeTab, setActiveTab] = useState("sarees");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // REAL IMAGE LINKS (will load)
  const products = {
    sarees: [
      {
        id: 1,
        name: "Kanjivaram Silk Saree",
        price: 24999,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80",
        colors: ["#b38b59", "#824d2b"],
        stock: 3
      },
      {
        id: 2,
        name: "Banarasi Silk",
        price: 18999,
        image: "https://images.unsplash.com/photo-1631549916768-411b31b8a6f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbmFyYXNpJTIwc2FyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=80",
        colors: ["#6b2c57", "#d4af37"],
        stock: 5
      }
    ],
    lehengas: [
      {
        id: 3,
        name: "Bridal Lehenga",
        price: 45999,
        image: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=600",
        colors: ["#d4af37", "#aa4b41"],
        stock: 2
      }
    ]
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setShowCart(true);
  };

  return (
    <div className="font-sans bg-white">
      {/* Header */}
      <header className="border-b py-4 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold">VASTRAM</div>
          <button 
            className="relative"
            onClick={() => setShowCart(true)}
          >
            🛍️ Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero with WORKING Image */}
      <section className="relative h-96">
        <img
          src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Bride in saree"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl font-serif mb-4">Luxury Handwoven Textiles</h1>
            <button className="bg-amber-700 text-white px-8 py-3 rounded-full">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 container mx-auto px-6">
        <div className="flex border-b mb-8">
          {Object.keys(products).map(tab => (
            <button
              key={tab}
              className={`px-6 py-3 ${activeTab === tab ? 'border-b-2 border-amber-700' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products[activeTab].map(product => (
            <motion.div 
              key={product.id}
              className="border rounded-lg overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                {product.stock < 5 && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs">
                    Only {product.stock} left
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-amber-700 font-serif mt-1">₹{product.price.toLocaleString()}</p>
                <button 
                  className="mt-4 w-full bg-gray-100 py-2 hover:bg-gray-200"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shopping Cart */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md h-full overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <div className="p-4 border-b flex justify-between">
                <h3>Your Cart</h3>
                <button onClick={() => setShowCart(false)}>✕</button>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="p-12 text-center">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} className="p-4 border-b flex">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="ml-4">
                        <h4>{item.name}</h4>
                        <p>₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-4">
                    <button className="w-full bg-amber-700 text-white py-3">
                      Checkout (₹{cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()})
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextileStore;