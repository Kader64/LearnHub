import { useState } from "react";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  /** From validateVideoUrl. Shown after the field was left once. */
  error: string | null;
};

export default function VideoUrlField({ id, value, onChange, error }: Props) {
  const [touched, setTouched] = useState(false);
  const showError = touched && !!error;

  return (
    <div>
      <label htmlFor={id} className="label">
        Video URL (optional)
      </label>
      <input
        id={id}
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={showError}
        aria-describedby={`${id}-help`}
        className={`input ${showError ? "border-danger focus:border-danger focus:ring-danger/20" : ""}`}
        placeholder="https://www.youtube.com/watch?v=..."
      />
      {showError ? (
        <p id={`${id}-help`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : (
        <p id={`${id}-help`} className="mt-1.5 text-xs text-muted">
          Only YouTube and Vimeo links are accepted.
        </p>
      )}
    </div>
  );
}
