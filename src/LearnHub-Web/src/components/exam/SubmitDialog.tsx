import Modal from "../Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  total: number;
  unanswered: number;
  onReview: () => void;
  onSubmit: () => void;
};

export default function SubmitDialog({
  open,
  onClose,
  total,
  unanswered,
  onReview,
  onSubmit,
}: Props) {
  const hasGaps = unanswered > 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Submit your exam?"
      actions={
        <>
          <button
            className="btn btn-secondary"
            onClick={hasGaps ? onReview : onClose}
          >
            {hasGaps ? "Review unanswered" : "Keep working"}
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            {hasGaps ? "Submit anyway" : "Submit exam"}
          </button>
        </>
      }
    >
      {hasGaps ? (
        <p>
          {unanswered} of {total} questions have no answer. Unanswered questions
          are marked incorrect.
        </p>
      ) : (
        <p>
          You answered all {total} questions. Answers can't be changed after
          submitting.
        </p>
      )}
    </Modal>
  );
}
