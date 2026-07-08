import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { getOrgLearners } from '@/features/dashboard/learners';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { unassignLessonAction, updateAssignmentDueDateAction } from '@/features/library/actions';
import { AssignLessonForm } from '@/features/library/AssignLessonForm';
import { computeAssignmentStatus } from '@/features/library/assignmentStatus';
import { AssignmentStatusPill } from '@/features/library/AssignmentStatusPill';
import { DeleteLessonButton } from '@/features/library/DeleteLessonButton';
import { getAssignmentsForOrg, getLessonsForRole } from '@/features/library/queries';
import { getEffectiveAuth, roleHasPermission } from '@/libs/Auth';
import { ORG_PERMISSION } from '@/types/Auth';

export default async function AssignmentsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'AssignmentsPage',
  });

  const ctx = await getEffectiveAuth();

  if (!ctx || !roleHasPermission(ctx.role, ORG_PERMISSION.ASSIGN_LESSONS)) {
    redirect('/dashboard/library');
  }

  const [lessons, learners, assignments] = await Promise.all([
    getLessonsForRole(ctx.orgId, ctx.role, ctx.userId),
    getOrgLearners(ctx.orgId),
    getAssignmentsForOrg(ctx.orgId),
  ]);

  const learnerNameById = new Map(learners.map(learner => [learner.id, learner.name]));

  const statusLabels = {
    green: t('status_green'),
    yellow: t('status_yellow'),
    red: t('status_red'),
  };

  const progressLabels = {
    not_started: t('progress_not_started'),
    in_progress: t('progress_in_progress'),
    finished: t('progress_finished'),
  };

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="mb-8 rounded-xl border border-border bg-background p-5">
        <div className="mb-3 text-lg font-bold">{t('add_heading')}</div>
        {lessons.length === 0 || learners.length === 0
          ? <p className="text-sm text-muted-foreground">{t('no_lessons_or_learners')}</p>
          : (
              <AssignLessonForm
                lessons={lessons}
                learners={learners}
                labels={{
                  lesson: t('field_lesson'),
                  learners: t('field_learners'),
                  dueDate: t('field_due_date'),
                  submit: t('submit_assign'),
                }}
              />
            )}
      </div>

      {assignments.length === 0
        ? <p className="text-sm text-muted-foreground">{t('empty_state')}</p>
        : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted">
                  <tr>
                    <th className="p-3 font-medium">{t('col_lesson')}</th>
                    <th className="p-3 font-medium">{t('col_learner')}</th>
                    <th className="p-3 font-medium">{t('col_due_date')}</th>
                    <th className="p-3 font-medium">{t('col_status')}</th>
                    <th className="p-3 font-medium">{t('col_actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => {
                    const { status, progressLabel } = computeAssignmentStatus(assignment);
                    const dueDateValue = assignment.dueDate
                      ? assignment.dueDate.toISOString().slice(0, 10)
                      : '';

                    return (
                      <tr
                        key={assignment.id}
                        className="
                          border-b border-border
                          last:border-0
                        "
                      >
                        <td className="p-3">{assignment.lessonTitle}</td>
                        <td className="p-3">{learnerNameById.get(assignment.learnerUserId) ?? assignment.learnerUserId}</td>
                        <td className="p-3">
                          <form
                            action={updateAssignmentDueDateAction.bind(null, assignment.id)}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="date"
                              name="dueDate"
                              defaultValue={dueDateValue}
                              className="
                                h-8 rounded-md border border-input
                                bg-transparent px-2 text-sm
                              "
                            />
                            <button type="submit" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                              {t('save')}
                            </button>
                          </form>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col gap-1">
                            <AssignmentStatusPill status={status} label={statusLabels[status]} />
                            <span className="text-xs text-muted-foreground">{progressLabels[progressLabel]}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <DeleteLessonButton
                            id={assignment.id}
                            label={t('unassign')}
                            confirmText={t('unassign_confirm')}
                            action={unassignLessonAction}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
    </>
  );
};
