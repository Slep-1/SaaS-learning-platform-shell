'use client';

import { useEffect, useRef } from 'react';
import { recordLessonProgressAction } from './actions';
import { isLessonHookMessage } from './lessonHooks';

export const LessonPlayer = (props: {
  lessonId: number;
  title: string;
  htmlContent: string;
  trackProgress: boolean;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!props.trackProgress) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      // Ignore anything not from our own sandboxed iframe (e.g. other lessons' bespoke
      // xapi-statement messages use a different shape and are ignored by isLessonHookMessage
      // anyway, but this also guards against unrelated messages from elsewhere on the page).
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      if (!isLessonHookMessage(event.data)) {
        return;
      }

      const hook = event.data.type === 'lesson:start'
        ? 'start'
        : event.data.type === 'lesson:midpoint' ? 'midpoint' : 'finished';

      void recordLessonProgressAction(
        props.lessonId,
        hook,
        event.data.type === 'lesson:finished' ? event.data.score : undefined,
      );
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [props.trackProgress, props.lessonId]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={props.htmlContent}
      title={props.title}
      sandbox="allow-scripts allow-forms allow-popups"
      className="w-full flex-1 border-0"
    />
  );
};
