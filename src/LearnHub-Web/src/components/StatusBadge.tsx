const styles: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700",
  Published: "bg-emerald-50 text-emerald-700",
  Unpublished: "bg-amber-50 text-amber-700",
  Suspended: "bg-red-50 text-red-700",
  Active: "bg-emerald-50 text-emerald-700",
  Disabled: "bg-red-50 text-red-700",
  Valid: "bg-emerald-50 text-emerald-700",
  Revoked: "bg-red-50 text-red-700",
  Passed: "bg-emerald-50 text-emerald-700",
  Failed: "bg-red-50 text-red-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? styles.Draft}`}
    >
      {status}
    </span>
  );
}
