import React, { useState, useEffect } from 'react';
import logo from '../../assets/Brand.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from 'lucide-react';
import img1 from '../../assets/MainImg.jpg';

const coIntroDropdownItems = [
  { id: 'greetings', label: 'Greetings' },
  { id: 'corporate', label: 'Corporate philosophy' },
  { id: 'history', label: 'History' },
  { id: 'patents', label: 'Patents/Certificates' },
  { id: 'award', label: 'Award details' },
  { id: 'howtofind', label: 'How to find us' },
];

const technologyDropdownItems = [
  { id: 'ceramic', label: 'Ceramic' },
  { id: 'thermal', label: 'Thermal' },
  { id: 'heating', label: 'Heating/Magnetic' },
  { id: 'lowfreq', label: 'Low frequency/electric' },
];

const productInfoDropdownItems = [
  { id: 'personal-combo', label: 'Personal combination' },
  { id: 'thermal-device', label: 'Personal thermal device' },
  { id: 'health-food', label: 'Functional health food' },
];

const Header = () => {
  const navigate = useNavigate();
  const [coIntroDropdownOpen, setCoIntroDropdownOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [coIntroHoverIndex, setCoIntroHoverIndex] = useState(null);
  const [techHoverIndex, setTechHoverIndex] = useState(null);
  const [productHoverIndex, setProductHoverIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCoIntroOpen, setMobileCoIntroOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCoIntroClick = (tabId) => {
    navigate(`/CompanyIntro?tab=${tabId}`);
    setCoIntroDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleTechClick = (tabId) => {
    navigate(`/Technology?tab=${tabId}`);
    setTechDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleProductClick = (tabId) => {
    navigate(`/ProductInfo?tab=${tabId}`);
    setProductDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm transition-all duration-300">
        {/* Top Bar - Hide on scroll down */}
        {!isScrolled && (
          <div
            className={`overflow-hidden hidden lg:block transition-all duration-500 ease-in-out ${
              isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
            }`}
          >
            <div className="py-3">
              <div className="max-w-7xl mx-auto px-8 flex gap-5 items-center justify-between">
                <div className="flex gap-5 items-center">
                  <Link
                    to="/"
                    className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
                  >
                    Home
                  </Link>
                  <div className="flex gap-2">
                    <img
                      src="https://flagcdn.com/w40/kr.png"
                      alt="Korean"
                      className="h-5 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                    />
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      alt="English"
                      className="h-5 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
                <div className="flex gap-2 text-white">
                  <FacebookIcon className="h-5 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
                  <InstagramIcon className="h-5 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
                  <YoutubeIcon className="h-5 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/80 shadow-sm">
          <div className="mx-auto flex justify-between items-center max-w-7xl px-6 lg:px-8 py-3">
            {/* Logo */}
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src={logo}
                alt="Logo"
                className="h-12 lg:h-16 select-none"
                draggable="false"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-12 items-center relative pr-32">
              {/* Co Introduction Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCoIntroDropdownOpen(true)}
                onMouseLeave={() => {
                  setCoIntroDropdownOpen(false);
                  setCoIntroHoverIndex(null);
                }}
              >
                <Link to="/CompanyIntro">
                  <button
                    className="text-black font-medium px-3 py-2 hover:text-blue-600 transition-colors"
                    tabIndex={0}
                  >
                    Co introduction
                  </button>
                </Link>
                {coIntroDropdownOpen && (
                  <div className="absolute top-full left-0 z-40">
                    <ul className="bg-black text-white w-[250px] shadow-lg">
                      {coIntroDropdownItems.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleCoIntroClick(item.id)}
                          onMouseEnter={() => setCoIntroHoverIndex(idx)}
                          onMouseLeave={() => setCoIntroHoverIndex(null)}
                          className={`px-6 py-3 cursor-pointer transition-all duration-150 ${
                            coIntroHoverIndex === idx
                              ? 'bg-blue-600'
                              : 'bg-black'
                          }`}
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Technology Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setTechDropdownOpen(true)}
                onMouseLeave={() => {
                  setTechDropdownOpen(false);
                  setTechHoverIndex(null);
                }}
              >
                <Link to="/Technology">
                  <button
                    className="text-black font-medium px-3 py-2 hover:text-blue-600 transition-colors"
                    tabIndex={0}
                  >
                    Technology
                  </button>
                </Link>
                {techDropdownOpen && (
                  <div className="absolute top-full left-0 z-40">
                    <ul className="bg-black text-white w-[250px] shadow-lg">
                      {technologyDropdownItems.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleTechClick(item.id)}
                          onMouseEnter={() => setTechHoverIndex(idx)}
                          onMouseLeave={() => setTechHoverIndex(null)}
                          className={`px-6 py-3 cursor-pointer transition-all duration-150 ${
                            techHoverIndex === idx ? 'bg-blue-600' : 'bg-black'
                          }`}
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Product Info Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductDropdownOpen(true)}
                onMouseLeave={() => {
                  setProductDropdownOpen(false);
                  setProductHoverIndex(null);
                }}
              >
                <Link to="/ProductInfo">
                  <button
                    className="text-black font-medium px-3 py-2 hover:text-blue-600 transition-colors"
                    tabIndex={0}
                  >
                    Product info
                  </button>
                </Link>
                {productDropdownOpen && (
                  <div className="absolute top-full left-0 z-40">
                    <ul className="bg-black text-white w-[250px] shadow-lg">
                      {productInfoDropdownItems.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleProductClick(item.id)}
                          onMouseEnter={() => setProductHoverIndex(idx)}
                          onMouseLeave={() => setProductHoverIndex(null)}
                          className={`px-6 py-3 cursor-pointer transition-all duration-150 ${
                            productHoverIndex === idx
                              ? 'bg-blue-600'
                              : 'bg-black'
                          }`}
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link
                to="/contactUs"
                className="text-black hover:text-blue-600 font-medium px-3 py-2 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-800 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto">
              <nav className="px-6 py-4">
                {/* Co Introduction Mobile */}
                <div className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setMobileCoIntroOpen(!mobileCoIntroOpen)}
                    className="w-full flex justify-between items-center py-3 text-gray-800 font-medium"
                  >
                    <span>Co introduction</span>
                    {mobileCoIntroOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {mobileCoIntroOpen && (
                    <ul className="mt-2 ml-4 space-y-2">
                      {coIntroDropdownItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleCoIntroClick(item.id)}
                          className="py-2 text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Technology Mobile */}
                <div className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setMobileTechOpen(!mobileTechOpen)}
                    className="w-full flex justify-between items-center py-3 text-gray-800 font-medium"
                  >
                    <span>Technology</span>
                    {mobileTechOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {mobileTechOpen && (
                    <ul className="mt-2 ml-4 space-y-2">
                      {technologyDropdownItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleTechClick(item.id)}
                          className="py-2 text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Product Info Mobile */}
                <div className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setMobileProductOpen(!mobileProductOpen)}
                    className="w-full flex justify-between items-center py-3 text-gray-800 font-medium"
                  >
                    <span>Product info</span>
                    {mobileProductOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {mobileProductOpen && (
                    <ul className="mt-2 ml-4 space-y-2">
                      {productInfoDropdownItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleProductClick(item.id)}
                          className="py-2 text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Contact Mobile */}
                <Link
                  to="/contactUs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-gray-800 font-medium hover:text-blue-600"
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Static Hero Image - No Swiper */}
      <div
        className="w-full h-[90vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <p className="text-white text-lg md:text-2xl font-light tracking-wide mb-3 max-w-2xl">
            We will repay the interest and affection of our customers with the
            best.
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
            QUALITY AND SERVICE
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Header;
