"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/lib/language-context";
import { X, Send, MessageCircle, Check, Loader2 } from "lucide-react";

type Step = "name" | "vehicle" | "service" | "city" | "zip" | "date" | "time" | "notes" | "confirm" | "sent";

type BookingData = {
  name: string;
  vehicle: string;
  service: string;
  city: string;
  zip: string;
  date: string;
  time: string;
  notes: string;
};

type ChatMessage = { from: "bot" | "user"; text: string };

const bookingSchema = z.object({
  name: z.string().min(2),
  vehicle: z.string().min(2),
  service: z.string().min(2),
  city: z.string().min(2),
  zip: z.string().min(4),
  date: z.string().min(2),
  time: z.string().min(2),
  notes: z.string(),
});

const SERVICE_OPTIONS = [
  "Exterior Detail",
  "Interior Restoration",
  "Ceramic Coating",
  "Paint Correction",
  "Engine Bay Detail",
  "Fleet & Business",
];

export default function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>("name");
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: "bot", text: t.chat.welcome }]);
  const [input, setInput] = useState("");
  const [data, setData] = useState<Partial<BookingData>>({});
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    formState: { errors },
  } = useForm<BookingData>({ resolver: zodResolver(bookingSchema) });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, step]);

  // reset conversation whenever the panel is (re)opened fresh
  useEffect(() => {
    if (open && step === "name" && messages.length > 1) {
      // keep state if user re-opens mid-flow
    }
  }, [open]);

  function pushBot(text: string) {
    setMessages((m) => [...m, { from: "bot", text }]);
  }
  function pushUser(text: string) {
    setMessages((m) => [...m, { from: "user", text }]);
  }

  function handleSubmitStep() {
    const value = input.trim();
    if (!value) return;
    pushUser(value);
    setInput("");

    switch (step) {
      case "name":
        setData((d) => ({ ...d, name: value }));
        pushBot(t.chat.askVehicle.replace("{name}", value));
        setStep("vehicle");
        break;
      case "vehicle":
        setData((d) => ({ ...d, vehicle: value }));
        pushBot(t.chat.askService);
        setStep("service");
        break;
      case "service":
        setData((d) => ({ ...d, service: value }));
        pushBot(t.chat.askCity);
        setStep("city");
        break;
      case "city":
        setData((d) => ({ ...d, city: value }));
        pushBot(t.chat.askZip);
        setStep("zip");
        break;
      case "zip":
        setData((d) => ({ ...d, zip: value }));
        pushBot(t.chat.askDate);
        setStep("date");
        break;
      case "date":
        setData((d) => ({ ...d, date: value }));
        pushBot(t.chat.askTime);
        setStep("time");
        break;
      case "time":
        setData((d) => ({ ...d, time: value }));
        pushBot(t.chat.askNotes);
        setStep("notes");
        break;
      case "notes":
        setData((d) => ({ ...d, notes: value }));
        pushBot(t.chat.confirm);
        setStep("confirm");
        break;
    }
  }

  async function handleSend() {
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStep("sent");
      pushBot(t.chat.sent);
    } catch (e) {
      pushBot("Something went wrong sending your request. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  function handleServiceOption(opt: string) {
    pushUser(opt);
    setData((d) => ({ ...d, service: opt }));
    pushBot(t.chat.askCity);
    setStep("city");
  }

  function restart() {
    setData({});
    setMessages([{ from: "bot", text: t.chat.welcome }]);
    setStep("name");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-pazzi-graphite z-[70] flex flex-col border-l border-white/10"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 font-display font-bold">
                <MessageCircle size={18} className="text-pazzi-red" />
                {t.chat.title}
              </div>
              <button onClick={onClose} aria-label="Close chat" className="text-pazzi-silver hover:text-white">
                <X size={22} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-none">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "user" ? "bg-pazzi-red text-white rounded-br-sm" : "bg-pazzi-card text-pazzi-chrome rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {step === "service" && (
                <div className="flex flex-wrap gap-2 pl-1">
                  {SERVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleServiceOption(opt)}
                      className="text-xs font-mono border border-white/15 hover:border-pazzi-red hover:text-pazzi-red transition-colors rounded-full px-3 py-1.5"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {step === "confirm" && (
                <div className="bg-pazzi-card rounded-2xl p-4 text-sm font-mono space-y-1.5 border border-white/10">
                  <Row label="Name" value={data.name} />
                  <Row label="Vehicle" value={data.vehicle} />
                  <Row label="Service" value={data.service} />
                  <Row label="City" value={data.city} />
                  <Row label="ZIP" value={data.zip} />
                  <Row label="Date" value={data.date} />
                  <Row label="Time" value={data.time} />
                  <Row label="Notes" value={data.notes} />

                  <button
                    onClick={handleSend}
                    disabled={sending}
                    className="w-full mt-3 bg-pazzi-red hover:bg-pazzi-redDark disabled:opacity-60 text-white font-sans font-semibold rounded-full py-2.5 flex items-center justify-center gap-2"
                  >
                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {t.chat.send}
                  </button>
                </div>
              )}

              {step === "sent" && (
                <div className="flex flex-col items-center text-center gap-3 pt-4">
                  <div className="w-12 h-12 rounded-full bg-pazzi-red/15 flex items-center justify-center">
                    <Check size={22} className="text-pazzi-red" />
                  </div>
                  <button
                    onClick={restart}
                    className="text-xs font-mono underline text-pazzi-silver hover:text-white"
                  >
                    {t.chat.restart}
                  </button>
                </div>
              )}
            </div>

            {step !== "confirm" && step !== "sent" && step !== "service" && (
              <div className="p-4 border-t border-white/10 flex items-center gap-2 shrink-0">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitStep()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-pazzi-card border border-white/10 rounded-full px-4 py-3 text-sm outline-none focus:border-pazzi-red transition-colors"
                />
                <button
                  onClick={handleSubmitStep}
                  aria-label="Send"
                  className="w-11 h-11 shrink-0 rounded-full bg-pazzi-red hover:bg-pazzi-redDark flex items-center justify-center"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-pazzi-silver">{label}</span>
      <span className="text-white text-right">{value || "—"}</span>
    </div>
  );
}
