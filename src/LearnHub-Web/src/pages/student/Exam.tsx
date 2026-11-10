import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, examQuestions } from "../../examples/exampledata";

// EXAMPLE: course the exam belongs to
const course = courses[0];

export default function Exam() {
  // Student view: questions and answer texts only. The student DTO has no isCorrect field.
  return (
    <div className="mx-auto max-w-2xl">
      <div className="sticky top-24 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-page py-3 md:top-16">
        <div>
          <h1 className="font-extrabold text-ink">Final exam</h1>
          <p className="text-sm text-muted">{course.title}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {/* Attempts: unlimited (default) */}
          <span className="text-muted">Attempt 2 · unlimited</span>
          {/* Attempts: limited. Replace with: <span className="text-muted">Attempt 2 of 3</span> */}

          {/* TIME LIMIT is optional (per exam). Remove this if the exam has no time limit. */}
          <span className="flex items-center gap-1.5 font-bold tabular-nums text-warning">
            <Clock size={16} /> 24:35 left
          </span>
        </div>
      </div>

      <ol className="mt-8 space-y-10">
        {examQuestions.map((q, index) => (
          <li key={q.id}>
            <fieldset>
              <legend className="text-sm text-muted">
                Question {index + 1} of {examQuestions.length}
              </legend>
              <p className="mt-1 text-lg font-bold text-ink">{q.text}</p>
              <div className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
                {q.answers.map((answer) => (
                  <label
                    key={answer}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm transition hover:bg-page has-checked:bg-accent-soft has-checked:font-semibold has-checked:text-accent-dark"
                  >
                    <input type="radio" name={q.id} className="accent-accent" />
                    {answer}
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex justify-end border-t border-line pt-6">
        {/* TEMP: a link so you can click through. Replace with a real submit action. */}
        <Link to="/exam/c1/result" className="btn btn-primary px-8">Submit exam</Link>
      </div>

      {/* VARIANT: attempt limit reached. Show this instead of the whole exam:
      <div className="py-16 text-center">
        <h2 className="section-title">No attempts left</h2>
        <p className="mt-2 text-muted">You have used all attempts for this exam.</p>
      </div>
      */}
    </div>
  );
}
