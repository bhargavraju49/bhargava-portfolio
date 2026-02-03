import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Amoura",
    subtitle: "Full-Stack Microservices Application",
    period: "Jul 2025 - Present",
    description:
      "Developed a scalable full-stack app with Vue.js frontend, Node.js & TypeScript backend, and FastAPI WebSockets server for real-time features. Leveraged Redis for message handling and deployed all services Dockerized on a Mac Mini M4, supporting 4,000–5,000 concurrent users.",
    image: "/amourademo.jpg",
    tech: [
      "Vue.js",
      "Node.js",
      "TypeScript",
      "FastAPI",
      "Redis",
      "Docker",
      "WebSockets",
    ],
    links: {
      demo: "https://amoura.dev/",
      github: "https://github.com/TruPasion/Amoura",
    },
  },
  // {
  //   title: "Cornerstone",
  //   subtitle: "Cloud Migration & Job Scheduler",
  //   period: "Oct 2025 - Present",
  //   description:
  //     "Led UI migration from Angular to Vue.js, introducing drag-and-drop functionality and parallel activity execution for enhanced user experience. Refactored backend from legacy Perl to Python FastAPI microservices, improving maintainability, scalability, and developer productivity.",
  //   image: "/project-cornerstone.jpg",
  //   tech: [
  //     "Vue.js",
  //     "FastAPI",
  //     "AWS Lambda",
  //     "DynamoDB",
  //     "Docker",
  //     "Kubernetes",
  //   ],
  //   links: {
  //     demo: "#",
  //     github: "#",
  //   },
  // },
  {
    title: "Clipboard Manager",
    subtitle: "Chrome Extension",
    period: "Personal Project",
    description:
      "Developed a privacy-focused clipboard manager using Manifest V3 and React, enabling users to securely store, search, and reuse text snippets. Implemented features like masked sensitive content, instant copy shortcuts, and secure local storage with zero network calls.",
    image: "/mopydemo.jpg",
    tech: ["React", "Manifest V3", "Chrome APIs", "Local Storage"],
    links: {
      demo: "https://chromewebstore.google.com/detail/emfebahabiacofeadebefnnkipgdkjcd?utm_source=item-share-cb",
      github: "https://github.com/bhargavraju49/mopy",
    },
  },
  // {
  //   title: "TruPassion",
  //   subtitle: "Developer Community & Learning Platform",
  //   period: "Nov 2022 - Present",
  //   description:
  //     "Founded a small developer group to share ideas, solve problems, and implement learning projects. Created several mini-apps such as Tic Tac Toe, Calculator, Blog Application, focusing on practical implementation and skill development. Encouraged collaboration and peer learning.",
  //   image: "/project-trupassion.jpg",
  //   tech: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
  //   links: {
  //     demo: "#",
  //     github: "#",
  //   },
  // },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex] = useState(0);

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
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Cards animation
      if (carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll(".project-card");
        gsap.fromTo(
          cards,
          { opacity: 0, rotateY: 45, x: 100 },
          {
            opacity: 1,
            rotateY: 0,
            x: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (
    e: React.MouseEvent<HTMLDivElement>,
    isEnter: boolean,
  ) => {
    const card = e.currentTarget;
    gsap.to(card, {
      y: isEnter ? -10 : 0,
      scale: isEnter ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });

    const image = card.querySelector(".project-image");
    if (image) {
      gsap.to(image, {
        scale: isEnter ? 1.1 : 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-electric bg-electric/10 rounded-full border border-electric/20">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-graymatter max-w-2xl mx-auto">
            A showcase of innovative solutions, from microservices architectures
            to developer tools.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={carouselRef}
          className="grid md:grid-cols-2 gap-8"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-card group relative glass rounded-2xl overflow-hidden border border-electric/10 hover:border-electric/30 transition-all duration-500"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-500"
                />
                {/* Glare Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />

                {/* Period Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-electric/20 text-electric rounded-full border border-electric/30 backdrop-blur-sm">
                  {project.period}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-electric transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-graymatter">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.links.github}
                      className="w-8 h-8 rounded-lg bg-matter border border-electric/20 flex items-center justify-center text-graymatter hover:text-electric hover:border-electric/50 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.links.demo}
                      className="w-8 h-8 rounded-lg bg-matter border border-electric/20 flex items-center justify-center text-graymatter hover:text-electric hover:border-electric/50 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-graymatter mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-electric/10 text-electric rounded-full border border-electric/20"
                    >
                      <Layers className="w-3 h-3" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-xl shadow-electric/10" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {projects.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-electric" : "bg-electric/30"
              }`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/bhargavraju49?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-electric/50 text-electric font-medium rounded-lg hover:bg-electric hover:text-white transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
