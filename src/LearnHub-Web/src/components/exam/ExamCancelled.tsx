import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

type Props = { maxWarnings: number; resultPath: string };

export default function ExamCancelled({ maxWarnings, resultPath }: Props) {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <XCircle size={40} className="mx-auto text-danger" />
      <h1 className="section-title mt-4">Exam cancelled</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-body">
        The attempt was ended after {maxWarnings} warnings for leaving the exam page. It has been recorded as failed.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to={resultPath} state={{ cancelled: true }} className="btn btn-primary">
          See result
        </Link>
        <Link to="/my-learning" className="btn btn-secondary">
          My learning
        </Link>
      </div>
    </div>
  );
}