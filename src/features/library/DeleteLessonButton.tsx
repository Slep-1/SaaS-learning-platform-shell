'use client';

import { buttonVariants } from '@/components/ui/buttonVariants';

export const DeleteLessonButton = (props: {
  id: number;
  label: string;
  confirmText: string;
  action: (id: number) => Promise<void>;
}) => (
  <form
    action={props.action.bind(null, props.id)}
    onSubmit={(event) => {
      // eslint-disable-next-line no-alert
      if (!window.confirm(props.confirmText)) {
        event.preventDefault();
      }
    }}
  >
    <button type="submit" className={buttonVariants({ variant: 'destructive', size: 'sm' })}>
      {props.label}
    </button>
  </form>
);
