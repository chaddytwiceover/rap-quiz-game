# Agent Instructions

## Project goal
Build a polished, mobile-first interactive rap lyric quiz through small, reviewable iterations.

## Working model
The human user is the project supervisor, not the primary coder. Agents should make implementation decisions explicit, keep changes understandable, and avoid requiring manual coding unless absolutely necessary.

## Product direction
The primary mechanic is "Finish the Lyric": show a short lyric prompt with the ending hidden and let the player choose the correct continuation under time pressure. The initial artist roster is Eminem, Drake, Kendrick Lamar, J. Cole, Tyler, the Creator, Kanye West, JAY-Z, Meek Mill, Travis Scott, Playboi Carti, Nicki Minaj, and Cardi B.

## Rules
- Do not introduce a framework or major dependency without explaining why it is needed.
- Prefer simple architecture over premature complexity.
- Keep gameplay logic separate from question/content data.
- Make artist and question systems data-driven so new content does not require gameplay rewrites.
- Design mobile-first, with portrait as the primary layout, and test responsive behavior.
- Preserve accessibility: semantic UI, readable contrast, keyboard support where relevant, large touch targets, and reduced-motion-friendly behavior.
- Never commit secrets or credentials.
- Make focused commits with descriptive messages.
- Run relevant tests, linting, and builds before marking implementation work complete.
- Avoid unrelated refactors while implementing a feature.
- Document major architecture or gameplay decisions in the repository.

## Copyright and lyric-content rules
- Never scrape lyrics from websites.
- Never copy full song lyrics or large unlicensed lyric excerpts into source files, fixtures, tests, issues, pull requests, or documentation.
- Development and automated tests must use original placeholder lyric-style text written specifically for this project.
- Production content must use a source or license that permits the intended display and gameplay use.
- Prefer storing provider/track IDs and structured metadata rather than duplicating copyrighted lyric bodies in Git.
- Follow the selected provider's requirements for attribution, caching, display, and API usage.
- Keep the content-provider layer replaceable so the game is not tightly coupled to a single vendor.

## Delivery standard
For each meaningful implementation step, report:
1. What changed.
2. Why the approach was chosen.
3. What was tested.
4. Any remaining risks or follow-up work.
