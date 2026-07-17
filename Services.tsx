"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Star } from "lucide-react";

const reviews = [
  { name: "J. Ramirez", vehicle: "BMW X3", en: "Showed up on time, worked around my schedule, and my SUV looked better than the day I bought it.", pt: "Chegaram no horário, se ajustaram à minha agenda, e minha SUV ficou melhor do que no dia da compra." },
  { name: "M. Santos", vehicle: "Ferrari Portofino", en: "Trusted them with my Ferrari and they treated it with real care. Interior looks brand new.", pt: "Confiei minha Ferrari a eles e o cuidado foi de verdade. O interior parece novo." },
  { name: "D. Whitfield", vehicle: "Silverado", en: "Best mobile detail I've used in South Florida. Booking through the chat was quick and easy.", pt: "Melhor detalhamento mobile que já usei no Sul da Flórida. Agendar pelo chat foi rápido e fácil." },
];

export default function Reviews() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 bg-pazzi-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="section-title text-4xl md:text-5xl">{t.reviews.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-pazzi-card border border-white/5 rounded-2xl p-7"
            >
              <div className="flex gap-0.5 mb-4 text-pazzi-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-pazzi-chrome leading-relaxed mb-5">
                "{lang === "pt" ? r.pt : r.en}"
              </p>
              <div className="text-sm">
                <div className="font-semibold">{r.name}</div>
                <div className="text-pazzi-silver font-mono text-xs">{r.vehicle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
