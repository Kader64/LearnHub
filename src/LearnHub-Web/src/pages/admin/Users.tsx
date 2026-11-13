import { Ban, Search, UserCheck, UserCog } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { users } from "../../examples/exampledata";

export default function Users() {
  return (
    <>
      <PageHeader title="Users" description="Search, filter, disable accounts and change roles." />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" size={18} />
          <input className="input pl-10" placeholder="Search by name or email..." />
        </div>
        <select className="input sm:w-40"><option>All roles</option><option>Student</option><option>Teacher</option><option>Admin</option></select>
        <select className="input sm:w-40"><option>All statuses</option><option>Active</option><option>Disabled</option></select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <thead className="table-head">
            <tr>
              <th className="th">User</th>
              <th className="th">Role</th>
              <th className="th">Courses</th>
              <th className="th">Enrollments</th>
              <th className="th">Certificates</th>
              <th className="th">Status</th>
              <th className="th" />
            </tr>
          </thead>
          <tbody className="table-body">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="td">
                  <p className="font-semibold text-ink">{u.name}</p>
                  <p className="text-xs text-muted">{u.email}</p>
                </td>
                <td className="td">{u.role}</td>
                <td className="td">{u.courses}</td>
                <td className="td">{u.enrollments}</td>
                <td className="td">{u.certificates}</td>
                <td className="td"><StatusBadge status={u.active ? "Active" : "Disabled"} /></td>
                <td className="td">
                  {u.role === "Admin" ? (
                    <span className="block text-right text-xs text-muted">Protected</span>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-secondary btn-sm">
                        <UserCog size={14} /> Role
                      </button>
                      {u.active ? (
                        <button className="btn btn-secondary btn-sm text-danger w-24 justify-center">
                          <Ban size={14} /> Disable
                        </button>
                      ) : (
                        <button className="btn btn-secondary btn-sm text-success w-24 justify-center">
                          <UserCheck size={14} /> Enable
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role change rule: Teacher to Student is blocked while the user owns any course.
          Show this message in the role dialog when that happens:
      <p className="alert-danger">This teacher still owns courses and cannot become a student.</p>
      */}
    </>
  );
}
