import { Award, Download, ExternalLink } from "lucide-react";
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
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Award size={24} />
              </span>
              <StatusBadge status={c.status} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{c.course}</h3>
            <p className="text-sm text-slate-500">Taught by {c.teacher}</p>

            <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-sm">
              <div><dt className="text-slate-400">Score</dt><dd className="font-semibold">{c.score}%</dd></div>
              <div><dt className="text-slate-400">Issued</dt><dd className="font-semibold">{c.date}</dd></div>
              <div><dt className="text-slate-400">Code</dt><dd className="font-mono text-xs font-semibold">{c.code}</dd></div>
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
      <div className="card p-12 text-center text-slate-500">You have no certificates yet. Pass an exam to earn one.</div>
      */}
    </>
  );
}