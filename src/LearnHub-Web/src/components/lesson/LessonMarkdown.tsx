import { Check, Copy } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import "highlight.js/styles/github-dark.css";

function CodeBlock({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(ref.current?.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context). Nothing to do.
    }
  }

  return (
    <div className="relative">
      <pre
        ref={ref}
        className="overflow-x-auto rounded-xl bg-slate-900 p-5 pr-24 text-sm text-slate-50 shadow-sm [&_code]:bg-transparent! [&_code]:p-0! [&_code]:text-inherit!"
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

const components: Components = {
  h2: ({ children }) => <h2 className="pt-2 text-xl font-bold text-ink">{children}</h2>,
  h3: ({ children }) => <h3 className="pt-1 text-lg font-bold text-ink">{children}</h3>,
  ul: ({ children }) => <ul className="list-disc space-y-1.5 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1.5 pl-6">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-line-strong pl-4 text-muted">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link underline">
      {children}
    </a>
  ),
  // Inline code. Inside <pre> these styles are reset by CodeBlock.
  code: ({ className, children }) => (
    <code className={`${className ?? ""} rounded bg-line/60 px-1.5 py-0.5 text-sm font-medium text-ink`}>
      {children}
    </code>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
};

/** Lesson body. It's Markdown from the API; rehype-sanitize blocks raw HTML from teachers. */
export default function LessonMarkdown({ children }: { children: string }) {
  return (
    <article className="mt-8 space-y-4 leading-relaxed text-body">
      <ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeHighlight]} components={components}>
        {children}
      </ReactMarkdown>
    </article>
  );
}
