import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Code2,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

      // Form animation
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll(".form-input");
        gsap.fromTo(
          inputs,
          { opacity: 0, y: 20, width: "0%" },
          {
            opacity: 1,
            y: 0,
            width: "100%",
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Info animation
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll(".info-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "bhargavapenumetcha49@gmail.com",
      href: "mailto:bhargavapenumetcha49@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9704128358",
      href: "tel:+919704128358",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/bhargavraju49" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/bhargava-penumetcha/",
    },
    {
      icon: Code2,
      label: "LeetCode",
      href: "https://leetcode.com/u/bhargav49/",
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32">
      {/* Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-electric/5 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-electric bg-electric/10 rounded-full border border-electric/20">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Initiate <span className="gradient-text">Contact</span>
          </h2>
          <p className="text-graymatter max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Let&apos;s
            connect and build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="info-item group flex items-center gap-4 p-4 glass rounded-xl border border-electric/10 hover:border-electric/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center group-hover:bg-electric/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="text-sm text-graymatter">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-electric transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-matter border border-electric/20 flex items-center justify-center text-graymatter hover:text-electric hover:border-electric/50 hover:bg-electric/10 transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass rounded-xl p-6 border border-electric/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400">
                  Available for work
                </span>
              </div>
              <p className="text-sm text-graymatter">
                I&apos;m currently open to new opportunities and interesting
                projects. Feel free to reach out!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 border border-electric/10"
          >
            <div className="space-y-6">
              {/* Name Input */}
              <div className="form-input">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-matter border border-electric/20 rounded-lg text-white placeholder-graymatter focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div className="form-input">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-matter border border-electric/20 rounded-lg text-white placeholder-graymatter focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Input */}
              <div className="form-input">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-matter border border-electric/20 rounded-lg text-white placeholder-graymatter focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? "bg-green-500 text-white"
                    : "bg-electric text-white hover:bg-electric/90 hover:shadow-lg hover:shadow-electric/30"
                } disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
