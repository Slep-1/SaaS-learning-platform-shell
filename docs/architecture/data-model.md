# Data Model

The data model should remain small, organization-scoped, and centered on evidence of capability rather than course administration.

## Current State

- `lesson` stores organization-owned HTML content, title, description, author, and creation time.
- `lesson_assignment` links one lesson to one learner and stores due date, progress milestones, completion, and optional score.
- Clerk owns users, organization membership, and role identity; application tables retain Clerk identifiers as text.
- Queries and mutations use `orgId` for tenant isolation. Assignment access also checks the effective learner identity.

## Target Direction

- Add a content classification when Updates are implemented, initially distinguishing Capability Cards from operational updates.
- Represent skill verification separately from content completion, with organization, learner, referenced capability, verifier, method, status, and timestamps.
- Store immutable learning events separately from assignment summary fields when the xAPI strategy is implemented.
- Treat assignment and verification records as workflow state; treat events as audit evidence.
- Preserve explicit organization ownership and indexes on every tenant-scoped aggregate.

## Open Questions

- Is a verification tied to a lesson version, a reusable skill definition, or both?
- Do Capability Cards require versioning before verification and audit records become durable?
- Should Update acknowledgements reuse assignments or have a distinct workflow?
- Which user profile fields must be mirrored locally if Clerk data becomes unavailable or changes?
- What retention and deletion rules apply to learning and verification evidence?
