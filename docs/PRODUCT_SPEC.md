# Rap Quiz Game — Product Specification

## Product vision

Rap Quiz Game is a fast, mobile-first music trivia game built around one immediately understandable challenge: finish the lyric.

The experience should feel closer to a polished casual game than a survey or flashcard app. Sessions should be easy to start, satisfying in under a minute, and replayable because of score optimization, streaks, difficulty, artist selection, and rotating content.

## Initial artist roster

1. Eminem
2. Drake
3. Kendrick Lamar
4. J. Cole
5. Tyler, the Creator
6. Kanye West
7. JAY-Z
8. Meek Mill
9. Travis Scott
10. Playboi Carti
11. Nicki Minaj
12. Cardi B

Artist availability should be driven by content data, not hard-coded screens.

## Primary gameplay

### Finish the Lyric

Each question presents:

- artist name
- optional song title depending on difficulty/mode
- a short lyric excerpt supplied by an approved content source
- a visible blank representing the missing ending
- four multiple-choice answers
- countdown timer
- score/streak/progress HUD

The player selects an answer. The game immediately locks the choices, shows correct/incorrect feedback, updates score and streak, briefly reveals the song metadata, then advances.

## Scoring

Initial scoring model:

- Correct answer: base points
- Faster answer: time bonus
- Consecutive correct answers: streak multiplier
- Wrong answer: no points and streak resets

Avoid complex currencies or upgrade systems in the first release.

## Modes

### Quick Play
Mixed questions across the available roster. Default entry point.

### Artist Run
Player selects one artist and receives a dedicated round.

### Daily Five
Five questions shared for that day. Designed for repeat visits and future social score sharing.

### Endless
Player starts with a small number of lives and continues until all lives are lost.

## Difficulty model

### Easy
- iconic/high-recognition songs
- more context in the prompt
- clearly differentiated answer choices
- generous timer

### Medium
- popular verses and album tracks
- closer distractors
- moderate timer

### Hard
- deeper cuts
- less prompt context
- highly plausible distractors
- shorter timer
- song title can be hidden until after answering

## Round structure

Recommended first playable round:

- 10 questions
- four choices per question
- one question at a time
- visible `Question X / 10`
- results screen at completion

Results screen should show:

- total score
- accuracy
- best streak
- correct answers
- difficulty/mode
- replay
- choose another artist/mode

## Content data model

The content layer should be independent from UI/gameplay code.

Suggested conceptual shape:

```ts
interface QuizQuestion {
  id: string;
  artistId: string;
  trackId: string;
  providerTrackId?: string;
  trackTitle: string;
  difficulty: 'easy' | 'medium' | 'hard';
  era?: string;
  explicit: boolean;
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
  source: 'fixture' | 'licensed-provider';
}
```

This is a conceptual model, not a requirement to use TypeScript.

## Content/legal architecture

The game should not depend on copied lyrics stored in the repository.

Development:
- use original placeholder lyric-style lines written for this project
- test the complete game loop without copyrighted production content

Production:
- integrate a licensed/authorized lyrics source
- store provider and track identifiers where practical
- honor provider rules for caching, excerpts, attribution, and display
- keep provider access behind an adapter/service boundary so it can be changed later

Do not scrape lyric sites as a content pipeline.

## Explicit-content handling

Rap lyrics may contain profanity or mature themes. The content model must support an `explicit` flag from the beginning.

Initial product behavior:
- default can permit explicit content for the intended audience
- settings should eventually allow clean-only mode
- UI should not unexpectedly expose explicit text before a round begins if a clean filter is enabled

## UX direction

### Visual character

Aim for modern hip-hop energy without imitating any individual artist's protected branding.

Suggested qualities:
- bold typography
- strong contrast
- editorial album-era feel
- subtle motion on streaks, timers, and score changes
- restrained use of gradients/textures
- large central question area

Avoid making the interface look like a generic classroom quiz.

### Mobile-first layout

Primary target: portrait phone.

Question screen hierarchy:
1. compact top HUD
2. artist/song metadata
3. lyric prompt
4. four large answer buttons
5. feedback state

Answer controls must remain comfortable to tap one-handed on common phone widths.

## Accessibility

- high-contrast text
- semantic buttons
- no color-only correct/incorrect feedback
- large touch targets
- reduced-motion support
- keyboard support for desktop/web
- timer behavior should be reconsidered for accessibility settings later

## Audio

Audio is not required for the first release. The first vertical slice should prove that the text-based game is fun on its own.

If audio previews are added later, licensing/streaming permissions must be reviewed separately from lyric rights.

## First vertical slice acceptance criteria

The first implementation is complete when a player can:

1. Open the game on a phone-sized viewport.
2. Start Quick Play.
3. Play a 10-question round using original placeholder content.
4. See a timer for each question.
5. Choose between four answers.
6. Receive clear correct/incorrect feedback.
7. Earn score and streak bonuses.
8. Advance automatically or with an obvious continue action.
9. Reach a results screen.
10. Replay the round without reloading the site.

The slice should be tested before real artist lyric content is integrated.

## Deferred features

Not part of the first vertical slice:

- accounts/authentication
- global leaderboards
- live multiplayer
- monetization
- audio clips
- achievements
- social login
- complex progression systems
- admin CMS

These can be evaluated after the base game proves fun and stable.
