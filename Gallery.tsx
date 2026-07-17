"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { Menu, X } from "lucide-react";

export default function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#how", label: t.nav.how },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#area", label: t.nav.area },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-pazzi-black/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
        <a href="#" className="flex items-center gap-2 font-display font-black text-xl tracking-tight">
          <span className="relative w-8 h-8 bg-pazzi-red diagonal-corner flex items-center justify-center">
            <span className="absolute inset-0 bg-pazzi-black" style={{ clipPath: "polygon(0 0, 55% 0, 0 55%)" }} />
          </span>
          PAZZI
        </a>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-pazzi-chrome">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-full border border-white/10 p-1 text-xs font-mono">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-colors ${lang === "en" ? "bg-pazzi-red text-white" : "text-pazzi-chrome"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("pt")}
              className={`px-2.5 py-1 rounded-full transition-colors ${lang === "pt" ? "bg-pazzi-red text-white" : "text-pazzi-chrome"}`}
            >
              PT
            </button>
          </div>

          <button
            onClick={onBookClick}
            className="hidden md:inline-flex bg-pazzi-red hover:bg-pazzi-redDark transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            {t.nav.book}
          </button>

          <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-pazzi-black border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-pazzi-chrome text-lg">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-mono ${lang === "en" ? "bg-pazzi-red text-white" : "border border-white/10 text-pazzi-chrome"}`}>EN</button>
            <button onClick={() => setLang("pt")} className={`px-3 py-1 rounded-full text-xs font-mono ${lang === "pt" ? "bg-pazzi-red text-white" : "border border-white/10 text-pazzi-chrome"}`}>PT</button>
          </div>
          <button
            onClick={() => { setOpen(false); onBookClick(); }}
            className="bg-pazzi-red text-white font-semibold px-5 py-3 rounded-full mt-2"
          >
            {t.nav.book}
          </button>
        </div>
      )}
    </header>
  );
}
