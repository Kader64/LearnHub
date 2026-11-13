import { ClipboardCheck, PlayCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, lessons } from "../../examples/exampledata";

const course = courses[0];

export default function CourseDetails() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-medium text-slate-500">
        <Link to="/courses" className="transition-colors hover:text-slate-900">
          Courses
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{course.category}</span>
      </p>

      <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl sm:leading-tight">
        {course.title}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-slate-600">
        {course.description}
      </p>

      <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        Created by{" "}
        <span className="font-semibold text-slate-900">{course.teacher}</span>
        <span className="hidden sm:inline">·</span>
        <span className="block w-full sm:inline sm:w-auto">{course.level}</span>
        <span className="hidden sm:inline">·</span>
        <span className="block w-full sm:inline sm:w-auto">
          {course.lessons} lessons
        </span>
      </p>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Course Content</h2>

      <ol className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="group flex items-center gap-4 py-4 transition-colors hover:bg-slate-50"
          >
            <span className="w-6 text-sm font-medium tabular-nums text-slate-400">
              {lesson.order}
            </span>
            <PlayCircle
              size={16}
              className="text-slate-400 group-hover:text-slate-600"
            />
            <span className="flex-1 font-medium text-slate-800">
              {lesson.title}
            </span>
            <span className="text-xs font-medium text-slate-500">10 min</span>
          </li>
        ))}

        <li className="flex items-center gap-4 py-4 bg-slate-50/50">
          <span className="w-6" />
          <ClipboardCheck size={16} className="text-slate-400" />
          <span className="flex-1 font-bold text-slate-900">Final exam</span>
          <span className="text-xs font-medium text-slate-500">
            Unlocks after all lessons
          </span>
        </li>
      </ol>

      <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Info size={20} className="text-slate-400" />
          <div>
            <h3 className="font-semibold text-slate-900">Exam requirements</h3>
            <p className="text-sm text-slate-500">
              Pass mark is 70%. Unlimited attempts.
            </p>
          </div>
        </div>
        <div className="text-sm font-semibold text-slate-700">
          Time limit: 30 min
        </div>
      </div>

      {/* NEW CTA LOCATION: Top Hero Area */}
      <div className="mt-8 pb-10 flex justify-center">
        {/* VARIANT A (student is NOT enrolled) */}
        <button className="btn btn-primary w-full py-3 text-base font-semibold sm:w-auto sm:px-8">
          Enroll in this course
        </button>

        {/* VARIANT B (student IS enrolled). Replace variant A with this:
        <div className="max-w-md">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-semibold text-success">Enrolled</span>
            <span className="text-slate-500">40% done</span>
          </div>
          <div className="progress"><div className="progress-bar w-2/5" /></div>
          <Link to="/learn/c1" className="btn btn-primary mt-5 inline-flex w-full justify-center py-3 text-base font-semibold sm:w-auto sm:px-8">
            Continue learning
          </Link>
        </div>
        */}
      </div>

      {/* Moved Exam Details inline at the bottom */}
    </div>
  );
}
