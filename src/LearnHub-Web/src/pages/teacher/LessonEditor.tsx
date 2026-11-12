import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function LessonEditor() {
  const { id } = useParams();

  return (
    <>
      <PageHeader title="Edit lesson" description="Write the lesson in Markdown. File uploads are not available." />

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <label className="label">Title</label>
              <input className="input" defaultValue="Variables and data types" />
            </div>
            <div>
              <label className="label">Order</label>
              <input type="number" className="input" defaultValue={3} min={1} />
            </div>
          </div>
          <div>
            <label className="label">Content (Markdown)</label>
            <textarea
              className="input min-h-72 font-mono"
              defaultValue={"## Declaring variables\n\nA variable is a named place in memory.\n\n```csharp\nint age = 25;\n```"}
            />
          </div>
          <div>
            <label className="label">Video URL (optional)</label>
            <input className="input" placeholder="https://www.youtube.com/watch?v=..." />
            <p className="mt-1.5 text-xs text-muted">Only YouTube and Vimeo links are accepted.</p>
            {/* ERROR VARIANT (host not on the allowlist):
            <p className="mt-1.5 text-sm text-danger">This video host is not allowed.</p>
            */}
          </div>
          <div className="flex gap-3">
            <button className="btn btn-primary">Save lesson</button>
            <Link to={`/teach/courses/${id}`} className="btn btn-secondary">Cancel</Link>
          </div>
        </section>

        {/* Static preview (the real one renders sanitized Markdown) */}
        <section className="card p-6 lg:self-start">
          <p className="text-sm font-semibold text-muted">Preview</p>
          <h2 className="section-title mt-3">Declaring variables</h2>
          <p className="mt-3">A variable is a named place in memory.</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-ink p-4 text-sm text-page"><code>int age = 25;</code></pre>
        </section>
      </div>
    </>
  );
}
