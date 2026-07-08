export type FrameworkStage = {
  number: string;
  title: string;
  description: string;
};

export const frameworkStages: FrameworkStage[] = [
  {
    number: '01',
    title: 'Understand the Work',
    description: 'Study responsibilities, decisions, risks, and work context.',
  },
  {
    number: '02',
    title: 'Define Critical Capabilities',
    description: 'Name the behaviors that matter most on the job.',
  },
  {
    number: '03',
    title: 'Design Capability Experiences',
    description: 'Create focused practice around real decisions.',
  },
  {
    number: '04',
    title: 'Collect Evidence',
    description: 'Capture decisions, demonstrations, and verification.',
  },
  {
    number: '05',
    title: 'Support Workforce Readiness',
    description: 'Show what is ready, pending, or overdue.',
  },
];

export const applicationFlow = [
  {
    label: 'Job Description',
    detail: 'Cleanroom Operations Technician',
  },
  {
    label: 'Critical Responsibilities',
    detail: 'Protocols · traceability · alarm response',
  },
  {
    label: 'Three Selected Skill Areas',
    detail: 'A focused curriculum slice',
  },
  {
    label: 'Capability Cards',
    detail: 'Short, decision-based practice',
  },
  {
    label: 'Evidence Requirements',
    detail: 'Completion · choices · verification',
  },
];

export const selectedSkillAreas = [
  'Cleanroom & Contamination Control',
  'Wafer Handling & MES Lot Tracking',
  'Alarm Response & Escalation',
];

export const evidenceComparison = [
  {
    completion: 'Content was viewed',
    evidence: 'A job decision was made',
  },
  {
    completion: 'Activity ended',
    evidence: 'A task was demonstrated',
  },
  {
    completion: 'A score was recorded',
    evidence: 'Performance was verified',
  },
];
