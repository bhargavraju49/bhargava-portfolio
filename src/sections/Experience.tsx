import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'HCA',
    location: 'Hyderabad',
    period: 'May 2025 - Oct 2025',
    description: [
      'Architected the migration of core monolith services to a distributed microservices architecture on Kubernetes, improving scalability and resilience.',
      'Designed and deployed a centralized authentication service (Auth Server) implementing secure JWT/OAuth-based access across all application microservices.',
      'Owned end-to-end development of containerized Python services (Auth Server, Surgery Server) from design to deployment on Kubernetes clusters.',
    ],
    highlights: ['Kubernetes', 'Microservices', 'JWT/OAuth', 'Python'],
  },
  {
    title: 'Software Engineer',
    company: 'Factset',
    location: 'Hyderabad',
    period: 'Apr 2022 - May 2025',
    description: [
      'Data Navigator: Modernized a client-facing web application from scratch using Vue 3 & Fusion UI, enabling clients to test and bundle financial datasets efficiently.',
      'Integrated internal APIs and implemented role-based access control (RBAC), reducing client setup time by 30%.',
      'Cornerstone: Led UI migration from Angular to Vue.js, introducing drag-and-drop functionality and parallel activity execution.',
      'Refactored backend from legacy Perl to Python FastAPI microservices, improving maintainability and scalability.',
      'Reduced infrastructure costs by migrating workloads to AWS Lambda and data to DynamoDB.',
      'Built an automated account deletion pipeline using Python, Docker, AWS Lambda, SQS, and CloudWatch, achieving 99.9% operational efficiency.',
    ],
    highlights: ['Vue.js', 'FastAPI', 'AWS Lambda', 'DynamoDB', 'Docker'],
  },
  {
    title: 'Programmer Analyst',
    company: 'Cognizant',
    location: 'Chennai',
    period: 'Feb 2021 - Apr 2022',
    description: [
      'Created Python automation scripts to process financial reports using Pandas, NumPy, and OCR libraries — accelerated processing by 60%.',
      'Developed GUI automation tools with PySimpleGUI that eliminated manual entry, reducing human error significantly.',
    ],
    highlights: ['Python', 'Pandas', 'OCR', 'Automation'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

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

      // Timeline line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        });
      }

      // Experience cards animation
      if (timelineRef.current) {
        const cards = timelineRef.current.querySelectorAll('.experience-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // Node animations
        const nodes = timelineRef.current.querySelectorAll('.timeline-node');
        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: node,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-electric bg-electric/10 rounded-full border border-electric/20">
            Career Path
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-graymatter max-w-2xl mx-auto">
            A timeline of growth, innovation, and impactful contributions across leading tech organizations.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5866f9" stopOpacity="0" />
                  <stop offset="10%" stopColor="#5866f9" stopOpacity="1" />
                  <stop offset="90%" stopColor="#5866f9" stopOpacity="1" />
                  <stop offset="100%" stopColor="#5866f9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                ref={lineRef}
                d="M 0 0 L 0 100%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ height: '100%' }}
              />
            </svg>
          </div>

          {/* Mobile Line */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-electric to-transparent" />

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index !== experiences.length - 1 ? 'lg:mb-16' : ''
                }`}
              >
                {/* Timeline Node */}
                <div
                  className={`timeline-node absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-electric border-4 border-void z-10 ${
                    index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                  }`}
                  style={{ top: '24px' }}
                >
                  <div className="absolute inset-0 rounded-full bg-electric animate-ping opacity-30" />
                </div>

                {/* Card */}
                <div
                  className={`experience-card ml-12 lg:ml-0 ${
                    index % 2 === 0
                      ? 'lg:pr-16 lg:text-right'
                      : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="glass rounded-2xl p-6 border border-electric/10 hover:border-electric/30 transition-all duration-500 group">
                    {/* Header */}
                    <div className={`flex flex-col ${index % 2 === 0 ? 'lg:items-end' : ''}`}>
                      <div className="flex items-center gap-2 text-electric mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm font-medium">{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-electric transition-colors">
                        {exp.title}
                      </h3>
                      <div className={`flex items-center gap-4 text-graymatter text-sm mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2 text-sm text-graymatter ${
                            index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                          }`}
                        >
                          <ChevronRight className="w-4 h-4 text-electric flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Highlights */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      {exp.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2.5 py-1 text-xs font-medium bg-electric/10 text-electric rounded-full border border-electric/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && (
                  <div className="hidden lg:block lg:order-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
