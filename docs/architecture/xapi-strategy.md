# xAPI Strategy

xAPI should provide a durable event vocabulary for learning evidence without forcing the first product versions to operate a full Learning Record Store.

## Current State

- Embedded lesson HTML reports `lesson:start`, `lesson:midpoint`, or `lesson:finished` through `postMessage`.
- The server updates idempotent milestone timestamps and an optional normalized score on `lesson_assignment`.
- Some lesson content can emit richer `xapi-statement` messages, but the application currently ignores them.
- There is no stored event stream, xAPI statement validation, LRS integration, or export.

## Target Direction

- Define a narrow supported statement profile before accepting arbitrary lesson-generated xAPI.
- Translate trusted player events server-side into statements with actor, verb, object, result, context, organization, and timestamp.
- Store accepted events immutably, then project assignment progress from those events or update both in one controlled transaction.
- Use stable application identifiers for activities and registrations; never trust learner or organization identity supplied by embedded content.
- Keep an adapter boundary so events can later be forwarded to a conformant LRS or used by cmi5 imports.

## Open Questions

- Is an internal event table sufficient initially, or is an external LRS required by early customers?
- Which verbs and result fields form the minimum supported profile?
- How will retries, duplicate statements, offline completion, and event ordering be handled?
- What xAPI data can administrators export, and for how long is it retained?
- When should assignment summary fields become projections rather than primary progress storage?
