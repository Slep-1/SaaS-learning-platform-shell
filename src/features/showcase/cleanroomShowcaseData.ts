export type SkillArea = {
  id: 'cleanroom' | 'wafer' | 'alarm';
  number: string;
  title: string;
  outcome: string;
  risk: string;
  sourceReference: string;
  assumptionToValidate: string;
  confidence: 'High' | 'Medium';
  cards: Array<{
    title: string;
    duration: string;
    evidence: string;
  }>;
};

export type ReadinessRecord = {
  learner: string;
  capability: string;
  learningEvidence: string;
  verification: string;
  status: 'Ready' | 'Needs verification' | 'Overdue';
};

export const discoverySteps = [
  'Analyze responsibilities and expected technician behaviors',
  'Interview operations, quality, EHS, and experienced technicians',
  'Observe cleanroom entry, wafer movement, MES, and alarm workflows',
  'Review SOPs, work instructions, alarm matrices, and deviation records',
  'Rank tasks by frequency, consequence of error, and verification need',
  'Validate the curriculum and evidence criteria with site SMEs',
];

export const requirementMap = [
  {
    responsibility: 'Maintain cleanroom discipline',
    behavior: 'Enter correctly, recognize contamination risk, and escalate compromised conditions',
    skillArea: 'Cleanroom & Contamination Control',
    evidence: 'Decision check + observed gowning',
    sourceReference: 'JD: Follow cleanroom protocols and maintain contamination-control standards',
    assumptionToValidate: 'The site requires supervisor-observed gowning qualification',
  },
  {
    responsibility: 'Move product accurately',
    behavior: 'Protect wafers and preserve lot identity through MES transactions',
    skillArea: 'Wafer Handling & MES Lot Tracking',
    evidence: 'Scenario + observed transaction',
    sourceReference: 'JD: Handle wafers and use MES to track lots through production',
    assumptionToValidate: 'The local MES workflow includes holds, mismatches, and manual exception handling',
  },
  {
    responsibility: 'Respond to abnormal conditions',
    behavior: 'Recognize alarms, place work in a safe state, document, and escalate',
    skillArea: 'Alarm Response & Escalation',
    evidence: 'Timed scenario + supervisor sign-off',
    sourceReference: 'JD: Respond to equipment alarms and escalate issues according to procedure',
    assumptionToValidate: 'Technicians select safe-state actions before supervisor or maintenance escalation',
  },
];

export const skillAreas: SkillArea[] = [
  {
    id: 'cleanroom',
    number: '01',
    title: 'Cleanroom & Contamination Control',
    outcome: 'Protect the controlled environment while entering, working, and responding to contamination risk.',
    risk: 'Product contamination, yield loss, or an uncontrolled quality event.',
    sourceReference: 'JD: Follow cleanroom protocols and maintain contamination-control standards',
    assumptionToValidate: 'Exact gowning sequence, contamination response, and sign-off criteria come from site procedures',
    confidence: 'High',
    cards: [
      {
        title: 'Cleanroom Entry, Gowning, and Contamination Response',
        duration: '8 min',
        evidence: 'Knowledge decisions + supervisor observation',
      },
      {
        title: 'Cleanroom Behavior and Contamination Risks',
        duration: '6 min',
        evidence: 'Scenario check',
      },
      {
        title: 'Material Entry and Exit Fundamentals',
        duration: '7 min',
        evidence: 'Decision check',
      },
    ],
  },
  {
    id: 'wafer',
    number: '02',
    title: 'Wafer Handling & MES Lot Tracking',
    outcome: 'Handle wafers safely while preserving lot identity, status, and traceability.',
    risk: 'Wafer damage, lot mismatch, incorrect processing, or lost traceability.',
    sourceReference: 'JD: Handle wafers and use MES to track lots through production',
    assumptionToValidate: 'Carrier handling rules, MES transactions, and exception states vary by site and tool',
    confidence: 'Medium',
    cards: [
      {
        title: 'Safe Wafer and Carrier Handling',
        duration: '7 min',
        evidence: 'Handling scenario + observation',
      },
      {
        title: 'MES Lot Identification and Transaction Accuracy',
        duration: '9 min',
        evidence: 'Simulated transaction',
      },
      {
        title: 'Hold, Mismatch, and Traceability Response',
        duration: '6 min',
        evidence: 'Branching decision',
      },
    ],
  },
  {
    id: 'alarm',
    number: '03',
    title: 'Alarm Response & Escalation',
    outcome: 'Recognize abnormal conditions, protect work in process, and escalate through the correct path.',
    risk: 'Unsafe conditions, equipment or product impact, and delayed operational response.',
    sourceReference: 'JD: Respond to equipment alarms and escalate issues according to procedure',
    assumptionToValidate: 'Alarm classes, safe-state actions, documentation, and authority boundaries are site-specific',
    confidence: 'Medium',
    cards: [
      {
        title: 'Alarm Recognition and Immediate Response',
        duration: '7 min',
        evidence: 'Timed scenario',
      },
      {
        title: 'Stop, Safe-State, and Escalation Decisions',
        duration: '8 min',
        evidence: 'Branching decision + sign-off',
      },
      {
        title: 'Event Documentation and Handoff',
        duration: '6 min',
        evidence: 'Documentation exercise',
      },
    ],
  },
];

