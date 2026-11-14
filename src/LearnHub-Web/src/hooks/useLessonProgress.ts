import { useCallback, useState } from "react";
import type { LessonItem } from "../components/lesson/lessonUtils";

/** Which lessons the student has completed, and the numbers derived from it. */
export function useLessonProgress(lessons: LessonItem[]) {
  const [completedIds, setCompletedIds] = useState(
    () => new Set(lessons.filter((l) => l.completed).map((l) => l.id)),
  );

  // TODO API: POST / DELETE /api/lessons/{id}/progress
  const complete = useCallback((id: string) => {
    setCompletedIds((prev) => new Set(prev).add(id));
  }, []);

  const undo = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const doneCount = completedIds.size;
  const remaining = lessons.length - doneCount;

  return { completedIds, doneCount, remaining, allDone: remaining === 0, complete, undo };
}
