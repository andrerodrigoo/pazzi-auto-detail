"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

const items = [
  { src: "/images/cybertruck-front.jpg", name: "Tesla Cybertruck", tag: "Exotic" },
  { src: "/images/ferrari-rear.jpg", name: "Ferrari Portofino", tag: "Exotic" },
  { src: "/images/landrover-front.jpg", name: "Land Rover Discovery Sport", tag: "Luxury SUV" },
  { src: "/images/silverado-front.jpg", name: "Chevrolet Silverado", tag: "Truck" },
  { src: "/images/bmw-front.jpg", name: "BMW X3", tag: "Luxury SUV" },
  { src: "/images/cybertruck-wheel.jpg", name: "Cybertruck — Wheel Detail", tag: "Detail" },
  { src: "/images/ferrari-interior.jpg", name: "Ferrari — Interior", tag: "Detail" },
  { src: "/images/landrover-engine.jpg", name: "Land Rover — Engine Bay", tag: "Detail" },
  { src: "/images/silverado-interior.jpg", name: "Silverado — Interior", tag: "Detail" },
];

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-pazzi-graphite">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2 className="section-title text-4xl md:text-5xl mb-4">{t.gallery.title}</h2>
          <p className="text-pazzi-silver text-lg">{t.gallery.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
            >
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest bg-pazzi-red px-2 py-1 rounded mb-1">
                  {item.tag}
                </span>
                <p className="font-display font-bold text-sm md:text-base">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
