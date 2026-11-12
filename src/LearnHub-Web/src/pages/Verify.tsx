import { useParams } from "react-router-dom";
import Logo from "../components/Logo";

export default function Verify() {
  const { code } = useParams();

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10">
      <Logo to="/" />

      <div className="mt-16 w-full max-w-md">
        {/* VARIANT 1 (backend result: valid). */}
        <p className="text-sm font-bold uppercase tracking-wide text-success">Valid</p>
        <h1 className="page-title mt-2">Certificate is valid</h1>
        <p className="mt-1 font-mono text-sm text-muted">{code}</p>

        {/* EXAMPLE details, shown only for a valid certificate */}
        <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted">Student</dt>
            <dd className="font-semibold text-ink">Anna Kowalska</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted">Course</dt>
            <dd className="text-right font-semibold text-ink">Introduction to C# and .NET</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted">Issued</dt>
            <dd className="font-semibold text-ink">12 Oct 2026</dd>
          </div>
        </dl>

        {/* VARIANT 2 (backend result: invalid or unknown code). Same response for every unknown code.
        <p className="text-sm font-bold uppercase tracking-wide text-danger">Not found</p>
        <h1 className="page-title mt-2">Certificate not found</h1>
        <p className="mt-2 text-muted">This code does not match any certificate.</p>
        */}

        {/* VARIANT 3 (backend result: revoked).
        <p className="text-sm font-bold uppercase tracking-wide text-warning">Revoked</p>
        <h1 className="page-title mt-2">Certificate revoked</h1>
        <p className="mt-2 text-muted">This certificate is no longer valid.</p>
        */}
      </div>
    </div>
  );
}
