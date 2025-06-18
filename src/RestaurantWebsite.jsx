import { useState } from 'react';

const RestaurantWebsite = () => {
  const [activeNav, setActiveNav] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('Starters');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    setMobileMenuOpen(false);
  };

  const handleMenuTabClick = (tab) => {
    setActiveMenuTab(tab);
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
    alert(`Thank you for your message, ${formData.name}! We'll contact you soon.`);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const menuItems = {
    Starters: [
      {
        name: "Truffle Arancini",
        price: "$14",
        description: "Crispy risotto balls with black truffle and mozzarella"
      },
      {
        name: "Seared Scallops",
        price: "$18",
        description: "With cauliflower purée and pancetta crisp"
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
        description: "8oz grass-fed beef with truffle mashed potatoes"
      },
      {
        name: "Pan-Seared Salmon",
        price: "$32",
        description: "With asparagus and lemon beurre blanc"
      },
      {
        name: "Mushroom Risotto",
        price: "$26",
        description: "Wild mushroom risotto with parmesan crisp"
      }
    ],
    Desserts: [
      {
        name: "Chocolate Soufflé",
        price: "$12",
        description: "Warm chocolate soufflé with vanilla bean ice cream"
      },
      {
        name: "Crème Brûlée",
        price: "$10",
        description: "Classic vanilla bean crème brûlée"
      }
    ],
    Drinks: [
      {
        name: "Signature Cocktails",
        price: "$14",
        description: "Ask your server about our seasonal offerings"
      },
      {
        name: "Wine Selection",
        price: "$12-$25",
        description: "Curated international wine list"
      }
    ]
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a 
            href="#home" 
            className="text-2xl font-bold text-amber-700 hover:text-amber-800 transition-colors"
            onClick={() => handleNavClick('#home')}
          >
            Gourmet Haven
          </a>
          
          <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-0">
              <a 
                href="#home" 
                className={`px-3 py-2 rounded-md text-lg font-medium ${activeNav === '#home' ? 'text-amber-700 bg-amber-50' : 'text-gray-700 hover:text-amber-600'}`}
                onClick={() => handleNavClick('#home')}
              >
                Home
              </a>
              <a 
                href="#about" 
                className={`px-3 py-2 rounded-md text-lg font-medium ${activeNav === '#about' ? 'text-amber-700 bg-amber-50' : 'text-gray-700 hover:text-amber-600'}`}
                onClick={() => handleNavClick('#about')}
              >
                About
              </a>
              <a 
                href="#menu" 
                className={`px-3 py-2 rounded-md text-lg font-medium ${activeNav === '#menu' ? 'text-amber-700 bg-amber-50' : 'text-gray-700 hover:text-amber-600'}`}
                onClick={() => handleNavClick('#menu')}
              >
                Menu
              </a>
              <a 
                href="#contact" 
                className={`px-3 py-2 rounded-md text-lg font-medium ${activeNav === '#contact' ? 'text-amber-700 bg-amber-50' : 'text-gray-700 hover:text-amber-600'}`}
                onClick={() => handleNavClick('#contact')}
              >
                Contact
              </a>
            </div>
          </nav>
          
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 flex flex-col space-y-1">
              <span className={`h-0.5 w-full bg-amber-700 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`h-0.5 w-full bg-amber-700 transition-all ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`h-0.5 w-full bg-amber-700 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Hero Section (Home) */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Gourmet Haven</h1>
          <p className="text-xl md:text-2xl mb-8">Experience culinary excellence in the heart of the city</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#menu" 
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              onClick={() => handleNavClick('#menu')}
            >
              View Menu
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-lg transition-colors"
              onClick={() => handleNavClick('#contact')}
            >
              Reservations
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Story</h2>
            <p className="text-lg text-gray-600">Discover the passion behind our cuisine</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tradition & Innovation</h3>
              <p className="text-gray-600 mb-4">
                Founded in 2005, Gourmet Haven brings together generations of culinary tradition 
                with modern innovation. Our chef, Marco Bellini, combines locally-sourced 
                ingredients with techniques learned from masters around the world.
              </p>
              <p className="text-gray-600 mb-6">
                We believe in sustainable dining practices and supporting local farmers. 
                Every dish tells a story of quality, care, and exceptional flavor.
              </p>
              <div className="bg-amber-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Our Awards:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
                    <span>Michelin Star - 2022</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
                    <span>Best Fine Dining - City Awards 2023</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-600 rounded-full mr-2"></span>
                    <span>Top 100 Restaurants Worldwide - 2021</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5" 
                alt="Restaurant interior" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Menu</h2>
            <p className="text-lg text-gray-600">Crafted with the finest ingredients</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(menuItems).map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-full font-medium ${activeMenuTab === tab ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleMenuTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {menuItems[activeMenuTab].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                  <span className="text-lg font-medium text-amber-600">{item.price}</span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="#contact" 
              className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors mb-4"
              onClick={() => handleNavClick('#contact')}
            >
              Make a Reservation
            </a>
            <p className="text-sm text-gray-500">* Please inform us of any dietary restrictions</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Contact Us</h2>
            <p className="text-lg text-gray-600">We'd love to hear from you</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visit Us</h3>
                <p className="text-gray-600">123 Culinary Avenue<br />Gourmet City, GC 12345</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Opening Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 11am - 10pm<br />
                  Saturday - Sunday: 10am - 11pm
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Details</h3>
                <p className="text-gray-600">
                  Phone: (123) 456-7890<br />
                  Email: info@gourmethaven.com
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required 
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-4">Gourmet Haven</h3>
              <p className="text-gray-300">
                Exquisite dining experience with a focus on quality ingredients and exceptional service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#home" 
                    className="text-gray-300 hover:text-amber-400 transition-colors"
                    onClick={() => handleNavClick('#home')}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="text-gray-300 hover:text-amber-400 transition-colors"
                    onClick={() => handleNavClick('#about')}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#menu" 
                    className="text-gray-300 hover:text-amber-400 transition-colors"
                    onClick={() => handleNavClick('#menu')}
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-gray-300 hover:text-amber-400 transition-colors"
                    onClick={() => handleNavClick('#contact')}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for special offers and events.
              </p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Gourmet Haven. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantWebsite;