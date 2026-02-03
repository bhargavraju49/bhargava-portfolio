import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Settings,
  FileCode,
  Globe,
  Layers,
  Cpu,
  GitBranch,
  Container,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Languages',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    name: 'Frontend',
    icon: Layout,
    skills: ['Vue.js 3', 'React.js', 'HTML5', 'SCSS', 'Tailwind CSS'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    name: 'Backend',
    icon: Server,
    skills: ['FastAPI', 'Node.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Microservices'],
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    name: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'MySQL', 'DynamoDB', 'Redis'],
    color: 'from-orange-500/20 to-amber-500/20',
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS (Lambda, EC2, SQS, ECR, API Gateway)', 'Docker', 'Kubernetes', 'GitHub Actions'],
    color: 'from-sky-500/20 to-blue-500/20',
  },
  {
    name: 'Other',
    icon: Settings,
    skills: ['System Design', 'CI/CD', 'Agile/Scrum', 'Git', 'Jira'],
    color: 'from-rose-500/20 to-red-500/20',
  },
];

const techIcons: Record<string, React.ElementType> = {
  Python: FileCode,
  JavaScript: Code2,
  TypeScript: Code2,
  SQL: Database,
  Bash: Terminal,
  'Vue.js 3': Layout,
  'React.js': Globe,
  HTML5: Layout,
  SCSS: Layers,
  'Tailwind CSS': Layers,
  FastAPI: Server,
  'Node.js': Server,
  'REST APIs': Server,
  GraphQL: Server,
  WebSockets: Server,
  Microservices: Cpu,
  PostgreSQL: Database,
  MySQL: Database,
  DynamoDB: Database,
  Redis: Database,
  'AWS (Lambda, EC2, SQS, ECR, API Gateway)': Cloud,
  Docker: Container,
  Kubernetes: Container,
  'GitHub Actions': GitBranch,
  'System Design': Settings,
  'CI/CD': GitBranch,
  'Agile/Scrum': Settings,
  Git: GitBranch,
  Jira: Settings,
};

function Terminal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 9l3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards staggered animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.skill-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: isEnter ? x * 10 : 0,
      rotateX: isEnter ? -y * 10 : 0,
      scale: isEnter ? 1.02 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-electric bg-electric/10 rounded-full border border-electric/20">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-graymatter max-w-2xl mx-auto">
            A comprehensive toolkit built over 5+ years of building scalable systems and cloud-native applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1000px' }}
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="skill-card group relative glass rounded-2xl p-6 border border-electric/10 hover:border-electric/30 transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors duration-300">
                  <category.icon className="w-6 h-6 text-electric" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 group-hover:text-electric transition-colors duration-300">
                  {category.name}
                </h3>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const IconComponent = techIcons[skill] || Code2;
                    return (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-matter border border-electric/10 rounded-lg text-graymatter hover:text-white hover:border-electric/30 transition-all duration-300"
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-lg shadow-electric/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '20+', label: 'Technologies' },
            { value: '10+', label: 'Projects Delivered' },
            { value: '3', label: 'Companies' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 glass rounded-xl border border-electric/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-electric mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-graymatter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
