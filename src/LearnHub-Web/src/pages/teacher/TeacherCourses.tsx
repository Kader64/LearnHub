import { Pencil, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { courses } from "../../examples/exampledata";

export default function TeacherCourses() {
  // EXAMPLE: in the app this shows only the courses owned by the logged-in teacher.
  return (
    <>
      <PageHeader
        title="My courses"
        description="Create, edit and publish your courses."
        actions={
          <Link to="/teach/courses/new" className="btn btn-primary">
            <Plus size={16} /> New course
          </Link>
        }
      />

      {/* BACKEND-DEPENDENT: show only when at least one course is suspended by an admin */}
      <p className="alert-danger mb-6">
        <strong>UX Design Basics</strong> was suspended by an admin. Reason: copied content.
      </p>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="table-head">
            <tr>
              <th className="th">Course</th>
              <th className="th">Status</th>
              <th className="th">Lessons</th>
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
                <td className="td"><StatusBadge status={c.status} /></td>
                <td className="td">{c.lessons}</td>
                <td className="td">{c.students}</td>
                <td className="td text-right">
                  <Link to={`/teach/courses/${c.id}`} className="btn btn-secondary btn-sm">
                    <Pencil size={14} /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
