import { Link } from "react-router-dom";

interface Props {
  label: string;
  value: string;
  to: string;
}

export default function StatCard({ label, value, to }: Props) {
  return (
    <Link to={to} className="block bg-white p-5 transition hover:bg-page">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink">{value}</p>
    </Link>
  );
}
