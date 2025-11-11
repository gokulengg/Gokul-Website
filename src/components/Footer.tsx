import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Award } from "lucide-react";
import { useEffect, useState } from "react";

// Logo paths from public folder (same as Header)
const lightLogo = "/images/logo/lightlogo.png";
const darkLogo = "/images/logo/darklogo.png";

const Footer = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Detect theme changes (same as Header)
  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDarkNow = root.classList.contains("dark");
      setTheme(isDarkNow ? "dark" : "light");
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative border-t border-border bg-gradient-to-br from-background via-muted/60 to-primary/10 dark:from-background dark:via-muted/40 dark:to-primary/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none opacity-30">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-muted/30 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid gap-10 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-5 lg:col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <img 
                src={theme === "dark" ? darkLogo : lightLogo} 
                alt="Sri Gokul Engineering Works" 
                className="h-14 w-auto drop-shadow-lg transition-all duration-300"
              />
            </Link>
            <p className="text-base font-medium text-foreground/80">
              <span className="block text-lg font-bold text-primary">Perfection through Precision.</span>
              Engineering excellence since 1987.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary font-semibold">
              <Award className="h-5 w-5 animate-pulse" />
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>

          {/* Quick Links & Contact - Side by Side on Mobile */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2 lg:col-span-2">
            {/* Quick Links */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-primary">Quick Links</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li>
                  <Link to="/" className="footer-link">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="footer-link">About Us</Link>
                </li>
                <li>
                  <Link to="/services" className="footer-link">Services</Link>
                </li>
                <li>
                  <Link to="/projects" className="footer-link">Projects</Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info - Compact for mobile */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-primary">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80 leading-tight">B-38/A, BHEL-AIE, Hyderabad</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:+914023020624" className="footer-link">
                      +91 40 23020624
                    </a>
                    <a href="tel:+919347091100" className="footer-link">
                      +91 93470 91100
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="mailto:gokulengg@yahoo.com" className="footer-link break-all">
                    gokulengg@yahoo.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-5 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-primary">Follow Us</h3>
            <div className="flex gap-4">
              <SocialIcon href="https://www.linkedin.com/company/sgew-gokul/" label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4 text-center">
          <p className="text-sm md:text-base text-foreground/70 font-medium">
            © {new Date().getFullYear()} Sri Gokul Engineering Works. All rights reserved. <span className="mx-2">|</span> <span className="text-primary font-semibold">ISO 9001:2015 Certified</span>
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;

// Custom Social Icon with animation and accessibility
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

// Footer link style for consistency
// Add this to global CSS (index.css):
// .footer-link { @apply text-foreground/80 hover:text-primary font-medium transition-colors duration-200; }
