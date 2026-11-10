import { Award, BookOpen, GraduationCap, LogOut, PenSquare, ShieldCheck } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../components/Logo";

// EXAMPLE: logged-in user. Replace with real data from the auth context.
const user = { name: "Jan Nowak", initials: "JN", role: "Teacher" };

const links = [
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/my-learning", label: "My learning", icon: GraduationCap },
  { to: "/certificates", label: "Certificates", icon: Award },

  //{ to: "/teach/courses", label: "Teaching", icon: PenSquare },
  //{ to: "/admin", label: "Admin", icon: ShieldCheck },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-accent-soft text-accent-dark" : "text-slate-500 hover:text-black"
  }`;

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-1 md:flex">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={linkClass}>
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

        <div>
            <Link to="/login" title="Log out" className="flex items-center gap-2 rounded-lg p-2 text-slate-500 hover:text-black">
                <span className="text-sm font-semibold">Log out</span>
                <LogOut size={18} />
            </Link>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        Made by Wojciech Lichtoń
      </footer>
    </div>
  );
}