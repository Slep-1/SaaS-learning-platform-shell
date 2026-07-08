# AI Assistant

The first AI capability should answer operational questions from approved company knowledge. It should not behave as an unrestricted general-purpose chatbot.

## Current State

- Today's Priorities contains an Ask placeholder.
- Lessons provide organization-owned HTML that could become one approved knowledge source.
- There is no ingestion pipeline, retrieval index, model integration, citation model, or AI conversation storage.
- Tenant identity and role-aware server access already provide a foundation for scoped retrieval.

## Target Direction

- Implement Ask before a conversational tutor: retrieve only organization-approved, current content.
- Return a concise answer with source title, direct source reference, and last-updated date.
- Separate ingestion, retrieval, answer generation, and audit logging so each can be tested and replaced independently.
- Enforce organization filters before retrieval and again when resolving citations.
- Decline unsupported questions rather than filling gaps from model knowledge or the public internet.
- Add an in-card tutor and plain-English analytics only after trusted retrieval, verification, and event data exist.

## Open Questions

- Which content types are eligible, and who approves or withdraws them?
- What model and vector storage meet expected cost, latency, privacy, and deployment requirements?
- How will HTML be cleaned, chunked, versioned, and re-indexed?
- Are prompts and answers retained, and what personal or sensitive data must be excluded?
- What evaluation set and acceptance threshold will establish grounded-answer quality?
