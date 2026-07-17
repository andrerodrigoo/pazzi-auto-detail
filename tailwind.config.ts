"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Plus } from "lucide-react";

export default function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-pazzi-graphite">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2 className="section-title text-4xl md:text-5xl">{t.faq.title}</h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {t.faq.items.map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-4"
              >
                <span className="font-display font-semibold text-lg md:text-xl">{item.q}</span>
                <Plus
                  size={20}
                  className={`shrink-0 text-pazzi-red transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-pazzi-silver leading-relaxed pb-6 max-w-2xl">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
