# ETEC Master Exam Trainer

**Practice • Review • Master the ETEC Exam**

A self-contained, single-file interactive web app for preparing for the ETEC trainer/instructor licence exam. Built from an expanded 228-question bank (multiple-choice questions, answer key, explanations, and high-priority revision notes) sourced from recalled and practice ETEC material, including the official ETEC study guide's Part 4 practice set.

No build step, no backend, no dependencies to install — it's one HTML file. Progress is saved locally in the browser (`localStorage`), so nothing is lost on refresh.

## Features

- **Dashboard** — coverage, accuracy, study streak, readiness rating (Low → Exam Ready), strongest/weakest topic, and a spaced-review queue
- **Learn Mode** — study all 228 questions one at a time, in a shuffled order, with full explanations and topic/model callouts after each answer
- **Practice** — choose a question count (5/10/20/25/50/All) and filter by topic, with immediate feedback
- **Main Exam** — a 75-question, 4-part timed mock exam mirroring the real ETEC exam structure (80 minutes total: Part 1 & 2 at 24 minutes each, Part 3 & 4 at 16 minutes each). Each part has its own countdown; once a part's time is up (or you finish it), it locks automatically and the exam moves straight to the next part — there is no going back to a closed part. Ends with a full topic-breakdown results screen
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
- **ETEC-themed design** — green/teal palette matched to the official ETEC logo mark, which appears in the sidebar

## Running it

Just open `index.html` in any modern browser. That's it.

To host it (e.g. GitHub Pages, Netlify, or any static file host), upload the file as-is — everything (styles, data, images, and logic) is bundled into that one file. One thing loads from a CDN at runtime: [Chart.js](https://www.chartjs.org/) (for the Analytics page) — optional; the app still works without it, just with a friendly fallback message on the Analytics page.

## Data & source integrity

The question bank is consolidated from the supplied/remembered ETEC material, the official ETEC study guide's 120-question Part 4 practice set, and scenario variations built only from concepts supported by that material. Source and practice-variation questions are labeled accordingly in the data (`"sourceType": "Source Question"` vs. `"Practice Variation"`) so the two are never conflated. Every answer key entry was programmatically cross-checked against its own option text before being built into the app.

This is an **independent ETEC preparation resource** based on recalled and practice materials. It is **not an official ETEC examination platform**, and it is not affiliated with or endorsed by ETEC.

## Tech

Vanilla HTML/CSS/JavaScript (no framework, no build step) plus Chart.js loaded from a CDN for the Analytics charts. Chosen deliberately over a React/build-tool setup so the whole app stays a single portable file with nothing to install or compile.

## Roadmap

Ideas for a future version: accounts and cloud sync, a teacher/admin dashboard, an Arabic interface, PDF export of results, full exam history, and a leaderboard.

## License

All rights reserved. See [LICENSE](./LICENSE).
