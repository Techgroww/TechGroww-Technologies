import { motion } from 'motion/react';
import { assets } from '../assets/assets.js'

export function TechnologiesPage() {
  const techCategories = [
    {
      title: 'Frontend',
      technologies: [
        { name: 'React', logo: assets.react },
        { name: 'Vue', logo: assets.vue },
        { name: 'Next.js', logo: assets.nextjs },
        { name: 'Angular', logo: assets.angular },
        { name: 'Tailwind CSS', logo: assets.tailwind },
        { name: 'TypeScript', logo: assets.typescript },
      ],
    },
    {
      title: 'Backend',
      technologies: [
        { name: 'Node.js', logo: assets.nodejs },
        { name: 'Python', logo: assets.python },
        { name: 'PHP', logo: assets.php },
        { name: 'Django', logo: assets.django },
        { name: 'Express', logo: assets.express },
      ],
    },
    {
      title: 'Mobile',
      technologies: [
        { name: 'Flutter', logo: assets.flutter },
        { name: 'React Native', logo: assets.react_native },
        { name: 'Swift', logo: assets.swift },
      ],
    },
    {
      title: 'Cloud & DevOps',
      technologies: [
        { name: 'AWS', logo: assets.aws },
        { name: 'Azure', logo: assets.azure },
        { name: 'Google Cloud', logo: assets.google_cloud },
        { name: 'Docker', logo: assets.docker },
        { name: 'Kubernetes', logo: assets.kubernetes },
      ],
    },
  ];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0A0F1E]">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #00D4FF 0px, #00D4FF 2px, transparent 2px, transparent 20px),
                             repeating-linear-gradient(-45deg, #00D4FF 0px, #00D4FF 2px, transparent 2px, transparent 20px)`,
          }}
        />
        
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Technologies We Work With
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
          >
            Modern, scalable, production-ready tech stacks.
          </motion.p>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="pt-5 pb-20 bg-[#0F172A]">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          {techCategories.map((category, categoryIndex) => (
            <div key={category.title} className={categoryIndex > 0 ? 'mt-16' : ''}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-white mb-8"
              >
                {category.title}
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {category.technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group aspect-square bg-[#1A1F2E] rounded-xl p-6 border border-[#1E293B] hover:shadow-xl hover:shadow-[#00D4FF]/30 hover:-translate-y-1 hover:border-[#00D4FF]/50 transition-all duration-300 flex flex-col items-center justify-center text-center"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      <img src={tech.logo} alt={tech.name} className="w-13 h-13 object-contain" />
                    </div>
                    <p className="text-sm font-medium text-white">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-linear-to-br from-[#0A1F44] to-[#00D4FF] text-white">
        <div className="max-w-200 mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Build Something Amazing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg mb-8 text-white/90"
          >
            Let's discuss how we can leverage these technologies to transform your business.
          </motion.p>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-8 h-12 bg-white text-[#0A1F44] rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Start a Project
          </motion.a>
        </div>
      </section>
    </div>
  );
}