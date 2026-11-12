import PageHeader from "../../components/PageHeader";
import { auditLog } from "../../examples/exampledata";

export default function AuditLog() {
  return (
    <>
      <PageHeader title="Audit log" description="Every admin action is recorded. The log is append-only." />

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[760px]">
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
