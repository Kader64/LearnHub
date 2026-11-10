import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, examQuestions } from "../../examples/exampledata";

// EXAMPLE: course the exam belongs to
const course = courses[0];

export default function Exam() {
  // Student view: questions and answer texts only. The student DTO has no isCorrect field.
  return (
    <div className="mx-auto max-w-3xl">
      <div className="card sticky top-20 z-10 mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="text-sm text-slate-500">{course.title}</p>
          <h1 className="font-extrabold text-slate-900">Final exam</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {/* Attempts: unlimited (default) */}
          <span className="text-slate-500">Attempt 2 · unlimited</span>
          {/* Attempts: limited. Replace with: <span className="text-slate-500">Attempt 2 of 3</span> */}

          {/* TIME LIMIT is optional (per exam). Remove this chip if the exam has no time limit. */}
          <span className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 font-bold text-amber-700">
            <Clock size={16} /> 24:35 left
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {examQuestions.map((q, index) => (
          <section key={q.id} className="card p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Question {index + 1} of {examQuestions.length}
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{q.text}</h2>
            <div className="mt-4 space-y-2.5">
              {q.answers.map((answer) => (
                <label
                  key={answer}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 px-4 py-3 text-sm transition hover:bg-slate-50 has-checked:border-accent has-checked:bg-accent-soft"
                >
                  <input type="radio" name={q.id} className="accent-[#0e7c86]" />
                  {answer}
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        {/* TEMP: a link so you can click through. Replace with a real submit action. */}
        <Link to="/exam/c1/result" className="btn btn-primary px-8">Submit exam</Link>
      </div>

      {/* VARIANT: attempt limit reached. Show this instead of the whole exam:
      <div className="card p-10 text-center">
        <h2 className="text-xl font-bold text-slate-900">No attempts left</h2>
        <p className="mt-2 text-slate-500">You have used all attempts for this exam.</p>
      </div>
      */}
    </div>
  );
}