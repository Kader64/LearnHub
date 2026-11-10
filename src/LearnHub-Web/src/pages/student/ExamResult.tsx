import { PartyPopper } from "lucide-react";
// import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExamResult() {
  // The result shows only: score, pass/fail and the pass mark. No per-question data.
  return (
    <div className="card mx-auto max-w-lg p-10 text-center">
      {/* VARIANT A (passed) */}
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <PartyPopper size={32} />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Congratulations, you passed!</h1>
      <p className="mt-6 text-6xl font-extrabold text-accent">85%</p>
      <p className="mt-2 text-sm text-slate-500">Pass mark: 70%</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/certificates" className="btn btn-primary">View certificate</Link>
        <Link to="/my-learning" className="btn btn-secondary">Back to my learning</Link>
      </div>

      {/* VARIANT B (failed). Replace variant A with this:
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
        <XCircle size={32} />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-slate-900">Not passed this time</h1>
      <p className="mt-6 text-6xl font-extrabold text-red-500">55%</p>
      <p className="mt-2 text-sm text-slate-500">Pass mark: 70%</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/exam/c1" className="btn btn-primary">Try again</Link>
        // If the attempt limit is reached, replace the button above with: <p className="text-sm font-semibold text-slate-500">No attempts left</p>
        <Link to="/my-learning" className="btn btn-secondary">Back to my learning</Link>
      </div>
      */}
    </div>
  );
}