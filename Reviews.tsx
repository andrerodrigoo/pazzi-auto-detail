"use client";

import { useLanguage } from "@/lib/language-context";
import { Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-pazzi-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-display font-black text-lg">
          <span className="relative w-6 h-6 bg-pazzi-red diagonal-corner" />
          PAZZI AUTO DETAIL
        </div>

        <p className="text-pazzi-silver text-sm text-center">
          {t.footer.madeFor} · © {new Date().getFullYear()} Pazzi Auto Detail. {t.footer.rights}
        </p>

        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="text-pazzi-silver hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="YouTube" className="text-pazzi-silver hover:text-white transition-colors">
            <Youtube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
