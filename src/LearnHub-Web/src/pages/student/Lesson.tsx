import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, lessons } from "../../examples/exampledata";

const course = courses[0];
const currentId = "l3";

export default function Lesson() {
  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_1fr]">
      {/* Lesson list */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="font-bold text-slate-900">{course.title}</p>
        <ul className="mt-3 space-y-0.5">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={`group flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                lesson.id === currentId
                  ? "bg-accent-soft font-semibold text-accent-dark"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {lesson.completed ? (
                <CheckCircle2 size={17} className="shrink-0 text-success" />
              ) : (
                <Circle 
                  size={17} 
                  className={`shrink-0 transition-colors ${
                    lesson.id === currentId ? "text-accent-dark" : "text-slate-300 group-hover:text-slate-400"
                  }`} 
                />
              )}
              <span>{lesson.order}. {lesson.title}</span>
            </li>
          ))}
          <li className="flex items-center gap-3 px-2.5 py-2 text-sm text-slate-400">
            <Lock size={17} className="shrink-0" />
            Final exam
          </li>
        </ul>
      </aside>

      {/* Lesson content */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Variables and data types</h1>

        <div className="mt-6 flex aspect-video items-center justify-center rounded-xl bg-slate-900 text-white/80 shadow-sm">
          <PlayCircle size={56} className="transition-transform hover:scale-110 cursor-pointer" />
        </div>

        <article className="mt-8 space-y-4 leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">Declaring variables</h2>
          <p>
            A variable is a named place in memory. In C# every variable has a type that decides which values it can
            hold.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-50 shadow-sm">
            <code>{`int age = 25;\nstring name = "Anna";\nbool isStudent = true;`}</code>
          </pre>
          <p>
            Use <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-medium text-slate-900">var</code> when the type is obvious from the right side.
          </p>
        </article>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
          <button className="btn btn-secondary px-5">← Previous</button>

          {/* VARIANT A (lesson not completed yet) */}
          <button className="btn btn-primary px-6">Mark as completed</button>

          {/* VARIANT B (lesson already completed). Replace variant A with this:
          <span className="flex items-center gap-2 text-sm font-semibold text-success">
            <CheckCircle2 size={18} /> Completed
          </span>
          */}

          <button className="btn btn-secondary px-5">Next →</button>
        </div>

        {/* VARIANT A (exam locked: some lessons are not completed) */}
        <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 sm:justify-start">
          <Lock size={16} /> Complete all lessons to unlock the final exam.
        </p>

        {/* VARIANT B (exam unlocked: all lessons completed). Replace variant A with this:
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-accent-soft p-5">
          <p className="font-semibold text-accent-dark">All lessons completed. The exam is unlocked.</p>
          <Link to="/exam/c1" className="btn btn-primary">Start the exam</Link>
        </div>
        */}
      </div>
    </div>
  );
}