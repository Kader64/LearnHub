import { AlertTriangle, Clock, XCircle } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { courses, examQuestions } from "../../examples/exampledata";

const course = courses[0];

// Mock exam settings. In the real page these come from the API.
const attemptNumber = 2;
const maxAttempts: number | null = null; // null = unlimited
const passMarkPercent = 70;
const timeLimitMinutes = 25;
const MAX_FOCUS_LOSSES = 3; // leaving the page this many times cancels the exam

type Phase = "intro" | "running" | "cancelled";

/* ---------- Small modal built on the native <dialog> ---------- */

function Modal({
  open,
  onClose,
  title,
  icon,
  children,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  actions: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[min(28rem,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-6 shadow-xl backdrop:bg-ink/40"
    >
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <div className="mt-2 space-y-2 text-sm text-body">{children}</div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-end gap-3">{actions}</div>
    </dialog>
  );
}

function formatTime(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

/* ---------- Page ---------- */

export default function Exam() {
  const navigate = useNavigate();
  const resultPath = `/exam/${course.id}/result`;

  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [expiresAt, setExpiresAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [focusLosses, setFocusLosses] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showUnanswered, setShowUnanswered] = useState(false);
  const submitted = useRef(false);

  const total = examQuestions.length;
  const answeredCount = examQuestions.filter((q) => answers[q.id] !== undefined).length;
  const unanswered = total - answeredCount;
  const remainingMs = Math.max(0, expiresAt - now);

  function start() {
    // TODO API: POST /api/exams/{courseId}/attempts. Starting uses up an attempt.
    const startedAt = Date.now();
    setNow(startedAt);
    setExpiresAt(startedAt + timeLimitMinutes * 60 * 1000);
    setPhase("running");
  }

  function submit() {
    if (submitted.current) return;
    submitted.current = true;
    // TODO API: POST /api/attempts/{id}/submit
    navigate(resultPath);
  }

  function reviewUnanswered() {
    setConfirmOpen(false);
    setShowUnanswered(true);
    const first = examQuestions.find((q) => answers[q.id] === undefined);
    if (first) document.getElementById(`question-${first.id}`)?.scrollIntoView({ block: "center" });
  }

  // Timer tick
  useEffect(() => {
    if (phase !== "running") return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Time is up: submit automatically
  useEffect(() => {
    if (phase === "running" && remainingMs === 0) submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, remainingMs]);

  // Detect leaving the page (switching tab or window). A leave counts once,
  // until the student comes back.
  useEffect(() => {
    if (phase !== "running") return;
    let away = false;

    const leave = () => {
      if (away) return;
      away = true;
      setFocusLosses((n) => n + 1);
      setWarningOpen(true);
      // TODO API: POST /api/attempts/{id}/focus-loss. The server counts it and
      // cancels the attempt at the limit. The client only shows the result.
    };
    const back = () => {
      away = false;
    };
    const onVisibility = () => (document.hidden ? leave() : back());

    window.addEventListener("blur", leave);
    window.addEventListener("focus", back);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("blur", leave);
      window.removeEventListener("focus", back);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [phase]);

  // Limit reached: cancel the exam, it counts as failed
  useEffect(() => {
    if (phase === "running" && focusLosses >= MAX_FOCUS_LOSSES) {
      setWarningOpen(false);
      setConfirmOpen(false);
      setPhase("cancelled");
    }
  }, [focusLosses, phase]);

  // Ask before closing or reloading the tab during the exam
  useEffect(() => {
    if (phase !== "running") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  /* ----- Start screen ----- */
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-xl pb-12">
        <div className="card p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold text-ink">Final exam</h1>
          <p className="mt-1 text-muted">{course.title}</p>

          <ul className="mt-6 space-y-2 text-body">
            <li>{total} questions, one correct answer each</li>
            <li>Time limit: {timeLimitMinutes} minutes</li>
            <li>Pass mark: {passMarkPercent}%</li>
            <li>
              Attempt {attemptNumber}
              {maxAttempts ? ` of ${maxAttempts}` : " (unlimited attempts)"}
            </li>
          </ul>

          <div className="mt-6 flex items-start gap-3 rounded-lg border border-warning/20 bg-warning-soft px-4 py-3 text-sm text-warning">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <p>
              Stay on this page during the exam. If you leave it {MAX_FOCUS_LOSSES} times (for example by switching
              tabs or windows), the exam is cancelled and counts as failed.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-primary px-6" onClick={start}>
              Start exam
            </button>
            <Link to="/my-learning" className="btn btn-secondary px-6">
              Not now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ----- Cancelled screen ----- */
  if (phase === "cancelled") {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <XCircle size={40} className="mx-auto text-danger" />
        <h1 className="section-title mt-4">Exam cancelled</h1>
        <p className="mt-2 text-sm text-body">
          You left the exam page {MAX_FOCUS_LOSSES} times. This attempt counts as failed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to={resultPath} state={{ cancelled: true }} className="btn btn-primary">
            See result
          </Link>
          <Link to="/my-learning" className="btn btn-secondary">
            My learning
          </Link>
        </div>
      </div>
    );
  }

  /* ----- Exam ----- */
  const timeLow = remainingMs < 5 * 60 * 1000;

  return (
    <div className="mx-auto max-w-2xl pb-12">
      {/* top-16 assumes the navbar height. Adjust it to match AppLayout. */}
      <div className="sticky top-16 z-10 flex items-center justify-between gap-3 border-b border-line bg-page/95 px-5 py-4 backdrop-blur sm:px-6">
        <div className="min-w-0">
          <h1 className="text-lg font-extrabold text-ink sm:text-xl">Final exam</h1>
          <p className="hidden truncate text-sm text-muted sm:block">{course.title}</p>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-xs sm:text-sm">
          {focusLosses > 0 && (
            <span className="font-semibold text-warning">
              Warnings {focusLosses}/{MAX_FOCUS_LOSSES}
            </span>
          )}
          <span className="tabular-nums text-muted">
            {answeredCount}/{total} answered
          </span>
          <span
            role="timer"
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-bold tabular-nums ${
              timeLow ? "bg-danger-soft text-danger" : "bg-warning/10 text-warning"
            }`}
          >
            <Clock size={14} /> {formatTime(remainingMs)} left
          </span>
        </div>
      </div>

      <ol className="mt-6 space-y-5">
        {examQuestions.map((q, index) => {
          const missing = showUnanswered && answers[q.id] === undefined;
          return (
            <li
              key={q.id}
              id={`question-${q.id}`}
              className={`rounded-2xl border bg-white p-5 sm:p-6 ${missing ? "border-danger" : "border-line"}`}
            >
              <fieldset>
                <legend className="w-full">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                    Question {index + 1} of {total}
                  </span>
                  <span className="mt-1.5 block text-base font-bold leading-snug text-ink sm:text-lg">{q.text}</span>
                </legend>

                <div className="mt-4 space-y-2.5">
                  {q.answers.map((answer, i) => (
                    <label
                      key={`${q.id}-${i}`}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm transition-colors hover:bg-page has-checked:border-accent has-checked:bg-accent-soft has-checked:font-semibold has-checked:text-accent-dark has-focus-visible:ring-2 has-focus-visible:ring-accent/40"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={i}
                        checked={answers[q.id] === i}
                        onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                        className="h-4 w-4 shrink-0 accent-accent"
                      />
                      <span>{answer}</span>
                    </label>
                  ))}
                </div>
                {missing && <p className="mt-3 text-sm font-semibold text-danger">Choose an answer.</p>}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 pt-6 sm:px-6">
        <span className="text-sm text-muted">
          {answeredCount} of {total} answered
        </span>
        <button
          type="button"
          className="btn btn-primary w-full px-6 py-2.5 sm:w-auto"
          onClick={() => setConfirmOpen(true)}
        >
          Submit exam
        </button>
      </div>

      {/* Left the page: warning */}
      <Modal
        open={warningOpen && focusLosses < MAX_FOCUS_LOSSES}
        onClose={() => setWarningOpen(false)}
        title="You left the exam page"
        icon={<AlertTriangle size={22} className="mt-0.5 shrink-0 text-warning" />}
        actions={
          <button className="btn btn-primary" onClick={() => setWarningOpen(false)}>
            Back to the exam
          </button>
        }
      >
        <p>
          Warning {focusLosses} of {MAX_FOCUS_LOSSES}. If you leave the page {MAX_FOCUS_LOSSES} times, the exam is
          cancelled and counts as failed.
        </p>
        <p className="font-semibold text-ink">
          {MAX_FOCUS_LOSSES - focusLosses} {MAX_FOCUS_LOSSES - focusLosses === 1 ? "warning" : "warnings"} left.
        </p>
      </Modal>

      {/* Submit confirmation */}
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Submit your exam?"
        actions={
          unanswered > 0 ? (
            <>
              <button className="btn btn-secondary" onClick={reviewUnanswered}>
                Review unanswered
              </button>
              <button className="btn btn-primary" onClick={submit}>
                Submit anyway
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={() => setConfirmOpen(false)}>
                Keep working
              </button>
              <button className="btn btn-primary" onClick={submit}>
                Submit exam
              </button>
            </>
          )
        }
      >
        {unanswered > 0 ? (
          <p>
            {unanswered} of {total} questions have no answer. Unanswered questions count as wrong.
          </p>
        ) : (
          <p>You answered all {total} questions. You can't change your answers after submitting.</p>
        )}
      </Modal>
    </div>
  );
}