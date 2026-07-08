# Architecture Roadmap

The roadmap develops myLearning into an AI-Native Workforce Capability Platform by completing the build, verify, reinforce, and measure loop. Workforce Readiness is the outcome used to judge progress.

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
6. Combine completion, verification, reinforcement, and event evidence into practical capability and readiness measures.
7. Add embedded tutoring and natural-language analytics only after reliable source and event data exist.
8. Consider cmi5 first and SCORM 1.2 second for external content import after the core platform is stable.

## Open Questions

- Should Updates precede xAPI event persistence to complete the four-part home screen sooner?
- Which customer commitments determine the ordering of Verify, reporting, and Ask?
- What production database, background-job, and search infrastructure are required at the first scale milestone?
- What observability and audit requirements must be met before storing verification or AI activity?
- Which measurable readiness outcome marks each phase complete beyond shipping its interface?
