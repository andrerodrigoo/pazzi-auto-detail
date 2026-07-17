"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import ServiceArea from "@/components/ServiceArea";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import FloatingChatButton from "@/components/FloatingChatButton";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main>
      <Navbar onBookClick={() => setChatOpen(true)} />
      <Hero onBookClick={() => setChatOpen(true)} />
      <About />
      <Services />
      <HowItWorks onBookClick={() => setChatOpen(true)} />
      <Gallery />
      <ServiceArea />
      <Reviews />
      <FAQ />
      <CTA onBookClick={() => setChatOpen(true)} />
      <Footer />

      <FloatingChatButton onClick={() => setChatOpen(true)} />
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
  );
}
