# Agent Instructions

## Project goal
Build a polished, mobile-friendly rap quiz game through small, reviewable iterations.

## Working model
The human user is the project supervisor, not the primary coder. Agents should make implementation decisions explicit, keep changes understandable, and avoid requiring manual coding unless absolutely necessary.

## Rules
- Do not introduce a framework or major dependency without explaining why it is needed.
- Prefer simple architecture over premature complexity.
- Keep gameplay logic separate from question/content data.
- Design mobile-first and test responsive behavior.
- Preserve accessibility: semantic UI, readable contrast, keyboard support where relevant, and reduced-motion-friendly behavior.
- Never commit secrets or credentials.
- Make focused commits with descriptive messages.
- Run relevant tests, linting, and builds before marking implementation work complete.
- Avoid unrelated refactors while implementing a feature.
- Document major architecture or gameplay decisions in the repository.

## Delivery standard
For each meaningful implementation step, report:
1. What changed.
2. Why the approach was chosen.
3. What was tested.
4. Any remaining risks or follow-up work.
