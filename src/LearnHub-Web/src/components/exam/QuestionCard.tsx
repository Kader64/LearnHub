// The student never receives the correct answer, so this type has no `correct` field.
export interface StudentQuestion {
  id: string;
  text: string;
  answers: string[];
}

type Props = {
  question: StudentQuestion;
  index: number;
  total: number;
  selected?: number;
  /** Highlight the card as unanswered (after a review request). */
  missing: boolean;
  onSelect: (answerIndex: number) => void;
};

export default function QuestionCard({ question, index, total, selected, missing, onSelect }: Props) {
  return (
    <li
      id={`question-${question.id}`}
      className={`rounded-2xl border bg-white p-5 sm:p-6 ${missing ? "border-danger" : "border-line"}`}
    >
      <fieldset>
        <legend className="w-full">
          <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
            Question {index + 1} of {total}
          </span>
          <span className="mt-1.5 block text-base font-bold leading-snug text-ink sm:text-lg">{question.text}</span>
        </legend>

        <div className="mt-4 space-y-2.5">
          {question.answers.map((answer, i) => (
            <label
              key={`${question.id}-${i}`}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm transition-colors hover:bg-page has-checked:border-accent has-checked:bg-accent-soft has-checked:font-semibold has-checked:text-accent-dark has-focus-visible:ring-2 has-focus-visible:ring-accent/40"
            >
              <input
                type="radio"
                name={question.id}
                value={i}
                checked={selected === i}
                onChange={() => onSelect(i)}
                className="h-4 w-4 shrink-0 accent-accent"
              />
              <span>{answer}</span>
            </label>
          ))}
        </div>
        {missing && <p className="mt-3 text-sm font-semibold text-danger">Choose an answer.</p>}
      </fieldset>
    </li>
  );
}