import { PlayCircle } from "lucide-react";

/** Placeholder for the video player. Replace the button with the real embed. */
export default function LessonVideo() {
  return (
    <button
      type="button"
      aria-label="Play video"
      className="group mt-6 flex aspect-video w-full items-center justify-center rounded-xl bg-slate-900 text-white/80 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
    >
      <PlayCircle size={56} className="transition-transform group-hover:scale-110" />
    </button>
  );
}
