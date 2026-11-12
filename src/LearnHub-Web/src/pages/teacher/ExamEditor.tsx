import { Plus, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { examQuestions } from "../../examples/exampledata";

export default function ExamEditor() {
  const { id } = useParams();

  return (
    <>
      <PageHeader
        title="Edit exam"
        description="Single choice questions: 2-6 answers each, exactly one correct."
        actions={<Link to={`/teach/courses/${id}`} className="btn btn-secondary">← Back to course</Link>}
      />

      <section className="grid gap-5 pb-8 sm:grid-cols-3">
        <div>
          <label className="label">Pass mark (%)</label>
          <input type="number" className="input" defaultValue={70} min={50} max={100} />
          <p className="mt-1 text-xs text-muted">Between 0 and 100.</p>
        </div>
        <div>
          <label className="label">Max attempts</label>
          <input type="number" className="input" placeholder="Unlimited" min={1} />
          <p className="mt-1 text-xs text-muted">Leave empty for unlimited.</p>
        </div>
        <div>
          <label className="label">Time limit (minutes)</label>
          <input type="number" className="input" placeholder="No limit" min={1} />
          <p className="mt-1 text-xs text-muted">Optional.</p>
        </div>
      </section>

      <ol className="divide-y divide-line border-y border-line">
        {examQuestions.map((q, qi) => (
          <li key={q.id} className="py-6">
            <div className="flex items-start gap-3">
              <span className="w-6 pt-2.5 text-sm tabular-nums text-muted">{qi + 1}.</span>
              <input className="input font-semibold" defaultValue={q.text} />
              <button className="icon-btn icon-btn-danger mt-1.5" title="Delete question"><Trash2 size={18} /></button>
            </div>

            <div className="mt-4 space-y-2.5 pl-9">
              {q.answers.map((answer, ai) => (
                <div key={answer} className="flex items-center gap-3">
                  <input type="radio" name={`correct-${q.id}`} defaultChecked={ai === q.correct} className="accent-accent" title="Correct answer" />
                  <input className="input" defaultValue={answer} />
                  <button className="icon-btn" title="Delete answer"><Trash2 size={16} /></button>
                </div>
              ))}
              {/* Disable this button when the question already has 6 answers */}
              <button className="btn btn-secondary btn-sm"><Plus size={14} /> Add answer</button>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button className="btn btn-secondary"><Plus size={16} /> Add question</button>
        <button className="btn btn-primary">Save exam</button>
      </div>
    </>
  );
}
