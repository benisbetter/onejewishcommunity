---
type: project-overview
project: One Jewish Community
status: live
url: https://benisbetter.github.io/onejewishcommunity/
updated: 2026-09-18
---

# One Jewish Community — Overview

> **Start with [README.md](README.md).** It holds the page list, how to edit the site, how to deploy, and the one configuration step that still needs doing. This file is a short orientation on top of it.

## What this is

A public static website that acts as a directory and front door for Jewish life: it describes organizations, communities, events and opportunities that already exist, and links straight to whoever actually runs them. It is explicitly **not** another Jewish organization, and every page says so.

**Live:** https://benisbetter.github.io/onejewishcommunity/
**Source:** https://github.com/benisbetter/onejewishcommunity

## Where it stands

**Working:** 11 pages, all deploying automatically from `main`. The directory is genuinely usable — 13 organizations with verified official links, a calendar of 8 real Jewish-calendar dates running to May 2027, 6 opportunity categories, and 9 planned community groups, all with client-side search and filtering.

**Not built:** accounts, profiles, group membership, messaging, moderated discussion, and any real story or podcast content. The site states this openly rather than implying the features exist.

**Blocking everything else:** the forms are not connected to an inbox. One line in `script.js` fixes it — see the README.

## The idea behind the content

Three pillars drive every page: **education**, **human connection**, and **digital storytelling**. The Partner Hub is the pattern that makes the whole thing work — describe an organization honestly, then get out of the way and link to them.

## Decisions worth knowing

- **Static HTML, no build step.** Any page can be opened and edited on its own. Header and footer are duplicated across 11 files as the deliberate cost of that.
- **Honesty over impressiveness.** No invented member counts, attendee numbers, or third-party deadlines. Targets are labelled as targets. The README lists the six editorial rules in full.
- **The ✓ badge means "official link checked"**, not "partnered with us".
- **Self-hosted fonts.** No third-party requests on page load, which is also what the privacy page promises.
- **Forms fail loudly.** With no backend configured they say so, rather than showing a thank-you and discarding the message.
- **Placeholder logos on purpose.** Real logos only with written permission.

## Next session

Read the **Status** section at the bottom of [README.md](README.md) — it holds the prioritised next steps. The first one is connecting the forms; nothing else matters much until a visitor who wants in can actually get in.
