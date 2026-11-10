import { ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { courses, lessons } from "../../examples/exampledata";

// EXAMPLE: the selected course (GET /api/courses/{id})
const course = courses[0];

export default function CourseDetails() {
  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="text-sm text-muted">
          <Link to="/courses" className="link">Courses</Link>
          <span className="mx-2">/</span>
          {course.category}
        </p>

        <h1 className="page-title mt-4">{course.title}</h1>
        <p className="mt-3 text-lg text-body">{course.description}</p>
        <p className="mt-4 text-sm text-muted">
          Created by <span className="font-semibold text-ink">{course.teacher}</span>
          <span className="mx-2">·</span>
          {course.level}
          <span className="mx-2">·</span>
          {course.lessons} lessons
        </p>

        <h2 className="section-title mt-10">Lessons</h2>
        <ol className="mt-3 divide-y divide-line border-y border-line">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center gap-4 py-3.5">
              <span className="w-6 text-sm tabular-nums text-muted">{lesson.order}</span>
              <span className="font-semibold text-ink">{lesson.title}</span>
            </li>
          ))}
          <li className="flex items-center gap-4 py-3.5">
            <ClipboardCheck size={18} className="w-6 text-muted" />
            <span className="flex-1 font-semibold text-ink">Final exam</span>
            <span className="text-sm text-muted">Unlocks after all lessons</span>
          </li>
        </ol>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-5">
          <h2 className="font-bold text-ink">Final exam</h2>
          <dl className="mt-3 divide-y divide-line text-sm">
            <div className="flex justify-between py-2.5"><dt className="text-muted">Pass mark</dt><dd className="font-semibold text-ink">70%</dd></div>
            <div className="flex justify-between py-2.5"><dt className="text-muted">Attempts</dt><dd className="font-semibold text-ink">Unlimited</dd></div>
            <div className="flex justify-between py-2.5"><dt className="text-muted">Time limit</dt><dd className="font-semibold text-ink">30 min</dd></div>
          </dl>

          {/* VARIANT A (student is NOT enrolled) */}
          <button className="btn btn-primary mt-4 w-full">Enroll in this course</button>

          {/* VARIANT B (student IS enrolled). Replace variant A with this:
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-success">Enrolled</span>
              <span className="text-muted">40% done</span>
            </div>
            <div className="progress"><div className="progress-bar w-2/5" /></div>
            <Link to="/learn/c1" className="btn btn-primary mt-4 w-full">Continue learning</Link>
          </div>
          */}
        </div>
      </aside>
    </div>
  );
}
