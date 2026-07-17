"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { MapPin } from "lucide-react";

const cities = [
  "Miami", "Fort Lauderdale", "West Palm Beach", "Boca Raton",
  "Coral Springs", "Hollywood", "Delray Beach", "Pembroke Pines",
];

export default function ServiceArea() {
  const { t } = useLanguage();

  return (
    <section id="area" className="relative py-24 md:py-32 bg-pazzi-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">{t.area.eyebrow}</span>
          <h2 className="section-title text-4xl md:text-5xl mb-6">{t.area.title}</h2>
          <p className="text-pazzi-chrome text-lg leading-relaxed max-w-lg mb-8">{t.area.body}</p>

          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 text-xs font-mono border border-white/10 rounded-full px-3 py-1.5 text-pazzi-chrome"
              >
                <MapPin size={12} className="text-pazzi-red" />
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative aspect-square rounded-full border border-pazzi-red/30 flex items-center justify-center mx-auto max-w-sm"
        >
          <div className="absolute inset-6 rounded-full border border-white/10" />
          <div className="absolute inset-12 rounded-full border border-white/5" />
          <div className="text-center">
            <div className="font-display font-black text-5xl">FL</div>
            <div className="text-xs font-mono uppercase tracking-widest text-pazzi-silver mt-1">
              Mobile Coverage
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
