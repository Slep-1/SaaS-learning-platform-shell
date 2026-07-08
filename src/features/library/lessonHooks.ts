/**
 * Standard progress-reporting contract for lesson HTML content. Lessons should call
 * `window.parent.postMessage(...)` with one of these shapes at the relevant points in their
 * flow. All three are optional and idempotent — sending the same hook twice, or never sending
 * start/midpoint at all, is fine and falls back to due-date-only status (see
 * assignmentStatus.ts). This is intentionally NOT the richer, lesson-specific xAPI vocabulary
 * some existing lessons use (e.g. "Signal Observatory"'s `xapi-statement` messages) — those are
 * ignored by the listener, not merged with this contract.
 */
export type LessonHookMessage
  = | { type: 'lesson:start' }
    | { type: 'lesson:midpoint' }
    | { type: 'lesson:finished'; score?: number };

const LESSON_HOOK_TYPES = ['lesson:start', 'lesson:midpoint', 'lesson:finished'] as const;

export function isLessonHookMessage(data: unknown): data is LessonHookMessage {
  return typeof data === 'object' && data !== null && 'type' in data
    && (LESSON_HOOK_TYPES as readonly string[]).includes((data as { type: unknown }).type as string);
}
