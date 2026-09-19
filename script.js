// One Jewish Community — shared site scripts

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Search + filter chips (pages with a #siteSearch input and/or .filter-chips)
const searchInput = document.getElementById('siteSearch');
const chips = document.querySelectorAll('.filter-chips .chip');
const filterCards = document.querySelectorAll('[data-filterable]');
let activeTag = 'all';

function applyFilters() {
  const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
  let visible = 0;
  filterCards.forEach(card => {
    const tags = (card.dataset.tags || '').toLowerCase().split(' ');
    const matchesTag = activeTag === 'all' || tags.includes(activeTag);
    const matchesText = !q || card.textContent.toLowerCase().includes(q);
    const show = matchesTag && matchesText;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const empty = document.getElementById('noResults');
  if (empty) empty.style.display = (visible === 0 && filterCards.length > 0) ? 'block' : 'none';
}

chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeTag = (chip.dataset.filter || 'all').toLowerCase();
  applyFilters();
}));
if (searchInput) searchInput.addEventListener('input', applyFilters);

// Suggestion form
const suggestForm = document.getElementById('suggestForm');
const formThanks = document.getElementById('formThanks');
if (suggestForm && formThanks) {
  suggestForm.addEventListener('submit', e => {
    e.preventDefault();
    suggestForm.style.display = 'none';
    formThanks.style.display = 'block';
    formThanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
