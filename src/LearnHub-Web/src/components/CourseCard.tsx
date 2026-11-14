import { BarChart3, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../examples/exampledata";
import CourseCover from "./CourseCover";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <CourseCover cover={course} className="h-40">
        <span className="absolute bottom-0 left-0 z-20 rounded-tr-xl bg-white px-4 py-2 text-xs font-bold text-slate-700">
          {course.category}
        </span>
      </CourseCover>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-tight text-slate-900 transition-colors">
          {course.title}
        </h3>

        <p className="mt-1 text-xs font-medium text-slate-500">
          By {course.teacher}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {course.description}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex w-full items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <BarChart3 size={15} className="text-slate-400" />
              {course.level}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={15} className="text-slate-400" />
              {course.lessons} lessons
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}