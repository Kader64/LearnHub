import LessonList, { type LessonListProps } from "./LessonList";
import ProgressBar from "./ProgressBar";

type Props = Omit<LessonListProps, "onNavigate"> & { courseTitle: string };

/** Sticky lesson list for desktop. On small screens use MobileLessonMenu. */
export default function LessonSidebar({ courseTitle, ...list }: Props) {
  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
      <p className="font-bold text-ink">{courseTitle}</p>
      <div className="mt-3">
        <ProgressBar done={list.completedIds.size} total={list.lessons.length} />
      </div>
      <div className="mt-4 max-h-[calc(100vh-14rem)] overflow-y-auto">
        <LessonList {...list} />
      </div>
    </aside>
  );
}
