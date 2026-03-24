import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();

  // 🔥 underline logic
  const containerRef = useRef(null);
  const linkRefs = useRef({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => (document.body.style.overflow = 'unset');
  }, [isMobileMenuOpen]);

  // 🔥 Calculate underline
  const updateUnderline = () => {
    const activeLink = linkRefs.current[location.pathname];
    const container = containerRef.current;

    if (activeLink && container) {
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setUnderline({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  };

  useEffect(() => {
    updateUnderline();
  }, [location.pathname]);

  // Fix on resize
  useEffect(() => {
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0F1E]/95 backdrop-blur-xl shadow-lg shadow-[#00D4FF]/5 border-b border-[#1E293B]'
            : 'bg-[#0A0F1E]/80 backdrop-blur-md border-b border-[#1E293B]/50'
        }`}
      >
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-linear-to-br from-[#0A1F44] to-[#00D4FF] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">TG</span>
              </div>
              <span className="text-xl font-bold text-white">TechGroww</span>
            </Link>

            {/* 🔥 Desktop Nav */}
            <div
              ref={containerRef}
              className="hidden lg:flex items-center gap-8 relative"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    ref={(el) => (linkRefs.current[link.path] = el)}
                    className={`relative text-sm font-medium py-2 transition-colors duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* 🔥 SINGLE underline */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-[#00D4FF]"
                animate={{
                  left: underline.left,
                  width: underline.width,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                }}
              />
            </div>

            {/* Contact Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="px-6 h-12 flex items-center justify-center bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 transition-all"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#1E293B]"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 🔥 Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#1A1F2E] z-50 shadow-2xl border-l border-[#1E293B]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-[#1E293B]">
                  <span className="text-white font-bold text-xl">
                    TechGroww
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="text-white" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 p-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg ${
                        location.pathname === link.path
                          ? 'bg-[#00D4FF]/10 text-[#00D4FF]'
                          : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Contact */}
                <div className="p-6 border-t border-[#1E293B]">
                  <Link
                    to="/contact"
                    className="block text-center px-6 py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg"
                  >
                    Contact Us
                  </Link>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}