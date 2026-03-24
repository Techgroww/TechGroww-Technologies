import { Link } from 'react-router';
import { Linkedin, Twitter, Instagram, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-[#1E293B]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12 sm:py-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">

          {/* Logo & Tagline */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">TG</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">TechGroww</h2>
              <p className="text-[14px] text-gray-400 leading-relaxed">
                Empowering business growth with cutting-edge technology solutions.
              </p>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="font-medium text-white mb-3 text-base">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/techgroww-technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1E293B] rounded-lg flex items-center justify-center hover:bg-[#00D4FF] hover:scale-110 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://x.com/TechgrowwHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1E293B] rounded-lg flex items-center justify-center hover:bg-[#00D4FF] hover:scale-110 transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/techgroww_technologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1E293B] rounded-lg flex items-center justify-center hover:bg-[#00D4FF] hover:scale-110 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-xl">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-xl">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  Technologies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold text-white mb-5 text-xl">Get in Touch</h3>
            <ul className="space-y-4 mb-6 flex flex-col gap-4 text-col">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-base leading-relaxed">Sector 63, Noida - 201301, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#00D4FF] shrink-0" />
                <a href="mailto:info@techgroww.dev" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  info@techgroww.dev
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#00D4FF] shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-base">
                  (+91) 93506-39255
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
            © {new Date().getFullYear()} TechGroww. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/privacy" className="text-gray-400 hover:text-[#00D4FF] text-sm sm:text-base transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-[#00D4FF] text-sm sm:text-base transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}