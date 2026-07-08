# Architecture Roadmap

The roadmap prioritizes a useful end-to-end capability loop before broader LMS compatibility or advanced AI.

## Current State

- **Foundation:** Next.js application, Clerk organizations, role-based access, Drizzle/PostgreSQL-compatible storage, i18n, and automated quality checks.
- **Learn:** lesson authoring, assignment, learner playback, milestone progress, score capture, and prioritized Today's Priorities card are implemented.
- **Operate:** Admin and Coordinator assignment views plus learner preview are implemented.
- **Verify, Ask, Updates:** represented as product direction, not functional workflows.

## Target Direction

1. Harden Learn and Today's Priorities with focused access, ordering, and UI tests.
2. Build Verify request and sign-off workflow as the next new domain capability.
3. Persist a narrow xAPI-shaped event stream and improve progress reporting.
4. Add Updates using the existing content foundation with distinct acknowledgement behavior.
5. Build scoped Ask retrieval over approved, versioned organization content with citations.
6. Add embedded tutoring and natural-language analytics only after reliable source and event data exist.
7. Consider cmi5 first and SCORM 1.2 second for external content import after the core platform is stable.

## Open Questions

- Should Updates precede xAPI event persistence to complete the four-part home screen sooner?
- Which customer commitments determine the ordering of Verify, reporting, and Ask?
- What production database, background-job, and search infrastructure are required at the first scale milestone?
- What observability and audit requirements must be met before storing verification or AI activity?
- Which measurable outcome marks each phase complete beyond shipping its interface?
