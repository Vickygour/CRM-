import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import img4 from '../../assets/new ceo.jpg';
import img5 from '../../assets/banner04.jpg';

const tabs = [
  { id: 'greetings', label: 'Greetings' },
  { id: 'corporate', label: 'Corporate philosophy' },
  { id: 'history', label: 'History' },
  { id: 'patents', label: 'Patents/certificates' },
  { id: 'award', label: 'Award details' },
  { id: 'howtofind', label: 'How to find us' },
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
      staggerChildren: 0.1,
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

const CompanyIntro = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'greetings');

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const renderContent = () => {
    switch (activeTab) {
      case 'greetings':
        return (
          <motion.div
            key="greetings"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
              GREETING
            </h2>
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4 md:mb-6">
              CEO GREETING
            </h3>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-8"
            >
              <motion.div variants={scaleIn}>
                <img
                  src={img4}
                  alt="CEO"
                  className="w-full h-auto rounded-none shadow-lg"
                />
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="space-y-4 md:space-y-6"
              >
                <p className="text-red-700 text-sm md:text-base leading-relaxed">
                  We became successfully established in Korea on the basis of
                  the trust and affection of our customers and efforts of our
                  staff and executives as well as authorized dealers to become
                  the leader of the thermal medical device industry.
                </p>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  We will repay the interest and affection of our customers with
                  the best quality and services. Furthermore, we will
                  ceaselessly make efforts to proliferate health and happiness.
                </p>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  As we have done since our establishment, Hanbit Nano Medical
                  Devices shall ceaselessly pursue research and development and
                  repay the affections of our customers with creative products
                  and enhanced quality. As such, we seek your continued interest
                  and support.
                </p>
                <div className="text-right pt-4 md:pt-8">
                  <p className="text-xl md:text-2xl font-bold text-gray-800">
                    CEO KIM
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 'corporate':
        return (
          <motion.div
            key="corporate"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">
              CORPORATE PHILOSOPHY
            </h2>

            <motion.div
              variants={scaleIn}
              className="bg-gray-100 border-l-4 border-gray-400 p-4 md:p-6 mb-6 md:mb-8"
            >
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Household medical devices which contribute to blood circulation
                improvement and alleviation of muscle aches.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="space-y-3 md:space-y-4 mb-8 md:mb-12"
            >
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We shall continue to strive to offer fulfillment and
                satisfaction for our customers by providing excellent quality,
                highly reliable products along with thorough customer service.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                The visions and values of Hanbit Nano Medical Devices can be
                evaluated through our management assessment system.
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden shadow-lg mb-12 md:mb-16"
            >
              <img
                src={img5}
                alt="Corporate Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/70" />
              <div className="absolute top-1/2 right-4 md:right-12 transform -translate-y-1/2 text-right text-white max-w-xs md:max-w-xl px-4">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 tracking-wide drop-shadow-lg">
                  PHILOSOPHY
                </h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-md">
                  We will repay the interest and affection of our customers with
                  the best quality and services. Furthermore, we will
                  ceaselessly make efforts to proliferate health and happiness.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
              <div className="bg-gray-100 py-3 md:py-4 px-4 md:px-6 mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  QUALITY FIRST
                </h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 px-4 md:px-6">
                So that everyone can find their health and enjoy happiness
              </p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-4 md:space-y-6 px-4 md:px-6"
              >
                {[
                  {
                    title: 'Respect for human beings',
                    text: 'We are implementing a personnel management policy to enable all members of Hanbit to fully demonstrate their respective capabilities and creativity, upholding respect for humans as the foremost value in order for all our customers to restore their health and enjoy happiness in life.',
                  },
                  {
                    title: 'Customer Satisfaction',
                    text: 'We shall fulfill our corporate obligations by placing the utmost priority on customer satisfaction from the viewpoints of our customers.',
                  },
                  {
                    title: 'Quality First',
                    text: 'We will make efforts to manufacture products that come ever-closer to perfection, rather than merely striving to sell more products.',
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

            <motion.div variants={fadeInUp}>
              <div className="bg-gray-100 py-3 md:py-4 px-4 md:px-6 mb-8 md:mb-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  CREATIVE PRODUCTS
                </h3>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 md:px-6"
              >
                {[
                  {
                    color: 'border-blue-600 text-blue-600',
                    text: 'Manufacturing\nthe best products through\napplication of new future\ntechnologies',
                  },
                  {
                    color: 'border-green-600 text-green-600',
                    text: 'A company\nthat grows while\nsetting trends in\nmedical devices',
                  },
                  {
                    color: 'border-orange-400 text-orange-500',
                    text: 'Services\nthat offer greater\nlife value',
                  },
                ].map((circle, idx) => (
                  <motion.div
                    key={idx}
                    variants={scaleIn}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-52 h-52 md:w-64 md:h-64 rounded-full border-6 md:border-8 ${circle.color} flex items-center justify-center bg-white shadow-lg`}
                    >
                      <p
                        className={`text-center ${circle.color} font-medium px-6 md:px-8 text-sm md:text-base leading-relaxed`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {circle.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 'history':
      case 'award':
        return (
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
              {activeTab === 'history' ? 'HISTORY' : 'AWARDS DETAILS'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 md:mb-12">
              We are ceaselessly pursuing research and development in order to
              manufacture the best products on the basis of expertise and
              patents accumulated over the last 17 years.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6 md:space-y-10"
              >
                {['2019', '2018', '2016', '2015', '2014', '2013'].map(
                  (year) => (
                    <motion.div
                      key={year}
                      variants={scaleIn}
                      className="border-b border-gray-300 pb-4 md:pb-6"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                        {year}
                      </h3>
                      <div className="space-y-2 md:space-y-3">
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                          <span className="font-semibold">Jul.:</span> Sample
                          event description for {year}
                        </p>
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                          <span className="font-semibold">Oct.:</span> Another
                          milestone for {year}
                        </p>
                      </div>
                    </motion.div>
                  ),
                )}
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="flex items-start justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700"
                  alt="Company Building"
                  className="w-full h-auto rounded-none shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        );

      case 'patents':
        return (
          <motion.div
            key="patents"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">
              PATENTS/CERTIFICATES
            </h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cert) => (
                <motion.div
                  key={cert}
                  variants={scaleIn}
                  className="bg-white shadow-lg rounded-none overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="w-full h-64 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400"
                      alt={`Certificate ${cert}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 text-center">
                    <p className="text-gray-700 text-sm md:text-base font-medium">
                      Certificate {cert}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'howtofind':
        return (
          <motion.div
            key="howtofind"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">
              MAP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <motion.div variants={scaleIn} className="md:col-span-2">
                <div className="w-full h-64 md:h-96 lg:h-[500px] shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.5453165634344!2d127.0276184!3d37.4979518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15f4a1f3b0d%3A0x4a7d9f1e0e0e0e0e!2s368%20Buil-ro%2C%20Bucheon-si%2C%20Gyeonggi-do%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Company Location Map"
                  />
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-4 md:space-y-6"
              >
                {[
                  { title: 'COMPANY NAME', text: 'HANBITNANO MEDICAL' },
                  {
                    title: 'ADDRESS',
                    text: '368, Buil-ro, Bucheon-si, Gyeonggi-do, Republic of Korea',
                  },
                  { title: 'PARKING', text: 'Use of public parking lots' },
                  { title: 'BUSINESS', text: 'Am:09 ~ Pm:06' },
                ].map((info, idx) => (
                  <motion.div key={idx} variants={scaleIn}>
                    <div className="bg-gray-800 text-white py-2 md:py-3 px-3 md:px-4 mb-2">
                      <h3 className="text-sm md:text-base font-semibold">
                        {info.title}
                      </h3>
                    </div>
                    <div className="bg-white border border-gray-300 py-2 md:py-3 px-3 md:px-4">
                      <p className="text-gray-700 text-xs md:text-sm">
                        {info.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
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
            COMPANY{' '}
            <span className="text-base md:text-lg font-normal text-gray-600">
              INTRODUCE
            </span>
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
          <span>Company introduction</span>
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

export default CompanyIntro;
