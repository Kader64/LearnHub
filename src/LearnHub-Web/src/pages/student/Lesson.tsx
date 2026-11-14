import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ExamUnlock from "../../components/lesson/ExamUnlock";
import LessonMarkdown from "../../components/lesson/LessonMarkdown";
import LessonNavigation from "../../components/lesson/LessonNavigation";
import LessonSidebar from "../../components/lesson/LessonSidebar";
import LessonVideo from "../../components/lesson/LessonVideo";
import MobileLessonMenu from "../../components/lesson/MobileLessonMenu";
import { courses, lessons } from "../../examples/exampledata";
import { useFocusOnChange } from "../../hooks/useFocusOnChange";
import { useLessonProgress } from "../../hooks/useLessonProgress";

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

export default function Lesson() {
  const [params] = useSearchParams();
  const { completedIds, remaining, allDone, complete, undo } = useLessonProgress(lessons);

  // Without ?lesson=<id> the page opens the first unfinished lesson. It's decided once,
  // so completing a lesson doesn't silently switch the page to the next one.
  const [defaultId] = useState(() => (lessons.find((l) => !completedIds.has(l.id)) ?? lessons[0]).id);
  const lesson = lessons.find((l) => l.id === (params.get("lesson") ?? defaultId)) ?? lessons[0];

  const index = lessons.indexOf(lesson);
  const headingRef = useFocusOnChange<HTMLHeadingElement>(lesson.id);

  const examPath = `/exam/${course.id}`;
  const listProps = { lessons, currentId: lesson.id, completedIds, remaining, examPath };

  return (
    <>
      <Link to="/my-learning" className="link mb-6 inline-flex items-center gap-1.5 text-sm">
        <ArrowLeft size={16} /> My learning
      </Link>

      <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-10">
        <MobileLessonMenu {...listProps} />
        <LessonSidebar courseTitle={course.title} {...listProps} />

        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl font-extrabold text-ink focus:outline-none sm:text-4xl"
          >
            {lesson.title}
          </h1>

          {/* Only lessons with a video get a player */}
          {lesson.videoUrl && <LessonVideo />}

          <LessonMarkdown>{lessonMarkdown}</LessonMarkdown>

          <LessonNavigation
            prev={lessons[index - 1]}
            next={lessons[index + 1]}
            isCompleted={completedIds.has(lesson.id)}
            canUndo={!examPassed}
            onComplete={() => complete(lesson.id)}
            onUndo={() => undo(lesson.id)}
          />

          <ExamUnlock remaining={remaining} examPath={examPath} />
        </div>
      </div>
    </>
  );
}