# One Jewish Community — Website

Public-facing multi-page website for **One Jewish Community** — a digital bridge that connects Jews across backgrounds, countries, communities, and organizations through stories, education, events, opportunities, and safe human connection.

## Files

- `index.html` — short homepage: hero, why it matters, how it works, explore cards, get started
- `about.html` — mission, problem, solution/network map, three pillars, platform features, safety, impact, roadmap, **suggestion form** (`#suggest`)
- `communities.html` — community explorer with working search + filter chips
- `partners.html` — Partner Hub: 13 organization cards with **official website links** and filters
- `stories.html` — stories, videos, and podcasts with type filters
- `events.html` — event cards with search/filters and host info
- `opportunities.html` — scholarships, trips, camps, volunteering, leadership, internships with filters and official links
- `styles.css` — all styling, shared across pages
- `script.js` — shared behavior: mobile nav, scroll reveal, search + chip filtering, suggestion form

## How to use

- Open `index.html` in any browser — no server or build step needed. All pages link to each other with relative paths, so the whole folder works locally or on any static host (GitHub Pages, Netlify, etc.).
- Search and filter chips actually work on the Communities, Partners, Stories, Events, and Opportunities pages (client-side, in `script.js`).

## Things to know

- **The suggestion form has no backend.** It shows a thank-you message but doesn't store anything. To make it real, hook it to Formspree, Google Forms, or a backend and update the handler in `script.js`.
- Partner cards link to real official websites (hillel.org, bbyo.org, rootone.org, etc.) — placeholder logos are used on purpose; swap in real logos only with permission.
- Cards are filtered by `data-tags` attributes; add tags to new cards to make them filterable.
- Colors live in the `:root` block at the top of `styles.css`.
- Impact stats on the About page are labeled as first-phase goals, not real numbers.

## Status

- **Current status:** Built — full multi-page static site (homepage + 6 hub pages) with working client-side search/filter. No backend.
- **Key decisions:** Static site, no build step; suggestion form is front-end only (shows a thank-you, stores nothing); partner cards link to real official sites with placeholder logos on purpose. (More in "Things to know" above.)
- **Next steps:** If it goes live — wire the suggestion form to a real backend (Formspree/Google Forms) and swap placeholder logos with permission.

## Related

- [[Amit Congress Map]] — the pitch deck this site grew out of. Not "possibly related": they share three pillars, partner hub, orgs, communities, and safety. **Archived 2026-07-28** to `Efforts/Archive/Amit Congress/` — the 29 shared graph nodes that used to evidence this are gone from the unified map, but the folder and this link are both intact.
- Shared concepts: [[Three Pillars]] · [[Partner Hub]]
- Start from [[One Jewish Community Map]] rather than this README.
