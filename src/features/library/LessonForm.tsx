import { buttonVariants } from '@/components/ui/buttonVariants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const LessonForm = (props: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: { title: string; description: string };
  labels: {
    title: string;
    description: string;
    htmlFile: string;
    htmlFileHint: string;
    progressHooksSummary: string;
    submit: string;
  };
}) => (
  <form action={props.action} className="flex max-w-xl flex-col gap-5">
    <div className="flex flex-col gap-2">
      <Label htmlFor="title">{props.labels.title}</Label>
      <Input id="title" name="title" required defaultValue={props.defaultValues?.title} />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="description">{props.labels.description}</Label>
      <Textarea id="description" name="description" required defaultValue={props.defaultValues?.description} />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="htmlFile">{props.labels.htmlFile}</Label>
      <Input
        id="htmlFile"
        name="htmlFile"
        type="file"
        accept=".html,text/html"
        required={!props.defaultValues}
      />
      <p className="text-sm text-muted-foreground">{props.labels.htmlFileHint}</p>

      <details className="
        rounded-md border border-border p-3 text-sm text-muted-foreground
      "
      >
        <summary className="cursor-pointer font-medium text-foreground">
          {props.labels.progressHooksSummary}
        </summary>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">
          {'window.parent.postMessage({ type: \'lesson:start\' }, \'*\');\n'}
          {'window.parent.postMessage({ type: \'lesson:midpoint\' }, \'*\');\n'}
          {'window.parent.postMessage({ type: \'lesson:finished\', score: 100 }, \'*\'); // score is optional'}
        </pre>
      </details>
    </div>

    <button type="submit" className={buttonVariants({ size: 'lg', className: 'self-start' })}>
      {props.labels.submit}
    </button>
  </form>
);
