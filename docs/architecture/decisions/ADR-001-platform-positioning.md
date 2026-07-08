# ADR-001: Platform Positioning

- **Status:** Accepted
- **Date:** 2026-07-08

## Context

The architecture notes used several adjacent descriptions, including learning platform, capability platform, and operational readiness platform. That ambiguity makes roadmap, data, AI, and measurement decisions harder to evaluate consistently.

## Decision

- The product name is **myLearning**.
- The product category is **AI-Native Workforce Capability Platform**.
- The primary customer outcome is **Workforce Readiness**.
- The platform builds, verifies, reinforces, and measures workforce capability.
- Readiness describes the intended outcome and measurement frame; it is not the product category.
- "AI-native" describes the target architecture. Documentation must distinguish current AI functionality from planned capability.

## Consequences

- Roadmap items should identify which part of the capability loop they support.
- Completion, verification, reinforcement, and activity evidence must remain distinguishable.
- Readiness claims must be traceable to defined evidence and recency rules.
- AI features must be bounded by trusted data, tenant isolation, explainability, and human accountability.
- Product copy should use the agreed category consistently without overstating the current implementation.

## Open Questions

- Which readiness indicators and thresholds will be used first?
- When does the implementation support describing the product externally as AI-native without qualification?
- How should the category be adapted, if at all, for customer-facing language?
