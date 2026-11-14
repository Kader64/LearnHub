  import { useState } from "react";
  import { useParams } from "react-router-dom";
  import Logo from "../components/Logo";

  export default function Verify() {
    const { code: urlCode } = useParams();
    const [inputCode, setInputCode] = useState(urlCode || "");

    return (
      <div className="flex min-h-screen flex-col items-center px-4 py-12">
        <Logo to="/" />

        <div className="mt-12 w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold text-slate-900">Verify a certificate</h1>
          <p className="mt-2 text-slate-600">Enter the certificate code below to check its official validity and details.</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. CERT-12345"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-900 shadow-sm placeholder:font-sans placeholder:text-slate-400 focus:border-slate-900 focus:outline-hidden"
            />
            <button className="btn btn-primary py-3 px-8">Verify</button>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* VARIANT 1 (backend result: valid). */}
            <p className="text-xs font-bold uppercase tracking-wider text-success">Valid Certificate</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">Certificate is authentic</h2>
            <p className="mt-1 font-mono text-sm text-slate-500">{inputCode || "CERT-12345"}</p>

            <dl className="mt-6 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-slate-500">Student</dt>
                <dd className="font-semibold text-slate-900">Anna Kowalska</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-slate-500">Course</dt>
                <dd className="font-semibold text-slate-900">Introduction to C# and .NET</dd>
              </div>
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-slate-500">Issued Date</dt>
                <dd className="font-semibold text-slate-900">12 Oct 2026</dd>
              </div>
            </dl>

            {/* VARIANT 2 (backend result: invalid or unknown code). Replace above with this:
            <p className="text-xs font-bold uppercase tracking-wider text-danger">Not found</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">Certificate not found</h2>
            <p className="mt-2 text-sm text-slate-600">This code does not match any certificate in our system.</p>
            */}

            {/* VARIANT 3 (backend result: revoked). Replace above with this:
            <p className="text-xs font-bold uppercase tracking-wider text-warning">Revoked</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">Certificate revoked</h2>
            <p className="mt-2 text-sm text-slate-600">This certificate has been revoked and is no longer valid.</p>
            */}
          </div>
        </div>
      </div>
    );
  }