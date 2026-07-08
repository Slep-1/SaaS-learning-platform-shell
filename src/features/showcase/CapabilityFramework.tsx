'use client';

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Layers3,
  Presentation,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/libs/I18nNavigation';
import {
  applicationFlow,
  evidenceComparison,
  frameworkStages,
  selectedSkillAreas,
} from './capabilityFrameworkData';

const SCREEN_COUNT = 5;

const screenLabels = [
  'Building Workforce Capability',
  'Capability Development Framework',
  'Applying the Framework',
  'Why Evidence Matters',
  'Transition to Walkthrough',
];

const StageHeader = (props: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <header className="max-w-5xl">
    <div className="text-sm font-semibold text-primary uppercase">{props.eyebrow}</div>
    <h1 className="
      mt-4 max-w-5xl text-5xl/13 font-semibold
      sm:text-6xl/16
      lg:text-7xl/18
    "
    >
      {props.title}
    </h1>
    {props.description && (
      <p className="
        mt-6 max-w-4xl text-xl/8 text-muted-foreground
        sm:text-2xl/9
      "
      >
        {props.description}
      </p>
    )}
  </header>
);

const ScreenOne = () => (
  <div className="
    grid h-full content-center gap-14
    lg:grid-cols-[1.35fr_0.65fr] lg:items-center
  "
  >
    <StageHeader
      eyebrow="Discovery & Industry Analysis"
      title="Building Workforce Capability"
      description="From Job Analysis to Workforce Readiness"
    />
    <div className="border-l-4 border-primary py-3 pl-8">
      <BriefcaseBusiness className="size-10 text-primary" />
      <div className="
        mt-8 text-sm font-semibold text-muted-foreground uppercase
      "
      >
        Interview assignment
      </div>
      <div className="mt-3 text-3xl/9 font-semibold">Cleanroom Operations Technician</div>
      <p className="mt-5 text-base/7 text-muted-foreground">
        Curriculum discovery, capability design, and evidence requirements.
      </p>
    </div>
  </div>
);

