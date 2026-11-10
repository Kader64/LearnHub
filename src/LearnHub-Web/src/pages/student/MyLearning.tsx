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

      <div className="space-y-4">
        {enrollments.map(({ course, progress }) => (
          <div key={course.id} className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
            <div className={`h-20 w-full rounded-lg bg-linear-to-br sm:w-32 ${course.gradient}`} />
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{course.title}</h3>
              <p className="text-sm text-slate-500">{course.teacher}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-semibold text-slate-600">{progress}%</span>
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
          </div>
        ))}
      </div>
    </>
  );
}