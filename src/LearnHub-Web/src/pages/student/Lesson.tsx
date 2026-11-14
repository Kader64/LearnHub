import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Circle,
  Copy,
  Lock,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import { Link, useSearchParams } from "react-router-dom";
import "highlight.js/styles/github-dark.css";
import { courses, lessons } from "../../examples/exampledata";

const course = courses[0];

// Mock data. In the real page these come from the API.
const examPassed = false; // once the exam is passed, lessons can't be un-completed
const lessonMarkdown = [
  "## Declaring variables",
  "",
  "A variable is a named place in memory. In C# every variable has a type that decides which values it can hold.",
  "",
  "```csharp",
  "int age = 25;",
  'string name = "Anna";',
  "bool isStudent = true;",
  "```",
  "",
  "Use `var` when the type is obvious from the right side.",
].join("\n");

/* ---------- Markdown rendering ---------- */

function CodeBlock({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(ref.current?.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context). Nothing to do.
    }
  }

  return (
    <div className="relative">
      <pre
        ref={ref}
        className="overflow-x-auto rounded-xl bg-slate-900 p-5 pr-24 text-sm text-slate-50 shadow-sm [&_code]:bg-transparent! [&_code]:p-0! [&_code]:text-inherit!"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

const markdownComponents: Components = {
  h2: ({ children }) => <h2 className="pt-2 text-xl font-bold text-ink">{children}</h2>,
  h3: ({ children }) => <h3 className="pt-1 text-lg font-bold text-ink">{children}</h3>,
  ul: ({ children }) => <ul className="list-disc space-y-1.5 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1.5 pl-6">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-line-strong pl-4 text-muted">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link underline">
      {children}
    </a>
  ),
  // Inline code. Inside <pre> these styles are reset by CodeBlock.
  code: ({ className, children }) => (
    <code className={`${className ?? ""} rounded bg-line/60 px-1.5 py-0.5 text-sm font-medium text-ink`}>
      {children}
    </code>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
};

/* ---------- Sidebar pieces ---------- */

type ListProps = {
  currentId: string;
  completedIds: Set<string>;
  remaining: number;
  onNavigate?: () => void;
};

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div
        className="progress"
        role="progressbar"
        aria-label="Course progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
      >
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold tabular-nums text-muted">
        {done}/{total}
      </span>
    </div>
  );
}

