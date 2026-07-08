# Design Principles

These principles guide product and technical decisions as myLearning evolves from its current Learn foundation into a broader capability platform.

## Current State

- The learner experience is mobile-first and centered on Today's Priorities.
- The application uses organization-scoped data, explicit roles, and effective-role checks for learner preview.
- Lessons are short HTML experiences with simple, idempotent progress milestones.
- New product areas are represented conservatively as placeholders until their workflows exist.

## Target Direction

1. **Performance before content volume.** Build only experiences that help someone perform useful work now.
2. **One clear next action.** Prioritize the learner's most important incomplete task instead of presenting a catalog.
3. **Evidence over attendance.** Distinguish content completion, skill verification, and operational acknowledgement.
4. **Tenant isolation by default.** Scope every query, mutation, event, and retrieval result to its organization.
5. **Trusted answers only.** AI responses must use approved sources, expose citations, and decline unsupported questions.
6. **Small workflows first.** Ship the narrowest complete workflow before adding automation, imports, or advanced analytics.
7. **Accessible and mobile-first.** Keep core actions fast, readable, and usable on small screens.
8. **Audit important decisions.** Preserve actors, timestamps, and evidence for progress, verification, and AI activity.

## Open Questions

- Which principles should become automated architecture or pull-request checks?
- What accessibility and mobile-device targets define release readiness?
- Which workflows require immutable audit history from their first version?
- When should simplicity yield to customer-specific configuration?
