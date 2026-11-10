import { GraduationCap, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

const roles = [
  { value: "student", title: "Student", text: "Learn from courses", icon: GraduationCap },
  { value: "teacher", title: "Teacher", text: "Create and publish courses", icon: PenSquare },
];

export default function Register() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Create your account</h1>
      <p className="mt-2 text-slate-500">Join our community in less than a minute.</p>

      <form className="mt-8 space-y-5">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input id="name" className="input" placeholder="Anna Kowalska" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" className="input" placeholder="you@example.com" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" type="password" className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="label" htmlFor="confirm">Confirm password</label>
            <input id="confirm" type="password" className="input" placeholder="••••••••" />
          </div>
        </div>

        <div>
          <span className="label">I want to join as</span>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((role) => (
              <label
                key={role.value}
                className="flex cursor-pointer flex-col gap-1 rounded-xl border border-slate-300 p-4 transition has-checked:border-accent has-checked:bg-accent-soft"
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  defaultChecked={role.value === "student"}
                  className="sr-only"
                />
                <role.icon size={20} className="text-accent" />
                <span className="font-bold text-slate-900">{role.title}</span>
                <span className="text-xs text-slate-500">{role.text}</span>
              </label>
            ))}
          </div>
        </div>


        {/* <p className="mt-1.5 text-sm text-red-600 text-center">This email is already registered.</p> */}
        

        {/* TEMP: Replace with type="submit" when logic is added. */}
        <Link to="/courses" className="btn btn-primary w-full">
          Create account
        </Link>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-accent hover:text-accent-dark">
          Log in
        </Link>
      </p>
    </>
  );
}