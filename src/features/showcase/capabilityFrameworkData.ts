export type FrameworkStageId
  = | 'business-need'
    | 'operational-discovery'
    | 'capability-blueprint'
    | 'capability-experiences'
    | 'evidence-stewardship';

export type FrameworkStage = {
  id: FrameworkStageId;
  number: string;
  title: string;
  shortLabel: string;
  purpose: string;
  keyQuestions: string[];
  participants?: string[];
  deliverables: string[];
  visualLabel: string;
  visualDetail: string;
};

export const frameworkStages: FrameworkStage[] = [
  {
    id: 'business-need',
    number: '01',
    title: 'Business Need',
    shortLabel: 'Need',
    purpose: 'Anchor capability work in an operational outcome.',
    keyQuestions: [
      'What must improve in the work?',
      'What risk or performance gap matters now?',
    ],
    participants: ['Business leader', 'Operations leader'],
    deliverables: ['Outcome statement', 'Success measures'],
    visualLabel: 'Operational outcome',
    visualDetail: 'Safer, consistent cleanroom performance',
  },
  {
    id: 'operational-discovery',
    number: '02',
    title: 'Operational Discovery',
    shortLabel: 'Discover',
    purpose: 'Understand the real work, decisions, context, and constraints.',
    keyQuestions: [
      'What do strong performers do?',
      'Where do errors, judgment, and risk appear?',
    ],
    participants: ['Technicians', 'Supervisors', 'SMEs'],
    deliverables: ['Task analysis', 'Critical incidents'],
    visualLabel: 'Work signals',
    visualDetail: 'Responsibilities + decisions + risk',
  },
  {
    id: 'capability-blueprint',
    number: '03',
    title: 'Capability Blueprint',
    shortLabel: 'Blueprint',
    purpose: 'Translate the work into a traceable capability and evidence structure.',
    keyQuestions: [
      'What must the technician perform?',
      'What enables performance, and what proves it?',
    ],
    participants: ['Learning architect', 'SMEs', 'Supervisors'],
    deliverables: ['Capability hierarchy', 'Evidence plan'],
    visualLabel: 'Traceable design',
    visualDetail: 'Objective → work → learning → evidence',
  },
  {
    id: 'capability-experiences',
    number: '04',
    title: 'Capability Experiences',
    shortLabel: 'Experience',
    purpose: 'Create focused practice around authentic work and decisions.',
    keyQuestions: [
      'What should learners practice?',
      'Where is coaching or feedback essential?',
    ],
    participants: ['Learners', 'SMEs', 'Facilitators'],
    deliverables: ['Capability cards', 'Practice scenarios'],
    visualLabel: 'Practice loop',
    visualDetail: 'Learn → decide → practice → reflect',
  },
  {
    id: 'evidence-stewardship',
    number: '05',
    title: 'Evidence & Stewardship',
    shortLabel: 'Evidence',
    purpose: 'Make evidence useful, reviewable, and responsible over time.',
    keyQuestions: [
      'What supports supervisor confidence?',
      'Who reviews evidence and maintains standards?',
    ],
    participants: ['Supervisors', 'Program owner', 'Learners'],
    deliverables: ['Readiness signals', 'Review cadence'],
    visualLabel: 'Evidence flow',
    visualDetail: 'Capture → verify → act → improve',
  },
];

export type BlueprintLevel = {
  id: string;
  title: string;
  example: string;
  prompt: string;
};

export const blueprintLevels: BlueprintLevel[] = [
  {
    id: 'terminal-objective',
    title: 'Terminal Objective',
    example: 'Perform assigned cleanroom work safely and consistently.',
    prompt: 'The observable end-state required on the job.',
  },
  {
    id: 'performance-areas',
    title: 'Performance Areas',
    example: 'Contamination control · lot traceability · alarm response',
    prompt: 'The major domains of technician performance.',
  },
  {
    id: 'task-analysis',
    title: 'Task Analysis',
    example: 'Enter, handle, document, respond, and escalate.',
    prompt: 'Actions, decisions, conditions, and standards.',
  },
  {
    id: 'enabling-objectives',
    title: 'Enabling Objectives',
    example: 'Select the correct response to a contamination event.',
    prompt: 'Near-term outcomes that build job performance.',
  },
  {
    id: 'foundation-skills',
    title: 'Foundation Skills',
    example: 'Protocol knowledge · observation · documentation',
    prompt: 'Knowledge and skills that enable sound decisions.',
  },
  {
    id: 'evidence-plan',
    title: 'Evidence Plan',
    example: 'Decision evidence + observed demonstration + verification',
    prompt: 'The proof needed for supervisor confidence.',
  },
];
