export type AssignmentStatus = 'green' | 'yellow' | 'red';
export type ProgressLabel = 'not_started' | 'in_progress' | 'finished';

export type AssignmentProgressInput = {
  dueDate: Date | null;
  startedAt: Date | null;
  midpointAt: Date | null;
  completedAt: Date | null;
};

export function computeAssignmentStatus(
  input: AssignmentProgressInput,
  now: Date = new Date(),
): { status: AssignmentStatus; progressLabel: ProgressLabel } {
  if (input.completedAt) {
    return { status: 'green', progressLabel: 'finished' };
  }

  const overdue = input.dueDate != null && input.dueDate.getTime() < now.getTime();

  return {
    status: overdue ? 'red' : 'yellow',
    progressLabel: (input.startedAt || input.midpointAt) ? 'in_progress' : 'not_started',
  };
}
