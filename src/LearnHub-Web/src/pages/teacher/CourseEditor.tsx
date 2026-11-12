import { ArrowDown, ArrowUp, CheckCircle2, Pencil, Plus, Trash2, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { categories, lessons } from "../../examples/exampledata";

const checklist = [
  { label: "At least one lesson", ok: true },
  { label: "Exam has at least one question", ok: true },
  { label: "Every question has 2-6 answers and exactly one correct", ok: false },
];

export default function CourseEditor() {
  const { id } = useParams();
  const isNew = id === undefined;
  const courseId = id ?? "new";

  return (
    <>
      <PageHeader title={isNew ? "New course" : "Edit course"} description="Course details, lessons and exam." />

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="divide-y divide-line lg:col-span-2">
          {/* Details */}
          <section className="space-y-5 pb-8">
            <h2 className="section-title">Details</h2>
            <div>
              <label className="label">Title</label>
              <input className="input" defaultValue={isNew ? "" : "Introduction to C# and .NET"} />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input min-h-28" defaultValue={isNew ? "" : "Learn the fundamentals of C# and .NET."} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label">Category</label>
                <select className="input">
                  {categories.map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Level</label>
                <select className="input">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Thumbnail URL (optional)</label>
              <input className="input" placeholder="https://..." />
            </div>
          </section>

          {/* Lessons */}
          <section className="py-8">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Lessons</h2>
              <Link to={`/teach/courses/${courseId}/lessons/new`} className="btn btn-secondary btn-sm">
                <Plus size={14} /> Add lesson
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center gap-3 py-2.5">
                  <span className="w-6 text-sm tabular-nums text-muted">{lesson.order}</span>
                  <span className="flex-1 text-sm font-semibold text-ink">{lesson.title}</span>
                  <button className="icon-btn" title="Move up"><ArrowUp size={16} /></button>
                  <button className="icon-btn" title="Move down"><ArrowDown size={16} /></button>
                  <Link to={`/teach/courses/${courseId}/lessons/${lesson.id}`} className="icon-btn" title="Edit">
                    <Pencil size={16} />
                  </Link>
                  <button className="icon-btn icon-btn-danger" title="Delete"><Trash2 size={16} /></button>
                </li>
              ))}
            </ul>
          </section>

          {/* Exam */}
          <section className="flex flex-wrap items-center justify-between gap-4 pt-8">
            <div>
              <h2 className="section-title">Final exam</h2>
              <p className="mt-1 text-sm text-muted">3 questions · pass mark 70% · unlimited attempts</p>
            </div>
            <Link to={`/teach/courses/${courseId}/exam`} className="btn btn-secondary">Edit exam</Link>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-ink">Status</h2>
              <StatusBadge status="Draft" />
            </div>

            <ul className="mt-4 space-y-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5 text-sm">
                  {item.ok ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                  ) : (
                    <XCircle size={18} className="mt-0.5 shrink-0 text-danger" />
                  )}
                  <span className="text-body">{item.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <button className="btn btn-secondary w-full">Save changes</button>
              {/* VARIANT A (Draft or Unpublished). Disabled while the checklist is not fully green. */}
              <button className="btn btn-primary w-full" disabled>Publish course</button>
              {/* VARIANT B (Published). Replace variant A with this:
              <button className="btn btn-secondary w-full">Unpublish course</button>
              */}
            </div>
          </section>

          {/* VARIANT (Suspended by an admin: the course is read-only). Uncomment to preview:
          <div className="alert-danger">
            <p className="font-bold">Suspended by an admin</p>
            <p className="mt-1">Reason: copied content.</p>
          </div>
          */}
        </aside>
      </div>
    </>
  );
}
