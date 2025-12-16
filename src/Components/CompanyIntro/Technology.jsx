import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import img1 from '../../assets/ceramic.jpg';
import img2 from '../../assets/heat.jpg';
import img3 from '../../assets/heatrays.jpg';
import img4 from '../../assets/rowprequency.jpg';

const tabs = [
  { id: 'ceramic', label: 'Ceramic' },
  { id: 'thermal', label: 'Thermal' },
  { id: 'heating', label: 'Heating/Magnetic' },
  { id: 'lowfreq', label: 'Low frequency/electric' },
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Technology = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'ceramic');

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const renderContent = () => {
    switch (activeTab) {
      case 'ceramic':
        return (
          <motion.div
            key="ceramic"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
              CERAMIC
            </h2>
            <motion.div variants={scaleIn}>
              <img
                src={img1}
                alt="Ceramic Technology"
                className="w-full h-auto rounded-none shadow-lg"
              />
            </motion.div>
          </motion.div>
        );

      case 'thermal':
        return (
          <motion.div
            key="thermal"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">
              THERMAL
            </h2>
            <motion.div variants={scaleIn}>
              <img
                src={img2}
                alt="Thermal Technology"
                className="w-full h-auto rounded-none shadow-lg"
              />
            </motion.div>
          </motion.div>
        );

      case 'heating':
        return (
          <motion.div
            key="heating"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
              HEATING CABLE/MAGNETIC SHIELDING
            </h2>
            <motion.div variants={scaleIn}>
              <img
                src={img3}
                alt="Heating Cable/Magnetic Shielding"
                className="w-full h-auto rounded-none shadow-lg"
              />
            </motion.div>
          </motion.div>
        );

      case 'lowfreq':
        return (
          <motion.div
            key="lowfreq"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 md:mb-12">
              LOW FREQUENCY/ELECTRIC POTENTIAL
            </h2>
            <motion.div variants={scaleIn}>
              <img
                src={img4}
                alt="Low Frequency/Electric Potential"
                className="w-full h-auto rounded-none shadow-lg"
              />
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-white">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 py-6 md:py-8 px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            TECHNOLOGY
          </h1>
        </div>
      </motion.div>

      {/* Tab Navigation */}
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

      {/* Breadcrumb */}
      <div className="bg-black py-2 md:py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-2 text-xs md:text-sm text-white flex-wrap">
          <span>Home</span>
          <span>/</span>
          <span>Technology</span>
          <span>/</span>
          <span className="font-semibold">
            {tabs.find((t) => t.id === activeTab)?.label}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white min-h-screen">{renderContent()}</div>
    </section>
  );
};

export default Technology;
