import { Search } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { auditLog } from "../../examples/exampledata";

export default function AuditLog() {
  return (
    <>
      <PageHeader title="Audit log" description="Every admin action is recorded. The log is append-only." />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" size={18} />
          <input className="input pl-10" placeholder="Search target or details..." />
        </div>
        <select className="input sm:w-40">
          <option>All actions</option>
          <option>Course:Suspend</option>
          <option>Course:Restore</option>
          <option>User:Disable</option>
          <option>Cert:Revoke</option>
        </select>
        <select className="input sm:w-40">
          <option>All actors</option>
          {/* Add actor options here or map dynamically */}
        </select>
        <select className="input sm:w-40">
          <option>Any time</option>
          <option>Last 24 hours</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-190">
          <thead className="table-head">
            <tr>
              <th className="th">Time</th>
              <th className="th">Actor</th>
              <th className="th">Action</th>
              <th className="th">Target</th>
              <th className="th">Details</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {auditLog.map((e) => (
              <tr key={e.id}>
                <td className="td whitespace-nowrap text-muted">{e.time}</td>
                <td className="td">{e.actor}</td>
                <td className="td">
                  <span className="rounded bg-line px-2 py-0.5 font-mono text-xs font-semibold text-body">
                    {e.action}
                  </span>
                </td>
                <td className="td">{e.target}</td>
                <td className="td text-muted">{e.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}