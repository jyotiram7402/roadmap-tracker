"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import { FaYoutube, FaXTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa6";

const LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund & Cancellation", href: "/refund" },
];

// TODO: replace the "#" placeholders with your real profile URLs.
const SOCIALS = [
  { label: "YouTube", Icon: FaYoutube, href: "#" },
  { label: "X (Twitter)", Icon: FaXTwitter, href: "#" },
  { label: "Instagram", Icon: FaInstagram, href: "#" },
  { label: "LinkedIn", Icon: FaLinkedinIn, href: "#" },
  { label: "GitHub", Icon: FaGithub, href: "https://github.com/jyotiram7402" },
];

export default function BrandFooter({ className = "" }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`relative overflow-hidden border-t border-white/[0.08] bg-[#09090b] ${className}`}>
      {/* top: brand · links · socials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="grid gap-8 md:grid-cols-3 items-start">
          <div>
            <Logo size={30} textClass="text-lg text-white" />
            <p className="mt-3 text-[13px] text-zinc-500 max-w-xs leading-relaxed">
              Crack any software-engineering interview — roadmaps, DSA, SQL, logic building &amp; real interview Q&amp;A, all in one place.
            </p>
          </div>

          <nav className="flex flex-col gap-3 md:items-center">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-[15px] text-zinc-300 hover:text-white transition w-fit">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 md:items-end md:text-right">
            <div className="flex gap-2.5 md:justify-end">
              {SOCIALS.map(({ label, Icon, href }) => (
                <a key={label} href={href} aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl grid place-items-center bg-white/[0.05] border border-white/[0.06] text-zinc-300 hover:text-white hover:bg-white/[0.10] hover:border-white/[0.14] transition">
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <p className="text-[13px] text-zinc-500">© {year} CrackDev. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* giant fading wordmark */}
      <div aria-hidden="true" className="select-none pointer-events-none px-1">
        <div className="text-center font-black tracking-tighter leading-[0.76] whitespace-nowrap"
          style={{ fontSize: "clamp(4.5rem, 21vw, 19rem)" }}>
          <span style={{ color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.16), rgba(255,255,255,0.015))" }}>Crack</span>
          <span style={{ color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(to bottom, rgba(240,101,79,0.42), rgba(240,101,79,0.03))" }}>Dev</span>
        </div>
      </div>
    </footer>
  );
}
