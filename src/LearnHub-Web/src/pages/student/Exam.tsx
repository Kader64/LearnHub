import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, examQuestions } from "../../examples/exampledata";

const course = courses[0];

export default function Exam() {
  return (
    <div className="mx-auto max-w-2xl pb-12">
      {/* Added px-5 sm:px-6 and increased py-3 to py-4 for better breathing room */}
      <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-page/95 px-5 py-4 backdrop-blur sm:px-6">
        <div>
          <h1 className="text-lg font-extrabold text-ink sm:text-xl">Final exam</h1>
          <p className="text-xs text-muted sm:text-sm">{course.title}</p>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm">
          {/* VARIANT A (attempts: unlimited) */}
          <span className="text-muted">Attempt 2 · unlimited</span>

          {/* VARIANT B (attempts: limited). Replace variant A with this:
          <span className="text-muted">Attempt 2 of 3</span>
          */}

          {/* VARIANT (optional time limit) */}
          <span className="flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1 font-bold tabular-nums text-warning">
            <Clock size={14} /> 24:35 left
          </span>
        </div>
      </div>

      <ol className="mt-6 space-y-5">
        {examQuestions.map((q, index) => (
          <li key={q.id} className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
                Question {index + 1} of {examQuestions.length}
              </legend>
              <p className="mt-1.5 text-base font-bold leading-snug text-ink sm:text-lg">
                {q.text}
              </p>

              <div className="mt-4 space-y-2.5">
                {q.answers.map((answer) => (
                  <label
                    key={answer}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm transition-colors hover:bg-page has-checked:border-accent has-checked:bg-accent-soft has-checked:font-semibold has-checked:text-accent-dark"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="h-4 w-4 shrink-0 accent-accent"
                    />
                    <span>{answer}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      {/* Added px-5 sm:px-6 so the button aligns with the right edge of the card text */}
      <div className="mt-8 flex justify-end border-t border-line px-5 pt-6 sm:px-6">
        <Link to="/exam/c1/result" className="btn btn-primary w-full px-6 py-2.5 text-center sm:w-auto">
          Submit exam
        </Link>
      </div>

      {/* VARIANT (attempt limit reached)
      <div className="py-16 text-center">
        <h2 className="section-title">No attempts left</h2>
        <p className="mt-2 text-sm text-muted">You have used all attempts for this exam.</p>
        <Link to="/courses" className="btn btn-secondary mt-5">Return to courses</Link>
      </div>
      */}
    </div>
  );
}