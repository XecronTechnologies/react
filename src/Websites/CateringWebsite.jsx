import React, { useState, useEffect } from 'react';

const IndianCateringEcommerce = () => {
  // Business Information
  const businessInfo = {
    name: "Spice Kingdom Catering",
    tagline: "Authentic Indian Flavors for Your Special Occasions",
    phone: "+91 98765 43210",
    email: "orders@spicekingdom.com",
    address: "456 Masala Lane, Delhi 110001, India",
    openingHours: "Mon-Sun: 9:00 AM - 10:00 PM",
    socialMedia: {
      facebook: "https://facebook.com/spicekingdom",
      instagram: "https://instagram.com/spicekingdom",
      whatsapp: "https://wa.me/919876543210"
    },
    paymentMethods: ["Credit Cards", "Debit Cards", "UPI", "Net Banking", "Cash on Delivery"]
  };

  // Product Categories
  const categories = [
    { id: 1, name: "Wedding Packages", icon: "🎩" },
    { id: 2, name: "Corporate Events", icon: "💼" },
    { id: 3, name: "Birthday Parties", icon: "🎂" },
    { id: 4, name: "Religious Functions", icon: "🕉️" },
    { id: 5, name: "Daily Tiffin Service", icon: "🍱" },
    { id: 6, name: "À La Carte", icon: "🍽️" }
  ];

  // Products Data
  const products = [
    {
      id: 101,
      name: "Royal Wedding Package",
      category: "Wedding Packages",
      price: 89999,
      description: "Complete wedding catering for 200 guests with 5 main courses, 8 sides, desserts, and premium service staff.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
      rating: 4.8,
      prepTime: "48 hours",
      serves: 200,
      bestSeller: true
    },
    {
      id: 102,
      name: "Corporate Lunch Box",
      category: "Corporate Events",
      price: 299,
      description: "Nutritious Indian thali with 3 curries, rice, bread, salad, and dessert for corporate meetings.",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
      rating: 4.5,
      prepTime: "4 hours",
      serves: 1,
      bestSeller: true
    },
    {
      id: 103,
      name: "Kids Birthday Party Pack",
      category: "Birthday Parties",
      price: 14999,
      description: "Fun food package for 30 kids including mini burgers, pizzas, snacks, juice, and cake.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      rating: 4.7,
      prepTime: "24 hours",
      serves: 30
    },
    {
      id: 104,
      name: "Puja Thali",
      category: "Religious Functions",
      price: 199,
      description: "Traditional prasadam thali for religious ceremonies with 5 sweets and savories.",
      image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d",
      rating: 4.9,
      prepTime: "6 hours",
      serves: 1,
      bestSeller: true
    },
    {
      id: 105,
      name: "Monthly Tiffin Service",
      category: "Daily Tiffin Service",
      price: 5999,
      description: "30 days of home-style North and South Indian meals delivered to your doorstep (2 meals/day).",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      rating: 4.6,
      prepTime: "Daily",
      serves: 1,
      subscription: true
    },
    {
      id: 106,
      name: "Hyderabadi Biryani",
      category: "À La Carte",
      price: 499,
      description: "Authentic dum-cooked Hyderabadi biryani with raita and mirchi ka salan (serves 2).",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      rating: 4.9,
      prepTime: "3 hours",
      serves: 2,
      bestSeller: true
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Mehta",
      role: "Wedding Client",
      text: "Spice Kingdom made our wedding feast unforgettable. The biryani was the best we've ever had!",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Corporate HR Manager",
      text: "We order their corporate lunch boxes weekly. The food is always fresh and delicious.",
      rating: 4
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Birthday Party Host",
      text: "The kids loved the food and the presentation was amazing. Highly recommended!",
      rating: 5
    }
  ];

  // State Management
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    instructions: ''
  });
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Helper Functions
  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const orderId = `ORDER-${Math.floor(Math.random() * 1000000)}`;
    setCurrentOrder({
      id: orderId,
      items: cart,
      total: calculateTotal(),
      customer: orderForm,
      date: new Date().toISOString()
    });
    setCart([]);
    setShowCheckoutModal(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render Stars for Ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-800 to-red-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-4 text-2xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </button>
              <div className="text-2xl md:text-3xl font-bold flex items-center">
                <span className="mr-2">🍛</span>
                {businessInfo.name}
              </div>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {['home', 'menu', 'services', 'testimonials', 'contact'].map((tab) => (
                <button
                  key={tab}
                  className={`capitalize px-2 py-1 rounded-md transition ${activeTab === tab ? 'bg-white text-red-800 font-semibold' : 'hover:bg-red-700'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <button 
                className="relative p-2"
                onClick={() => setActiveTab('cart')}
              >
                🛒
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2">
              <div className="flex flex-col space-y-2">
                {['home', 'menu', 'services', 'testimonials', 'contact', 'cart'].map((tab) => (
                  <button
                    key={tab}
                    className={`capitalize px-4 py-2 rounded-md text-left ${activeTab === tab ? 'bg-white text-red-800 font-semibold' : 'hover:bg-red-700'}`}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Home Page */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative rounded-xl overflow-hidden mb-12">
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                <div className="px-8 py-12 text-white max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{businessInfo.tagline}</h1>
                  <p className="text-xl mb-6">Premium catering services for all occasions across Delhi NCR</p>
                  <div className="flex space-x-4">
                    <button 
                      className="bg-yellow-500 hover:bg-yellow-600 text-red-900 font-bold py-3 px-6 rounded-lg transition"
                      onClick={() => setActiveTab('menu')}
                    >
                      View Menu
                    </button>
                    <button 
                      className="bg-white hover:bg-gray-100 text-red-800 font-bold py-3 px-6 rounded-lg transition"
                      onClick={() => setActiveTab('contact')}
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1603105037880-880cd4edfb0d" 
                alt="Indian Food Spread" 
                className="w-full h-96 object-cover"
              />
            </section>

            {/* Categories Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-red-800">Our Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map(category => (
                  <div 
                    key={category.id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer text-center"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setActiveTab('menu');
                    }}
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-red-800">Popular Items</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.bestSeller).map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          {renderStars(product.rating)}
                          <span className="text-sm text-gray-500">{product.serves} {product.serves > 1 ? 'people' : 'person'}</span>
                        </div>
                        <button 
                          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials Preview */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center text-red-800">What Our Clients Say</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button 
                  className="text-red-700 font-semibold hover:underline"
                  onClick={() => setActiveTab('testimonials')}
                >
                  View All Testimonials
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Menu Page */}
        {activeTab === 'menu' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold text-red-800 mb-4 md:mb-0">
                {selectedCategory ? selectedCategory : 'Our Menu'}
              </h2>
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                className={`px-4 py-2 rounded-full ${!selectedCategory ? 'bg-red-700 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full ${selectedCategory === category.name ? 'bg-red-700 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          {renderStars(product.rating)}
                          <span className="text-sm text-gray-500">
                            {product.prepTime} • Serves {product.serves}
                          </span>
                        </div>
                        <button 
                          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter</p>
                <button 
                  className="text-red-700 font-semibold hover:underline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Services Page */}
        {activeTab === 'services' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-red-800">Our Catering Services</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-red-700">Full-Service Catering</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Complete end-to-end catering solution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Professional staff including chefs, servers, and bartenders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>China dinnerware, glassware, and flatware</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Custom menu planning and tasting sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Setup, service, and cleanup</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-red-700">Drop-Off Catering</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Perfect for more casual gatherings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Delicious food delivered hot and ready to serve</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Disposable serving ware included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Set-up instructions provided</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Budget-friendly option</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <h3 className="text-2xl font-bold mb-4 text-center text-red-800">Our Service Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad', 'Greater Noida', 'Meerut', 'Sonipat'].map(city => (
                  <div key={city} className="bg-white p-3 rounded shadow-sm">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Page */}
        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-red-800">Client Testimonials</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-center text-red-800">Share Your Experience</h3>
              <form className="max-w-lg mx-auto">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Your Name</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Your Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" className="text-2xl hover:text-yellow-500">
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Your Testimonial</label>
                  <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" rows="4"></textarea>
                </div>
                <button type="submit" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Contact Page */}
        {activeTab === 'contact' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-red-800">Contact Us</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold mb-4 text-red-700">Get in Touch</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p>{businessInfo.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p>{businessInfo.email}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p>{businessInfo.address}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Opening Hours</h4>
                      <p>{businessInfo.openingHours}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-red-700">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href={businessInfo.socialMedia.facebook} className="text-red-700 hover:text-red-900 text-2xl">
                      <span className="sr-only">Facebook</span>
                      <span aria-hidden="true">📘</span>
                    </a>
                    <a href={businessInfo.socialMedia.instagram} className="text-red-700 hover:text-red-900 text-2xl">
                      <span className="sr-only">Instagram</span>
                      <span aria-hidden="true">📷</span>
                    </a>
                    <a href={businessInfo.socialMedia.whatsapp} className="text-red-700 hover:text-red-900 text-2xl">
                      <span className="sr-only">WhatsApp</span>
                      <span aria-hidden="true">💬</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-red-700">Send Us a Message</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Your Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" rows="4"></textarea>
                  </div>
                  <button type="submit" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Cart Page */}
        {activeTab === 'cart' && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-800">Your Order</h2>
            
            {cart.length > 0 ? (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="divide-y divide-gray-200">
                      {cart.map(item => (
                        <div key={item.id} className="p-4 flex flex-col md:flex-row">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full md:w-32 h-32 object-cover rounded mb-4 md:mb-0 md:mr-4"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-semibold">{item.name}</h3>
                              <span className="text-lg font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-600 mb-2">{item.category}</p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded">
                                <button 
                                  className="px-3 py-1 text-lg"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1">{item.quantity}</span>
                                <button 
                                  className="px-3 py-1 text-lg"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                              <button 
                                className="text-red-700 hover:text-red-900"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                    <h3 className="text-xl font-bold mb-4 text-red-800">Order Summary</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Charge</span>
                        <span>₹{(calculateTotal() * 0.1).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (5%)</span>
                        <span>₹{(calculateTotal() * 0.05).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{(calculateTotal() * 1.15).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-lg transition"
                      onClick={() => setShowCheckoutModal(true)}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🛒</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet</p>
                <button 
                  className="text-red-700 font-semibold hover:underline"
                  onClick={() => setActiveTab('menu')}
                >
                  Browse Menu
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-red-800">Complete Your Order</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowCheckoutModal(false)}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleOrderSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={orderForm.name}
                          onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={orderForm.email}
                          onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={orderForm.phone}
                          onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                    </div>
                    </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Delivery Details</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Delivery Address</label>
                        <textarea
                          name="address"
                          value={orderForm.address}
                          onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          rows="3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Delivery Date & Time</label>
                        <input
                          type="datetime-local"
                          name="date"
                          value={orderForm.date}
                          onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Special Instructions</label>
                        <textarea
                          name="instructions"
                          value={orderForm.instructions}
                          onChange={(e) => setOrderForm({...orderForm, instructions: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Payment Method</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {businessInfo.paymentMethods.map(method => (
                    <label key={method} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method}
                        className="text-red-600 focus:ring-red-500"
                        defaultChecked={method === "UPI"}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 font-medium"
                    onClick={() => setShowCheckoutModal(false)}
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h3>
              <p className="text-gray-700 mb-4">Thank you for your order. We've sent the details to {currentOrder.customer.email}.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <div className="mb-2">
                  <span className="font-semibold">Order ID:</span> {currentOrder.id}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Total:</span> ₹{currentOrder.total.toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Delivery to:</span> {currentOrder.customer.address}
                </div>
              </div>
              
              <button
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition"
                onClick={() => {
                  setCurrentOrder(null);
                  setShowCheckoutModal(false);
                  setActiveTab('home');
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{businessInfo.name}</h3>
              <p className="mb-4">{businessInfo.tagline}</p>
              <div className="flex space-x-4">
                <a href={businessInfo.socialMedia.facebook} className="hover:text-yellow-400">
                  <span className="sr-only">Facebook</span>
                  <span aria-hidden="true">📘</span>
                </a>
                <a href={businessInfo.socialMedia.instagram} className="hover:text-yellow-400">
                  <span className="sr-only">Instagram</span>
                  <span aria-hidden="true">📷</span>
                </a>
                <a href={businessInfo.socialMedia.whatsapp} className="hover:text-yellow-400">
                  <span className="sr-only">WhatsApp</span>
                  <span aria-hidden="true">💬</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['home', 'menu', 'services', 'testimonials', 'contact'].map(tab => (
                  <li key={tab}>
                    <button 
                      className="hover:text-yellow-400 capitalize"
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic">
                <p className="mb-2">{businessInfo.address}</p>
                <p className="mb-2">Phone: {businessInfo.phone}</p>
                <p>Email: {businessInfo.email}</p>
              </address>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
              <p className="mb-2">{businessInfo.openingHours}</p>
              <p>Closed on National Holidays</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndianCateringEcommerce;