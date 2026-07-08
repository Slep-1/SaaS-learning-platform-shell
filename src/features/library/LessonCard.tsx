import type { LessonSummary } from './queries';
import { Link } from '@/libs/I18nNavigation';

export const LessonCard = (props: { lesson: LessonSummary }) => (
  <Link
    href={`/dashboard/library/${props.lesson.id}`}
    className="
      block rounded-xl border border-border bg-background p-5 transition-colors
      hover:border-[#2563eb]
    "
  >
    <div className="
      size-12 rounded-lg bg-[#2563eb] p-2
      [&_svg]:stroke-white [&_svg]:stroke-2
    "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
        <path d="M3 6l0 13" />
        <path d="M12 6l0 13" />
        <path d="M21 6l0 13" />
      </svg>
    </div>

    <div className="mt-3 text-lg font-bold">{props.lesson.title}</div>
    <div className="mt-1 text-sm text-muted-foreground">{props.lesson.description}</div>
  </Link>
);
