// The API validates the host too. This check only gives instant feedback.
const ALLOWED_HOSTS = ["youtube.com", "youtu.be", "vimeo.com"];

/** Returns an error message, or null when the link is empty (optional) or valid. */
export function validateVideoUrl(value: string): string | null {
  const text = value.trim();
  if (!text) return null;

  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return "Enter a full link, for example https://www.youtube.com/watch?v=...";
  }

  if (url.protocol !== "https:") return "The link must start with https://.";

  const host = url.hostname.toLowerCase();
  const allowed = ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  return allowed ? null : "This video host is not allowed. Use a YouTube or Vimeo link.";
}
