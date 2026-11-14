import { ClipboardCheck, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, lessons } from "../../examples/exampledata";

const course = courses[0];

export default function CourseDetails() {
  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="text-sm font-medium text-slate-500">
          <Link
            to="/courses"
            className="transition-colors hover:text-slate-900"
          >
            Courses
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{course.category}</span>
        </p>

        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {course.description}
        </p>

        <p className="mt-5 flex items-center gap-2 text-sm text-slate-500">
          Created by{" "}
          <span className="font-semibold text-slate-900">{course.teacher}</span>
          <span>·</span>
          {course.level}
          <span>·</span>
          {course.lessons} lessons
        </p>

        <h2 className="mt-12 text-xl font-bold text-slate-900">
          Course Content
        </h2>

        {/* Adjusted dividers: divide-slate-200 and border-slate-200 create clean, visible lines between items */}
        <ol className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="group flex items-center gap-4 py-4 transition-colors hover:bg-slate-50"
            >
              <span className="w-6 text-sm font-medium tabular-nums text-slate-400">
                {lesson.order}
              </span>

              <span className="flex-1 font-medium text-slate-800">
                {lesson.title}
              </span>
              <span className="text-xs font-medium text-slate-500">10 min</span>
            </li>
          ))}

          {/* Final exam row naturally inherits the top divider from the divide-y utility */}
          <li className="flex items-center gap-4 py-4">
            <span className="w-6" />
            <ClipboardCheck size={16} className="text-slate-400" />
            <span className="flex-1 font-bold text-slate-900">Final exam</span>
            <span className="text-xs font-medium text-slate-500">
              Unlocks after all lessons
            </span>
          </li>
        </ol>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Final exam</h2>
          <dl className="mt-4 divide-y divide-slate-100 text-sm">
            <div className="flex justify-between py-3">
              <dt className="text-slate-500">Pass mark</dt>
              <dd className="font-semibold text-slate-900">70%</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-slate-500">Attempts</dt>
              <dd className="font-semibold text-slate-900">Unlimited</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-slate-500">Time limit</dt>
              <dd className="font-semibold text-slate-900">30 min</dd>
            </div>
          </dl>

          {/* VARIANT A (student is NOT enrolled) */}
          <button className="btn btn-primary mt-6 w-full py-2.5 text-center font-semibold">
            Enroll in this course
          </button>

          {/* VARIANT B (student IS enrolled). Replace variant A with this:
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-success">Enrolled</span>
              <span className="text-slate-500">40% done</span>
            </div>
            <div className="progress"><div className="progress-bar w-2/5" /></div>
            <Link to="/learn/c1" className="btn btn-primary mt-4 block w-full py-2.5 text-center font-semibold">Continue learning</Link>
          </div>
          */}
        </div>
      </aside>
    </div>
  );
}
