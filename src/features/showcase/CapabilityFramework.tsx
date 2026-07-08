'use client';

import type {
  FrameworkStage,
  FrameworkStageId,
} from './capabilityFrameworkData';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Layers3,
  Network,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/libs/I18nNavigation';
import {
  blueprintLevels,
  frameworkStages,
} from './capabilityFrameworkData';

const stageIcons = {
  'business-need': Target,
  'operational-discovery': Search,
  'capability-blueprint': Network,
  'capability-experiences': Sparkles,
  'evidence-stewardship': ShieldCheck,
} satisfies Record<FrameworkStageId, typeof Target>;

const stageVisuals: Record<FrameworkStageId, string[]> = {
  'business-need': ['Business priority', 'Performance gap', 'Success measure'],
  'operational-discovery': ['Observe work', 'Interview experts', 'Map decisions'],
  'capability-blueprint': ['Job outcome', 'Capability structure', 'Evidence'],
  'capability-experiences': ['Learn', 'Practice', 'Feedback'],
  'evidence-stewardship': ['Capture', 'Verify', 'Improve'],
};

const DetailList = (props: {
  icon: typeof Users;
  label: string;
  items: string[];
}) => {
  const Icon = props.icon;

  return (
    <section>
      <div className="
        flex items-center gap-2 text-xs font-semibold text-muted-foreground
        uppercase
      "
      >
        <Icon className="size-4 text-primary" />
        {props.label}
      </div>
      <ul className="mt-2 space-y-1">
        {props.items.map(item => (
          <li key={item} className="flex gap-2 text-xs/4 font-medium">
            <span className="mt-2 size-1 shrink-0 bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

const StageVisual = ({ stage }: { stage: FrameworkStage }) => (
  <div className="mt-auto border-t border-border pt-4">
    <div className="text-xs font-semibold text-muted-foreground uppercase">
      {stage.visualLabel}
    </div>
    <div className="mt-3 flex items-center gap-2">
      {stageVisuals[stage.id].map((item, index) => (
        <div key={item} className="contents">
          <div className="
            flex min-h-12 flex-1 items-center justify-center border
            border-border bg-background px-2 text-center text-xs/4 font-semibold
          "
          >
            {item}
          </div>
          {index < stageVisuals[stage.id].length - 1 && (
            <ArrowRight className="size-4 shrink-0 text-primary" />
          )}
        </div>
      ))}
    </div>
    <p className="mt-2 text-xs text-muted-foreground">{stage.visualDetail}</p>
  </div>
);

export const CapabilityFramework = () => {
  const [activeStageId, setActiveStageId] = useState<FrameworkStageId>('capability-blueprint');
  const [activeBlueprintId, setActiveBlueprintId] = useState(blueprintLevels[0]!.id);

  const activeStageIndex = frameworkStages.findIndex(stage => stage.id === activeStageId);
  const activeStage = frameworkStages[activeStageIndex]!;
  const activeBlueprint = blueprintLevels.find(level => level.id === activeBlueprintId) ?? blueprintLevels[0]!;
  const ActiveStageIcon = stageIcons[activeStage.id];

  const selectRelativeStage = (offset: number) => {
    const nextIndex = Math.min(
      frameworkStages.length - 1,
      Math.max(0, activeStageIndex + offset),
    );
    setActiveStageId(frameworkStages[nextIndex]!.id);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        selectRelativeStage(-1);
      } else if (event.key === 'ArrowRight') {
        selectRelativeStage(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="
      flex h-[calc(100vh-144px)] min-h-150 flex-col overflow-hidden border
      border-border bg-background
    "
    >
      <header className="
        flex shrink-0 items-center justify-between gap-6 border-b border-border
        bg-card px-6 py-4
      "
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Badge variant="destructive">WIP</Badge>
            <Badge variant="outline">Internal showcase</Badge>
            <span className="
              hidden text-xs font-semibold text-muted-foreground uppercase
              md:inline
            "
            >
              Interview framework
            </span>
          </div>
          <h1 className="
            mt-2 truncate text-2xl font-semibold
            lg:text-3xl
          "
          >
            Capability Development Framework
          </h1>
        </div>
        <Button asChild size="sm" className="shrink-0">
          <Link href="/dashboard/showcase">
            <span className="
              hidden
              sm:inline
            "
            >
              Cleanroom Walkthrough
            </span>
            <Play className="size-4" />
          </Link>
        </Button>
      </header>

      <nav
        aria-label="Capability development stages"
        className="grid shrink-0 grid-cols-5 border-b border-border bg-card"
      >
        {frameworkStages.map((stage) => {
          const Icon = stageIcons[stage.id];
          const isActive = stage.id === activeStageId;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageId(stage.id)}
              aria-current={isActive ? 'step' : undefined}
              className={`
                group relative flex min-w-0 items-center gap-3 border-r
                border-border px-3 py-4 text-left transition-colors
                last:border-r-0
                hover:bg-accent
                lg:px-5
                ${isActive ? 'bg-accent' : 'bg-card'}
              `}
            >
              <span className={`
                flex size-9 shrink-0 items-center justify-center border
                ${isActive
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-muted-foreground'}
              `}
              >
                <Icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="
                  block font-mono text-[10px] text-muted-foreground
                "
                >
                  {stage.number}
                </span>
                <span className="
                  block truncate text-xs font-semibold
                  md:text-sm
                "
                >
                  <span className="md:hidden">{stage.shortLabel}</span>
                  <span className="
                    hidden
                    md:inline
                  "
                  >
                    {stage.title}
                  </span>
                </span>
              </span>
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <main className="
        grid min-h-0 flex-1
        lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]
      "
      >
        <section className="
          flex min-h-0 flex-col overflow-hidden border-b border-border p-5
          lg:border-r lg:border-b-0 lg:p-7
        "
        >
          <div className="flex shrink-0 items-start justify-between gap-5">
            <div>
              <div className="text-xs font-semibold text-primary uppercase">
                Stage
                {' '}
                {activeStage.number}
              </div>
              <h2 className="
                mt-1 text-3xl/9 font-semibold
                lg:text-4xl/11
              "
              >
                {activeStage.title}
              </h2>
            </div>
            {activeStage.id === 'capability-blueprint' && (
              <Badge className="shrink-0">Centerpiece</Badge>
            )}
          </div>

          {activeStage.id === 'capability-blueprint'
            ? (
                <div className="
                  mt-5 grid min-h-0 flex-1 gap-3
                  xl:grid-cols-[minmax(260px,0.9fr)_minmax(300px,1.1fr)]
                "
                >
                  <div className="
                    grid min-h-0 grid-cols-2 gap-2
                    xl:grid-cols-1
                  "
                  >
                    {blueprintLevels.map((level, index) => {
                      const isActive = level.id === activeBlueprint.id;

                      return (
                        <button
                          key={level.id}
                          type="button"
                          onClick={() => setActiveBlueprintId(level.id)}
                          aria-pressed={isActive}
                          className={`
                            flex min-h-0 items-center gap-3 border px-3 py-2
                            text-left transition-colors
                            hover:bg-accent
                            ${isActive
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card'}
                          `}
                        >
                          <span className={`
                            font-mono text-[10px]
                            ${isActive
                          ? 'text-primary-foreground/70'
                          : `text-primary`}
                          `}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs/4 font-semibold">{level.title}</span>
                          <ChevronRight className="ml-auto size-4 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="
                    flex min-h-0 flex-col justify-between border border-border
                    bg-card p-5
                  "
                  >
                    <div>
                      <div className="
                        flex items-center gap-2 text-xs font-semibold
                        text-primary uppercase
                      "
                      >
                        <Layers3 className="size-4" />
                        Selected layer
                      </div>
                      <h3 className="
                        mt-4 text-2xl/8 font-semibold
                        xl:text-3xl/9
                      "
                      >
                        {activeBlueprint.title}
                      </h3>
                      <p className="mt-3 text-sm/6 text-muted-foreground">
                        {activeBlueprint.prompt}
                      </p>
                    </div>
                    <div className="
                      mt-5 border-l-4 border-primary bg-background p-4
                    "
                    >
                      <div className="
                        text-xs font-semibold text-muted-foreground uppercase
                      "
                      >
                        Cleanroom example
                      </div>
                      <p className="mt-2 text-base/6 font-semibold">
                        {activeBlueprint.example}
                      </p>
                    </div>
                    <div className="
                      mt-5 flex items-center gap-3 text-xs font-medium
                      text-muted-foreground
                    "
                    >
                      <BriefcaseBusiness className="size-4 text-primary" />
                      Every layer traces back to the work.
                    </div>
                  </div>
                </div>
              )
            : (
                <div className="
                  mt-6 flex min-h-0 flex-1 flex-col justify-center border-y
                  border-border py-6
                "
                >
                  <div className="
                    grid items-center gap-5
                    md:grid-cols-[0.8fr_1.2fr]
                  "
                  >
                    <div>
                      <div className="
                        flex size-14 items-center justify-center bg-primary
                        text-primary-foreground
                      "
                      >
                        <ActiveStageIcon className="size-7" />
                      </div>
                      <p className="
                        mt-5 max-w-md text-2xl/8 font-semibold
                        lg:text-3xl/10
                      "
                      >
                        {activeStage.purpose}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {stageVisuals[activeStage.id].map((item, index) => (
                        <div key={item} className="contents">
                          <div className="
                            flex min-h-24 flex-1 items-center justify-center
                            border border-border bg-card p-3 text-center
                            text-sm/5 font-semibold
                          "
                          >
                            {item}
                          </div>
                          {index < stageVisuals[activeStage.id].length - 1 && (
                            <ArrowRight className="size-4 shrink-0 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
        </section>

        <aside className="
          flex min-h-0 flex-col overflow-hidden bg-card p-5
          lg:p-6
        "
        >
          <div className="border-l-4 border-primary pl-4">
            <div className="
              text-xs font-semibold text-muted-foreground uppercase
            "
            >
              Purpose
            </div>
            <p className="mt-1 text-base/6 font-semibold">{activeStage.purpose}</p>
          </div>
          <div className="
            mt-4 grid min-h-0 flex-1 grid-cols-2 content-start gap-x-5 gap-y-4
          "
          >
            <div className="col-span-2">
              <DetailList
                icon={ClipboardList}
                label="Key questions"
                items={activeStage.keyQuestions}
              />
            </div>
            {activeStage.participants && (
              <DetailList
                icon={Users}
                label="Participants"
                items={activeStage.participants}
              />
            )}
            <DetailList
              icon={CheckCircle2}
              label="Deliverables"
              items={activeStage.deliverables}
            />
          </div>
          <StageVisual stage={activeStage} />
        </aside>
      </main>
    </div>
  );
};
