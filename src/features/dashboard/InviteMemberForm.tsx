import { buttonVariants } from '@/components/ui/buttonVariants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ORG_ROLE } from '@/types/Auth';
import { inviteMemberAction } from './actions';

export const InviteMemberForm = (props: {
  labels: {
    email: string;
    role: string;
    roleAdmin: string;
    roleCoordinator: string;
    roleLearner: string;
    submit: string;
  };
}) => (
  <form action={inviteMemberAction} className="flex flex-wrap items-end gap-3">
    <div className="flex flex-col gap-2">
      <Label htmlFor="emailAddress">{props.labels.email}</Label>
      <Input
        id="emailAddress"
        name="emailAddress"
        type="email"
        required
        className="w-64"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="role">{props.labels.role}</Label>
      <select
        id="role"
        name="role"
        defaultValue={ORG_ROLE.LEARNER}
        className="
          h-9 rounded-md border border-input bg-transparent px-2 text-sm
        "
      >
        <option value={ORG_ROLE.ADMIN}>{props.labels.roleAdmin}</option>
        <option value={ORG_ROLE.COORDINATOR}>{props.labels.roleCoordinator}</option>
        <option value={ORG_ROLE.LEARNER}>{props.labels.roleLearner}</option>
      </select>
    </div>

    <button type="submit" className={buttonVariants()}>
      {props.labels.submit}
    </button>
  </form>
);
