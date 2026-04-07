export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_CATEGORIES = [
  "All",
  "General",
  "Services",
  "Technical",
  "Support",
];

export const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "What makes Rangdhanu IT different from other agencies?",
    answer:
      "We combine technical excellence with strategic business thinking. Our team doesn't just write code; we architect solutions that drive growth, using the latest technologies like Next.js, React Native, and AI-driven marketing strategies.",
  },
  {
    category: "General",
    question: "How do you handle project communication?",
    answer:
      "Transparency is our priority. We use dedicated project management tools, provide weekly progress reports, and have regular video syncs to ensure you're always in the loop.",
  },
  {
    category: "Services",
    question: "What is your web development stack?",
    answer:
      "We primarily use the T3 stack (Next.js, TypeScript, Tailwind CSS) for web projects to ensure high performance, SEO optimization, and exceptional developer experience.",
  },
  {
    category: "Services",
    question: "Do you provide customized digital marketing plans?",
    answer:
      "Yes, every marketing strategy is data-driven and tailored to your specific industry, target audience, and business goals, ranging from SEO to managed social media campaigns.",
  },
  {
    category: "Technical",
    question: "How do you ensure the security of our applications?",
    answer:
      "Security is baked into our development lifecycle. We follow OWASP guidelines, implement robust authentication/authorization, and use secure cloud infrastructure with regular auditing.",
  },
  {
    category: "Technical",
    question: "Where are the applications hosted?",
    answer:
      "We typically suggest Vercel for web applications and AWS or Google Cloud for backend/database infrastructure, ensuring 99.9% uptime and global scalability.",
  },
  {
    category: "Support",
    question: "What happens after the project is launched?",
    answer:
      "We offer comprehensive support packages including 24/7 monitoring, regular security updates, and performance optimizations to keep your digital asset running smoothly.",
  },
  {
    category: "General",
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary based on complexity. A standard business website usually takes 4-6 weeks, while more complex web applications or mobile apps can take 3-6 months. We provide a detailed project timeline during the discovery phase.",
  },
  {
    category: "General",
    question: "What is your typical payment structure?",
    answer:
      "Our standard payment structure is milestone-based: an initial deposit at the start, followed by payments at key project milestones (Design, Development, Testing), and a final payment before launch.",
  },
  {
    category: "Services",
    question: "Do you offer cross-platform mobile app development?",
    answer:
      "Yes! We specialize in React Native and Flutter for cross-platform app development, allowing you to launch high-performance apps on both iOS and Android from a single codebase, saving you time and budget.",
  },
  {
    category: "Services",
    question:
      "Can you help with SEO and performance optimization for existing sites?",
    answer:
      "Absolutely. We conduct deep technical SEO audits and performance optimizations (Core Web Vitals) to help your existing site rank higher and load faster, improving both user experience and search visibility.",
  },
  {
    category: "Technical",
    question: "Can you migrate our legacy data to a new platform?",
    answer:
      "Yes, we have extensive experience in legacy data migration. We ensure data integrity and zero downtime by using specialized scripts and ETL (Extract, Transform, Load) processes to move your data to modern, scalable databases.",
  },
  {
    category: "Technical",
    question: "How do you handle high-traffic scalability?",
    answer:
      "We architect our systems using elastic load balancing, auto-scaling groups, and CDN integration (like Vercel or AWS CloudFront) to ensure your application can handle millions of users without performance degradation.",
  },
  {
    category: "Support",
    question: "Do you offer training for our internal team?",
    answer:
      "Yes, we provide recorded training sessions and comprehensive documentation for every project, ensuring your internal team is fully equipped to manage the content and basic operations of your new digital platform.",
  },
  {
    category: "Support",
    question: "What is your response time for emergency support?",
    answer:
      "For clients on our premium support plans, we offer a 4-hour response time for critical issues and 24/7 monitoring to preemptively identify and resolve server-side problems before they affect your users.",
  },
];
