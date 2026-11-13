import { RotateCcw, Search, ShieldOff } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { certificates } from "../../examples/exampledata";

export default function AdminCertificates() {
  return (
    <>
      <PageHeader title="Certificates" description="Search by code or student name. Revoke with a reason, or restore." />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" size={18} />
          <input className="input pl-10" placeholder="Code or student name..." />
        </div>
        <select className="input sm:w-40">
          <option>All students</option>
          {/* Add student options here or dynamically map them */}
        </select>
        <select className="input sm:w-40">
          <option>All courses</option>
          {/* Add course options here or dynamically map them */}
        </select>
        <select className="input sm:w-40">
          <option>All statuses</option>
          <option>Valid</option>
          <option>Revoked</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-190">
          <thead className="table-head">
            <tr>
              <th className="th">Code</th>
              <th className="th">Student</th>
              <th className="th">Course</th>
              <th className="th">Issued</th>
              <th className="th">Status</th>
              <th className="th" />
            </tr>
          </thead>
          <tbody className="table-body">
            {certificates.map((c) => (
              <tr key={c.code}>
                <td className="td font-mono text-xs font-semibold text-ink">{c.code}</td>
                <td className="td">{c.student}</td>
                <td className="td">{c.course}</td>
                <td className="td">{c.date}</td>
                <td className="td"><StatusBadge status={c.status} /></td>
                <td className="td text-right">
                  {c.status === "Revoked" ? (
                    <button className="btn btn-secondary btn-sm text-success w-28 justify-center">
                      <RotateCcw size={14} /> Restore
                    </button>
                  ) : (
                    <button className="btn btn-secondary btn-sm text-danger w-28 justify-center">
                      <ShieldOff size={14} /> Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}