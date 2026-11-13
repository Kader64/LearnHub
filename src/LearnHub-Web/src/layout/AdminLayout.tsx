import { useState } from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  LayoutDashboard,
  ScrollText,
  Tags,
  Users,
  Menu,
  X,
} from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="border-b border-line bg-white p-4 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:p-5">
        <div className="flex items-center justify-between lg:mb-8">
          <div className="flex items-center gap-3">
            <Logo to="/admin" />
            <span className="text-xs font-bold tracking-wide text-muted">
              ADMIN
            </span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="rounded-md p-1.5 text-muted hover:bg-surface hover:text-ink lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation - Hidden on mobile unless toggled, always visible on desktop */}
        <div
          className={`${isMobileMenuOpen ? "mt-5 flex" : "hidden"} flex-col gap-1 lg:mt-0 lg:flex`}
        >
          <nav className="flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={linkClass}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Divider for mobile to separate the "Back" button */}
          <div className="my-3 h-px w-full bg-line lg:hidden" />

          <NavLink
            to="/courses"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:text-ink lg:mt-10"
          >
            <ArrowLeft size={18} />
            Back to the app
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
