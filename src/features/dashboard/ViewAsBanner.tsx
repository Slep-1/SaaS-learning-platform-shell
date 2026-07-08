import { buttonVariants } from '@/components/ui/buttonVariants';
import { exitViewAsAction } from './actions';

export const ViewAsBanner = (props: { label: string; exitLabel: string }) => (
  <div
    className="
      flex h-11 items-center justify-center gap-3 bg-[#2563eb] px-4 text-center
      text-sm font-medium text-white
    "
  >
    <span>{props.label}</span>
    <form action={exitViewAsAction}>
      <button
        type="submit"
        className={buttonVariants({ variant: 'secondary', size: 'sm' })}
      >
        {props.exitLabel}
      </button>
    </form>
  </div>
);
