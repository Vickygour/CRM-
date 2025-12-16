import { useState } from 'react';

const footerMenus = {
  'Co introduction': [
    'Greetings',
    'Corporate philosophy',
    'History',
    'Patents/Certificates',
    'Award details',
    'How to find us',
  ],
  Technology: [
    'Ceramic',
    'Thermal',
    'Heating/Magnetic shielding',
    'Low frequency/electric potential',
  ],
  'Product info': [
    'Personal combination stimulator',
    'Personal thermal device',
    'Functional health food',
  ],
  Contact: [],
};

const Footer = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <footer className="bg-[#2b2b2b] text-white">
      {/* Top Navigation Menu */}
      <div className="bg-[#333333] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerMenus).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    onMouseEnter={() => setHoveredItem(`${category}-${idx}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`text-sm cursor-pointer transition-all duration-200  rounded ${
                      hoveredItem === `${category}-${idx}`
                        ? 'text-orange-500 bg-gray-700'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Google Map Section */}
      <div className="w-full h-50 md:h-50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.5453165634344!2d127.0276184!3d37.4979518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15f4a1f3b0d%3A0x4a7d9f1e0e0e0e0e!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Company Location"
        />
      </div>

      {/* Bottom Info Section */}
      <div className="bg-[#1f1f1f] py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-6">
            {/* Home Link */}
            <div>
              <a
                href="/"
                className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
              >
                Home
              </a>
            </div>

            {/* Information */}
            <div className="flex-1">
              <h4 className="text-base font-bold mb-2 text-white">
                INFORMATION
              </h4>
              <p className="text-sm text-gray-400 mb-1">
                company name :{' '}
                <span className="text-white">hanbitnano medical</span>
              </p>
              <p className="text-sm text-gray-400 mb-1">
                CEO : <span className="text-white">Nam Han Woo</span>
              </p>
              <p className="text-sm text-gray-400 mb-1">
                address :{' '}
                <span className="text-white">
                  368, Buil-ro, Bucheon-si, Gyeonggi-do, Republic of Korea
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Tel : <span className="text-white">1644-6668</span>
              </p>
            </div>

            {/* Licence */}
            <div className="flex-1">
              <h4 className="text-base font-bold mb-2 text-white">LICENCE</h4>
              <p className="text-sm text-gray-400">
                corporate registration number :{' '}
                <span className="text-white">123-81-92457</span>
              </p>
            </div>

            {/* Web Master */}
            <div className="flex-1">
              <h4 className="text-base font-bold mb-2 text-white">
                WEB MASTER
              </h4>
              <p className="text-sm text-gray-400">
                e-mail : <span className="text-white">hbnano00@naver.com</span>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-4">
            <p className="text-xs text-red-500 mb-2">
              Unauthorized copying and resale of all contents is prohibited.
            </p>
            <p className="text-xs text-gray-500">
              Copyright(c) 2025 by{' '}
              <span className="text-white font-medium">hanbitnano</span> All
              Rights Reserved. Designed by hbnano.co.kr
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
