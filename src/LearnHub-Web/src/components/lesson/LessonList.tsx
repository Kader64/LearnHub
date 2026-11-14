import { CheckCircle2, Circle, ClipboardCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { lessonLink, type LessonItem } from "./lessonUtils";

export type LessonListProps = {
  lessons: LessonItem[];
  currentId: string;
  completedIds: Set<string>;
  remaining: number;
  examPath: string;
  /** Called after a lesson link is clicked (used to close the mobile menu). */
  onNavigate?: () => void;
};

function LessonRow({
  lesson,
  isCurrent,
  isDone,
  onNavigate,
}: {
  lesson: LessonItem;
  isCurrent: boolean;
  isDone: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={lessonLink(lesson.id)}
      onClick={onNavigate}
      aria-current={isCurrent ? "page" : undefined}
      className={`group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
        isCurrent ? "bg-accent-soft font-semibold text-accent-dark" : "text-body hover:bg-line/60 hover:text-ink"
      }`}
    >
      {isDone ? (
        <CheckCircle2 size={17} className="shrink-0 text-success" />
      ) : (
        <Circle
          size={17}
          className={`shrink-0 transition-colors ${isCurrent ? "text-accent-dark" : "text-muted group-hover:text-ink"}`}
        />
      )}
      <span>
        {lesson.order}. {lesson.title}
      </span>
    </Link>
  );
}

function ExamRow({ remaining, examPath }: { remaining: number; examPath: string }) {
  if (remaining === 0) {
    return (
      <Link
        to={examPath}
        className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-semibold text-accent-dark transition-colors hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <ClipboardCheck size={17} className="shrink-0" />
        Final exam
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 px-2.5 py-2 text-sm text-muted">
      <Lock size={17} className="shrink-0" />
      <span>
        Final exam
        <span className="ml-2 text-xs">
          {remaining} {remaining === 1 ? "lesson" : "lessons"} left
        </span>
      </span>
    </div>
  );
}

export default function LessonList({
  lessons,
  currentId,
  completedIds,
  remaining,
  examPath,
  onNavigate,
}: LessonListProps) {
  return (
    <ul className="space-y-0.5">
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          <LessonRow
            lesson={lesson}
            isCurrent={lesson.id === currentId}
            isDone={completedIds.has(lesson.id)}
            onNavigate={onNavigate}
          />
        </li>
      ))}
      <li>
        <ExamRow remaining={remaining} examPath={examPath} />
      </li>
    </ul>
  );
}
