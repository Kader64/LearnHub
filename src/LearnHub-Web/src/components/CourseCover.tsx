import {
  BookOpen,
  Briefcase,
  Camera,
  Code,
  Database,
  FlaskConical,
  Languages,
  Megaphone,
  Music,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

// Keys below are what the API stores in the database. Do not rename them
// without a data migration. Colors live here (not in index.css) so the
// global stylesheet stays untouched.

export type CoverType = "Gradient" | "Image";

export const COVER_GRADIENTS = [
  { key: "teal", label: "Teal", from: "#10b9a6", to: "#0891b2" },
  { key: "ocean", label: "Ocean", from: "#38bdf8", to: "#2563eb" },
  { key: "indigo", label: "Indigo", from: "#818cf8", to: "#6d28d9" },
  { key: "grape", label: "Grape", from: "#e879f9", to: "#7c3aed" },
  { key: "sunset", label: "Sunset", from: "#fb923c", to: "#e11d48" },
  { key: "amber", label: "Amber", from: "#fbbf24", to: "#ea580c" },
  { key: "forest", label: "Forest", from: "#4ade80", to: "#047857" },
  { key: "slate", label: "Slate", from: "#64748b", to: "#0f172a" },
] as const;

export const COVER_ICONS: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "code", label: "Programming", icon: Code },
  { key: "database", label: "Data", icon: Database },
  { key: "palette", label: "Design", icon: Palette },
  { key: "megaphone", label: "Marketing", icon: Megaphone },
  { key: "BookOpen", label: "BookOpen", icon: BookOpen },
  { key: "camera", label: "Photo and video", icon: Camera },
  { key: "music", label: "Music", icon: Music },
  { key: "languages", label: "Languages", icon: Languages },
  { key: "briefcase", label: "Business", icon: Briefcase },
  { key: "science", label: "Science", icon: FlaskConical },
];

export type CourseCoverData = {
  coverType: CoverType;
  coverGradient: string;
  coverIcon: string;
  thumbnailUrl?: string | null;
};

const pick = <T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];

/** Default cover for a new course. Generated once and then saved, so it never changes on refresh. */
export function randomCover(): CourseCoverData {
  return {
    coverType: "Gradient",
    coverGradient: pick(COVER_GRADIENTS).key,
    coverIcon: pick(COVER_ICONS).key,
    thumbnailUrl: "",
  };
}

export function gradientCss(key: string) {
  const g = COVER_GRADIENTS.find((x) => x.key === key) ?? COVER_GRADIENTS[0];
  return `linear-gradient(135deg, ${g.from}, ${g.to})`;
}

type Props = {
  cover: CourseCoverData;
  /** Size comes from the parent. Defaults to the card height. */
  className?: string;
  /** Overlays such as the category badge. */
  children?: ReactNode;
};

/**
 * Cover used by CourseCard and by the preview in CourseEditor.
 * The icon hover effect works when a parent has the `group` class.
 */
export default function CourseCover({ cover, className = "h-40", children }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = cover.coverType === "Image" && !!cover.thumbnailUrl && !imageFailed;
  const Icon = (COVER_ICONS.find((i) => i.key === cover.coverIcon) ?? COVER_ICONS[0]).icon;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      // The gradient is also the fallback when an image can't be loaded.
      style={{ background: gradientCss(cover.coverGradient) }}
    >
      {showImage ? (
        <img
          src={cover.thumbnailUrl!}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Icon className="absolute -bottom-6 -right-4 h-32 w-32 text-white/15 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
      )}
      {children}
    </div>
  );
}