function LessonList({ currentId, completedIds, remaining, onNavigate }: ListProps) {
  const allDone = remaining === 0;
  const ExamIcon: LucideIcon = allDone ? ClipboardCheck : Lock;

  return (
    <ul className="space-y-0.5">
      {lessons.map((lesson) => {
        const isCurrent = lesson.id === currentId;
        const isDone = completedIds.has(lesson.id);
        return (
          <li key={lesson.id}>
            <Link
              to={{ search: `?lesson=${lesson.id}` }}
              onClick={onNavigate}
              aria-current={isCurrent ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                isCurrent
                  ? "bg-accent-soft font-semibold text-accent-dark"
                  : "text-body hover:bg-line/60 hover:text-ink"
              }`}
            >
              {isDone ? (
                <CheckCircle2 size={17} className="shrink-0 text-success" />
              ) : (
                <Circle
                  size={17}
                  className={`shrink-0 transition-colors ${
                    isCurrent ? "text-accent-dark" : "text-muted group-hover:text-ink"
                  }`}
                />
              )}
              <span>
                {lesson.order}. {lesson.title}
              </span>
            </Link>
          </li>
        );
      })}

      <li>
        {allDone ? (
          <Link
            to={`/exam/${course.id}`}
            className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-semibold text-accent-dark transition-colors hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <ExamIcon size={17} className="shrink-0" />
            Final exam
          </Link>
        ) : (
          <div className="flex items-center gap-3 px-2.5 py-2 text-sm text-muted">
            <ExamIcon size={17} className="shrink-0" />
            <span>
              Final exam
              <span className="ml-2 text-xs">
                {remaining} {remaining === 1 ? "lesson" : "lessons"} left
              </span>
            </span>
          </div>
        )}
      </li>
    </ul>
  );
}

/* ---------- Page ---------- */

export default function Lesson() {
  const [params, setParams] = useSearchParams();
  const [completedIds, setCompletedIds] = useState(
    () => new Set(lessons.filter((l) => l.completed).map((l) => l.id)),
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  // Current lesson: ?lesson=<id>, otherwise the first unfinished one.
  const requestedId = params.get("lesson");
  const fallback = lessons.find((l) => !completedIds.has(l.id)) ?? lessons[0];
  const lesson = lessons.find((l) => l.id === requestedId) ?? fallback;
  const currentId = lesson.id;

  const index = lessons.findIndex((l) => l.id === currentId);
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const isCompleted = completedIds.has(currentId);
  const doneCount = completedIds.size;
  const remaining = lessons.length - doneCount;
  const allDone = remaining === 0;

  // After a lesson change: back to the top, and tell screen readers where they are.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousId = useRef(currentId);
  useEffect(() => {
    if (previousId.current === currentId) return;
    previousId.current = currentId;
    window.scrollTo({ top: 0 });
    headingRef.current?.focus();
  }, [currentId]);

  const goTo = (id: string) => setParams({ lesson: id });

  function complete(andContinue: boolean) {
    setCompletedIds((prevSet) => new Set(prevSet).add(currentId));
    if (andContinue && next) goTo(next.id);
  }

  function undo() {
    setCompletedIds((prevSet) => {
      const copy = new Set(prevSet);
      copy.delete(currentId);
      return copy;
    });
  }

  const listProps: ListProps = { currentId, completedIds, remaining };

  return (
    <>
      <Link to="/my-learning" className="link mb-6 inline-flex items-center gap-1.5 text-sm">
        <ArrowLeft size={16} /> My learning
      </Link>

      <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-10">
        {/* Lesson list: collapsible card on mobile */}
        <details
          open={mobileOpen}
          onToggle={(e) => setMobileOpen(e.currentTarget.open)}
          className="card lg:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-muted">
                Lesson {index + 1} of {lessons.length} · {doneCount} completed
              </span>
              <span className="block truncate font-bold text-ink">{lesson.title}</span>
            </span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-muted transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            />
          </summary>
          <div className="space-y-4 border-t border-line p-3">
            <ProgressBar done={doneCount} total={lessons.length} />
            <LessonList {...listProps} onNavigate={() => setMobileOpen(false)} />
          </div>
        </details>

        {/* Lesson list: sticky sidebar on desktop */}
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <p className="font-bold text-ink">{course.title}</p>
          <div className="mt-3">
            <ProgressBar done={doneCount} total={lessons.length} />
          </div>
          <div className="mt-4 max-h-[calc(100vh-14rem)] overflow-y-auto">
            <LessonList {...listProps} />
          </div>
        </aside>

        {/* Lesson content */}
        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl font-extrabold text-ink focus:outline-none sm:text-4xl"
          >
            {lesson.title}
          </h1>

          {/* Only lessons with a video get a player. Replace the button with the real embed. */}
          {lesson.videoUrl && (
            <button
              type="button"
              aria-label="Play video"
              className="group mt-6 flex aspect-video w-full items-center justify-center rounded-xl bg-slate-900 text-white/80 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
            >
              <PlayCircle size={56} className="transition-transform group-hover:scale-110" />
            </button>
          )}

          {/* Lesson body is Markdown from the API. rehype-sanitize blocks raw HTML from teachers. */}
          <article className="mt-8 space-y-4 leading-relaxed text-body">
            <ReactMarkdown
              rehypePlugins={[rehypeSanitize, rehypeHighlight]}
              components={markdownComponents}
            >
              {lessonMarkdown}
            </ReactMarkdown>
          </article>

          {/* Navigation */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            {prev ? (
              <Link to={{ search: `?lesson=${prev.id}` }} className="btn btn-secondary px-5">
                ← Previous
              </Link>
            ) : (
              <button className="btn btn-secondary px-5" disabled>
                ← Previous
              </button>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {isCompleted ? (
                <>
                  <span className="flex items-center gap-2 text-sm font-semibold text-success">
                    <CheckCircle2 size={18} /> Completed
                  </span>
                  {!examPassed && (
                    <button className="btn btn-ghost btn-sm" onClick={undo}>
                      Undo
                    </button>
                  )}
                </>
              ) : (
                <button className="btn btn-primary px-6" onClick={() => complete(true)}>
                  {next ? "Mark as completed and continue" : "Mark as completed"}
                </button>
              )}

              {next && (
                <Link
                  to={{ search: `?lesson=${next.id}` }}
                  className={`btn px-5 ${isCompleted ? "btn-primary" : "btn-secondary"}`}
                >
                  Next →
                </Link>
              )}
            </div>
          </div>

          {allDone ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-accent-soft p-5">
              <p className="font-semibold text-accent-dark">All lessons completed. The exam is unlocked.</p>
              <Link to={`/exam/${course.id}`} className="btn btn-primary">
                Start the exam
              </Link>
            </div>
          ) : (
            <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-muted sm:justify-start">
              <Lock size={16} />
              Complete {remaining} more {remaining === 1 ? "lesson" : "lessons"} to unlock the final exam.
            </p>
          )}
        </div>
      </div>
    </>
  );
}