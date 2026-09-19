# One Jewish Community — Website

**Live at → https://benisbetter.github.io/onejewishcommunity/**

A public, static website for **One Jewish Community**: a digital bridge that helps Jews find communities, organizations, stories, events and opportunities that already exist — without pretending to be another Jewish organization.

It is plain HTML, CSS and JavaScript. No framework, no build step, no dependencies. Open `index.html` in a browser and it works.

---

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage — hero, why it matters, how it works, explore cards |
| `about.html` | Mission, current status, problem/solution, three pillars, safety, impact targets, roadmap, suggestion form (`#suggest`) |
| `communities.html` | 9 planned community groups with working search + filters |
| `partners.html` | Partner Hub — 13 organizations with links to their official websites |
| `stories.html` | The six kinds of story the hub is being built to hold |
| `events.html` | Community calendar built on real Jewish calendar dates |
| `opportunities.html` | Scholarships, Israel trips, camps, volunteering, leadership, internships |
| `join.html` | Get Involved — individual sign-up, organization listing, volunteering |
| `contact.html` | Contact form and other routes in |
| `privacy.html` | Privacy notice and terms, in plain language |
| `404.html` | Custom not-found page (GitHub Pages serves it automatically) |

**Shared files:** `styles.css` (all styling), `script.js` (all behaviour), `fonts.css` + `fonts/` (self-hosted webfonts), `favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`.

---

## ⚠️ The one thing you must do: connect the forms

**Right now the four forms do not send anything.** They do not fake it either — they tell the visitor plainly that the form is not connected and point them to GitHub. That is deliberate: a form that shows a thank-you and silently discards the message is worse than no form.

To turn them on, which takes about two minutes:

1. Go to [formspree.io](https://formspree.io) and create a free form.
2. Copy the endpoint it gives you (it looks like `https://formspree.io/f/abcdwxyz`).
3. Open `script.js` and paste it into the **one** line near the top:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
```

That single line switches on all four forms — sign-up, organization listing, contact and suggestions. Each submission arrives tagged with which form it came from and which page it was sent from.

---

## Editing the site

**Colours and spacing** live in the `:root` block at the top of `styles.css`. Change them there and every page follows.

**Adding a card** to any hub page: copy an existing card in that page's grid and edit the text. The only thing to get right is `data-tags` — the search and filter chips read it:

```html
<div class="card partner-card reveal" data-filterable data-tags="campus college funding">
```

A card with no matching tag simply won't appear under any chip except "All".

**Adding a filter chip:** add a `<button class="chip" data-filter="yourtag">Label</button>` to that page's `.filter-chips`, and make sure at least one card carries `yourtag` in its `data-tags`.

**Header and footer** are duplicated in all 11 pages on purpose, so any page can be edited alone without a build step. The cost is that a nav change means editing 11 files. If that becomes annoying, the shell can be regenerated with a small script rather than adopting a framework.

**Fonts** are self-hosted in `fonts/` (Inter and Plus Jakarta Sans, latin subset, 269 KB). Nothing is requested from Google at page load. To change fonts, replace the files and the `@font-face` rules in `fonts.css`.

---

## Rules this site follows

These are the editorial rules the current content was written against. Breaking them is how a directory loses the trust that makes it worth using.

1. **No invented numbers.** No member counts, no attendee counts, no "10,000 users" unless 10,000 users exist. Where a number is a target, it is labelled as a target.
2. **No invented deadlines for other people's programs.** A wrong deadline on this site could cost someone a real scholarship. Link to the source and let them own the date.
3. **The checkmark means the link was checked** — not that the organization has partnered with or endorsed this project. The Partner Hub says so explicitly.
4. **No placeholder content that pretends to be real.** The stories are labelled "Story wanted", not given fake read-times.
5. **Logos only with written permission.** Placeholder initials are deliberate.
6. **Removal requests are honoured** without argument, as promised on the contact and privacy pages.

---

## Deploying

The site auto-deploys from the `main` branch via GitHub Pages. Push and it goes live within a minute or two:

```bash
git add -A && git commit -m "your message" && git push
```

**Custom domain:** if you register `onejewishcommunity.org`, add a file named `CNAME` containing just the domain, point the domain's DNS at GitHub Pages, and enable it in the repo's Pages settings. Then update the `BASE` URL in the canonical/Open Graph tags across the pages, plus `robots.txt` and `sitemap.xml`.

---

## Status

**Live and working:** the directory. 13 organizations, a calendar of 8 real dates through May 2027, 6 opportunity categories, 9 planned community groups, all searchable and filterable. Accessible (landmarks, skip link, live result counts, keyboard-navigable). Shares properly on social with a real preview card.

**Not built:** user accounts, profiles, community group membership, messaging, moderated discussion spaces, and any actual story or podcast content. The site says so on the About and Get Involved pages rather than implying otherwise.

**Next, in order of impact:**

1. Connect the forms (see above) — until this is done the site cannot capture a single interested person.
2. Get the first three real stories published, so the Stories hub stops being a promise.
3. Reach out to a handful of the 13 listed organizations and turn one into an actual partner.
4. Replace emoji placeholder imagery with real photographs, once there are events to photograph.
5. Register the domain.

**Last full audit and content refresh:** 18 September 2026.
