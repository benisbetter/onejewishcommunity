/* ============================================================
   One Jewish Community — shared site scripts
   ============================================================ */

/* ------------------------------------------------------------
   CONFIG — the only part you need to edit to make forms work.

   1. Create a free form at https://formspree.io
   2. Paste the endpoint it gives you below, e.g.
        const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';

   Until this is filled in, forms do NOT silently pretend to
   send. They tell the visitor the truth and offer another way.
   ------------------------------------------------------------ */
const FORM_ENDPOINT = '';
const FALLBACK_URL = 'https://github.com/benisbetter/onejewishcommunity/issues';

/* ---------- Mobile navigation ---------- */
(function nav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!links.classList.contains('open')) return;
    if (!links.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px' }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- Search + filter chips ---------- */
(function filters() {
  const input = document.getElementById('siteSearch');
  const chips = Array.from(document.querySelectorAll('.filter-chips .chip'));
  const cards = Array.from(document.querySelectorAll('[data-filterable]'));
  const empty = document.getElementById('noResults');
  const count = document.getElementById('resultCount');
  if (!cards.length) return;

  let activeTag = 'all';
  const one = document.body.dataset.itemNoun || 'result';
  const many = document.body.dataset.itemPlural || one + 's';
  const label = (n) => (n === 1 ? one : many);

  chips.forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.classList.contains('active')));
  });

  function apply() {
    const q = (input ? input.value : '').trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').toLowerCase().split(/\s+/);
      const matchesTag = activeTag === 'all' || tags.includes(activeTag);
      const matchesText = !q || card.textContent.toLowerCase().includes(q);
      const show = matchesTag && matchesText;
      card.hidden = !show;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';

    if (count) {
      const filtered = q || activeTag !== 'all';
      if (!filtered) {
        count.textContent = `Showing all ${cards.length} ${label(cards.length)}.`;
      } else if (visible === 0) {
        count.textContent = `No ${many} match. Try a different keyword or filter.`;
      } else {
        count.textContent = `Showing ${visible} of ${cards.length} ${label(visible)}.`;
      }
    }
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      activeTag = (chip.dataset.filter || 'all').toLowerCase();
      apply();
    });
  });

  if (input) {
    let t;
    input.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(apply, 120);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && input.value) {
        input.value = '';
        apply();
      }
    });
  }

  apply();
})();

/* ---------- Forms ---------- */
(function forms() {
  const forms = Array.from(document.querySelectorAll('form[data-form]'));
  if (!forms.length) return;

  const setStatus = (el, message, state) => {
    if (!el) return;
    el.textContent = message;
    el.className = 'form-status' + (state ? ' is-' + state : '');
  };

  const invalidFields = (form) =>
    Array.from(form.querySelectorAll('[required]')).filter((field) => !field.checkValidity());

  forms.forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');
    const done = document.getElementById(form.dataset.thanks || '');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate first, and say which field is the problem.
      const bad = invalidFields(form);
      if (bad.length) {
        const label = form.querySelector(`label[for="${bad[0].id}"]`);
        const name = label ? label.textContent.replace(/\s*Optional\s*$/, '').trim() : 'A required field';
        setStatus(status, `Please check "${name}" — ${bad[0].validationMessage}`, 'error');
        bad[0].focus();
        return;
      }

      // Not wired up yet: say so, rather than faking a thank-you.
      if (!FORM_ENDPOINT) {
        setStatus(
          status,
          'This form is not connected to an inbox yet, so nothing was sent — we are not going to pretend otherwise. ' +
            'The site is in early setup. Please try again soon, or reach the project directly on GitHub.',
          'warn'
        );
        if (status && !status.querySelector('a')) {
          const link = document.createElement('a');
          link.href = FALLBACK_URL;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = 'Open GitHub ↗';
          status.append(' ', link);
        }
        return;
      }

      const original = button ? button.textContent : '';
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      setStatus(status, 'Sending…', 'pending');

      try {
        const data = new FormData(form);
        data.append('_subject', `[One Jewish Community] ${form.dataset.form}`);
        data.append('_source', window.location.href);

        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error('Request failed with status ' + res.status);

        form.reset();
        if (done) {
          form.style.display = 'none';
          done.style.display = 'block';
          done.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          setStatus(status, 'Thank you — your message was sent. We read every one and will reply if it needs a reply.', 'ok');
        }
      } catch (err) {
        setStatus(
          status,
          'Something went wrong and your message was not sent. Please check your connection and try again — if it keeps failing, reach us on GitHub.',
          'error'
        );
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = original;
        }
      }
    });
  });
})();
