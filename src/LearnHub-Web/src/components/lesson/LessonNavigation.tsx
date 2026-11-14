import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { lessonLink, type LessonItem } from "./lessonUtils";

type Props = {
  prev?: LessonItem;
  next?: LessonItem;
  isCompleted: boolean;
  /** False once the exam is passed: lessons can't be un-completed anymore. */
  canUndo: boolean;
  onComplete: () => void;
  onUndo: () => void;
};

export default function LessonNavigation({ prev, next, isCompleted, canUndo, onComplete, onUndo }: Props) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
      {prev ? (
        <Link to={lessonLink(prev.id)} className="btn btn-secondary px-5">
          ← Previous
        </Link>
      ) : (
        <button className="btn btn-secondary px-5" disabled>
          ← Previous
        </button>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {isCompleted ? (
          <>
            <span className="flex items-center gap-2 text-sm font-semibold text-success">
              <CheckCircle2 size={18} /> Completed
            </span>
            {canUndo && (
              <button className="btn btn-ghost btn-sm" onClick={onUndo}>
                Undo
              </button>
            )}
          </>
        ) : (
          <button className="btn btn-primary px-6" onClick={onComplete}>
            Mark as completed
          </button>
        )}

        {next && (
          <Link to={lessonLink(next.id)} className={`btn px-5 ${isCompleted ? "btn-primary" : "btn-secondary"}`}>
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
