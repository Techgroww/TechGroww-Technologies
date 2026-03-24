import { Lightbulb, TrendingUp, Users, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import CountUp from 'react-countup';

export function AboutPage() {
  const features = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: "We stay ahead of tech trends, adopting cutting-edge tools and methodologies.",
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description: 'Built to grow with you. Our architecture supports scale from MVP to enterprise.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Senior engineers and designers with proven track records across industries.',
    },
    {
      icon: Heart,
      title: 'Client-Centric Approach',
      description: 'Your success is our success. We prioritize communication, transparency, and results.',
    },
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0A0F1E]">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(10, 31, 68, 0.1) 100%)`,
          }}
        />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #00D4FF 2px, transparent 2px),
                             radial-gradient(circle at 80% 80%, #00D4FF 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto"
          >
            Building the Future, One Solution at a Time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
          >
            We're a team of engineers, designers, and strategists passionate about technology and growth.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="max-w-200 mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Mission & Vision
            </h2>
            <div className="space-y-6 text-[#94A3B8] leading-relaxed">
              <p>
                TechGroww was founded with a clear mission: to empower businesses with technology that scales. We believe in building products that aren't just functional—they're transformative.
              </p>
              <p>
                Our vision is to become the trusted digital growth partner for ambitious companies worldwide. We combine technical excellence with strategic insight, delivering solutions that create measurable impact.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose TechGroww */}
      <section className="py-20 md:py-32 bg-[#0A0F1E]">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose TechGroww
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-[#1A1F2E] rounded-xl p-6 border border-[#1E293B] hover:shadow-xl hover:shadow-[#00D4FF]/20 hover:-translate-y-1 hover:border-[#00D4FF]/50 transition-all duration-300 text-center"
                >
                  <Icon className="w-8 h-8 text-[#00D4FF] mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#94A3B8] leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-[#0F172A]">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square bg-linear-to-br from-[#0A1F44] to-[#00D4FF] rounded-2xl shadow-2xl shadow-[#00D4FF]/20 flex items-center justify-center overflow-hidden"
            >
              <Users className="w-48 h-48 text-white/20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-[#94A3B8] leading-relaxed mb-6">
                Our diverse team of experts brings together decades of combined experience in software engineering, design, and digital strategy. We're united by a passion for solving complex problems and delivering exceptional results.
              </p>
              <p className="text-[#94A3B8] leading-relaxed">
                From startups to Fortune 500 companies, we've helped organizations across industries transform their digital presence and accelerate growth.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <p className="text-4xl font-bold text-[#00D4FF]">
                    <CountUp end={25} duration={3} enableScrollSpy scrollSpyOnce />+
                  </p>
                  <p className="text-sm text-[#94A3B8] mt-1">Team Members</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#00D4FF]">
                    <CountUp end={15} duration={3} enableScrollSpy scrollSpyOnce />+
                  </p>
                  <p className="text-sm text-[#94A3B8] mt-1">Countries Served</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}