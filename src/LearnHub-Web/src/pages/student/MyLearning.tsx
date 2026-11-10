import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { courses } from "../../examples/exampledata";

// EXAMPLE: the student's enrollments with progress (GET /api/enrollments)
const enrollments = [
  { course: courses[0], progress: 40 },
  { course: courses[1], progress: 100 },
  { course: courses[2], progress: 0 },
];

export default function MyLearning() {
  return (
    <>
      <PageHeader title="My learning" description="Courses you are enrolled in and your progress." />

      <ul className="divide-y divide-line border-y border-line">
        {enrollments.map(({ course, progress }) => (
          <li key={course.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="min-w-0 flex-1">
              <Link to={`/courses/${course.id}`} className="font-bold text-ink hover:text-accent">
                {course.title}
              </Link>
              <p className="text-sm text-muted">
                {course.teacher} · {course.lessons} lessons
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-semibold tabular-nums text-muted">{progress}%</span>
              </div>
            </div>

            {/* All lessons completed unlocks the exam */}
            {progress === 100 ? (
              <Link to={`/exam/${course.id}`} className="btn btn-primary">Take the exam</Link>
            ) : (
              <Link to={`/learn/${course.id}`} className="btn btn-secondary">
                {progress === 0 ? "Start course" : "Continue"}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
