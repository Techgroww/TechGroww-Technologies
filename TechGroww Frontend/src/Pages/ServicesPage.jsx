import { Link } from 'react-router';
import { Code2, TrendingUp, Smartphone, Palette, Cloud, Megaphone, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import LottieAnimation from '../Components/LottieAnimation';

import webDevAnimation from '../assets/animations/Web Development (1).json'
import seoAnimation from '../assets/animations/SEO Work and Marketing.json'
import appDevAnimation from '../assets/animations/Mobile app development (1).json'
import uiuxAnimation from '../assets/animations/Mobile Application Testing.json'
import cloudDevopAnimation from '../assets/animations/Cloud Computing.json'
import dmAnimation from '../assets/animations/Digital Marketing.json'
import { animate } from 'motion';

export function ServicesPage() {

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to ensure React has finished rendering the mapped list
      const timer = setTimeout(() => {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
          // Calculate position with a 100px offset so it's not glued to the top
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // 200ms is usually the "sweet spot" for route transitions

      return () => clearTimeout(timer);
    }
  }, [hash]);

  const services = [
    {
      id: 'web-dev',
      icon: Code2,
      animation: webDevAnimation,
      title: 'Web Development',
      description: 'We build high-performance web platforms using modern frontend and backend technologies. Every solution is engineered for speed, security, and scalable growth.',
      features: [
        'Custom web applications',
        'E-commerce platforms',
        'Progressive web apps (PWA)',
        'API development & integrations',
        'Performance optimization',
      ],
      imagePosition: 'left',
    },
    {
      id: 'seo',
      icon: TrendingUp,
      animation: seoAnimation,
      title: 'SEO Optimization',
      description: 'We implement strategic SEO solutions focused on increasing organic visibility, qualified traffic, and long-term search performance. Our approach combines technical SEO, content optimization, and data-driven insights.',
      features: [
        'Technical SEO optimization',
        'On-page & content optimization',
        'Keyword research & strategy',
        'Site speed & performance SEO',
        'Analytics, tracking & reporting',
      ],
      imagePosition: 'right',
    },
    {
      id: 'mobile-dev',
      icon: Smartphone,
      animation: appDevAnimation,
      title: 'Mobile App Development',
      description: 'We develop native and cross-platform mobile applications using modern technologies. Each app is designed for performance, security, and seamless user experience across devices.',
      features: [
        'Native iOS & Android apps',
        'Cross-platform with Flutter/React Native',
        'Scalable app architecture',
        'API integration & backend connectivity',
        'App performance optimization',
      ],
      imagePosition: 'left',
    },
    {
      id: 'ui-ux',
      icon: Palette,
      animation: uiuxAnimation,
      title: 'UI/UX Design',
      description: 'We design user-centric interfaces and scalable design systems focused on usability, clarity, and conversion. Our approach transforms ideas into intuitive digital experiences.',
      features: [
        'User research & journey mapping',
        'Wireframing & prototyping',
        'High-fidelity UI design',
        'Interactive prototypes',
        'Conversion-optimized interfaces',
      ],
      imagePosition: 'right',
    },
    {
      id: 'cloud',
      icon: Cloud,
      animation: cloudDevopAnimation,
      title: 'Cloud & DevOps',
      description: 'We build secure and scalable cloud infrastructure with automated DevOps practices. Our solutions ensure reliability, performance, and efficient deployment workflows.',
      features: [
        'AWS, Azure, GCP setup',
        'CI/CD pipelines automation',
        'Containerization & orchestration',
        'Cloud security & monitoring',
        'Scalable system architecture'
      ],
      imagePosition: 'left',
    },
    {
      id: 'dm',
      icon: Megaphone,
      animation: dmAnimation,
      title: 'Digital Marketing',
      description: 'We deliver data-driven digital marketing strategies focused on growth, visibility, and measurable results. Every campaign is optimized to maximize ROI and long-term impact.',
      features: [
        'Growth marketing strategies',
        'Paid advertising campaigns',
        'SEO & organic optimization',
        'Analytics & performance tracking',
        'ROI-focused optimization',
      ],
      imagePosition: 'right',
    },
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0A0F1E]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(10, 31, 68, 0.2) 0%, transparent 50%)`,
          }}
        />
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
          >
            Comprehensive digital solutions tailored to your growth goals. From strategy to execution.
          </motion.p>
        </div>
      </section>

      {/* Services Detail Sections */}
      <section>
        {services.map((service, index) => {
          const Icon = service.icon;
          const isLeft = service.imagePosition === 'left';

          return (
            <div
              key={service.title}
              id={service.id}
              className={`py-14 sm:py-16 md:py-20 lg:py-24 ${index % 2 === 0 ? 'bg-[#0F172A]' : 'bg-[#0A0F1E]'
                }`}
            >
              <div className="max-w-300 mx-auto px-4 sm:px-6 md:px-10 lg:px-20">

                {/* 🔥 Responsive Layout */}
                <div
                  className={`flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-12 items-center ${!isLeft ? 'lg:flex-row-reverse' : ''
                    }`}
                >

                  {/* 🔥 Image */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: window.innerWidth >= 1024 ? (isLeft ? -50 : 50) : 0,
                      y: window.innerWidth < 1024 ? 40 : 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`w-full flex justify-center ${!isLeft ? 'lg:order-2' : ''
                      }`}
                  >
                    <div className="
                w-full max-w-65 sm:max-w-[320px] md:max-w-95 lg:max-w-105
                aspect-square
                bg-linear-to-br from-[#0A1F44] to-[#00D4FF]
                rounded-2xl shadow-2xl shadow-[#00D4FF]/20
                flex items-center justify-center
              ">
                      <LottieAnimation
                        animationData={service.animation}
                        className="w-full h-full"
                      />
                    </div>
                  </motion.div>

                  {/* 🔥 Content */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: window.innerWidth >= 1024 ? (isLeft ? 50 : -50) : 0,
                      y: window.innerWidth < 1024 ? 40 : 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`text-center lg:text-left ${!isLeft ? 'lg:order-1' : ''
                      }`}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 text-left max-w-md mx-auto lg:mx-0 ms-18">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />
                          <span className="text-[#CBD5E1] text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center justify-center px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 active:scale-95"
                    >
                      Explore More
                    </Link>
                  </motion.div>

                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}