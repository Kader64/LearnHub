import { BarChart3, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../examples/exampledata";

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Link
            to={`/courses/${course.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1"
        >
            <div className={`relative h-40 w-full overflow-hidden bg-linear-to-br ${course.gradient}`}>
                <span className="absolute bottom-0 left-0 z-20 rounded-tr-xl bg-white px-4 py-2 text-xs font-bold text-slate-600">
                    {course.category}
                </span>
                <BookOpen className="absolute -bottom-6 -right-4 h-32 w-32 text-white/15 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-extrabold leading-tight text-slate-900 transition-colors">
                    {course.title}
                </h3>
                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {course.description}
                </p>

                <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-500">

                        <div className="flex items-center gap-3.5">
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
            </div>
        </Link>
    );
}