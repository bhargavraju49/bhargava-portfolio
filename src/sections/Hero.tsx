import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Github, Linkedin, Code2, Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title character animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.03,
            ease: "expo.out",
            delay: 0.3,
          },
        );
      }

      // Subtitle typewriter effect
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: "power2.out" },
        );
      }

      // Description fade in
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power2.out" },
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 1.4,
            ease: "back.out(1.7)",
          },
        );
      }

      // Image 3D flip
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { rotateX: 90, scale: 0.8, opacity: 0 },
          {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            duration: 1.4,
            delay: 0.5,
            ease: "elastic.out(1, 0.5)",
          },
        );
      }

      // Social links
      if (socialsRef.current) {
        gsap.fromTo(
          socialsRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 1.6,
            ease: "power2.out",
          },
        );
      }

      // Scroll parallax
      if (sectionRef.current) {
        gsap.to(titleRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(imageRef.current, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt effect on image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const titleText = "BHARGAVA";
  const titleText2 = "PENUMETCHA";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight overflow-hidden"
            >
              <span className="flex flex-wrap">
                {titleText.split("").map((char, index) => (
                  <span
                    key={index}
                    className="char inline-block"
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="flex flex-wrap">
                {titleText2.split("").map((char, index) => (
                  <span
                    key={index}
                    className="char inline-block"
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl md:text-3xl text-electric font-medium"
            >
              Software Engineer
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-graymatter max-w-xl leading-relaxed"
            >
              Crafting resilient distributed systems and cloud-native
              architectures. 5+ years turning complex problems into elegant,
              scalable solutions.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
              <a
                href="/Bhargava_Resume.pdf"
                download
                className="group inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-medium rounded-lg hover:bg-electric/90 transition-all duration-300 hover:shadow-lg hover:shadow-electric/30"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Resume
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-electric/50 text-electric font-medium rounded-lg hover:bg-electric/10 transition-all duration-300"
              >
                <Code2 className="w-5 h-5" />
                View Projects
              </a>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex items-center gap-4 pt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-matter border border-electric/20 flex items-center justify-center text-graymatter hover:text-electric hover:border-electric/50 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-matter border border-electric/20 flex items-center justify-center text-graymatter hover:text-electric hover:border-electric/50 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:bhargavapenumetcha49@gmail.com"
                className="w-10 h-10 rounded-lg bg-matter border border-electric/20 flex items-center justify-center text-graymatter hover:text-electric hover:border-electric/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+919704128358"
                className="w-10 h-10 rounded-lg bg-matter border border-electric/20 flex items-center justify-center text-graymatter hover:text-electric hover:border-electric/50 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-electric/20 rounded-3xl blur-3xl scale-110" />

              {/* Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-electric/30 glow-blue float-animation">
                <img
                  src="/bhargav.jpg"
                  alt="Bhargava Penumetcha"
                  className="w-full h-full object-cover"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 border border-electric/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    Available for work
                  </span>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 border border-electric/20">
                <div className="text-center">
                  <span className="text-2xl font-bold text-electric">5+</span>
                  <p className="text-xs text-graymatter">Years Exp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
}
