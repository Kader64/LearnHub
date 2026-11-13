import { BookOpen, ClipboardCheck, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { courses } from "../../examples/exampledata";

const enrollments = [
  { course: courses[0], progress: 40 },
  { course: courses[1], progress: 100 },
  { course: courses[2], progress: 0 },
];

export default function MyLearning() {
  return (
    <>
      <PageHeader title="My learning" description="Courses you are enrolled in and your progress." />

      <div className="mt-6 grid gap-5">
        {enrollments.map(({ course, progress }) => (
          <div 
            key={course.id} 
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 sm:flex-row"
          >
            <div className={`relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56 bg-linear-to-br ${course.gradient}`}>
              <BookOpen className="absolute -bottom-6 -right-4 h-32 w-32 text-white/15 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
            </div>

            <div className="flex flex-1 flex-col p-5 sm:flex-row sm:items-center sm:p-6">
              
              <div className="flex min-w-0 flex-1 flex-col">
                <Link to={`/courses/${course.id}`} className="truncate text-lg font-bold text-slate-900 transition-colors hover:text-slate-700">
                  {course.title}
                </Link>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  By {course.teacher} · {course.lessons} lessons
                </p>
                
                <div className="mt-5 flex items-center gap-4">
                  <div className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-slate-100">
                    <div 
                      className="h-full rounded-full bg-slate-800 transition-all duration-500" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-semibold tabular-nums text-slate-600">
                    {progress}%
                  </span>
                </div>
              </div>

              <div className="mt-5 sm:ml-6 sm:mt-0 sm:shrink-0">
                {progress === 100 ? (
                  <Link to={`/exam/${course.id}`} className="btn btn-primary flex w-full items-center justify-center gap-2 py-2.5 sm:w-44">
                    <ClipboardCheck size={18} />
                    Take the exam
                  </Link>
                ) : (
                  <Link to={`/learn/${course.id}`} className="btn btn-primary flex w-full items-center justify-center gap-2 py-2.5 sm:w-44">
                    <PlayCircle size={18} />
                    {progress === 0 ? "Start course" : "Continue"}
                  </Link>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}