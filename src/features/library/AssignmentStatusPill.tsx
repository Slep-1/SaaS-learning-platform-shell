import type { AssignmentStatus } from './assignmentStatus';
import { Badge } from '@/components/ui/badge';

const STATUS_CLASSES: Record<AssignmentStatus, string> = {
  green: 'border-transparent bg-emerald-600 text-white',
  yellow: 'border-transparent bg-amber-500 text-white',
  red: 'border-transparent bg-red-600 text-white',
};

export const AssignmentStatusPill = (props: { status: AssignmentStatus; label: string }) => (
  <Badge className={STATUS_CLASSES[props.status]}>{props.label}</Badge>
);
