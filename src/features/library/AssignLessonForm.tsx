import type { LessonSummary } from './queries';
import type { OrgLearner } from '@/features/dashboard/learners';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { Label } from '@/components/ui/label';
import { assignLessonAction } from './actions';

export const AssignLessonForm = (props: {
  lessons: LessonSummary[];
  learners: OrgLearner[];
  labels: {
    lesson: string;
    learners: string;
    dueDate: string;
    submit: string;
  };
}) => (
  <form action={assignLessonAction} className="flex flex-wrap items-end gap-4">
    <div className="flex flex-col gap-2">
      <Label htmlFor="lessonId">{props.labels.lesson}</Label>
      <select
        id="lessonId"
        name="lessonId"
        required
        className="
          h-9 rounded-md border border-input bg-transparent px-2 text-sm
        "
      >
        {props.lessons.map(lesson => (
          <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
        ))}
      </select>
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="learnerUserIds">{props.labels.learners}</Label>
      <select
        id="learnerUserIds"
        name="learnerUserIds"
        multiple
        required
        className="
          h-24 min-w-48 rounded-md border border-input bg-transparent px-2 py-1
          text-sm
        "
      >
        {props.learners.map(learner => (
          <option key={learner.id} value={learner.id}>{learner.name}</option>
        ))}
      </select>
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="dueDate">{props.labels.dueDate}</Label>
      <input
        id="dueDate"
        name="dueDate"
        type="date"
        required
        className="
          h-9 rounded-md border border-input bg-transparent px-2 text-sm
        "
      />
    </div>

    <button type="submit" className={buttonVariants()}>
      {props.labels.submit}
    </button>
  </form>
);