const ScreenTwo = () => (
  <div className="grid h-full content-center">
    <StageHeader
      eyebrow="The methodology"
      title="Capability Development Framework"
      description="A practical path from job requirements to supervisor-usable evidence."
    />
    <div className="
      mt-12 grid border-y border-border
      lg:grid-cols-5
    "
    >
      {frameworkStages.map((stage, index) => (
        <div
          key={stage.number}
          className="
            relative min-h-30 border-b border-border px-5 py-6
            last:border-b-0
            lg:min-h-52 lg:border-r lg:border-b-0
            lg:last:border-r-0
          "
        >
          <div className="font-mono text-xs text-primary">{stage.number}</div>
          <h2 className="mt-5 text-lg/6 font-semibold">{stage.title}</h2>
          <p className="mt-4 text-sm/6 text-muted-foreground">{stage.description}</p>
          {index < frameworkStages.length - 1 && (
            <ArrowRight className="
              absolute right-3 bottom-3 size-4 text-muted-foreground
              max-lg:rotate-90
              lg:top-6 lg:-right-2.5 lg:bottom-auto lg:z-10 lg:bg-muted
            "
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

const ScreenThree = () => (
  <div className="grid h-full content-center">
    <StageHeader
      eyebrow="The interview assignment"
      title="Applying the Framework"
      description="The job description stays the source. Curriculum and evidence trace back to the work."
    />
    <div className="
      mt-10 grid border-y border-border
      lg:grid-cols-5
    "
    >
      {applicationFlow.map((step, index) => (
        <div
          key={step.label}
          className="
            relative min-h-24 border-b border-border p-5
            last:border-b-0
            lg:min-h-36 lg:border-r lg:border-b-0
            lg:last:border-r-0
          "
        >
          <div className="text-xs font-semibold text-primary">{step.label}</div>
          <div className="mt-4 text-sm/6 font-medium">{step.detail}</div>
          {index < applicationFlow.length - 1 && (
            <ArrowRight className="
              absolute right-3 bottom-3 size-4 text-muted-foreground
              max-lg:rotate-90
              lg:top-5 lg:-right-2.5 lg:bottom-auto lg:z-10 lg:bg-background
            "
            />
          )}
        </div>
      ))}
    </div>
    <div className="
      mt-8 grid gap-4
      md:grid-cols-3
    "
    >
      {selectedSkillAreas.map((skill, index) => (
        <div
          key={skill}
          className="
            flex min-h-24 items-center gap-5 border-l-4 border-primary bg-card
            px-5 py-4
          "
        >
          <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-base/6 font-semibold">{skill}</span>
        </div>
      ))}
    </div>
  </div>
);

const ScreenFour = () => (
  <div className="grid h-full content-center">
    <StageHeader
      eyebrow="The measurement distinction"
      title="Training completion is not the same as job readiness."
      description="Completion is one signal. Evidence gives supervisors a stronger basis for confidence."
    />
    <div className="
      mt-10 grid gap-8
      lg:grid-cols-2
    "
    >
      <section className="border-t-4 border-muted-foreground bg-card p-7">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="size-6 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Training completion shows</h2>
        </div>
        <div className="mt-7 space-y-4">
          {evidenceComparison.map(row => (
            <div
              key={row.completion}
              className="
                flex min-h-12 items-center gap-3 text-base text-muted-foreground
              "
            >
              <CheckCircle2 className="size-4 shrink-0" />
              {row.completion}
            </div>
          ))}
        </div>
      </section>
      <section className="border-t-4 border-primary bg-card p-7">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-6 text-primary" />
          <h2 className="text-xl font-semibold">Capability evidence supports</h2>
        </div>
        <div className="mt-7 space-y-4">
          {evidenceComparison.map(row => (
            <div
              key={row.evidence}
              className="flex min-h-12 items-center gap-3 text-base font-medium"
            >
              <Eye className="size-4 shrink-0 text-primary" />
              {row.evidence}
            </div>
          ))}
        </div>
      </section>
    </div>
    <div className="mt-8 flex items-center gap-4 border-l-4 border-primary pl-5">
      <Target className="size-6 shrink-0 text-primary" />
      <p className="text-xl font-semibold">Evidence supports supervisor confidence.</p>
    </div>
  </div>
);

const ScreenFive = () => (
  <div className="
    grid h-full content-center gap-14
    lg:grid-cols-[1.25fr_0.75fr] lg:items-center
  "
  >
    <div>
      <div className="
        flex size-14 items-center justify-center bg-primary
        text-primary-foreground
      "
      >
        <Presentation className="size-7" />
      </div>
      <h1 className="
        mt-8 max-w-4xl text-5xl/13 font-semibold
        sm:text-6xl/16
        lg:text-7xl/18
      "
      >
        Everything so far is methodology.
      </h1>
      <p className="
        mt-6 max-w-3xl text-2xl/9 text-muted-foreground
        sm:text-3xl/10
      "
      >
        Now let&apos;s see how it becomes a learning solution.
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/dashboard/showcase">
          Begin Interactive Walkthrough
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
    <div className="border-l border-border py-3 pl-8">
      <div className="text-sm font-semibold text-muted-foreground uppercase">Operationalizing the method</div>
      <div className="mt-7 space-y-5">
        {[
          [Layers3, 'Capability Cards'],
          [Sparkles, 'Decision Practice'],
          [Search, 'Reviewable Evidence'],
          [ShieldCheck, 'Supervisor verification'],
        ].map(([Icon, label]) => {
          const FeatureIcon = Icon as typeof Layers3;

          return (
            <div
              key={label as string}
              className="flex items-center gap-4 text-base font-semibold"
            >
              <FeatureIcon className="size-6 text-primary" />
              {label as string}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const screens = [
  <ScreenOne key="screen-one" />,
  <ScreenTwo key="screen-two" />,
  <ScreenThree key="screen-three" />,
  <ScreenFour key="screen-four" />,
  <ScreenFive key="screen-five" />,
];

export const CapabilityFramework = () => {
  const [activeScreen, setActiveScreen] = useState(0);

  const goBack = () => setActiveScreen(current => Math.max(0, current - 1));
  const goNext = () => setActiveScreen(current => Math.min(SCREEN_COUNT - 1, current + 1));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goBack();
      } else if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="
      flex min-h-[calc(100vh-144px)] flex-col overflow-hidden border
      border-border bg-background
    "
    >
      <div className="
        flex flex-wrap items-center justify-between gap-3 border-b border-border
        bg-card px-4 py-3
      "
      >
        <div className="flex items-center gap-2">
          <Badge variant="destructive">WIP</Badge>
          <Badge variant="outline">Internal showcase</Badge>
          <span className="
            hidden text-xs text-muted-foreground
            sm:inline
          "
          >
            Interview storyboard
          </span>
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          {activeScreen + 1}
          {' '}
          of
          {SCREEN_COUNT}
        </div>
      </div>

      <div className="grid grid-cols-5 border-b border-border" aria-label="Storyboard progress">
        {screenLabels.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveScreen(index)}
            aria-label={`Go to screen ${index + 1}: ${label}`}
            aria-current={index === activeScreen ? 'step' : undefined}
            className={`
              h-2 border-r border-background
              last:border-r-0
              ${index <= activeScreen ? 'bg-primary' : 'bg-muted'}
            `}
          />
        ))}
      </div>

      <main
        aria-live="polite"
        className="
          min-h-0 flex-1 overflow-y-auto px-6 py-8
          sm:p-10
          lg:px-16 lg:py-12
        "
      >
        {screens[activeScreen]}
      </main>

      <footer className="
        flex items-center justify-between gap-4 border-t border-border bg-card
        px-4 py-3
      "
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          disabled={activeScreen === 0}
          aria-label="Previous storyboard screen"
        >
          <ArrowLeft className="size-4" />
          <span className="
            hidden
            sm:inline
          "
          >
            Back
          </span>
        </Button>
        <div className="
          hidden text-xs text-muted-foreground
          sm:block
        "
        >
          {screenLabels[activeScreen]}
        </div>
        {activeScreen < SCREEN_COUNT - 1
          ? (
              <Button
                size="sm"
                onClick={goNext}
                aria-label="Next storyboard screen"
              >
                <span className="
                  hidden
                  sm:inline
                "
                >
                  Next
                </span>
                <ArrowRight className="size-4" />
              </Button>
            )
          : (
              <Button asChild size="sm">
                <Link href="/dashboard/showcase">
                  Begin Walkthrough
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
      </footer>
    </div>
  );
};
