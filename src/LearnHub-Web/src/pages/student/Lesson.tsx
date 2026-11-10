import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { courses, lessons } from "../../examples/exampledata";

// EXAMPLE: current course and lesson
const course = courses[0];
const currentId = "l3";

export default function Lesson() {
  return (
    <div className="grid gap-8 lg:grid-cols-4">
      {/* Lesson list */}
      <aside className="lg:col-span-1">
        <div className="card p-4">
          <p className="px-2 text-xs font-bold uppercase tracking-wide text-slate-400">Course</p>
          <p className="px-2 pb-3 font-bold text-slate-900">{course.title}</p>
          <ul className="space-y-1">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className={`flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm ${
                  lesson.id === currentId ? "bg-accent-soft font-semibold text-accent-dark" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {lesson.completed ? (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                  <Circle size={18} className="text-slate-300" />
                )}
                <span className="flex-1">{lesson.order}. {lesson.title}</span>
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-slate-400">
              <Lock size={18} />
              Final exam
            </li>
          </ul>
        </div>
      </aside>

      {/* Lesson content */}
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Variables and data types</h1>

        {/* Optional video. The real page renders an iframe built from the parsed YouTube/Vimeo ID. */}
        <div className="mt-6 flex aspect-video items-center justify-center rounded-xl bg-slate-900 text-white/80">
          <PlayCircle size={64} />
        </div>

        {/* EXAMPLE lesson body. In the app this is sanitized, rendered Markdown. */}
        <article className="card mt-6 space-y-4 p-6 text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">Declaring variables</h2>
          <p>
            A variable is a named place in memory. In C# every variable has a type that decides which values it can
            hold.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
            <code>{`int age = 25;\nstring name = "Anna";\nbool isStudent = true;`}</code>
          </pre>
          <p>Use <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">var</code> when the type is obvious from the right side.</p>
        </article>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button className="btn btn-secondary">← Previous</button>

          {/* VARIANT A (lesson not completed yet) */}
          <button className="btn btn-primary">Mark as completed</button>

          {/* VARIANT B (lesson already completed). Replace variant A with this:
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <CheckCircle2 size={18} /> Completed
          </span>
          */}

          <button className="btn btn-secondary">Next →</button>
        </div>

        {/* VARIANT A (exam locked: some lessons are not completed) */}
        <div className="mt-8 flex items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-white p-5">
          <Lock className="text-slate-400" />
          <p className="text-sm text-slate-600">Complete all lessons to unlock the final exam.</p>
        </div>

        {/* VARIANT B (exam unlocked: all lessons completed). Replace variant A with this:
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-accent-soft p-5">
          <p className="font-semibold text-accent-dark">All lessons completed. The exam is unlocked.</p>
          <Link to="/exam/c1" className="btn btn-primary">Start the exam</Link>
        </div>
        */}
      </div>
    </div>
  );
}