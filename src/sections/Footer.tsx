import { Heart, Code2, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative py-12 border-t border-electric/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/30 flex items-center justify-center group-hover:bg-electric/20 transition-all duration-300">
                <Code2 className="w-5 h-5 text-electric" />
              </div>
              <span className="text-lg font-semibold">
                Bhargava<span className="text-electric">.</span>
              </span>
            </a>
            <p className="text-sm text-graymatter text-center md:text-left">
              &copy; {currentYear} Bhargava Penumetcha. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(link.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm text-graymatter hover:text-electric transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 glass rounded-lg border border-electric/20 hover:border-electric/50 transition-all duration-300"
          >
            <span className="text-sm text-graymatter group-hover:text-electric transition-colors">
              Back to top
            </span>
            <ArrowUp className="w-4 h-4 text-electric group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Made With */}
        <div className="mt-8 pt-8 border-t border-electric/5 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-graymatter">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span>using</span>
          <span className="text-electric">React</span>
          <span>+</span>
          <span className="text-electric">TypeScript</span>
          <span>+</span>
          <span className="text-electric">Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
