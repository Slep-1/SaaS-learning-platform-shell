import type { LearnerPriorityAssignment } from '@/features/library/queries';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { computeAssignmentStatus } from '@/features/library/assignmentStatus';
import { Link } from '@/libs/I18nNavigation';

type TodayPrioritiesLabels = {
  learnTitle: string;
  learnDescription: string;
  continueButton: string;
  emptyLearnTitle: string;
  emptyLearnDescription: string;
  verifyTitle: string;
  verifyDescription: string;
  askTitle: string;
  askDescription: string;
  updatesTitle: string;
  updatesDescription: string;
  comingSoon: string;
  statusGreen: string;
  statusYellow: string;
  statusRed: string;
  progressNotStarted: string;
  progressInProgress: string;
  progressFinished: string;
  dueDate: string;
  noDueDate: string;
  remainingCountOne: string;
  remainingCountOther: string;
};

const LearnPriority = (props: {
  assignment: LearnerPriorityAssignment;
  remainingCount: number;
  labels: TodayPrioritiesLabels;
}) => {
  const { status, progressLabel } = computeAssignmentStatus(props.assignment);
  const statusLabel = {
    green: props.labels.statusGreen,
    yellow: props.labels.statusYellow,
    red: props.labels.statusRed,
  }[status];
  const progressText = {
    not_started: props.labels.progressNotStarted,
    in_progress: props.labels.progressInProgress,
    finished: props.labels.progressFinished,
  }[progressLabel];
  const dueDateText = props.assignment.dueDate
    ? props.labels.dueDate.replace('{date}', props.assignment.dueDate.toLocaleDateString())
    : props.labels.noDueDate;

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`
          rounded-full px-3 py-1 text-xs font-semibold
          ${status === 'red' ? 'bg-destructive/10 text-destructive' : ''}
          ${status === 'yellow' ? 'bg-amber-100 text-amber-800' : ''}
          ${status === 'green' ? 'bg-emerald-100 text-emerald-800' : ''}
        `}
        >
          {statusLabel}
        </span>
        <span className="text-sm text-muted-foreground">{progressText}</span>
      </div>

      <h2 className="mt-4 max-w-3xl text-3xl font-bold">{props.assignment.lessonTitle}</h2>
      <p className="mt-2 max-w-3xl text-muted-foreground">{props.assignment.lessonDescription}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href={`/dashboard/library/${props.assignment.lessonId}`} className={buttonVariants({ size: 'lg' })}>
          {props.labels.continueButton}
          <ArrowRightIcon className="ml-1 size-5" />
        </Link>
        <span className="text-sm text-muted-foreground">{dueDateText}</span>
      </div>

      {props.remainingCount > 1 && (
        <p className="mt-4 text-sm text-muted-foreground">
          {(props.remainingCount === 2
            ? props.labels.remainingCountOne
            : props.labels.remainingCountOther
          ).replace('{count}', String(props.remainingCount - 1))}
        </p>
      )}
    </div>
  );
};

const PriorityPlaceholder = (props: {
  title: string;
  description: string;
  comingSoon: string;
}) => (
  <section className="
    rounded-md border border-dashed border-border bg-muted/40 p-5
  "
  >
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="font-semibold">{props.title}</div>
      <span className="
        rounded-full bg-muted px-2.5 py-1 text-xs font-semibold
        text-muted-foreground
      "
      >
        {props.comingSoon}
      </span>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{props.description}</p>
  </section>
);

export const TodayPriorities = (props: {
  assignments: LearnerPriorityAssignment[];
  labels: TodayPrioritiesLabels;
}) => {
  const primaryAssignment = props.assignments.find(assignment => assignment.completedAt === null);
  const remainingCount = props.assignments.filter(assignment => assignment.completedAt === null).length;

  return (
    <div className="
      grid gap-4
      lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]
    "
    >
      <section className="rounded-md border border-border bg-card p-5">
        <div className="text-sm font-semibold text-muted-foreground">{props.labels.learnTitle}</div>
        <p className="mt-1 text-sm text-muted-foreground">{props.labels.learnDescription}</p>
        {primaryAssignment
          ? (
              <LearnPriority
                assignment={primaryAssignment}
                remainingCount={remainingCount}
                labels={props.labels}
              />
            )
          : (
              <div className="mt-4">
                <div className="text-2xl font-bold">{props.labels.emptyLearnTitle}</div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{props.labels.emptyLearnDescription}</p>
              </div>
            )}
      </section>

      <div className="grid gap-4">
        <PriorityPlaceholder
          title={props.labels.verifyTitle}
          description={props.labels.verifyDescription}
          comingSoon={props.labels.comingSoon}
        />
        <PriorityPlaceholder
          title={props.labels.askTitle}
          description={props.labels.askDescription}
          comingSoon={props.labels.comingSoon}
        />
        <PriorityPlaceholder
          title={props.labels.updatesTitle}
          description={props.labels.updatesDescription}
          comingSoon={props.labels.comingSoon}
        />
      </div>
    </div>
  );
};
