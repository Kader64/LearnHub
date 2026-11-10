import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { courses, lessons } from "../../examples/exampledata";

// EXAMPLE: current course and lesson
const course = courses[0];
const currentId = "l3";

export default function Lesson() {
  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
      {/* Lesson list */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="font-bold text-ink">{course.title}</p>
        <ul className="mt-3 space-y-0.5">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm ${
                lesson.id === currentId ? "bg-accent-soft font-semibold text-accent-dark" : "text-body hover:bg-white"
              }`}
            >
              {lesson.completed ? (
                <CheckCircle2 size={17} className="shrink-0 text-success" />
              ) : (
                <Circle size={17} className="shrink-0 text-faint" />
              )}
              <span>{lesson.order}. {lesson.title}</span>
            </li>
          ))}
          <li className="flex items-center gap-3 px-2.5 py-2 text-sm text-faint">
            <Lock size={17} className="shrink-0" />
            Final exam
          </li>
        </ul>
      </aside>

      {/* Lesson content */}
      <div className="max-w-3xl">
        <h1 className="page-title">Variables and data types</h1>

        {/* Optional video. The real page renders an iframe built from the parsed YouTube/Vimeo ID. */}
        <div className="mt-6 flex aspect-video items-center justify-center rounded-lg bg-ink text-white/80">
          <PlayCircle size={56} />
        </div>

        {/* EXAMPLE lesson body. In the app this is sanitized, rendered Markdown. */}
        <article className="mt-8 space-y-4 leading-relaxed">
          <h2 className="section-title">Declaring variables</h2>
          <p>
            A variable is a named place in memory. In C# every variable has a type that decides which values it can
            hold.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-ink p-4 text-sm text-page">
            <code>{`int age = 25;\nstring name = "Anna";\nbool isStudent = true;`}</code>
          </pre>
          <p>Use <code className="rounded bg-line px-1.5 py-0.5 text-sm">var</code> when the type is obvious from the right side.</p>
        </article>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <button className="btn btn-secondary">← Previous</button>

          {/* VARIANT A (lesson not completed yet) */}
          <button className="btn btn-primary">Mark as completed</button>

          {/* VARIANT B (lesson already completed). Replace variant A with this:
          <span className="flex items-center gap-2 text-sm font-semibold text-success">
            <CheckCircle2 size={18} /> Completed
          </span>
          */}

          <button className="btn btn-secondary">Next →</button>
        </div>

        {/* VARIANT A (exam locked: some lessons are not completed) */}
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Lock size={16} /> Complete all lessons to unlock the final exam.
        </p>

        {/* VARIANT B (exam unlocked: all lessons completed). Replace variant A with this:
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-accent-soft p-5">
          <p className="font-semibold text-accent-dark">All lessons completed. The exam is unlocked.</p>
          <Link to="/exam/c1" className="btn btn-primary">Start the exam</Link>
        </div>
        */}
      </div>
    </div>
  );
}
