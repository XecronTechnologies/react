// Suggested code may be subject to a license. Learn more: ~LicenseLog:2014367403.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2641438493.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3847013376.
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// This is a standalone React component for a restaurant website.
const RestaurantWebsite = () => {
  const [activeNav, setActiveNav] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Starters');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [scrolled, setScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollTopButton = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScrollTopButton);
    return () => window.removeEventListener('scroll', handleScrollTopButton);
  }, []);

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    setMobileMenuOpen(false);
  };

  const menuItems = {
    Starters: [
      {
        name: "Truffle Arancini",
        price: "$14",
        description: "Crispy risotto balls with black truffle and mozzarella",
        recommended: true
      },
      {
        name: "Seared Scallops",
        price: "$18",
        description: "With cauliflower purée and pancetta crisp",
        seasonal: true
      },
      {
        name: "Burrata Salad",
        price: "$16",
        description: "Creamy burrata with heirloom tomatoes and basil oil"
      }
    ],
    Mains: [
      {
        name: "Filet Mignon",
        price: "$42",
        description: "8oz grass-fed beef with truffle mashed potatoes",
        signature: true
      },
      {
        name: "Pan-Seared Salmon",
        price: "$32",
        description: "With asparagus and lemon beurre blanc"
      },
      {
        name: "Mushroom Risotto",
        price: "$26",
        description: "Wild mushroom risotto with parmesan crisp",
        vegetarian: true
      }
    ],
    Desserts: [
      {
        name: "Chocolate Soufflé",
        price: "$12",
        description: "Warm chocolate soufflé with vanilla bean ice cream",
        signature: true
      },
      {
        name: "Crème Brûlée",
        price: "$10",
        description: "Classic vanilla bean crème brûlée"
      }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your backend
    alert(`Thank you for your message, ${formData.name}! We'll contact you soon.`);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNav('#home'); // Optionally reset nav to home
  };

  return (
    <HelmetProvider>
    <>
  <Helmet>
        <title>My Restaurant</title>
        <meta name="description" content="Best food in town!" />
      </Helmet>


      <div className="font-sans text-gray-800 antialiased">
        {/* Premium Header */}
        <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black bg-opacity-90 py-2 shadow-xl' : 'bg-transparent py-4'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <motion.a 
              href="#home" 
              className="text-2xl font-serif font-bold text-white tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              onClick={() => handleNavClick('#home')}
            >
              EPICURE
            </motion.a>
            
            <nav className="hidden md:flex space-x-8">
              {['#home', '#about', '#menu', '#contact'].map((item) => (
                <motion.a
                  key={item}
                  href={item}
                  className={`relative text-sm uppercase tracking-wider font-medium text-white ${activeNav === item ? 'text-amber-300' : 'hover:text-amber-200'}`}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.substring(1)}
                  {activeNav === item && (
                    <motion.span 
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-amber-300"
                      layoutId="navUnderline"
                    />
                  )}
                </motion.a>
              ))}
            </nav>
            
            <motion.button 
              className="md:hidden focus:outline-none z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 flex flex-col space-y-2">
                <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </motion.button>
          </div>
        </header>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-90 z-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.nav 
                className="flex flex-col items-center space-y-8"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {['#home', '#about', '#menu', '#contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={item}
                    className={`text-2xl font-medium text-white ${activeNav === item ? 'text-amber-300' : ''}`}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.substring(1)}
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Luxury Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/restaurant-video.mp4" type="video/mp4" />
            {/* Fallback image */}
            <img src="/hero-fallback.jpg" alt="Fine dining restaurant" className="w-full h-full object-cover" />
          </video>
          
          <div className="container mx-auto px-6 relative z-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                Epicurean Excellence
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-10 max-w-2xl mx-auto">
                Where culinary artistry meets unparalleled dining experience
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.a
                  href="#menu"
                  className="px-10 py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-medium uppercase tracking-wider hover:bg-amber-400 hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick('#menu')}
                >
                  Explore Our Menu
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-10 py-4 bg-amber-400 text-black font-medium uppercase tracking-wider hover:bg-amber-500 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick('#contact')}
                >
                  Reserve a Table
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <a href="#about" className="text-white" onClick={() => handleNavClick('#about')}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </motion.div>
        </section>

        {/* About Section with Elegant Animation */}
        <section id="about" className="py-28 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Our Philosophy
              </h2>
              <div className="w-20 h-0.5 bg-amber-400 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We believe in the alchemy of exceptional ingredients, masterful technique, and passionate storytelling.
              </p>
            </motion.div>
            
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div 
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img 
                    src="/chef-portrait.jpg" 
                    alt="Master Chef" 
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-amber-400 p-6 rounded-lg shadow-lg">
                    <span className="block text-4xl font-serif font-bold text-gray-900">15+</span>
                    <span className="block text-sm uppercase tracking-wider">Years Experience</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Crafting Culinary Masterpieces
                </h3>
                <p className="text-gray-600 mb-6">
                  Founded by Chef Olivier Dubois, Epicure has redefined fine dining through our relentless pursuit of perfection. 
                  Each dish is a harmonious composition of flavors, textures, and visual artistry.
                </p>
                <p className="text-gray-600 mb-8">
                  We source only the finest seasonal ingredients from trusted purveyors, many of whom we've worked with for over a decade. 
                  Our tasting menus evolve with the seasons, offering guests a journey through the year's bounty.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="text-amber-400 mr-4 mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Michelin Star</h4>
                      <p className="text-sm text-gray-600">Awarded 2018-2023</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-amber-400 mr-4 mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Wine Spectator</h4>
                      <p className="text-sm text-gray-600">Award of Excellence</p>
                    </div>
                  </div>
                </div>
                
                <motion.a
                  href="#menu"
                  className="inline-block px-8 py-3 bg-gray-900 text-white font-medium uppercase tracking-wider hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNavClick('#menu')}
                >
                  Discover Our Menu
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Premium Menu Section */}
        <section id="menu" className="py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Culinary Creations
              </h2>
              <div className="w-20 h-0.5 bg-amber-400 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our menu celebrates seasonal ingredients with innovative techniques and timeless flavors.
              </p>
            </motion.div>
            
            <div className="flex justify-center mb-16">
              <div className="inline-flex rounded-md shadow-sm">
                {Object.keys(menuItems).map((tab) => (
                  <motion.button
                    key={tab}
                    className={`px-6 py-3 text-sm font-medium uppercase tracking-wider ${activeMenuTab === tab ? 'bg-amber-400 text-gray-900' : 'bg-white text-gray-700 hover:bg-gray-100'} first:rounded-l-lg last:rounded-r-lg focus:z-10`}
                    onClick={() => setActiveMenuTab(tab)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {menuItems[activeMenuTab].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  {item.signature && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-gray-900 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      Signature
                    </div>
                  )}
                  {item.recommended && (
                    <div className="absolute top-0 right-0 bg-gray-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      Recommended
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-serif font-bold text-gray-900">{item.name}</h4>
                    <span className="text-lg font-medium text-amber-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {item.seasonal && (
                    <p className="text-xs text-amber-600 uppercase tracking-wider">Seasonal Offering</p>
                  )}
                  {item.vegetarian && (
                    <p className="text-xs text-green-600 uppercase tracking-wider">Vegetarian</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#contact"
                className="inline-block px-10 py-4 bg-gray-900 text-white font-medium uppercase tracking-wider hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 mb-4"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavClick('#contact')}
              >
                Reserve Your Table
              </motion.a>
              <p className="text-sm text-gray-500">* Please inform us of any dietary restrictions when reserving</p>
            </motion.div>
          </div>
        </section>

        {/* Luxury Contact Section */}
        <section id="contact" className="py-28 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Reserve Your Experience
              </h2>
              <div className="w-20 h-0.5 bg-amber-400 mx-auto mb-6"></div>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Join us for an unforgettable dining experience. Our team will ensure every detail is perfect.
              </p>
            </motion.div>
            
            <div className="flex flex-col lg:flex-row gap-16">
              <motion.div 
                className="lg:w-1/2 space-y-10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-6">
                    Visit Us
                  </h3>
                  <p className="text-gray-300">
                    123 Culinary Avenue<br />
                    Gourmet City, GC 12345
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-6">
                    Hours
                  </h3>
                  <p className="text-gray-300">
                    <span className="font-medium">Dinner Service:</span><br />
                    Tuesday - Saturday: 5:30pm - 10:30pm<br /><br />
                    <span className="font-medium">Weekend Brunch:</span><br />
                    Sunday: 11:00am - 2:30pm
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-6">
                    Contact
                  </h3>
                  <p className="text-gray-300 mb-4">
                    <span className="font-medium">Reservations:</span> (555) 123-4567<br />
                    <span className="font-medium">Email:</span> reservations@epicure.com
                  </p>
                  <div className="flex space-x-4">
                    {['facebook', 'instagram', 'twitter'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-amber-400 hover:text-gray-900 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="sr-only">{social}</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social === 'facebook' ? "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" : 
                            social === 'instagram' ? "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" : 
                            "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-800 p-10 rounded-lg">
                  <h3 className="text-2xl font-serif font-bold text-white mb-8">
                    Reservation Request
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                        required 
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                        required 
                      />
                    </div>
                    <div className="mb-8">
                      <label htmlFor="message" className="block text-gray-300 mb-2">Special Requests</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                        required
                      ></textarea>
                    </div>
                    <motion.button 
                      type="submit" 
                      className="w-full px-6 py-4 bg-amber-400 text-gray-900 font-medium uppercase tracking-wider hover:bg-amber-300 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Submit Reservation
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="bg-black text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-400 mb-6">EPICURE</h3>
                <p className="text-gray-400 mb-6">
                  Redefining fine dining through culinary excellence and unparalleled service.
                </p>
                <div className="flex space-x-4">
                  {['facebook', 'instagram', 'twitter'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social === 'facebook' ? "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" : 
                          social === 'instagram' ? "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" : 
                          "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Navigation</h3>
                <ul className="space-y-3">
                  {['#home', '#about', '#menu', '#contact'].map((item) => (
                    <li key={item}>
                      <a 
                        href={item} 
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                        onClick={() => handleNavClick(item)}
                      >
                        {item.substring(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
                <address className="text-gray-400 not-italic">
                  <p className="mb-3">123 Culinary Avenue<br />
                  Gourmet City, GC 12345
                </p>
                <p className="mb-3">Reservations: (555) 123-4567</p>
                <p>Email: reservations@epicure.com</p>
                </address>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Hours</h3>
                <p className="text-gray-400">
                  Dinner:<br />
                  Tue - Sat: 5:30 PM - 10:30 PM<br /><br />
                  Brunch:<br />
                  Sun: 11:00 AM - 2:30 PM
                </p>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm pt-10 border-t border-gray-800">
              © 2023 EPICURE. All rights reserved. | Designed with <span className="text-red-500">❤️</span> by [Your Name/Agency Name]
            </div>
          </div>
        </footer>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-8 right-8 bg-amber-400 text-gray-900 p-3 rounded-full shadow-lg hover:bg-amber-300 transition-colors duration-300 z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
    </HelmetProvider>
  );
};

export default RestaurantWebsite;
