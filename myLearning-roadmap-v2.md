# myLearning — Product Roadmap v2
*Reflects the Capability Platform Concept review — supersedes the earlier "course library" framing.*

## Core principle

Don't build another LMS. Build a lightweight workforce capability platform that delivers only what an employee needs to perform their job today. The learner-facing paradigm is a daily "Today's Priorities" feed, not a browsable course library. The Gold Standard Rule filters everything that goes in front of a learner:

1. Improves performance.
2. Will be used this month.
3. Can be completed in under 10 minutes.
4. Is current and maintained.
5. Would be missed if removed.

If any answer is "No," it doesn't belong in the product.

## The four core experiences

| Experience | What it is | Who acts |
|---|---|---|
| **Learn** | A Capability Card — one topic, 2–10 min, interactive, mobile-first, ends with a knowledge check | Learner completes; Admin authors |
| **Verify** | Confirmation a skill was actually demonstrated — supervisor sign-off or self-attestation. A real skills record, not a completion checkbox | Coordinator verifies; Learner may self-attest |
| **Ask** | AI search restricted to approved company content only. Returns an answer with source and last-updated date, no open-ended internet answers | Learner asks; Admin curates what's searchable |
| **Updates** | A single monthly operational bulletin — policy, procedure, safety, product. Read and acknowledge, no decision points | Learner acknowledges; Admin publishes |

## Data model changes from v1

- `lessons` table gains a `content_type` field: `capability_card` | `update` (same underlying storage — title, description, html_content — different completion criteria and presentation)
- New `verifications` table: learner_id, skill/card reference, verified_by, method (`sign_off` | `self_attestation`), org_id, created_at
- Roles: **Admin** (authors content, manages org/billing/members), **Coordinator** (assigns, tracks team progress, performs Verify sign-offs), **Learner** (sees only their own Today's Priorities feed)
- Billing: flat monthly fee per organization, not per-seat

## Phased build plan

**Phase 1 — Capability Card library (in progress, being reframed)**
Originally scoped as a browsable course library. Being reworked into the data foundation for Capability Cards — same underlying model, but the learner UI target is now the Today's Priorities feed, not a library grid.

**Phase 2 — Today's Priorities home screen**
The actual learner-facing paradigm shift: a single home screen showing today's Capability Card, an outstanding Verify request (if any), the Ask search bar, and this month's Update — instead of a course catalog.

**Phase 3 — Assignment + role-based access**
Admin/Coordinator/Learner roles (Clerk custom roles), content upload by Admin, Coordinator assignment authority.

**Phase 4 — Verify**
The genuinely new feature: Coordinator sign-off and self-attestation workflow, building the practical skills record described in the source document.

**Phase 5 — Progress tracking**
Capture `lesson_events` (already emitted by Capability Cards via the xAPI-shaped tracker) into real stored records; admin dashboard shows completion and skill-verification status together, not just "opened it or didn't."

**Phase 6 — Ask (scoped AI search)**
Closed-domain AI search over Admin-approved content only, with source + last-updated citation on every answer. Deliberately scoped tighter than a full conversational tutor — this is retrieval over trusted content, not open-ended chat.

**Phase 7 — AI tutor + plain-English analytics** *(Sana-inspired, full version)*
A conversational AI tutor woven into Capability Cards themselves, plus natural-language admin analytics queries. Builds on the narrower Phase 6 "Ask" feature once assignment and verification data exist to ground it in.

**Phase 8 — Structured course import (SCORM/cmi5)**
For SMB clients who need to bring in off-the-shelf content (e.g. from OpenSesame). cmi5 is the preferred target since it reports through xAPI, matching our existing tracking architecture; legacy SCORM 1.2 support (via the open-source `scorm-again` runtime) as a fallback. Deliberately last — least urgent for the target customer, most infrastructure-heavy to build.

## Open questions (not yet decided)

- Exact mechanics of the monthly "Capability Improvement" value narrative vs. the flat-fee billing structure — deferred, not urgent yet
- Whether Updates need their own notification/delivery channel (e.g. SMS) or ride the same delivery mechanism as Capability Cards