export const lessonSteps = [
  {
    eyebrow: 'Concept',
    title: 'Gowning sequence',
    body: 'Follow the site-approved sequence from personal preparation through garment checks. The production card would mirror the local SOP exactly.',
    prompt: 'Select the best governing rule for the sequence.',
    options: [
      'Follow the approved site SOP and stop if garment integrity is uncertain',
      'Use any sequence that keeps the process moving',
      'Rely on memory when the posted sequence is unavailable',
    ],
    correctOption: 0,
  },
  {
    eyebrow: 'Decision point',
    title: 'Contamination risk',
    body: 'During entry, your gloved hand contacts an uncontrolled surface before you cross into the clean area.',
    prompt: 'What is the safest next action?',
    options: [
      'Continue because the contact was brief',
      'Follow the approved recovery procedure and replace affected PPE before entry',
      'Enter first, then notify someone at the end of the shift',
    ],
    correctOption: 1,
  },
  {
    eyebrow: 'Decision point',
    title: 'Document and escalate',
    body: 'The contact may have affected material already transferred through the entry area. The site procedure requires potential product impact to be reported.',
    prompt: 'What should the technician do?',
    options: [
      'Correct the gowning issue without documenting the event',
      'Wait to see whether a defect is detected downstream',
      'Protect the area, notify the supervisor, and document through the approved process',
    ],
    correctOption: 2,
  },
  {
    eyebrow: 'Verification',
    title: 'Demonstrate the skill',
    body: 'The knowledge check is complete. A supervisor must still observe cleanroom entry and gowning against the approved checklist.',
    prompt: 'What readiness state applies before observation?',
    options: [
      'Ready',
      'Needs verification',
      'Overdue',
    ],
    correctOption: 1,
  },
];

export const readinessRecords: ReadinessRecord[] = [
  {
    learner: 'Jordan Lee',
    capability: 'Cleanroom entry',
    learningEvidence: 'Completed · decisions passed',
    verification: 'Observed and signed off',
    status: 'Ready',
  },
  {
    learner: 'Casey Morgan',
    capability: 'MES lot tracking',
    learningEvidence: 'Completed · scenario passed',
    verification: 'Observation pending',
    status: 'Needs verification',
  },
  {
    learner: 'Taylor Reed',
    capability: 'Alarm response',
    learningEvidence: 'Incomplete · due Jul 6',
    verification: 'Not requested',
    status: 'Overdue',
  },
];

export const deferredScope = [
  'Full tool preventive-maintenance support',
  'Hazardous gas and chemical-handling depth',
  'Automated SCORM or Rise conversion',
  'Production readiness scoring',
];
