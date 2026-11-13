import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { auditLog } from "../../examples/exampledata";

// EXAMPLE: counts (GET /api/admin/dashboard)
const coursesByStatus = [
  { status: "Published", value: 98 },
  { status: "Draft", value: 27 },
  { status: "Unpublished", value: 12 },
  { status: "Suspended", value: 5 },
];
const usersByRole = [
  { label: "Students", value: 1204 },
  { label: "Teachers", value: 86 },
  { label: "Admins", value: 1 },
];

// "CourseSuspended" -> "Course suspended"
const readable = (action: string) => action.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase()).replace(/ ([A-Z])/g, (m) => m.toLowerCase());

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" description="What is on the platform and what admins did lately." />

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
        <StatCard label="Users" value="1,291" to="/admin/users" />
        <StatCard label="Courses" value="142" to="/admin/courses" />
        <StatCard label="Enrollments" value="5,380" to="/admin/courses" />
        <StatCard label="Certificates issued" value="2,117" to="/admin/certificates" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Latest audit log entries */}
        <section className="lg:col-span-2">
          <div className="flex items-baseline justify-between">
            <h2 className="section-title">Recent activity</h2>
            <Link to="/admin/audit" className="link text-sm">View all</Link>
          </div>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {auditLog.slice(0, 5).map((e) => (
              <li key={e.id} className="flex items-start justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{readable(e.action)}</p>
                  <p className="text-sm text-muted">
                    {e.target}
                    {e.details !== "-" && ` · ${e.details}`}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-muted">{e.time}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Breakdowns */}
        <div className="space-y-10">
          <section>
            <h2 className="section-title">Courses</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {coursesByStatus.map((r) => (
                <li key={r.status} className="flex items-center justify-between py-3">
                  <StatusBadge status={r.status} />
                  <span className="font-semibold tabular-nums text-ink">{r.value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="section-title">Users</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {usersByRole.map((r) => (
                <li key={r.label} className="flex items-center justify-between py-3 text-sm">
                  <span>{r.label}</span>
                  <span className="font-semibold tabular-nums text-ink">{r.value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
