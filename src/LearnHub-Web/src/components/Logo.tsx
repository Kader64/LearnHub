import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ to = "/courses" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2.5">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl}`}>
        <GraduationCap size={20} />
      </span>
      <span className={`text-lg font-extrabold tracking-tight "text-slate-900"`}>
        LearnHub
      </span>
    </Link>
  );
}
