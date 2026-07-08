'use client';

import type { ReadinessRecord } from './cleanroomShowcaseData';
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Factory,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  deferredScope,
  discoverySteps,
  lessonSteps,
  readinessRecords,
  requirementMap,
  skillAreas,
} from './cleanroomShowcaseData';

const statusClasses: Record<ReadinessRecord['status'], string> = {
  'Ready': 'border-transparent bg-emerald-600 text-white',
  'Needs verification': 'border-transparent bg-amber-500 text-white',
  'Overdue': 'border-transparent bg-red-600 text-white',
};

const walkthrough = [
  ['01', 'Frame', '2 min'],
  ['02', 'Discover', '4 min'],
  ['03', 'Design', '5 min'],
  ['04', 'Experience', '9 min'],
  ['05', 'Evidence', '5 min'],
];

const SectionHeading = (props: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="
    mb-5 flex flex-col gap-2
    sm:flex-row sm:items-end sm:justify-between sm:gap-8
  "
  >
    <div className="flex items-start gap-3">
      <span className="mt-1 font-mono text-xs text-primary">{props.number}</span>
      <h2 className="text-2xl font-semibold">{props.title}</h2>
    </div>
    <p className="
      max-w-xl text-sm text-muted-foreground
      sm:text-right
    "
    >
      {props.description}
    </p>
  </div>
);

const Outcome = (props: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex gap-3">
    <div className="mt-0.5">{props.icon}</div>
    <div>
      <div className="text-sm font-semibold">{props.title}</div>
      <p className="mt-1 text-xs/5 text-muted-foreground">{props.description}</p>
    </div>
  </div>
);

