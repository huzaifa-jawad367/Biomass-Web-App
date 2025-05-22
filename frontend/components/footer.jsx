'use client'
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpCircle } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-indigo-900 text-gray-300 pt-20 pb-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">AI-ForCaST</h2>
            <p className="text-gray-400 leading-relaxed">
              Empowering businesses with advanced AI-driven forecasting tools for a smarter, data-driven future.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button onClick={scrollToTop} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <ArrowUpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col  items-center ">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className=" flex  flex-row md:flex-col gap-3  justify-between items-center">
              {['About Us', 'Services', 'Contact', 'Careers'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="flex flex-row md:flex-col justify-between items-center gap-3">
              {['Documentation', 'Blog', 'FAQ', 'Support'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col  items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 ">
              <li>
                <a href="mailto:contact@aiforcast.com" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@aiforcast.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                123 AI Street, Tech City
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com" },
                { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com" },
                { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} AI-ForCaST. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="/cookies" className="hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;