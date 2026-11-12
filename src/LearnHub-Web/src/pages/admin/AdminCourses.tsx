import { Eye, RotateCcw, Search, ShieldOff } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { courses } from "../../examples/exampledata";

export default function AdminCourses() {
  return (
    <>
      <PageHeader title="Courses" description="All courses in any status. Content is read-only for admins." />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" size={18} />
          <input className="input pl-10" placeholder="Search courses..." />
        </div>
        <select className="input sm:w-44"><option>All statuses</option><option>Draft</option><option>Published</option><option>Unpublished</option><option>Suspended</option></select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="table-head">
            <tr>
              <th className="th">Course</th>
              <th className="th">Teacher</th>
              <th className="th">Status</th>
              <th className="th">Students</th>
              <th className="th" />
            </tr>
          </thead>
          <tbody className="table-body">
            {courses.map((c) => (
              <tr key={c.id}>
                <td className="td">
                  <p className="font-semibold text-ink">{c.title}</p>
                  <p className="text-xs text-muted">{c.category}</p>
                </td>
                <td className="td">{c.teacher}</td>
                <td className="td"><StatusBadge status={c.status} /></td>
                <td className="td">{c.students}</td>
                <td className="td">
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-secondary btn-sm"><Eye size={14} /> View</button>
                    {c.status === "Suspended" ? (
                      <button className="btn btn-secondary btn-sm text-success"><RotateCcw size={14} /> Restore</button>
                    ) : (
                      <button className="btn btn-secondary btn-sm text-danger"><ShieldOff size={14} /> Suspend</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suspend dialog (a reason is required and shown to the teacher):
      <div className="card mt-6 max-w-lg p-6">
        <h2 className="font-bold text-ink">Suspend course</h2>
        <label className="label mt-4">Reason</label>
        <textarea className="input min-h-24" />
        <button className="btn btn-danger mt-4">Suspend</button>
      </div>
      */}
    </>
  );
}
