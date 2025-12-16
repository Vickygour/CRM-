import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Thank you! Your message has been sent successfully.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setTimeout(() => setFormStatus(''), 5000);
  };

  return (
    <div className="w-full bg-white">
      {/* Page Header */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">
            We would love to hear from you. Get in touch with us!
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {/* Phone */}
          <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Phone className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600 text-sm mb-1">1644-6668</p>
            <p className="text-gray-500 text-xs">Mon - Fri, 9AM - 6PM</p>
          </div>

          {/* Email */}
          <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Mail className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600 text-sm mb-1">hbnano00@naver.com</p>
            <p className="text-gray-500 text-xs">Online support</p>
          </div>

          {/* Address */}
          <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <MapPin className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Address
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              368, Buil-ro, Bucheon-si
            </p>
            <p className="text-gray-500 text-xs">Gyeonggi-do, South Korea</p>
          </div>

          {/* Business Hours */}
          <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <Clock className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Business Hours
            </h3>
            <p className="text-gray-600 text-sm mb-1">09:00 - 18:00</p>
            <p className="text-gray-500 text-xs">Lunch: 12:00 - 13:00</p>
          </div>
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-none shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter your phone"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Subject of inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-none hover:bg-blue-700 transition-colors duration-300 shadow-md"
              >
                Send Message
              </button>

              {/* Form Status Message */}
              {formStatus && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-none">
                  {formStatus}
                </div>
              )}
            </form>
          </div>

          {/* Map and Company Info */}
          <div className="space-y-6">
            {/* Company Info Box */}
            <div className="bg-gray-800 text-white p-8 rounded-none">
              <h2 className="text-2xl font-bold mb-6">Company Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Company Name</h3>
                  <p className="text-gray-300">HANBITNANO MEDICAL</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">CEO</h3>
                  <p className="text-gray-300">Nam Han Woo</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Registration Number
                  </h3>
                  <p className="text-gray-300">123-81-92457</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Address</h3>
                  <p className="text-gray-300">
                    368, Buil-ro, Bucheon-si, Gyeonggi-do, Republic of Korea
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-96 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.5453165634344!2d127.0276184!3d37.4979518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15f4a1f3b0d%3A0x4a7d9f1e0e0e0e0e!2s368%20Buil-ro%2C%20Bucheon-si%2C%20Gyeonggi-do%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Company Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CTA Section */}
      <div className="bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Have Questions? We are Here to Help!
          </h2>
          <p className="text-lg mb-6">
            Our team is ready to assist you with any inquiries about our
            products and services.
          </p>
          <a
            href="tel:1644-6668"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-none hover:bg-gray-100 transition-colors duration-300"
          >
            Call Us Now: 1644-6668
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
