import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "HOME", to: "/" },
  { label: "GALLERY", to: "/gallery" },
  { label: "WISHES", to: "/wishes" },
  { label: "TIMELINE", to: "/timeline" },
  { label: "FUN FACTS", to: "/fun-facts" },
  { label: "QUIZ 🎯", to: "/quiz" },
];

export default function Header() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "oklch(0.94 0.020 86)",
        boxShadow:
          "0 1px 0 oklch(0.88 0.02 80), 0 2px 12px oklch(0.20 0.018 42 / 0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-tight group">
            <span
              className="font-playfair font-bold text-lg md:text-xl tracking-wide"
              style={{ color: "oklch(0.64 0.10 70)" }}
            >
              PRAKRITI&apos;S
            </span>
            <span
              className="font-inter text-xs md:text-sm font-medium tracking-widest uppercase"
              style={{ color: "oklch(0.54 0.07 12)" }}
            >
              Birthday Bash 🎉
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-6"
            data-ocid="main.nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-inter text-xs font-semibold tracking-widest transition-colors duration-200 whitespace-nowrap"
                style={{
                  color:
                    currentPath === link.to
                      ? "oklch(0.56 0.08 10)"
                      : "oklch(0.20 0.018 42)",
                  borderBottom:
                    currentPath === link.to
                      ? "2px solid oklch(0.56 0.08 10)"
                      : "2px solid transparent",
                  paddingBottom: "2px",
                }}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-").replace(" 🎯", "")}.link`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/wishes" data-ocid="nav.celebrate.button">
              <button
                type="button"
                className="gold-btn text-white font-inter font-semibold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-200"
              >
                CELEBRATE 🎉
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg"
            style={{ color: "oklch(0.20 0.018 42)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.menu.toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{ borderColor: "oklch(0.88 0.02 80)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 font-inter text-sm font-semibold tracking-widest uppercase"
                style={{
                  color:
                    currentPath === link.to
                      ? "oklch(0.56 0.08 10)"
                      : "oklch(0.20 0.018 42)",
                }}
                data-ocid={`nav.mobile.${link.label.toLowerCase().replace(" ", "-").replace(" 🎯", "")}.link`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/wishes" onClick={() => setMenuOpen(false)}>
              <button
                type="button"
                className="gold-btn text-white font-inter font-semibold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full mt-3 w-full"
              >
                CELEBRATE 🎉
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
