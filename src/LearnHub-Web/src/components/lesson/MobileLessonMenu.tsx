import { ChevronDown } from "lucide-react";
import { useState } from "react";
import LessonList, { type LessonListProps } from "./LessonList";
import ProgressBar from "./ProgressBar";

type Props = Omit<LessonListProps, "onNavigate">;

export default function MobileLessonMenu(list: Props) {
  const [open, setOpen] = useState(false);
  const index = list.lessons.findIndex((l) => l.id === list.currentId);
  const current = list.lessons[index];
  const doneCount = list.completedIds.size;

  return (
    <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)} className="card lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="block text-xs font-semibold text-muted">
            Lesson {index + 1} of {list.lessons.length} · {doneCount} completed
          </span>
          <span className="block truncate font-bold text-ink">{current?.title}</span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </summary>

      <div className="space-y-4 border-t border-line p-3">
        <ProgressBar done={doneCount} total={list.lessons.length} />
        <LessonList {...list} onNavigate={() => setOpen(false)} />
      </div>
    </details>
  );
}
