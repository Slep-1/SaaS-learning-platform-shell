import type { LessonSummary } from './queries';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { Link } from '@/libs/I18nNavigation';
import { deleteLessonAction } from './actions';
import { DeleteLessonButton } from './DeleteLessonButton';

export const LessonAdminRow = (props: {
  lesson: LessonSummary;
  editLabel: string;
  deleteLabel: string;
  deleteConfirm: string;
}) => (
  <div className="rounded-xl border border-border bg-background p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-lg font-bold">{props.lesson.title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{props.lesson.description}</div>
      </div>

      <div className="flex shrink-0 gap-2">
        <Link
          href={`/dashboard/library/admin/${props.lesson.id}/edit`}
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          {props.editLabel}
        </Link>

        <DeleteLessonButton
          id={props.lesson.id}
          label={props.deleteLabel}
          confirmText={props.deleteConfirm}
          action={deleteLessonAction}
        />
      </div>
    </div>
  </div>
);
