import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import VideoUrlField from "../../components/lessonEditor/VideoUrlField";
import { validateVideoUrl } from "../../components/lessonEditor/videoUrl";
import PageHeader from "../../components/PageHeader";
import { lessons } from "../../examples/exampledata";
import { useUnsavedChangesWarning } from "../../hooks/useUnsavedChangesWarning";

// Mock. In the real page the existing lesson comes from the API.
const EXISTING_LESSON = {
  title: "Variables and data types",
  order: "3",
  content: "## Declaring variables\n\nA variable is a named place in memory.\n\n```csharp\nint age = 25;\n```",
  videoUrl: "",
};

export default function LessonEditor() {
  const { id, lessonId } = useParams(); // id = course id
  const navigate = useNavigate();
  const isNew = lessonId === "new";
  const coursePath = `/teach/courses/${id}`;

  const [initial] = useState(() =>
    isNew ? { title: "", order: String(lessons.length + 1), content: "", videoUrl: "" } : EXISTING_LESSON,
  );
  const [title, setTitle] = useState(initial.title);
  const [order, setOrder] = useState(initial.order);
  const [content, setContent] = useState(initial.content);
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl);

  const videoError = validateVideoUrl(videoUrl);
  const dirty =
    title !== initial.title || order !== initial.order || content !== initial.content || videoUrl !== initial.videoUrl;
  useUnsavedChangesWarning(dirty);

  function handleSubmit(e: any) {
    e.preventDefault();
    // TODO API: POST / PUT /api/courses/{id}/lessons
    navigate(coursePath);
  }

  return (
    <>
      <PageHeader
        title={isNew ? "New lesson" : "Edit lesson"}
        description="Write the lesson in Markdown. File uploads are not available."
      />


      <form onSubmit={handleSubmit} className="grid gap-10">
        {/* Below lg only one of the two panels is shown, switched by the tabs above */}
        <section className={`space-y-5`}>
          <div className="grid gap-5 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <label htmlFor="lesson-title" className="label">
                Title
              </label>
              <input
                id="lesson-title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={150}
                required
              />
            </div>
            <div>
              <label htmlFor="lesson-order" className="label">
                Order
              </label>
              <input
                id="lesson-order"
                type="number"
                className="input"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                min={1}
                required
              />
            </div>
          </div>

          <div data-color-mode="light">
            <label htmlFor="lesson-content" className="label">
              Content
            </label>
            <MDEditor
              value={content}
              onChange={(val) => setContent(val ?? "")}
              preview="edit"
              height={320}
              visibleDragbar={true}
              textareaProps={{
                id: "lesson-content",
                required: true,
              }}
            />
          </div>

          <VideoUrlField id="lesson-video" value={videoUrl} onChange={setVideoUrl} error={videoError} />

          <div className="flex items-center gap-3">
            <button type="submit" className="btn btn-primary" disabled={!!videoError}>
              Save lesson
            </button>
            <Link to={coursePath} className="btn btn-secondary">
              Cancel
            </Link>
            {dirty && <span className="text-sm text-muted">Unsaved changes</span>}
          </div>
        </section>
      </form>
    </>
  );
}