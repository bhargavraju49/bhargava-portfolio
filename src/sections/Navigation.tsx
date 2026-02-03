import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" },
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll("a"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.1,
            ease: "power2.out",
          },
        );
      }
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-void/80 backdrop-blur-xl border-b border-electric/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/30 flex items-center justify-center group-hover:bg-electric/20 transition-all duration-300">
                <Code2 className="w-5 h-5 text-electric" />
              </div>
              <span className="text-lg font-semibold hidden sm:block">
                Bhargava Penumetcha<span className="text-electric">.</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative px-4 py-2 text-sm text-graymatter hover:text-white transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-electric group-hover:w-3/4 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="px-5 py-2.5 text-sm font-medium bg-electric/10 border border-electric/50 text-electric rounded-lg hover:bg-electric hover:text-white transition-all duration-300"
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-electric transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl pt-20 md:hidden"
        >
          <div className="flex flex-col items-center gap-6 py-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-medium text-white hover:text-electric transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="mt-4 px-8 py-3 text-lg font-medium bg-electric text-white rounded-lg"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </>
  );
}
