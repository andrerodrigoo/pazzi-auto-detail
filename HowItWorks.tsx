"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Sparkles, Droplets, Shield, Wand2, Cog, Building2 } from "lucide-react";

const icons = [Sparkles, Droplets, Shield, Wand2, Cog, Building2];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-24 md:py-32 bg-pazzi-graphite">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2 className="section-title text-4xl md:text-5xl">{t.services.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative bg-pazzi-card border border-white/5 rounded-2xl p-7 hover:border-pazzi-red/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-pazzi-red/10 flex items-center justify-center mb-5 group-hover:bg-pazzi-red transition-colors">
                  <Icon size={20} className="text-pazzi-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{s.name}</h3>
                <p className="text-pazzi-silver text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
