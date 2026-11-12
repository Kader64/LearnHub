import { ArrowLeft, Award, BookOpen, LayoutDashboard, ScrollText, Tags, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: Users, end: false },
  { to: "/admin/courses", label: "Courses", icon: BookOpen, end: false },
  { to: "/admin/certificates", label: "Certificates", icon: Award, end: false },
  { to: "/admin/categories", label: "Categories", icon: Tags, end: false },
  { to: "/admin/audit", label: "Audit log", icon: ScrollText, end: false },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
    isActive ? "bg-accent-soft text-accent-dark" : "text-muted hover:text-ink"
  }`;

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="border-b border-line bg-white p-4 lg:w-64 lg:border-b-0 lg:border-r lg:p-5">
        <div className="mb-4 flex items-center justify-between lg:mb-8">
          <Logo to="/admin" />
          <span className="text-xs font-bold tracking-wide text-muted">ADMIN</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/courses"
          className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:text-ink lg:mt-10"
        >
          <ArrowLeft size={18} />
          Back to the app
        </NavLink>
      </aside>

      <main className="flex-1 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
