"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 bg-pazzi-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="section-title text-4xl md:text-5xl mb-6">{t.about.title}</h2>
          <p className="text-pazzi-chrome text-lg leading-relaxed max-w-lg">{t.about.body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden"
        >
          <Image src="/images/ferrari-side.jpg" alt="Ferrari Portofino detailed by Pazzi" fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-pazzi-red" />
        </motion.div>
      </div>
    </section>
  );
}
