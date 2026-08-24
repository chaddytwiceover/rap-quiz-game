# Rap Quiz Game

A mobile-first interactive rap trivia game where players identify the missing ending of a lyric from well-known rap songs.

## Core concept

Players are shown a short licensed lyric excerpt with the final word or phrase hidden. They must finish the lyric before time expires.

The game should feel fast, competitive, replayable, and polished rather than like a static trivia form.

## Initial artist roster

- Eminem
- Drake
- Kendrick Lamar
- J. Cole
- Tyler, the Creator
- Kanye West
- JAY-Z
- Meek Mill
- Travis Scott
- Playboi Carti
- Nicki Minaj
- Cardi B

The content system must be data-driven so more artists can be added without changing gameplay code.

## Planned core loop

1. Choose a mode or artist.
2. Start a short round.
3. See a lyric prompt with the ending hidden.
4. Select the correct answer from multiple choices before the timer runs out.
5. Receive immediate visual feedback.
6. Build a streak and score multiplier for consecutive correct answers.
7. See the song and artist after answering.
8. Finish the round with a score, accuracy, best streak, and replay option.

## Initial game modes

- **Quick Play** — mixed artists and songs.
- **Artist Run** — questions from one selected artist.
- **Daily Five** — five rotating questions with a daily score.
- **Endless** — continue until the player loses all lives.

Future possibilities include head-to-head multiplayer, leaderboards, decade/era packs, album packs, and challenge links.

## Difficulty

- **Easy:** iconic songs, hooks, highly recognizable endings.
- **Medium:** popular verses and less obvious answer choices.
- **Hard:** deeper cuts, similar distractors, and shorter response time.

## UX goals

- Designed mobile-first and works well in portrait orientation.
- Large tap targets and readable lyrics.
- Fast transitions with optional reduced motion.
- Strong correct/incorrect feedback.
- Visible score, streak, timer, and question progress.
- Explicit-content filtering should be supported in the content model.
- Game remains usable without audio; audio features can be explored separately.

## Lyrics/content rule

Production lyric content must come from a source that permits its use in the game. Do not scrape lyric websites or commit unlicensed copyrighted lyrics to this repository. Development fixtures should use original placeholder text. The architecture should support a licensed lyrics provider using track/provider IDs and follow that provider's caching and display terms.

## Development approach

This repository is intended for agentic development with a human supervisor. Changes should be made in small, reviewable steps and tested before being merged.

## Next milestone

Build a small playable vertical slice using original placeholder questions that proves:

- home screen
- Quick Play
- question card
- four answer choices
- timer
- scoring
- streaks
- correct/incorrect states
- results screen
- responsive mobile UX

The technical stack should be selected for this vertical slice before implementation begins.
