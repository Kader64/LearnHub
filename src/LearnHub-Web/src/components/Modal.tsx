import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  actions: ReactNode;
};

/** Modal built on the native <dialog>: focus trap and Escape come from the browser. */
export default function Modal({
  open,
  onClose,
  title,
  icon,
  children,
  actions,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[min(28rem,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-6 shadow-xl backdrop:bg-ink/40"
    >
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <div className="mt-2 space-y-2 text-sm text-body">{children}</div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-end gap-3">{actions}</div>
    </dialog>
  );
}
