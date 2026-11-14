import { AlertTriangle } from "lucide-react";
import Modal from "./../Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  count: number;
  limit: number;
};

export default function FocusWarningDialog({
  open,
  onClose,
  count,
  limit,
}: Props) {
  const remaining = limit - count;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Warning: you left the exam page"
      icon={
        <AlertTriangle size={22} className="mt-0.5 shrink-0 text-warning" />
      }
      actions={
        <button className="btn btn-primary" onClick={onClose}>
          Return to the exam
        </button>
      }
    >
      <p>
        A warning has been recorded ({count} of {limit}). Reaching {limit}{" "}
        warnings cancels the attempt and marks it as failed.
      </p>
      <p className="font-semibold text-ink">
        {remaining} {remaining === 1 ? "warning" : "warnings"} remaining.
      </p>
    </Modal>
  );
}
