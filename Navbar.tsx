"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight } from "lucide-react";

export default function CTA({ onBookClick }: { onBookClick: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-pazzi-graphite">
      <div className="absolute inset-0">
        <Image src="/images/cybertruck-front.jpg" alt="" fill className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-pazzi-graphite via-pazzi-graphite/90 to-pazzi-graphite/60" />
      </div>
      <div className="absolute top-0 left-0 w-[40vw] max-w-[480px] aspect-[3/1] bg-pazzi-red diagonal-corner rotate-180" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="section-title text-4xl md:text-6xl mb-5">{t.cta.title}</h2>
        <p className="text-pazzi-chrome text-lg mb-10">{t.cta.subtitle}</p>
        <button
          onClick={onBookClick}
          className="group inline-flex items-center gap-2 bg-pazzi-red hover:bg-pazzi-redDark transition-colors text-white font-semibold px-8 py-4 rounded-full text-lg"
        >
          {t.cta.button}
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
