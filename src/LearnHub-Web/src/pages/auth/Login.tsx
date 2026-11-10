import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome back</h1>
      <p className="mt-2 text-slate-500">Log in to continue learning.</p>

      <form className="mt-8 space-y-5">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" type="password" className="input" placeholder="••••••••" />
        </div>

        {/* <div className="mt-6 text-sm text-red-700 text-center">
            Invalid email or password.
        </div> */}

        {/* Replace with type="submit" when logic is added. */}
        <Link to="/courses" className="btn btn-primary w-full">
          Log in
        </Link>
      </form>
      
      <p className="mt-6 text-center text-sm text-slate-500">
        No account yet?{" "}
        <Link to="/register" className="font-semibold text-accent hover:text-accent-dark">
          Register
        </Link>
      </p>
    </>
  );
}