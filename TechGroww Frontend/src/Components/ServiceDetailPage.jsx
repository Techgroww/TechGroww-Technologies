import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, ArrowLeft, Code2, TrendingUp, Smartphone, Palette, Cloud, Megaphone } from 'lucide-react';
import ReactMarkdown from "react-markdown";

// Service data mapping
const servicesData = {
    'web-dev': {
        id: 'web-dev',
        title: 'Web Development',
        icon: Code2,
        description: 'We build high-performance web platforms using modern frontend and backend technologies. Every solution is engineered for speed, security, and scalable growth.',
        longDescription: `## Build a Strong Digital Presence

In today's digital landscape, your website is more than just an online page — it's the foundation of your brand's identity. At **TechGroww**, we create high-performance websites that combine professional aesthetics with measurable business results.

Our websites are built to be **fast, user-friendly, and conversion-focused**, ensuring every visitor becomes a potential customer.

---

### Why Your Business Needs a Professional Website

A website is no longer optional — it's the cornerstone of modern business growth.

**Challenges & Solutions:**
- **First impressions** → Clean, modern design builds instant trust
- **Limited business hours** → 24/7 availability for sales and inquiries
- **Credibility gap** → Professional presence establishes authority
- **Lead generation** → Strategic CTAs convert visitors into customers
- **Discoverability** → SEO optimization drives organic traffic
- **Mobile users** → Responsive design ensures accessibility

---

### Our Website Development Process

1. **Discovery** – Understand your business, goals, and audience
2. **Planning** – Create wireframes and user flows
3. **Design** – Develop modern UI aligned with your brand
4. **Development** – Build fast, scalable systems
5. **Testing** – Ensure performance across devices
6. **Launch** – Deploy with zero downtime
7. **Support** – Continuous improvements and updates

---

### What's Included

- Fully responsive design
- Lightning-fast performance
- SEO-optimized structure
- Clean and modern UI
- Secure backend
- Easy navigation
- Integrations (CRM, payments, analytics)

---

### Website Types We Build

- Business & Corporate Websites
- Portfolio Websites
- Landing Pages
- E-commerce Platforms
- Web Applications
- Startup MVPs

---

### Why Choose TechGroww?

- ✓ Client-first approach
- ✓ Modern tech stack
- ✓ Transparent communication
- ✓ On-time delivery
- ✓ Post-launch support

---

### Ready to Build Something Great?

Let's turn your idea into a powerful digital product.`,
        features: [
            'Custom web applications tailored to your business needs',
            'E-commerce platforms with secure payment integration',
            'Progressive web apps (PWA) for offline capabilities',
            'RESTful API development & third-party integrations',
            'Performance optimization and SEO best practices',
            'Responsive design for all devices',
            'Content management systems (CMS) integration'
        ],
        benefits: [
            'Faster time-to-market with agile development',
            'Scalable architecture for future growth',
            'Enhanced user experience and engagement',
            'Improved search engine visibility',
            'Lower maintenance costs with clean code'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'TypeScript'],
        imagePosition: 'left'
    },
    'seo': {
        id: 'seo',
        title: 'SEO Optimization',
        icon: TrendingUp,
        description: 'We implement strategic SEO solutions focused on increasing organic visibility, qualified traffic, and long-term search performance.',
        longDescription: `## Boost Your Search Engine Visibility

Our SEO services are designed to improve your website's visibility in search engine results and drive qualified organic traffic. We combine technical expertise with data-driven strategies to achieve sustainable rankings.

We take a holistic approach to SEO, addressing technical foundations, content quality, and user experience. Our team stays up-to-date with the latest algorithm changes to ensure your website maintains and improves its search visibility over time.

---

### Our SEO Process

1. **Technical Audit** – Analyze site structure, speed, and crawlability
2. **Keyword Research** – Identify high-value search terms for your business
3. **On-Page Optimization** – Optimize content, meta tags, and internal linking
4. **Content Strategy** – Create valuable, keyword-optimized content
5. **Link Building** – Build quality backlinks from authoritative sources
6. **Performance Tracking** – Monitor rankings, traffic, and conversions

---

### Key SEO Services

- Comprehensive technical SEO audits
- On-page and content optimization strategies
- In-depth keyword research and targeting
- Site speed and Core Web Vitals optimization
- Local SEO and Google Maps optimization
- Backlink analysis and link building
- SEO analytics and performance tracking

---

### Results You Can Expect

- Increased organic traffic and visibility
- Higher conversion rates from qualified visitors
- Improved brand credibility and authority
- Better ROI compared to paid advertising
- Long-term sustainable growth`,
        features: [
            'Comprehensive technical SEO audits',
            'On-page and content optimization strategies',
            'In-depth keyword research and targeting',
            'Site speed and Core Web Vitals optimization',
            'Local SEO and Google Maps optimization',
            'Backlink analysis and link building',
            'SEO analytics and performance tracking'
        ],
        benefits: [
            'Increased organic traffic and visibility',
            'Higher conversion rates from qualified visitors',
            'Improved brand credibility and authority',
            'Better ROI compared to paid advertising',
            'Long-term sustainable growth'
        ],
        technologies: ['Google Analytics', 'Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog', 'Moz'],
        imagePosition: 'right'
    },
    'mobile-dev': {
        id: 'mobile-dev',
        title: 'Mobile App Development',
        icon: Smartphone,
        description: 'We develop native and cross-platform mobile applications using modern technologies. Each app is designed for performance, security, and seamless user experience.',
        longDescription: `## Build Powerful Mobile Experiences

Our mobile app development services deliver high-performance applications that engage users and drive business growth. We specialize in both native and cross-platform development, ensuring your app reaches the widest possible audience.

From concept to launch, we guide you through the entire app development lifecycle. Our team focuses on creating intuitive user interfaces, robust backend integration, and smooth performance across all devices.

---

### Our Development Approach

1. **Discovery & Planning** – Define features, user flows, and architecture
2. **UI/UX Design** – Create intuitive, engaging interfaces
3. **Development** – Build using native or cross-platform frameworks
4. **Testing** – Rigorous QA across devices and scenarios
5. **Deployment** – Submit to App Store and Google Play
6. **Maintenance** – Regular updates and performance monitoring

---

### What We Build

- Native iOS apps with Swift
- Native Android apps with Kotlin
- Cross-platform apps with React Native and Flutter
- Enterprise mobile solutions
- Consumer-facing applications
- On-demand service apps
- Social and community apps`,
        features: [
            'Native iOS development with Swift',
            'Native Android development with Kotlin',
            'Cross-platform with React Native and Flutter',
            'Secure API integration and backend connectivity',
            'Push notifications and real-time updates',
            'Offline functionality and data synchronization',
            'App store optimization and submission'
        ],
        benefits: [
            'Reach both iOS and Android users efficiently',
            'Faster development with cross-platform solutions',
            'Superior user experience with native performance',
            'Scalable architecture for feature expansion',
            'Reduced development and maintenance costs'
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
        imagePosition: 'left'
    },
    'ui-ux': {
        id: 'ui-ux',
        title: 'UI/UX Design',
        icon: Palette,
        description: 'We design user-centric interfaces and scalable design systems focused on usability, clarity, and conversion.',
        longDescription: `## Design Experiences That Delight

Our UI/UX design services create digital experiences that users love. We combine user research, interaction design, and visual aesthetics to build interfaces that are both beautiful and functional.

We believe that great design is invisible. Our process focuses on understanding user needs, creating intuitive workflows, and designing interfaces that guide users naturally toward their goals.

---

### Our Design Process

1. **Research** – Understand users, goals, and pain points
2. **Ideation** – Brainstorm solutions and map user journeys
3. **Wireframing** – Create low-fidelity layouts and structures
4. **Prototyping** – Build interactive, clickable prototypes
5. **Visual Design** – Apply branding and polish the interface
6. **Testing** – Validate designs with real users
7. **Handoff** – Deliver assets and specifications to developers

---

### Design Services

- User research and persona development
- User journey mapping and information architecture
- Wireframing and interactive prototyping
- High-fidelity UI design and style guides
- Usability testing and iterative improvement
- Design systems and component libraries
- Accessibility (WCAG) compliance`,
        features: [
            'User research and persona development',
            'User journey mapping and information architecture',
            'Wireframing and interactive prototyping',
            'High-fidelity UI design and style guides',
            'Usability testing and iterative improvement',
            'Design systems and component libraries',
            'Accessibility (WCAG) compliance'
        ],
        benefits: [
            'Improved user satisfaction and engagement',
            'Higher conversion rates and retention',
            'Reduced development costs with clear specifications',
            'Consistent brand experience across platforms',
            'Faster time-to-market with design systems'
        ],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Miro', 'Zeplin'],
        imagePosition: 'right'
    },
    'cloud': {
        id: 'cloud',
        title: 'Cloud & DevOps',
        icon: Cloud,
        description: 'We build secure and scalable cloud infrastructure with automated DevOps practices.',
        longDescription: `## Scale Your Infrastructure with Confidence

Our cloud and DevOps services help businesses leverage the full potential of cloud computing. We design and implement scalable, secure infrastructure that supports your business growth while optimizing costs.

We follow DevOps best practices to streamline development workflows, automate deployments, and ensure system reliability. Our team helps you modernize your infrastructure and adopt cloud-native technologies.

---

### Our Cloud Services

1. **Assessment** – Evaluate current infrastructure and requirements
2. **Architecture Design** – Plan scalable, secure cloud solutions
3. **Migration** – Move workloads to the cloud with minimal disruption
4. **Automation** – Implement CI/CD pipelines and infrastructure as code
5. **Monitoring** – Set up comprehensive monitoring and alerting
6. **Optimization** – Continuously improve performance and costs

---

### What We Offer

- AWS, Azure, and GCP infrastructure setup
- CI/CD pipeline automation with GitHub Actions
- Containerization with Docker and Kubernetes
- Infrastructure as Code (Terraform, CloudFormation)
- Cloud security and compliance implementation
- Performance monitoring and optimization
- Cost optimization and management`,
        features: [
            'AWS, Azure, and GCP infrastructure setup',
            'CI/CD pipeline automation with GitHub Actions',
            'Containerization with Docker and Kubernetes',
            'Infrastructure as Code (Terraform, CloudFormation)',
            'Cloud security and compliance implementation',
            'Performance monitoring and optimization',
            'Cost optimization and management'
        ],
        benefits: [
            'Reduced deployment time with automation',
            'Improved system reliability and uptime',
            'Scalable infrastructure for business growth',
            'Enhanced security and compliance',
            'Optimized cloud costs and resource usage'
        ],
        technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
        imagePosition: 'left'
    },
    'dm': {
        id: 'dm',
        title: 'Digital Marketing',
        icon: Megaphone,
        description: 'We deliver data-driven digital marketing strategies focused on growth, visibility, and measurable results.',
        longDescription: `## Drive Growth with Data-Driven Marketing

Our digital marketing services help businesses reach their target audience and achieve measurable growth. We combine strategic planning with data-driven execution to maximize your marketing ROI.

We take a holistic approach to digital marketing, integrating multiple channels and tactics to create cohesive campaigns that drive results. Our team focuses on measurable outcomes and continuous optimization.

---

### Our Marketing Services

1. **Strategy** – Develop comprehensive marketing plans aligned with goals
2. **Execution** – Launch campaigns across multiple channels
3. **Optimization** – Continuously test and improve performance
4. **Analysis** – Track metrics and report on ROI
5. **Scale** – Expand successful campaigns for growth

---

### Marketing Channels

- Search Engine Marketing (Google Ads)
- Social Media Advertising (Facebook, Instagram, LinkedIn)
- Search Engine Optimization (SEO)
- Content Marketing and Blog Strategy
- Email Marketing and Automation
- Conversion Rate Optimization (CRO)
- Analytics and Performance Tracking`,
        features: [
            'Comprehensive marketing strategy development',
            'Paid advertising (Google Ads, Social Media Ads)',
            'Social media marketing and community management',
            'Email marketing and automation campaigns',
            'Content marketing and blog strategy',
            'Marketing analytics and ROI tracking',
            'Conversion rate optimization (CRO)'
        ],
        benefits: [
            'Increased brand awareness and visibility',
            'Higher quality leads and conversions',
            'Better ROI with data-driven campaigns',
            'Improved customer engagement and loyalty',
            'Scalable marketing strategies'
        ],
        technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'HubSpot', 'Mailchimp', 'Google Analytics'],
        imagePosition: 'right'
    }
};

