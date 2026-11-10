import { BarChart3, BookOpen, CheckCircle2, ClipboardCheck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, lessons } from "../../examples/exampledata";

// EXAMPLE: the selected course (GET /api/courses/{id})
const course = courses[0];

export default function CourseDetails() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Link to="/courses" className="text-sm font-semibold text-accent hover:text-accent-dark">
          ← All courses
        </Link>
        <span className="mt-4 block text-sm font-semibold uppercase tracking-wide text-accent">{course.category}</span>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">{course.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{course.description}</p>

        <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-500">
          <span className="flex items-center gap-1.5"><User size={16} />{course.teacher}</span>
          <span className="flex items-center gap-1.5"><BookOpen size={16} />{course.lessons} lessons</span>
          <span className="flex items-center gap-1.5"><BarChart3 size={16} />{course.level}</span>
        </div>

        <h2 className="mt-10 text-xl font-bold text-slate-900">Lessons</h2>
        <ul className="card mt-4 divide-y divide-slate-100">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center gap-4 px-5 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent-dark">
                {lesson.order}
              </span>
              <span className="flex-1 font-semibold text-slate-800">{lesson.title}</span>
              <span className="text-sm text-slate-400">{lesson.duration}</span>
            </li>
          ))}
          <li className="flex items-center gap-4 bg-slate-50 px-5 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <ClipboardCheck size={16} />
            </span>
            <span className="flex-1 font-semibold text-slate-800">Final exam</span>
            <span className="text-sm text-slate-400">Unlocks after all lessons</span>
          </li>
        </ul>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card overflow-hidden">
          <div className={`h-40 bg-linear-to-br ${course.gradient}`} />
          <div className="p-6">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-slate-500">Level</span><span className="font-semibold">{course.level}</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Lessons</span><span className="font-semibold">{course.lessons}</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Pass mark</span><span className="font-semibold">70%</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Attempts</span><span className="font-semibold">Unlimited</span></li>
              <li className="flex justify-between"><span className="text-slate-500">Time limit</span><span className="font-semibold">30 min</span></li>
            </ul>

            {/* VARIANT A (student is NOT enrolled) */}
            <button className="btn btn-primary mt-6 w-full">Enroll in this course</button>

            {/* VARIANT B (student IS enrolled).
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600"><CheckCircle2 size={16} />Enrolled</span>
                <span className="text-slate-500">40% done</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/5 rounded-full bg-accent" />
              </div>
              <Link to="/learn/c1" className="btn btn-primary mt-4 w-full">Continue learning</Link>
            </div>
            */}
          </div>
        </div>
      </aside>
    </div>
  );
}

// Note: CheckCircle2 is only used by variant B. Remove the import if you delete that block.
export { CheckCircle2 as _UnusedIcon };