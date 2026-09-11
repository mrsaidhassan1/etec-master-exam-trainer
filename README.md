# ETEC Master Exam Trainer

**Practice • Review • Master the ETEC Exam**

A self-contained, single-file interactive web app for preparing for the ETEC trainer/instructor licence exam. Built from a 100-question bank (multiple-choice questions, answer key, explanations, and high-priority revision notes) sourced from recalled and practice ETEC material.

No build step, no backend, no dependencies to install — it's one HTML file. Progress is saved locally in the browser (`localStorage`), so nothing is lost on refresh.

## Features

- **Dashboard** — coverage, accuracy, study streak, readiness rating (Low → Exam Ready), strongest/weakest topic, and a spaced-review queue
- **Learn Mode** — study all 100 questions one at a time, in a shuffled order, with full explanations and topic/model callouts after each answer
- **Practice** — choose a question count (5/10/20/25/50/All) and filter by topic, with immediate feedback
- **Mock Exam** — Quick (25), Standard (50), or Full (100) questions, with a countdown timer, question navigator, flag-for-review, and a topic-breakdown results screen
- **Weak Areas** — per-category accuracy breakdown with a one-click "Practice Weak Areas" drill, plus a "Dangerous Zone" for questions answered incorrectly while very confident
- **Revision** — concept cards and visual flows for Learning Theories, Assessment types, the Kirkpatrick pyramid, ADDIE, CIRO, Training Methods, Digital Learning, Technology, Statistics, and Trainer Management
- **Flashcards** — flip-card deck covering the highest-priority concepts
- **My Mistakes** — every incorrect answer tracked with retry, "mark as learned," and inline explanation
- **Saved Questions** — three bookmark types (Important / Review Later / Difficult)
- **Search** — search across questions, options, explanations, and revision content
- **Analytics** — accuracy-by-topic bar chart, correct/incorrect breakdown, score history, and a topic radar chart (via Chart.js)
- **10-Minute Review** — the highest-priority facts, condensed
- **Exam Traps** — commonly confused pairs (Learning vs Behaviour, Diagnostic vs Formative, Role Play vs Simulation, etc.)
- **Confidence ratings + spaced repetition** — after each answer, an optional confidence check feeds a Review Today / Review Soon / Mastered queue
- **Randomization** — question and option order are shuffled per session while the correct answer is always tracked correctly underneath

## Running it

Just open `etec_trainer.html` in any modern browser. That's it.

To host it (e.g. GitHub Pages, Netlify, or any static file host), upload the file as-is — everything (styles, data, and logic) is bundled into that one file. Two things load from a CDN at runtime: Google Fonts (Source Serif 4 / IBM Plex Sans / IBM Plex Mono) and [Chart.js](https://www.chartjs.org/) (for the Analytics page) — both optional; the app still works without them, just with system fonts and a friendly fallback message on the Analytics page.

## Data & source integrity

Questions 1–50 are consolidated from the supplied/remembered ETEC material. Questions 51–100 are scenario variations built only from concepts supported by that material, and are labeled `"Practice Variation"` in the data (vs. `"Source Question"`) so the two are never conflated. Every answer key entry was programmatically cross-checked against its own option text before being built into the app.

This is an **independent ETEC preparation resource** based on recalled and practice materials. It is **not an official ETEC examination platform**, and it is not affiliated with or endorsed by ETEC.

## Tech

Vanilla HTML/CSS/JavaScript (no framework, no build step) plus Chart.js loaded from a CDN for the Analytics charts. Chosen deliberately over a React/build-tool setup so the whole app stays a single portable file with nothing to install or compile.

## Roadmap

Ideas for a future version: accounts and cloud sync, a teacher/admin dashboard, an Arabic interface, PDF export of results, full exam history, and a leaderboard.

## License

All rights reserved. See [LICENSE](./LICENSE).
