import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";

// EXAMPLE: counts (GET /api/admin/dashboard)
const usersByRole = [
  { label: "Students", value: 1204, width: "w-full" },
  { label: "Teachers", value: 86, width: "w-[8%]" },
  { label: "Admins", value: 1, width: "w-[1%]" },
];
const coursesByStatus = [
  { label: "Published", value: 98, width: "w-[70%]" },
  { label: "Draft", value: 27, width: "w-[20%]" },
  { label: "Unpublished", value: 12, width: "w-[9%]" },
  { label: "Suspended", value: 5, width: "w-[4%]" },
];

function Bars({ title, rows }: { title: string; rows: { label: string; value: number; width: string }[] }) {
  return (
    <section>
      <h2 className="font-bold text-ink">{title}</h2>
      <ul className="mt-4 space-y-4">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span>{r.label}</span>
              <span className="font-semibold tabular-nums text-ink">{r.value}</span>
            </div>
            <div className="progress">
              <div className={`progress-bar ${r.width}`} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" description="A quick overview of the platform." />

      <div className="card grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
        <StatCard label="Users" value="1,291" />
        <StatCard label="Courses" value="142" />
        <StatCard label="Enrollments" value="5,380" />
        <StatCard label="Certificates issued" value="2,117" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Bars title="Users by role" rows={usersByRole} />
        <Bars title="Courses by status" rows={coursesByStatus} />
      </div>
    </>
  );
}
