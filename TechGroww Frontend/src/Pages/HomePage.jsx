import { Link } from 'react-router';
import { Code2, TrendingUp, Smartphone, Palette, Cloud, Megaphone, Heart, Briefcase, GraduationCap, Lightbulb, Sparkles, Users, Home, MegaphoneIcon } from 'lucide-react';
import { motion } from 'motion/react';
import CountUp from 'react-countup';
import about_techgroww_image from '../assets/About_TechGroww.png'
import heroSectionImageURL from '../assets/Hero-Section.png'

export function HomePage() {


  const services = [
    {
      id: 'web-dev',
      icon: Code2,
      title: 'Web Development',
      description: 'Scalable web platforms using modern frameworks, secure architecture, performance optimization.',
    },
    {
      id: 'seo',
      icon: TrendingUp,
      title: 'SEO Optimization',
      description: 'Advanced SEO methodologies designed to improve organic reach, qualified leads, and sustainable performance.',
    },
    {
      id: 'mobile-dev',
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'High-quality native and cross-platform apps built for iOS, Android, Flutter, React Native.',
    },
    {
      id: 'ui-ux',
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centric design systems from wireframes to high-fidelity, conversion-optimized interfaces.',
    },
    {
      id: 'cloud',
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'AWS, Azure, GCP infrastructure with CI/CD pipelines, containerization, and scalable cloud architecture.',
    },
    {
      id: 'dm',
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Performance-focused digital marketing using paid media, analytics, and ROI-driven growth strategies.',
    },
  ];

  const industries = [
    { name: 'Healthcare', icon: Heart },
    { name: 'Technology', icon: Lightbulb },
    { name: 'E-commerce', icon: Briefcase },
    { name: 'Finance', icon: TrendingUp },
    { name: 'Education', icon: GraduationCap },
    { name: 'Startups', icon: Sparkles },
    { name: 'Real Estate', icon: Home },
    { name: 'Marketing', icon: MegaphoneIcon }
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-[#0A0F1E] pt-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-[#00D4FF]/10 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-16 sm:py-20 md:py-24 lg:py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#00D4FF] mb-1 sm:mb-2">
                Digital Growth Partner
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight">
                Empowering Business Growth with{" "}
                <span className="text-[#00D4FF]">Cutting-Edge Technology</span>
              </h1>
              <p className="text-base sm:text-lg text-[#94A3B8] mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We build scalable digital solutions that drive measurable growth. From web platforms to cloud infrastructure—engineered for modern businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 active:scale-95 text-sm sm:text-base"
                >
                  Get Started
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#00D4FF] text-[#00D4FF] rounded-lg font-medium transition-all hover:bg-[#00D4FF]/10 hover:text-white active:scale-95 text-sm sm:text-base"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Abstract Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center items-center"
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#00D4FF]/30 to-transparent rounded-3xl blur-3xl w-110 h-110" />
                <div className="relative w-110 h-110 bg-linear-to-br from-[#0A1F44] to-[#00D4FF] rounded-3xl shadow-2xl shadow-[#00D4FF]/20 flex items-center justify-center overflow-hidden">
                  {/* Image */}
                  <img
                    src={heroSectionImageURL}
                    alt="Hero illustration"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              End-to-end solutions designed for growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link to={`/services#${service.id}`} key={service.title} className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-[#1A1F2E] rounded-xl p-6 border border-[#1E293B] hover:shadow-xl hover:shadow-[#00D4FF]/20 hover:-translate-y-1 hover:border-[#00D4FF]/50 transition-all duration-300 h-full flex flex-col"
                  >
                    <Icon className="w-8 h-8 text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform shrink-0" />
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-[#94A3B8] leading-relaxed flex-1">{service.description}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 md:py-32 bg-[#0A0F1E] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#1E293B 2px, transparent 2px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12">
            Industries We Serve
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-linear-to-br from-[#1A1F2E] to-[#0F172A] rounded-xl p-6 text-center hover:bg-[#1A1F2E] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00D4FF]/10 transition-all duration-300 border border-[#1E293B] hover:border-[#00D4FF]/30"
                >
                  <Icon className="w-12 h-12 text-[#00D4FF] mx-auto mb-3 group-hover:rotate-6 transition-transform" />
                  <p className="font-medium text-white">{industry.name}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-widest text-[#00D4FF] mb-2 font-semibold">
                About TechGroww
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Innovation-Driven, Results-Focused
              </h2>
              <p className="text-[#94A3B8] leading-relaxed mb-8">
                TechGroww partners with forward-thinking businesses to create scalable digital solutions, combining deep technical expertise and strategic insight to deliver technology that drives measurable, long-term business growth.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 h-12 border-2 border-[#00D4FF] text-[#00D4FF] rounded-lg font-medium transition-all hover:bg-[#00D4FF]/10 hover:text-white active:scale-95"
              >
                Learn More
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div>
                  <p className="text-3xl font-bold text-[#00D4FF]">
                    <CountUp end={3} duration={3} enableScrollSpy scrollSpyOnce />+
                  </p>
                  <p className="text-sm text-[#94A3B8] mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#00D4FF]">
                    <CountUp end={50} duration={3} enableScrollSpy scrollSpyOnce />+
                  </p>
                  <p className="text-sm text-[#94A3B8] mt-1">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#00D4FF]">
                    <CountUp end={75} duration={3} enableScrollSpy scrollSpyOnce />+
                  </p>
                  <p className="text-sm text-[#94A3B8] mt-1">Clients Served</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-4/3 bg-linear-to-br from-[#0A1F44] to-[#00D4FF] rounded-xl shadow-2xl shadow-[#00D4FF]/20 overflow-hidden">
                <img
                  src={about_techgroww_image}
                  alt="Service illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}