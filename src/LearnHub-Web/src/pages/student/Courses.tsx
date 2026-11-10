import { Search } from "lucide-react";
import CourseCard from "../../components/CourseCard";
import PageHeader from "../../components/PageHeader";
import { categories, courses } from "../../examples/exampledata";

export default function Courses() {
  // Students only see Published courses.
  const visible = courses.filter((c) => c.status === "Published");

  return (
    <>
      <PageHeader
        title="Browse courses"
        description="Pick a course, finish the lessons and pass the exam to earn your certificate."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="input pl-10" placeholder="Search courses..." />
        </div>
        <select className="input sm:w-48 font-sans" >
          <option>All levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {["All", ...categories.map((c) => c.name)].map((name, i) => (
          <button
            key={name}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              i === 0 ? "bg-accent text-white" : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination (API returns page, pageSize, totalCount) */}
      <div className="mt-10 flex items-center justify-center gap-2">
        <button className="btn btn-secondary" disabled>Previous</button>
        <span className="px-3 text-sm text-slate-500">Page 1 of 1</span>
        <button className="btn btn-secondary" disabled>Next</button>
      </div>
    </>
  );
}