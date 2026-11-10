import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-6xl font-extrabold text-accent">404</p>
      <h1 className="text-2xl font-bold text-ink">Page not found</h1>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to the start page
      </Link>
    </div>
  );
}
