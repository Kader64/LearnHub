import { ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Welcome() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <Logo to="/" />
        <Link
          to="/login"
          className="text-sm font-semibold text-muted hover:text-ink"
        >
          Log in
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center gap-12 px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Learn new skills.
            <br />
            Prove them with a certificate.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-body">
            LearnHub is where teachers publish courses and students learn at
            their own pace, pass an exam and receive a certificate that anyone
            can verify.
          </p>
          <Link
            to="/login"
            className="btn btn-primary mt-10 px-7 py-3.5 text-base"
          >
            Continue
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="w-80 rotate-3 rounded-2xl bg-white p-7 text-slate-800 shadow-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Award size={26} />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-400">
              Certificate of completion
            </p>
            <p className="mt-2 text-2xl font-extrabold">Anna Kowalska</p>
            <p className="mt-1 text-sm text-slate-500">
              Introduction to C# and .NET
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span>Score 92%</span>
              <span className="font-mono font-semibold text-accent-dark">
                LH-7K2M-9QXD
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
