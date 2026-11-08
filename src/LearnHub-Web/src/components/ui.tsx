import type { ReactNode } from "react";

export const btn = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export const btnPrimary = `${btn} bg-accent text-white hover:bg-accent-dark`;

export const btnGhost = `${btn} border border-neutral-300 bg-white hover:bg-neutral-100`;

export const inputClass = "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-accent";

export const tableWrap = "overflow-x-auto rounded-lg border border-neutral-200 bg-white";

export function ProgressBar({ value = 0 }: { value?: number }) {
  return (
    <div
      className="flex items-center gap-3"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-9 text-right text-xs tabular-nums text-neutral-500">
        {Math.round(value)}%
      </span>
    </div>
  );
}

export const Loading = () => (
  <p className="py-10 text-sm text-neutral-500">Loading…</p>
);

export const ErrorBox = ({ children }: { children: ReactNode }) => (
  <p
    role="alert"
    className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
  >
    {children}
  </p>
);

export const Empty = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => (
  <div className="rounded-lg border border-dashed border-neutral-300 py-14 text-center">
    <p className="font-medium">{title}</p>
    {children && (
      <div className="mt-1 text-sm text-neutral-500">{children}</div>
    )}
  </div>
);
