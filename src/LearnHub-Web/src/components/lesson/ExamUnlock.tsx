import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

type Props = { remaining: number; examPath: string };

/** Under the lesson: tells the student how many lessons are left, or links to the exam. */
export default function ExamUnlock({ remaining, examPath }: Props) {
  if (remaining === 0) {
    return (
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-accent-soft p-5">
        <p className="font-semibold text-accent-dark">All lessons completed. The exam is unlocked.</p>
        <Link to={examPath} className="btn btn-primary">
          Start the exam
        </Link>
      </div>
    );
  }

  return (
    <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-muted sm:justify-start">
      <Lock size={16} />
      Complete {remaining} more {remaining === 1 ? "lesson" : "lessons"} to unlock the final exam.
    </p>
  );
}
