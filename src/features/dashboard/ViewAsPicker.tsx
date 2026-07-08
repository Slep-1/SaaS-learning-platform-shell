import { buttonVariants } from '@/components/ui/buttonVariants';
import { startViewAsAction } from './actions';
import { getOrgLearners } from './learners';

export const ViewAsPicker = async (props: { orgId: string; label: string; buttonLabel: string }) => {
  const learners = await getOrgLearners(props.orgId);

  if (learners.length === 0) {
    return null;
  }

  return (
    <form action={startViewAsAction} className="flex items-center gap-2">
      <label className="sr-only" htmlFor="learnerUserId">{props.label}</label>
      <select
        id="learnerUserId"
        name="learnerUserId"
        defaultValue=""
        required
        className="
          h-9 rounded-md border border-input bg-transparent px-2 text-sm
        "
      >
        <option value="" disabled>{props.label}</option>
        {learners.map(learner => (
          <option key={learner.id} value={learner.id}>{learner.name}</option>
        ))}
      </select>

      <button type="submit" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        {props.buttonLabel}
      </button>
    </form>
  );
};
