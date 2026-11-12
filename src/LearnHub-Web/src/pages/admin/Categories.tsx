import { Pencil, Plus, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { categories } from "../../examples/exampledata";

export default function Categories() {
  return (
    <>
      <PageHeader title="Categories" description="Deleting is blocked while courses use the category." />

      <div className="mb-6 flex max-w-xl gap-3">
        <input className="input" placeholder="New category name" />
        <button className="btn btn-primary shrink-0"><Plus size={16} /> Add</button>
      </div>

      <ul className="max-w-xl divide-y divide-line border-y border-line">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center gap-3 py-3">
            <span className="flex-1 font-semibold text-ink">{c.name}</span>
            <span className="text-sm text-muted">{c.courses} courses</span>
            <button className="icon-btn" title="Rename"><Pencil size={16} /></button>
            {/* Delete is disabled while the category is in use */}
            <button
              className="icon-btn icon-btn-danger"
              disabled={c.courses > 0}
              title={c.courses > 0 ? "Category is in use" : "Delete"}
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
