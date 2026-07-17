"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function HowItWorks({ onBookClick }: { onBookClick: () => void }) {
  const { t } = useLanguage();

  return (
    <section id="how" className="relative py-24 md:py-32 bg-pazzi-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow">{t.how.eyebrow}</span>
          <h2 className="section-title text-4xl md:text-5xl">{t.how.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-pazzi-red via-white/10 to-pazzi-red" />
          {t.how.steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full bg-pazzi-red flex items-center justify-center font-display font-black text-2xl mb-6 relative z-10">
                {i + 1}
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-pazzi-silver text-sm leading-relaxed max-w-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={onBookClick}
          className="mt-16 inline-flex bg-white text-pazzi-black font-semibold px-7 py-4 rounded-full hover:bg-pazzi-chrome transition-colors"
        >
          {t.hero.cta}
        </button>
      </div>
    </section>
  );
}
