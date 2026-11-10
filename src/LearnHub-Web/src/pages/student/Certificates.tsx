import { Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { certificates } from "../../examples/exampledata";

// EXAMPLE: the student's certificates (the last one is revoked to show that style)
const mine = [certificates[0], certificates[2]];

export default function Certificates() {
  return (
    <>
      <PageHeader title="My certificates" description="Download your certificates or share the verification link." />

      <div className="grid gap-5 md:grid-cols-2">
        {mine.map((c) => (
          <div key={c.code} className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ink">{c.course}</h3>
                <p className="text-sm text-muted">Taught by {c.teacher}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>

            <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4 text-sm">
              <div><dt className="text-muted">Score</dt><dd className="font-semibold text-ink">{c.score}%</dd></div>
              <div><dt className="text-muted">Issued</dt><dd className="font-semibold text-ink">{c.date}</dd></div>
              <div><dt className="text-muted">Code</dt><dd className="font-mono text-xs font-semibold text-ink">{c.code}</dd></div>
            </dl>

            <div className="mt-5 flex gap-3">
              {/* Revoked certificates cannot be downloaded */}
              <button className="btn btn-primary flex-1" disabled={c.status === "Revoked"}>
                <Download size={16} /> Download PDF
              </button>
              <Link to={`/verify/${c.code}`} className="btn btn-secondary">
                <ExternalLink size={16} /> Verify
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* VARIANT: student has no certificates yet
      <p className="py-12 text-center text-muted">You have no certificates yet. Pass an exam to earn one.</p>
      */}
    </>
  );
}
