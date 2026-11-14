import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamCancelled from "../../components/exam/ExamCancelled";
import ExamHeader from "../../components/exam/ExamHeader";
import ExamIntro from "../../components/exam/ExamIntro";
import FocusWarningDialog from "../../components/exam/FocusWarningDialog";
import QuestionCard from "../../components/exam/QuestionCard";
import { examSettings } from "../../components/exam/ExamSettings";
import SubmitDialog from "../../components/exam/SubmitDialog";
import { useCountdown } from "../../hooks/useCountdown";
import { useExamGuard } from "../../hooks/useExamGuard";
import { courses, examQuestions } from "../../examples/exampledata";

const course = courses[0];

type Phase = "intro" | "running" | "cancelled";

export default function Exam() {
  const navigate = useNavigate();
  const resultPath = `/exam/${course.id}/result`;
  const { timeLimitMinutes, maxFocusLosses } = examSettings;

  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [expiresAt, setExpiresAt] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showUnanswered, setShowUnanswered] = useState(false);
  const submitted = useRef(false);

  const running = phase === "running";
  const total = examQuestions.length;
  const answered = examQuestions.filter((q) => answers[q.id] !== undefined).length;
  const unanswered = total - answered;

  function start() {
    // TODO API: POST /api/exams/{courseId}/attempts. Starting uses up an attempt.
    setExpiresAt(Date.now() + timeLimitMinutes * 60 * 1000);
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

  const remainingMs = useCountdown(expiresAt, running, submit);
  const guard = useExamGuard(running, maxFocusLosses, () => {
    setConfirmOpen(false);
    setPhase("cancelled");
  });

  if (phase === "intro") {
    return <ExamIntro course={course} questionCount={total} settings={examSettings} onStart={start} />;
  }

  if (phase === "cancelled") {
    return <ExamCancelled maxWarnings={maxFocusLosses} resultPath={resultPath} />;
  }

  return (
    <div className="mx-auto max-w-2xl pb-12">
      <ExamHeader
        courseTitle={course.title}
        answered={answered}
        total={total}
        warnings={guard.warnings}
        maxWarnings={maxFocusLosses}
        remainingMs={remainingMs}
      />

      <ol className="mt-6 space-y-5">
        {examQuestions.map((q, index) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={index}
            total={total}
            selected={answers[q.id]}
            missing={showUnanswered && answers[q.id] === undefined}
            onSelect={(i) => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
          />
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 pt-6 sm:px-6">
        <span className="text-sm text-muted">
          {answered} of {total} answered
        </span>
        <button
          type="button"
          className="btn btn-primary w-full px-6 py-2.5 sm:w-auto"
          onClick={() => setConfirmOpen(true)}
        >
          Submit exam
        </button>
      </div>

      <FocusWarningDialog
        open={guard.warningOpen}
        onClose={guard.dismissWarning}
        count={guard.warnings}
        limit={maxFocusLosses}
      />
      <SubmitDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        total={total}
        unanswered={unanswered}
        onReview={reviewUnanswered}
        onSubmit={submit}
      />
    </div>
  );
}