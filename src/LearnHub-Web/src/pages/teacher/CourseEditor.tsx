import { ArrowDown, ArrowUp, CheckCircle2, ChevronDown, ImageIcon, Pencil, Plus, Trash2, Video, XCircle } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CourseCover, {
  COVER_GRADIENTS,
  COVER_ICONS,
  gradientCss,
  randomCover,
  type CourseCoverData,
  type CoverType,
} from "../../components/CourseCover";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { categories, lessons } from "../../examples/exampledata";

export default function CourseEditor() {
  const { id } = useParams();
  const isNew = id === undefined;
  const courseId = id ?? "new";

  // New course: random gradient + icon, so the card looks good without any choice.
  // Existing course: values would come from the API.
  const [cover, setCover] = useState<CourseCoverData>(() =>
    isNew ? randomCover() : { coverType: "Gradient", coverGradient: "ocean", coverIcon: "code", thumbnailUrl: "" },
  );
  const [coverOpen, setCoverOpen] = useState(false);
  const setCoverType = (coverType: CoverType) => setCover((c) => ({ ...c, coverType }));

  const coverOk = cover.coverType === "Gradient" || !!cover.thumbnailUrl?.trim();
  // A section with a problem can't stay collapsed.
  const showCover = coverOpen || !coverOk;

  const gradientLabel = COVER_GRADIENTS.find((g) => g.key === cover.coverGradient)?.label;
  const iconLabel = COVER_ICONS.find((i) => i.key === cover.coverIcon)?.label;

  const checklist = [
    { label: "At least one lesson", ok: true },
    { label: "Exam has at least one question", ok: true },
    { label: "Every question has 2-6 answers and exactly one correct", ok: false },
    { label: "Cover is set", ok: coverOk },
  ];
  const canPublish = checklist.every((item) => item.ok);

  return (
    <>
      <PageHeader title={isNew ? "New course" : "Edit course"} description="Course details, lessons and exam." />

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="divide-y divide-line lg:col-span-2">
          {/* Details */}
          <section className="space-y-5 pb-8">
            <h2 className="section-title">Details</h2>
            <div>
              <label className="label">Title</label>
              <input className="input" defaultValue={isNew ? "" : "Introduction to C# and .NET"} />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input min-h-28" defaultValue={isNew ? "" : "Learn the fundamentals of C# and .NET."} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label">Category</label>
                <select className="input">
                  {categories.map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Level</label>
                <select className="input">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </section>

          {/* Cover (collapsible) */}
          <section className="py-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h2 className="section-title">Cover</h2>
                {!showCover && (
                  <span className="flex min-w-0 items-center gap-2.5 text-sm text-muted">
                    {cover.coverType === "Gradient" && (
                      <span
                        className="h-5 w-8 shrink-0 rounded"
                        style={{ background: gradientCss(cover.coverGradient) }}
                      />
                    )}
                    <span className="truncate">
                      {cover.coverType === "Gradient"
                        ? `${gradientLabel} gradient, ${iconLabel} icon`
                        : `Image: ${cover.thumbnailUrl}`}
                    </span>
                  </span>
                )}
              </div>
              <button
                type="button"
                aria-expanded={showCover}
                aria-controls="cover-panel"
                disabled={!coverOk}
                onClick={() => setCoverOpen(!showCover)}
                className="btn btn-ghost btn-sm shrink-0"
              >
                {showCover ? "Hide" : "Change"}
                <ChevronDown size={16} className={`transition-transform ${showCover ? "rotate-180" : ""}`} />
              </button>
            </div>

            {showCover && (
              <div id="cover-panel" className="mt-5 space-y-5">
                <div className="inline-flex rounded-lg border border-line-strong bg-white p-1" role="group" aria-label="Cover type">
                  {(["Gradient", "Image"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={cover.coverType === type}
                      onClick={() => setCoverType(type)}
                      className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                        cover.coverType === type ? "bg-accent text-white" : "text-body hover:bg-page"
                      }`}
                    >
                      {type === "Gradient" ? "Gradient and icon" : "Image"}
                    </button>
                  ))}
                </div>

                <div className="grid gap-6 sm:grid-cols-[16rem_1fr]">
                  {/* Live preview: same cover and hover effect as the course card */}
                  <div className="group self-start overflow-hidden rounded-2xl shadow-sm ring-1 ring-line">
                    {cover.coverType === "Image" && !cover.thumbnailUrl?.trim() ? (
                      <div className="flex h-40 flex-col items-center justify-center gap-2 bg-page px-4 text-center text-sm text-muted">
                        <ImageIcon size={24} />
                        Paste an image URL to see a preview
                      </div>
                    ) : (
                      <CourseCover
                        key={cover.thumbnailUrl} // reset the load-error state when the URL changes
                        cover={cover}
                        className="h-40"
                      />
                    )}
                  </div>

                  {cover.coverType === "Gradient" ? (
                    <div className="space-y-5">
                      <div>
                        <span className="label">Color</span>
                        <div className="flex flex-wrap gap-3">
                          {COVER_GRADIENTS.map((g) => (
                            <button
                              key={g.key}
                              type="button"
                              title={g.label}
                              aria-label={g.label}
                              aria-pressed={cover.coverGradient === g.key}
                              onClick={() => setCover((c) => ({ ...c, coverGradient: g.key }))}
                              style={{ background: gradientCss(g.key) }}
                              className={`h-9 w-9 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 ${
                                cover.coverGradient === g.key ? "ring-2 ring-accent ring-offset-2" : "hover:scale-105"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="label">Icon</span>
                        <div className="flex flex-wrap gap-2">
                          {COVER_ICONS.map(({ key, label, icon: Icon }) => (
                            <button
                              key={key}
                              type="button"
                              title={label}
                              aria-label={label}
                              aria-pressed={cover.coverIcon === key}
                              onClick={() => setCover((c) => ({ ...c, coverIcon: key }))}
                              className={`rounded-lg border p-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                                cover.coverIcon === key
                                  ? "border-accent bg-accent-soft text-accent-dark"
                                  : "border-line-strong bg-white text-muted hover:bg-page hover:text-ink"
                              }`}
                            >
                              <Icon size={20} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="label">Image URL</label>
                      <input
                        className="input"
                        placeholder="https://..."
                        value={cover.thumbnailUrl ?? ""}
                        onChange={(e) => setCover((c) => ({ ...c, thumbnailUrl: e.target.value }))}
                      />
                      <p className="mt-1.5 text-sm text-muted">
                        Wide images work best. If the image can't be loaded, the gradient is shown instead.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Lessons */}
          <section className="py-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <h2 className="section-title">Lessons</h2>
                <span className="text-sm text-muted">{lessons.length} in total</span>
              </div>
              <Link to={`/teach/courses/${courseId}/lessons/new`} className="btn btn-secondary">
                <Plus size={16} /> Add lesson
              </Link>
            </div>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center gap-4 py-3.5">
                  <span className="w-7 text-base font-semibold tabular-nums text-muted">{lesson.order}</span>
                  <span className="flex-1 text-base font-semibold text-ink">{lesson.title}</span>
                  {lesson.videoUrl && (
                    <span title="Has video" className="text-muted">
                      <Video size={18} />
                    </span>
                  )}
                  <span className="hidden w-16 text-right text-sm tabular-nums text-muted sm:block">{lesson.duration}</span>
                  <div className="flex items-center gap-1">
                    <button className="icon-btn p-2" title="Move up" aria-label="Move up"><ArrowUp size={20} /></button>
                    <button className="icon-btn p-2" title="Move down" aria-label="Move down"><ArrowDown size={20} /></button>
                    <Link to={`/teach/courses/${courseId}/lessons/${lesson.id}`} className="icon-btn p-2" title="Edit" aria-label="Edit">
                      <Pencil size={20} />
                    </Link>
                    <button className="icon-btn icon-btn-danger p-2" title="Delete" aria-label="Delete"><Trash2 size={20} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Exam */}
          <section className="flex flex-wrap items-center justify-between gap-4 pt-8">
            <div>
              <h2 className="section-title">Final exam</h2>
              <p className="mt-1 text-sm text-muted">3 questions · pass mark 70% · unlimited attempts</p>
            </div>
            <Link to={`/teach/courses/${courseId}/exam`} className="btn btn-secondary">Edit exam</Link>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-ink">Status</h2>
              <StatusBadge status="Draft" />
            </div>

            <ul className="mt-4 space-y-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5 text-sm">
                  {item.ok ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                  ) : (
                    <XCircle size={18} className="mt-0.5 shrink-0 text-danger" />
                  )}
                  <span className="text-body">{item.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <button className="btn btn-secondary w-full">Save changes</button>
              {/* VARIANT A (Draft or Unpublished). Disabled while the checklist is not fully green. */}
              <button className="btn btn-primary w-full" disabled={!canPublish}>Publish course</button>
              {/* VARIANT B (Published). Replace variant A with this:
              <button className="btn btn-secondary w-full">Unpublish course</button>
              */}
            </div>
          </section>

          {/* VARIANT (Suspended by an admin: the course is read-only). Uncomment to preview:
          <div className="alert-danger">
            <p className="font-bold">Suspended by an admin</p>
            <p className="mt-1">Reason: copied content.</p>
          </div>
          */}
        </aside>
      </div>
    </>
  );
}