# Verify Workflow

Verify records whether a learner demonstrated a practical skill. It provides capability evidence for myLearning's Workforce Readiness outcome and remains separate from viewing content or passing a knowledge check.

## Current State

- The Coordinator role can assign lessons, view progress, and preview the learner experience.
- Lesson assignments capture progress and score but do not capture demonstrated skill.
- Today's Priorities includes a non-interactive Verify placeholder.
- No verification table, request state, evidence model, or sign-off action exists.

## Target Direction

- Start with two methods: Coordinator sign-off and explicitly permitted learner self-attestation.
- Use a small workflow: requested, awaiting review, verified, or declined.
- Scope every request and decision to an organization and learner, with actor and timestamps recorded.
- Surface the learner's next outstanding verification on Today's Priorities and a review queue for Coordinators.
- Keep verification evidence concise in the first version: optional note plus referenced capability; add files or media only when required.
- Feed verified evidence into capability measurement without treating a single sign-off as permanent readiness.

## Open Questions

- Who creates a verification request: assignment author, learner, Coordinator, or an automatic completion rule?
- Which capabilities permit self-attestation, and who configures that policy?
- Can a verification expire, be revoked, or require periodic renewal?
- Is one verifier sufficient, and what evidence is mandatory for regulated workflows?
- Should declined verification automatically reassign learning content?
