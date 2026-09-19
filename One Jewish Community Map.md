---
type: project-map
project: One Jewish Community
status: active
updated: 2026-07-28
---

# One Jewish Community Map

> **Entry point.** Read this before the README or any source file.

Public-facing multi-page static website for One Jewish Community — a digital bridge connecting Jews across backgrounds, countries, and organizations through stories, education, events, opportunities, and safe human connection.

## Status

**Built, not live** — homepage plus 6 hub pages, with working client-side search and filtering. No backend, no build step.

Detail in [README](README.md#status).

## Start here

1. [README](README.md) — page list, how to use, things to know
2. `graphify-out/GRAPH_REPORT.md` — 59 nodes, key concepts
3. `graphify query "<question>"` from this folder
4. Only then: the page files below

## Key files

| File | What it holds |
|---|---|
| `index.html` | Homepage — hero, why it matters, how it works, explore cards |
| `about.html` | Mission, problem/solution, three pillars, safety, impact, roadmap, suggestion form |
| `partners.html` | Partner Hub — 13 org cards with real official links |
| `communities.html` · `stories.html` · `events.html` · `opportunities.html` | The filterable hub pages |
| `styles.css` | All styling. Colors live in the `:root` block at the top |
| `script.js` | Mobile nav, scroll reveal, search + chip filtering, suggestion form |

## Next steps

- [ ] If it goes live: wire the suggestion form to a real backend (Formspree / Google Forms) and update the handler in `script.js`
- [ ] Swap placeholder partner logos for real ones — **only with permission**

## Decisions

- Static site, no build step — the folder works locally or on any static host.
- **The suggestion form has no backend.** It shows a thank-you and stores nothing. Don't assume submissions exist.
- Partner cards link to real official sites; placeholder logos are deliberate.
- Cards filter on `data-tags` attributes — new cards need tags to be filterable.
- Impact stats on the About page are labeled first-phase **goals**, not real numbers.

## Related

- [[Three Pillars]] — the content architecture behind `about.html` and the hub pages
- [[Partner Hub]] — the pattern `partners.html` implements
- [[Amit Congress Map]] — the pitch deck this site grew out of, now **archived** at `Efforts/Archive/Amit Congress/` (2026-07-28). Same concept, different format: read the deck for the original argument, this site for the built version. It used to share **29 nodes** with this project in the unified graph; archiving removed those edges, so that connection now lives here and in `Atlas/Shared Concepts/`, not in the graph. The link still resolves — the folder moved, nothing was deleted.

## Graph

- Output: `graphify-out/` (59 nodes, code + docs)
- Visual: `graphify-out/obsidian/One Jewish Community.canvas`
- Machine/backend layer — see `AIOS/graphify-workflow.md`. Not daily navigation.

## Last session

No `Handoff.md` yet — one gets written the next time real work happens here, and lives at `Handoff.md` in this folder. Until then, **Status** and **Next steps** above are the current state.