export const CleanroomShowcase = () => {
  const [activeSkillId, setActiveSkillId] = useState(skillAreas[0]!.id);
  const [lessonStep, setLessonStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const activeSkill = skillAreas.find(skill => skill.id === activeSkillId) ?? skillAreas[0]!;
  const activeLessonStep = lessonSteps[lessonStep]!;
  const answeredCorrectly = selectedOption === activeLessonStep.correctOption;
  const lessonComplete = completedSteps.length === lessonSteps.length;

  const advanceLesson = () => {
    if (!answeredCorrectly) {
      return;
    }

    setCompletedSteps(current => current.includes(lessonStep) ? current : [...current, lessonStep]);

    if (lessonStep < lessonSteps.length - 1) {
      setLessonStep(current => current + 1);
      setSelectedOption(null);
    }
  };

  const resetLesson = () => {
    setLessonStep(0);
    setSelectedOption(null);
    setCompletedSteps([]);
  };

  return (
    <div className="space-y-8">
      <header className="
        border-b border-border pb-6
        lg:flex lg:items-end lg:justify-between lg:gap-8
      "
      >
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="destructive">WIP</Badge>
            <Badge variant="outline">Internal showcase</Badge>
            <span className="text-sm text-muted-foreground">Static demo data</span>
          </div>
          <h1 className="text-3xl font-semibold">Cleanroom Operations Technician</h1>
          <p className="mt-2 text-base text-muted-foreground">
            From job requirements to verified capability evidence in one focused curriculum.
          </p>
        </div>
        <div className="
          mt-5 flex items-center gap-3 border-l-4 border-primary pl-4
          lg:mt-0
        "
        >
          <Clock3 className="size-5 text-primary" />
          <div>
            <div className="text-sm font-semibold">25-minute walkthrough</div>
            <div className="text-xs text-muted-foreground">Business leader interview format</div>
          </div>
        </div>
      </header>

      <nav
        aria-label="Walkthrough agenda"
        className="
          grid border-y border-border bg-card
          sm:grid-cols-5
        "
      >
        {walkthrough.map(([number, label, duration]) => (
          <a
            key={number}
            href={`#section-${number}`}
            className="
              flex min-h-16 items-center gap-3 border-b border-border px-4 py-3
              last:border-b-0
              hover:bg-muted
              sm:border-r sm:border-b-0
              sm:last:border-r-0
            "
          >
            <span className="font-mono text-xs text-muted-foreground">{number}</span>
            <span>
              <span className="block text-sm font-semibold">{label}</span>
              <span className="block text-xs text-muted-foreground">{duration}</span>
            </span>
          </a>
        ))}
      </nav>

      <section id="section-01" className="scroll-mt-6">
        <SectionHeading
          number="01"
          title="Assignment frame"
          description="A deliberate curriculum slice, not a full technician qualification program."
        />
        <div className="
          grid gap-6 border-t border-border pt-5
          lg:grid-cols-[1.4fr_0.6fr]
        "
        >
          <div>
            <h3 className="
              text-sm font-semibold text-muted-foreground uppercase
            "
            >
              Three selected skill areas
            </h3>
            <div className="mt-3 grid gap-3">
              {skillAreas.map(skill => (
                <div
                  key={skill.id}
                  className="flex items-start gap-4 border-b border-border pb-3"
                >
                  <span className="font-mono text-sm text-primary">{skill.number}</span>
                  <div>
                    <div className="font-semibold">{skill.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{skill.outcome}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-l border-border pl-5">
            <h3 className="
              text-sm font-semibold text-muted-foreground uppercase
            "
            >
              Explicitly set aside
            </h3>
            <ul className="mt-3 space-y-3">
              {deferredScope.map(item => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="
                    mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground
                  "
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="section-02" className="scroll-mt-6">
        <SectionHeading
          number="02"
          title="Requirement gathering & analysis"
          description="Start with observable work, then validate the curriculum with the people accountable for it."
        />
        <ol className="
          grid border-t border-border
          md:grid-cols-2
        "
        >
          {discoverySteps.map((step, index) => (
            <li
              key={step}
              className="
                flex min-h-24 gap-4 border-b border-border px-4 py-5
                md:odd:border-r
              "
            >
              <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-sm font-medium">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 overflow-x-auto border border-border">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-muted text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Job responsibility</th>
                <th className="px-4 py-3 font-semibold">Source reference</th>
                <th className="px-4 py-3 font-semibold">Required behavior</th>
                <th className="px-4 py-3 font-semibold">Selected area</th>
                <th className="px-4 py-3 font-semibold">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {requirementMap.map(row => (
                <tr
                  key={row.responsibility}
                  className="border-t border-border align-top"
                >
                  <td className="p-4 font-semibold">{row.responsibility}</td>
                  <td className="max-w-xs p-4 text-xs text-muted-foreground">{row.sourceReference}</td>
                  <td className="max-w-sm p-4 text-muted-foreground">{row.behavior}</td>
                  <td className="p-4">{row.skillArea}</td>
                  <td className="p-4">{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="section-03" className="scroll-mt-6">
        <SectionHeading
          number="03"
          title="Training program outline"
          description="Three focused skill areas, each connected to evidence and operational risk."
        />
        <div className="
          grid gap-2
          md:grid-cols-3
        "
        >
          {skillAreas.map(skill => (
            <button
              key={skill.id}
              type="button"
              onClick={() => setActiveSkillId(skill.id)}
              className={`
                min-h-24 border p-4 text-left transition-colors
                ${activeSkill.id === skill.id
              ? 'border-primary bg-primary text-primary-foreground'
              : `
                border-border bg-card
                hover:bg-muted
              `}
              `}
            >
              <span className="block font-mono text-xs opacity-70">{skill.number}</span>
              <span className="mt-2 block text-sm font-semibold">{skill.title}</span>
            </button>
          ))}
        </div>

        <div className="
          mt-4 grid gap-6 border border-border bg-card p-5
          lg:grid-cols-[0.75fr_1.25fr]
        "
        >
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {activeSkill.confidence}
                {' '}
                confidence
              </Badge>
              <span className="text-xs text-muted-foreground">Pending site-SME validation</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold">{activeSkill.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{activeSkill.outcome}</p>
            <div className="mt-5 border-t border-border pt-4">
              <div className="
                text-xs font-semibold text-muted-foreground uppercase
              "
              >
                Direct job-description source
              </div>
              <p className="mt-1 text-sm">{activeSkill.sourceReference}</p>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="
                text-xs font-semibold text-muted-foreground uppercase
              "
              >
                Assumption to validate
              </div>
              <p className="mt-1 text-sm">{activeSkill.assumptionToValidate}</p>
            </div>
            <div className="mt-5 border-l-2 border-amber-500 pl-3">
              <div className="
                text-xs font-semibold text-muted-foreground uppercase
              "
              >
                Risk if missing
              </div>
              <p className="mt-1 text-sm">{activeSkill.risk}</p>
            </div>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {activeSkill.cards.map((card, index) => (
              <div
                key={card.title}
                className="grid grid-cols-[1fr_auto] gap-4 py-4"
              >
                <div>
                  <div className="text-xs text-muted-foreground">
                    Capability Card
                    {index + 1}
                  </div>
                  <div className="mt-1 font-semibold">{card.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{card.evidence}</div>
                </div>
                <Badge variant="secondary" className="self-start">{card.duration}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="section-04" className="scroll-mt-6">
        <SectionHeading
          number="04"
          title="Learner experience"
          description="One priority launches through a common runtime and produces reviewable evidence."
        />
        <div className="
          grid gap-5
          lg:grid-cols-[0.65fr_1.35fr]
        "
        >
          <aside className="border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="
                text-xs font-semibold text-muted-foreground uppercase
              "
              >
                Today's Priority
              </span>
              <Badge className="border-transparent bg-amber-500 text-white">On track</Badge>
            </div>
            <div className="
              mt-5 flex size-10 items-center justify-center bg-primary
              text-primary-foreground
            "
            >
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Cleanroom Entry, Gowning, and Contamination Response</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete the decision check, then demonstrate the skill to your supervisor.
            </p>
            <div className="mt-5 border-t border-border pt-4">
              <div className="
                flex justify-between text-xs text-muted-foreground
              "
              >
                <span>Learning progress</span>
                <span>
                  {completedSteps.length}
                  /
                  {lessonSteps.length}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(completedSteps.length / lessonSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </aside>

          <div className="border border-border bg-background">
            <div className="
              flex items-center justify-between gap-4 border-b border-border
              bg-card px-5 py-3
            "
            >
              <div className="flex items-center gap-2">
                <Factory className="size-4 text-primary" />
                <span className="text-sm font-semibold">Capability Runtime</span>
              </div>
              <span className="text-xs text-muted-foreground">Native HTML · static simulation</span>
            </div>

            <div className="min-h-[430px] p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-primary uppercase">{activeLessonStep.eyebrow}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {lessonStep + 1}
                  {' '}
                  /
                  {lessonSteps.length}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold">{activeLessonStep.title}</h3>
              <p className="mt-2 max-w-2xl text-sm/6 text-muted-foreground">
                {activeLessonStep.body}
              </p>
              <div className="mt-6 text-sm font-semibold">{activeLessonStep.prompt}</div>

              <div className="mt-3 grid gap-2">
                {activeLessonStep.options.map((option, index) => {
                  const selected = selectedOption === index;
                  const showCorrect = selected && index === activeLessonStep.correctOption;
                  const showIncorrect = selected && index !== activeLessonStep.correctOption;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedOption(index)}
                      className={`
                        flex min-h-14 items-center gap-3 border px-4 py-3
                        text-left text-sm transition-colors
                        ${showCorrect
                      ? `border-emerald-600 bg-emerald-50 text-emerald-950`
                      : ''}
                        ${showIncorrect
                      ? `border-red-600 bg-red-50 text-red-950`
                      : ''}
                        ${!selected
                      ? `
                        border-border
                        hover:bg-muted
                      `
                      : ''}
                      `}
                    >
                      <span className="
                        flex size-6 shrink-0 items-center justify-center border
                        border-current font-mono text-xs
                      "
                      >
                        {showCorrect ? <Check className="size-4" /> : String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className={`
                  mt-4 border-l-4 px-4 py-3 text-sm
                  ${answeredCorrectly
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : 'border-red-600 bg-red-50 text-red-950'}
                `}
                >
                  {answeredCorrectly
                    ? 'Correct. This decision is now part of the simulated evidence trail.'
                    : 'Not quite. Use the approved procedure and protect the controlled environment before continuing.'}
                </div>
              )}

              <div className="mt-5 flex items-center justify-between gap-3">
                <Button variant="ghost" size="sm" onClick={resetLesson}>
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
                <Button
                  onClick={advanceLesson}
                  disabled={!answeredCorrectly || (lessonStep === lessonSteps.length - 1 && lessonComplete)}
                >
                  {lessonStep === lessonSteps.length - 1 ? 'Record evidence' : 'Continue'}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 border border-border bg-card">
          <div className="
            flex items-center gap-2 border-b border-border px-5 py-3
          "
          >
            <BookOpenCheck className="size-4 text-primary" />
            <h3 className="text-sm font-semibold">Evidence emitted by the walkthrough</h3>
          </div>
          <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
          "
          >
            {[
              ['Assigned', true],
              ['Started', completedSteps.length > 0 || selectedOption !== null],
              ['Knowledge complete', lessonComplete],
              ['Supervisor verified', false],
            ].map(([label, complete], index) => (
              <div
                key={String(label)}
                className="
                  flex min-h-20 items-center gap-3 border-b border-border p-4
                  sm:odd:border-r
                  lg:border-r lg:border-b-0
                  lg:last:border-r-0
                "
              >
                {complete
                  ? <CheckCircle2 className="size-5 text-emerald-600" />
                  : <Clock3 className="size-5 text-muted-foreground" />}
                <div>
                  <div className="text-sm font-semibold">{label}</div>
                  <div className="text-xs text-muted-foreground">
                    {index === 3 ? 'Required for Ready' : complete ? 'Evidence present' : 'Not yet recorded'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {lessonComplete && (
            <div className="
              flex items-start gap-3 border-t border-amber-300 bg-amber-50 px-5
              py-4 text-amber-950
            "
            >
              <UserCheck className="mt-0.5 size-5 shrink-0" />
              <div>
                <div className="text-sm font-semibold">Learning complete · Needs verification</div>
                <p className="mt-1 text-xs">
                  Completion alone does not produce Ready. A supervisor must observe the gowning procedure.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="section-05" className="scroll-mt-6">
        <SectionHeading
          number="05"
          title="Supervisor readiness view"
          description="Capability-level evidence, not a production readiness score."
        />
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Learner</th>
                <th className="px-4 py-3 font-semibold">Capability</th>
                <th className="px-4 py-3 font-semibold">Learning evidence</th>
                <th className="px-4 py-3 font-semibold">Supervisor verification</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {readinessRecords.map(record => (
                <tr key={record.learner} className="border-t border-border">
                  <td className="p-4 font-semibold">{record.learner}</td>
                  <td className="p-4">{record.capability}</td>
                  <td className="p-4 text-muted-foreground">{record.learningEvidence}</td>
                  <td className="p-4 text-muted-foreground">{record.verification}</td>
                  <td className="p-4">
                    <Badge className={statusClasses[record.status]}>{record.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="
          mt-5 grid gap-4 border-t border-border pt-5
          md:grid-cols-3
        "
        >
          <Outcome
            icon={<CheckCircle2 className="size-5 text-emerald-600" />}
            title="Ready"
            description="Required learning and current supervisor evidence are present."
          />
          <Outcome
            icon={<ClipboardCheck className="size-5 text-amber-600" />}
            title="Needs verification"
            description="Learning evidence exists, but observed performance is still required."
          />
          <Outcome
            icon={<AlertTriangle className="size-5 text-red-600" />}
            title="Overdue"
            description="Required learning evidence is incomplete after its due date."
          />
        </div>
      </section>

      <footer className="
        flex flex-col gap-4 border-t border-border pt-6
        sm:flex-row sm:items-center sm:justify-between
      "
      >
        <div>
          <div className="text-sm font-semibold">Justification and confidence</div>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            The three areas represent contamination control, product traceability, and abnormal-response behavior.
            Site SOPs, MES workflows, and alarm matrices remain required before production use.
          </p>
        </div>
        <Badge
          variant="outline"
          className="
            self-start
            sm:self-auto
          "
        >
          Interview-aligned WIP
        </Badge>
      </footer>
    </div>
  );
};
