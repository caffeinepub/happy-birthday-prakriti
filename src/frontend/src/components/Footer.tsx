import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer
      style={{ background: "oklch(0.90 0.04 15)" }}
      className="pt-12 pb-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div
              className="font-playfair font-bold text-2xl mb-2"
              style={{ color: "oklch(0.64 0.10 70)" }}
            >
              Prakriti's
            </div>
            <div
              className="font-inter text-xs tracking-widest uppercase font-medium mb-4"
              style={{ color: "oklch(0.54 0.07 12)" }}
            >
              Birthday Bash 🎂
            </div>
            <p
              className="font-inter text-sm leading-relaxed"
              style={{ color: "oklch(0.45 0.03 40)" }}
            >
              Celebrating the wonderful Prakriti Kalra on her special day, April
              2nd.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-inter font-semibold text-xs tracking-widest uppercase mb-4"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Gallery", to: "/gallery" },
                { label: "Wishes", to: "/wishes" },
                { label: "Timeline", to: "/timeline" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-inter text-sm transition-colors duration-150 hover:text-gold"
                    style={{ color: "oklch(0.45 0.03 40)" }}
                    data-ocid={`footer.${l.label.toLowerCase()}.link`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* A Note for Prakriti */}
          <div>
            <h4
              className="font-inter font-semibold text-xs tracking-widest uppercase mb-4"
              style={{ color: "oklch(0.20 0.018 42)" }}
            >
              A Note for Prakriti 💌
            </h4>
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.64 0.10 70 / 0.12), oklch(0.56 0.08 10 / 0.08))",
                border: "1px solid oklch(0.84 0.04 15)",
              }}
            >
              <div className="text-xl mb-2">🙏</div>
              <p
                className="font-inter text-sm leading-relaxed italic"
                style={{ color: "oklch(0.30 0.02 42)" }}
              >
                Sorry I can&apos;t give U a practical or materialistic gift but
                please don&apos;t judge for that 🙏
              </p>
              <p
                className="font-inter text-xs mt-3 font-semibold"
                style={{ color: "oklch(0.64 0.10 70)" }}
              >
                — With all the love in the world 💛
              </p>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid oklch(0.84 0.04 15)" }}
        >
          <p
            className="font-inter text-xs"
            style={{ color: "oklch(0.54 0.07 12)" }}
          >
            Made with{" "}
            <Heart
              size={12}
              className="inline text-red-400"
              fill="currentColor"
            />{" "}
            for Prakriti's Birthday 🎂
          </p>
          <p
            className="font-inter text-xs"
            style={{ color: "oklch(0.65 0.03 40)" }}
          >
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
