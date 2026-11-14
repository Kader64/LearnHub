import { Clock, ListChecks, Play, RotateCcw, ShieldAlert, Target, type LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import type { Course } from "../../examples/exampledata";
import CourseCover from "../CourseCover";
import type { ExamSettings } from "./ExamSettings";

type Props = {
  course: Course;
  questionCount: number;
  settings: ExamSettings;
  onStart: () => void;
};

function Stat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-dark">
        <Icon size={20} />
      </span>
      <div>
        <p className="whitespace-nowrap text-lg font-extrabold leading-tight text-ink">{value}</p>
        <p className="whitespace-nowrap text-xs font-medium text-muted">{label}</p>
      </div>
    </div>
  );
}

export default function ExamIntro({ course, questionCount, settings, onStart }: Props) {
  const { attemptNumber, maxAttempts, passMarkPercent, timeLimitMinutes, maxFocusLosses } = settings;

  const stats = [
    { icon: ListChecks, value: String(questionCount), label: "Questions" },
    { icon: Clock, value: `${timeLimitMinutes} min`, label: "Time limit" },
    { icon: Target, value: `${passMarkPercent}%`, label: "Pass mark" },
    {
      icon: RotateCcw,
      value: maxAttempts ? `${attemptNumber} of ${maxAttempts}` : String(attemptNumber),
      label: maxAttempts ? "Attempt" : "Attempt (unlimited)",
    },
  ];

  // Every section uses the same horizontal padding (px-6 sm:px-8), so the cover title,
  // the first stat icon, the notice icon and the "Not now" text share one left edge.
  return (
    <div className="mx-auto max-w-3xl pb-12">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
        {/* `group` is on the cover only, so the icon moves when the cover is hovered, not the whole card */}
        <div className="group">
          <CourseCover cover={course} className="h-48">
            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
              <p className="text-sm font-semibold text-white/85">{course.title}</p>
              <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Final exam</h1>
            </div>
          </CourseCover>
        </div>

        {/* 2x2 grid on small screens. From md up: one row, with dividers as flex children,
            so the space before and after every divider is equal. */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-6 py-6 sm:px-8 md:flex md:items-center md:justify-between">
          {stats.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && <span aria-hidden="true" className="hidden h-10 w-px bg-line md:block" />}
              <Stat {...stat} />
            </Fragment>
          ))}
        </div>

        <div className="flex items-start gap-3 border-y border-warning/20 bg-warning-soft px-6 py-5 sm:px-8">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-warning">
            <ShieldAlert size={20} />
          </span>
          <div>
            <p className="font-bold text-ink">Exam integrity</p>
            <p className="mt-1 text-sm leading-relaxed text-body">
              {`Keep this page in focus for the whole exam. Each time you switch to another tab or window, a warning is recorded. After ${maxFocusLosses} warnings, the attempt is cancelled and marked as failed.`}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-stretch gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {/* -ml-4 cancels the button's own padding, so the text lines up with the left edge */}
          <Link to="/my-learning" className="btn btn-ghost justify-center sm:-ml-4">
            Not now
          </Link>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-center text-sm text-muted">The timer starts immediately.</span>
            <button className="btn btn-primary px-8 py-3 text-base" onClick={onStart}>
              <Play size={18} /> Start exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}