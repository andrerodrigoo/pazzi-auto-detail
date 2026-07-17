@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-pazzi-black text-pazzi-white font-body antialiased;
}

::selection {
  @apply bg-pazzi-red text-white;
}

:focus-visible {
  outline: 2px solid #E10600;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.eyebrow {
  @apply inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-pazzi-red mb-4;
}

.eyebrow::before {
  content: "";
  @apply w-6 h-[2px] bg-pazzi-red inline-block;
}

.section-title {
  @apply font-display font-black uppercase tracking-tight text-4xl md:text-6xl leading-[0.95];
}

.diagonal-corner {
  clip-path: polygon(30% 100%, 100% 100%, 100% 0%);
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
