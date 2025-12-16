import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import img1 from '../../assets/Product1.jpg';
import img2 from '../../assets/Product2.jpg';
import img3 from '../../assets/Product3.jpg';
import img4 from '../../assets/Product4.jpg';
import img5 from '../../assets/Product5.jpg';
import img6 from '../../assets/Product6.jpg';

const tabs = [
  { id: 'personal-combo', label: 'Personal combination stimulator' },
  { id: 'thermal-device', label: 'Personal thermal device' },
  { id: 'health-food', label: 'Functional health food' },
];

// Product data
const products = [
  {
    id: 1,
    name: 'Furima Hyranya - 2000',
    model: 'HIRANYA - 2000',
    image: img1,
  },
  {
    id: 2,
    name: 'Sipijangsaeng Gold for 1 person',
    model: 'HB - HS1000G',
    image: img2,
  },
  {
    id: 3,
    name: 'Sipijangsaeng Gold for 2 person',
    model: 'HB - SJG - 13D',
    image: img3,
  },
 
  {
    id: 5,
    name: 'Furima Crown',
    model: '휴리마 - CR1450',
    image: img5,
  },
  {
    id: 6,
    name: 'Furima Crown',
    model: '휴리마 - CR1450',
    image: img6,
  },
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const ProductInfo = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'personal-combo');

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const renderContent = () => {
    switch (activeTab) {
      case 'personal-combo':
        return (
          <motion.div
            key="personal-combo"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            {/* Header Section */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                PERSONAL COMBINATION STIMULATOR
              </h2>
              <div className="bg-gray-100 p-4 md:p-6 border-l-4 border-gray-600">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  Uses thermal and low-frequency stimulation for the purpose of
                  alleviating muscle pain and provides overall therapeutic
                  treatment by applying electrical potential to the human body.
                </p>
              </div>
            </div>

            {/* Product Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={scaleIn}
                  className="bg-white rounded-none overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full h-56 md:h-64 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 md:p-6 text-center">
                    <p className="text-gray-500 text-xs md:text-sm font-medium mb-2">
                      {product.model}
                    </p>
                    <h3 className="text-gray-800 text-sm md:text-base font-bold">
                      {product.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'thermal-device':
        return (
          <motion.div
            key="thermal-device"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">
              PERSONAL THERMAL DEVICE
            </h2>

            <motion.div
              variants={scaleIn}
              className="bg-gray-100 border-l-4 border-gray-400 p-4 md:p-6 mb-6 md:mb-8"
            >
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Innovative thermal therapy devices for enhanced blood
                circulation and muscle relaxation through controlled heat
                application.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="space-y-3 md:space-y-4 mb-8 md:mb-12"
            >
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Our personal thermal devices utilize advanced heating technology
                to provide therapeutic warmth that penetrates deep into tissues,
                promoting healing and comfort.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Each device is crafted with safety and effectiveness in mind,
                featuring precise temperature control and energy-efficient
                operation for daily wellness routines.
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden shadow-lg mb-12 md:mb-16"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400"
                alt="Thermal Device Technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/70" />
              <div className="absolute top-1/2 right-4 md:right-12 transform -translate-y-1/2 text-right text-white max-w-xs md:max-w-xl px-4">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 tracking-wide drop-shadow-lg">
                  THERMAL CARE
                </h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-md">
                  Experience the healing power of therapeutic heat with our
                  advanced thermal devices designed for your comfort and
                  wellness.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
              <div className="bg-gray-100 py-3 md:py-4 px-4 md:px-6 mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">c
                  KEY BENEFITS
                </h3>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-4 md:space-y-6 px-4 md:px-6"
              >
                {[
                  {
                    title: 'Deep Tissue Penetration',
                    text: 'Advanced thermal technology delivers therapeutic heat deep into muscle tissues, promoting faster recovery and pain relief.',
                  },
                  {
                    title: 'Circulation Enhancement',
                    text: 'Improved blood flow helps deliver oxygen and nutrients throughout the body, supporting overall health.',
                  },
                  {
                    title: 'Safe & Reliable',
                    text: 'Medical-grade materials and precise temperature control ensure safe, consistent therapeutic treatment.',
                  },
                ].map((item, idx) => (
                  <motion.div key={idx} variants={scaleIn}>
                    <h4 className="text-base md:text-lg font-bold text-red-700 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 'health-food':
        return (
          <motion.div
            key="health-food"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
              FUNCTIONAL HEALTH FOOD
            </h2>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 md:mb-12">
              Premium nutritional supplements and functional foods designed to
              complement our medical devices and support overall wellness and
              healthy living.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6 md:space-y-10"
              >
                {[
                  {
                    title: 'Nutritional Excellence',
                    desc: 'Carefully formulated products using premium ingredients for optimal health benefits.',
                  },
                  {
                    title: 'Scientific Research',
                    desc: 'All products backed by extensive research and clinical studies for proven effectiveness.',
                  },
                  {
                    title: 'Quality Assurance',
                    desc: 'Manufactured in certified facilities following strict quality control standards.',
                  },
                  {
                    title: 'Natural Ingredients',
                    desc: 'Focus on natural, plant-based ingredients for safe and effective supplementation.',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={scaleIn}
                    className="border-b border-gray-300 pb-4 md:pb-6"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={scaleIn}
                className="flex items-start justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=700"
                  alt="Functional Health Food"
                  className="w-full h-auto rounded-none shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 py-6 md:py-8 px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            PRODUCT INFO
          </h1>
        </div>
      </motion.div>

      <div className="bg-white shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto flex flex-nowrap md:flex-wrap justify-start md:justify-center mb-6 md:mb-10 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-black py-2 md:py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-2 text-xs md:text-sm text-white flex-wrap">
          <span>Home</span>
          <span>/</span>
          <span>Product Info</span>
          <span>/</span>
          <span className="font-semibold">
            {tabs.find((t) => t.id === activeTab)?.label}
          </span>
        </div>
      </div>

      <div className="bg-white min-h-screen">{renderContent()}</div>
    </section>
  );
};

export default ProductInfo;
