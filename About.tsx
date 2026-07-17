"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function FloatingChatButton({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-pazzi-red hover:bg-pazzi-redDark transition-colors text-white font-semibold pl-4 pr-5 py-4 rounded-full shadow-lg shadow-black/40"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline text-sm">{t.nav.book}</span>
    </button>
  );
}