export default function ServiceDetailPage() {
    const { serviceId } = useParams();
    const service = servicesData[serviceId];

    if (!service) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Service Not Found</h1>
                    <p className="text-[#94A3B8] mb-8">The service you're looking for doesn't exist.</p>
                    <Link to="/services" className="text-[#00D4FF] hover:underline">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="bg-[#0F172A] min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0A0F1E]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative z-10">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#00D4FF] transition-colors mb-4 sm:mb-6 text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Services
                    </Link>

                    <div className="max-w-4xl">
                        <div className="inline-block p-3 bg-[#00D4FF]/20 rounded-xl mb-4 sm:mb-6">
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#00D4FF]" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-[#0F172A] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Long Description */}
                    <div className="mb-12 sm:mb-16 md:mb-20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Overview</h2>

                        <div className="prose prose-invert prose-sm sm:prose-base md:prose-lg max-w-full
                            prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl
                            prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl
                            prose-p:text-sm sm:prose-p:text-base md:prose-p:text-lg
                            prose-p:text-gray-300
                            prose-li:text-sm sm:prose-li:text-base
                            prose-strong:text-white
                            prose-headings:font-bold
                            prose-headings:text-white
                            prose-hr:border-[#1E293B]">
                            <ReactMarkdown
                                components={{
                                    li: ({ children }) => (
                                        <li className="flex items-start gap-2 sm:gap-3">
                                            <Check className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 shrink-0" />
                                            <span className="text-gray-300">{children}</span>
                                        </li>
                                    ),
                                    h1: ({ children }) => (
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-5 sm:mt-6 mb-2 sm:mb-3">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-lg sm:text-xl font-semibold text-white mt-4 sm:mt-5 mb-2">
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-3 sm:mb-4">
                                            {children}
                                        </p>
                                    ),
                                    hr: () => (
                                        <hr className="my-6 sm:my-8 border-[#1E293B]" />
                                    ),
                                }}
                            >
                                {service.longDescription}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Features & Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
                        {/* Features */}
                        <div className="bg-[#020617] border border-[#1E293B] p-5 sm:p-6 rounded-xl">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-5">
                                Key Features
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {service.features.map((item, idx) => (
                                    <li key={idx} className="flex gap-2 sm:gap-3">
                                        <Check className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 shrink-0" />
                                        <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits */}
                        <div className="bg-[#020617] border border-[#1E293B] p-5 sm:p-6 rounded-xl">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-5">
                                Benefits
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {service.benefits.map((item, idx) => (
                                    <li key={idx} className="flex gap-2 sm:gap-3">
                                        <Check className="text-cyan-400 w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 shrink-0" />
                                        <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-12 sm:mb-16">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                            Technologies We Use
                        </h2>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {service.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1A1F2E] border border-[#1E293B] rounded-lg text-[#94A3B8] text-xs sm:text-sm transition-all hover:border-[#00D4FF]/50 hover:text-white"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-8 sm:py-10 md:py-12 px-4 sm:px-6 bg-linear-to-r from-cyan-500/10 to-teal-500/10 rounded-2xl border border-[#00D4FF]/20">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-sm sm:text-base text-[#94A3B8] mb-5 sm:mb-6 max-w-2xl mx-auto px-4">
                            Let's discuss how our {service.title} services can help achieve your business goals.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00D4FF]/30 active:scale-95 text-sm sm:text-base"
                        >
                            Discuss Your Project
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}