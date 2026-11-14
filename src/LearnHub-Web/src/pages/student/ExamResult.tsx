import { Link } from "react-router-dom";

export default function ExamResult() {

  return (
    <div className="mx-auto max-w-md py-20 text-center">
      {/* VARIANT A (passed) */}
      <p className="text-sm font-bold uppercase tracking-wide text-success">Passed</p>
      <p className="mt-2 text-7xl font-extrabold tracking-tight text-ink">85%</p>
      <p className="mt-3 text-muted">Pass mark is 70%. Well done.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/certificates" className="btn btn-primary">View certificate</Link>
        <Link to="/my-learning" className="btn btn-secondary">Back to my learning</Link>
      </div>

      {/* VARIANT B (failed).
      <p className="text-sm font-bold uppercase tracking-wide text-danger">Not passed</p>
      <p className="mt-2 text-7xl font-extrabold tracking-tight text-ink">55%</p>
      <p className="mt-3 text-muted">Pass mark is 70%.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/exam/c1" className="btn btn-primary">Try again</Link>
        // If the attempt limit is reached, replace the button above with: <p className="text-sm font-semibold text-muted">No attempts left</p>
        <Link to="/my-learning" className="btn btn-secondary">Back to my learning</Link>
      </div>
      */}
    </div>
  );
}
