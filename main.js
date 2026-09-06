// =====================================================================
// GROENHOUTEN DAIRY FARM — shared behaviour across all pages
// =====================================================================
const WA_NUMBER = '31613755767';

/* ---- navbar scroll state ---- */
const nav = document.getElementById('mainNav');
if (nav) {
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('scrolled', scrolled);
    nav.classList.toggle('hero-visible', !scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- mobile menu ---- */
function toggleMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  const opening = !menu.classList.contains('open');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.style.overflow = opening ? 'hidden' : '';
}

/* ---- hero background zoom-in once loaded ---- */
window.addEventListener('load', () => {
  const bg = document.getElementById('heroBg');
  if (bg) bg.classList.add('loaded');
});

/* ---- scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---- animated stat numbers ---- */
function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^(\d+)(.*)$/); // leading integer + any suffix (+, K, etc)
  if (!match) return; // non-numeric labels (e.g. "FCT") are left as-is
  const target = parseInt(match[1], 10);
  const suffix = match[2];
  const duration = 1300;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.js-count').forEach((el) => countObserver.observe(el));

/* ---- WhatsApp order helper (product cards) ---- */
function order(product) {
  const msg = encodeURIComponent(`Hello Groenhouten Dairy Farm, I'm interested in ${product}. Please send details and pricing.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

/* ---- contact form -> WhatsApp ---- */
function sendContact() {
  const name = document.getElementById('cfName')?.value.trim();
  const phone = document.getElementById('cfPhone')?.value.trim();
  const need = document.getElementById('cfNeed')?.value;
  const msg = document.getElementById('cfMsg')?.value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  let txt = `Hi Groenhouten Dairy Farm, my name is ${name}.`;
  if (need) txt += ` I'm interested in: ${need}.`;
  if (msg) txt += ` Details: ${msg}`;
  txt += ` My contact: ${phone}.`;
  const success = document.getElementById('cfSuccess');
  const submitBtn = document.querySelector('.cf-submit');
  if (success) success.style.display = 'block';
  if (submitBtn) submitBtn.style.display = 'none';
  setTimeout(() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(txt)}`, '_blank'), 500);
}

/* ---- Google Translate (removed — replaced by custom EN/NL toggle) ---- */

/* ---- about page read more ---- */
function toggleAbout() {
  const exp = document.getElementById('aboutExp');
  const btn = document.getElementById('aboutBtn');
  if (!exp || !btn) return;
  const isOpen = exp.classList.contains('open');
  exp.classList.toggle('open');
  btn.classList.toggle('open');
  btn.innerHTML = isOpen ? 'Read More <span class="arr">&darr;</span>' : 'Show Less <span class="arr">&uarr;</span>';
}

/* =====================================================================
   PAGE TRANSITION CURTAIN — the logo travels between pages
===================================================================== */
(function pageTransitions() {
  const curtain = document.getElementById('curtain');
  if (!curtain) return;

  // reveal the current page once everything is ready
  const revealPage = () => {
    requestAnimationFrame(() => {
      setTimeout(() => curtain.classList.add('hidden'), 220);
    });
  };
  if (document.readyState === 'complete') revealPage();
  else window.addEventListener('load', revealPage);

  // intercept internal navigation and play the curtain first
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
    if (!href.endsWith('.html') && href !== '/' && !href.match(/^[a-zA-Z0-9_-]+\.html/)) return;

    e.preventDefault();
    document.body.classList.add('transitioning');
    curtain.classList.remove('hidden');
    setTimeout(() => { window.location.href = href; }, 520);
  });
})();

/* =====================================================================
   LANGUAGE TOGGLE — EN / NL
===================================================================== */
const translations = {
  en: {
    'nav-home': 'Home',
    'nav-products': 'Products',
    'nav-about': 'About',
    'nav-contact': 'Contact',
    'nav-cta': 'Order Now',
    'hero-eyebrow': 'Leuth, Netherlands · Organic Dairy Farm',
    'hero-title': 'Milk today, <em>cheese</em> tomorrow.',
    'hero-sub': 'Raw milk and raw-milk cheese from our organic 30-hectare farm in the Ooijpolder, near the German border.',
    'wa-btn': 'Order on WhatsApp',
    'view-products': 'View Products',
    'stat-farms': 'Farm Divisions',
    'stat-hectare': 'Hectare Farm',
    'stat-organic': 'Organic & Raw',
    'stat-export': 'Wide Export',
    'featured-eyebrow': 'What We Produce',
    'featured-title': 'Three divisions, one <em>standard</em> of care',
    'featured-sub': 'From pasture to bottle to wheel, every product carries the same organic, raw discipline — because that\'s what makes Groenhouten, Groenhouten.',
    'order-now': 'Order Now',
    'enquire-now': 'Enquire Now',
    'see-full': 'See Full Product List',
    'why-eyebrow': 'Why Groenhouten Dairy Farm',
    'why-title': 'Reasons buyers keep coming back',
    'why-i-title': 'Certified Organic & Raw',
    'why-i-desc': 'Biologische Zuivelboerderij Groenhouten — nothing pasteurised away, nothing rushed.',
    'why-ii-title': 'Traditional Cheese-Making',
    'why-ii-desc': 'Raw-milk cheeses aged and finished on the farm, the old Ooijpolder way.',
    'why-iii-title': 'Leuth, Near the German Border',
    'why-iii-desc': '30 hectares of pasture in the Ooijpolder region, minutes from Germany.',
    'why-iv-title': 'Export & Corporate Ready',
    'why-iv-desc': 'Bulk supply for cheese importers, dairies and corporate buyers across the EU.',
    'testi-eyebrow': 'Testimonials',
    'testi-title': 'Trusted by shops, kitchens & buyers',
    'cta-title': 'Ready to order raw milk, cheese or cattle?',
    'cta-sub': 'Tell us what you need — retail or bulk — and we\'ll confirm availability and pricing. Customer care is available 24/7 on WhatsApp.',
    'cta-btn1': 'Get In Touch',
    'cta-btn2': 'Call +31 6 13755767',
    'footer-desc': 'Raw milk, raw-milk cheese and quality dairy cattle — from our organic farm in Leuth, Netherlands, to households, cheesemakers and bulk buyers across Europe.',
    'footer-quick': 'Quick Links',
    'footer-contact': 'Contact',
    'marquee-milk': 'Raw Milk · Sold fresh, retail & bulk',
    'marquee-cheese': 'Cheese · Raw-milk, farmhouse & export',
    'marquee-cattle': 'Cattle · Live export & quality meat',
    'marquee-loc': 'Location · Leuth, Netherlands',
  },
  nl: {
    'nav-home': 'Home',
    'nav-products': 'Producten',
    'nav-about': 'Over Ons',
    'nav-contact': 'Contact',
    'nav-cta': 'Bestellen',
    'hero-eyebrow': 'Leuth, Nederland · Biologische Melkveeboerderij',
    'hero-title': 'Melk vandaag, <em>kaas</em> morgen.',
    'hero-sub': 'Ruwe melk en ruwwemelkkaas van onze biologische boerderij van 30 hectare in de Ooijpolder, aan de Duitse grens.',
    'wa-btn': 'Bestellen via WhatsApp',
    'view-products': 'Bekijk Producten',
    'stat-farms': 'Bedrijfstakken',
    'stat-hectare': 'Hectare Boerderij',
    'stat-organic': 'Biologisch & Rauw',
    'stat-export': 'EU-Brede Export',
    'featured-eyebrow': 'Wat WeProduceren',
    'featured-title': 'Drie takken, één <em>standaard</em> van zorg',
    'featured-sub': 'Van weide tot fles tot rad, elk product draagt dezelfde biologische, rauwe discipline — want daar maakt Groenhouten, Groenhouten.',
    'order-now': 'Bestellen',
    'enquire-now': 'Opvragen',
    'see-full': 'Bekijk Volledige Productlijst',
    'why-eyebrow': 'Waarom Groenhouten Melkveeboerderij',
    'why-title': 'Redenen waarom kopers terugkomen',
    'why-i-title': 'Gecertificeerd Biologisch & Rauw',
    'why-i-desc': 'Biologische Zuivelboerderij Groenhouten — niets gepasteuriseerd, niets gehaast.',
    'why-ii-title': 'Traditionele Kaasbereiding',
    'why-ii-desc': 'Ruwwemelkkaas gerijpt en afgewerkt op de boerderij, op de oude Ooijpolderse manier.',
    'why-iii-title': 'Leuth, Aan de Duitse Grens',
    'why-iii-desc': '30 hectare weide in de regio Ooijpolder, op enkele minuten van Duitsland.',
    'why-iv-title': 'Export & Zakelijk Klaar',
    'why-iv-desc': 'Bulkvoorziening voor kaasimporteurs, zuivelbedrijven en zakelijke kopers in de hele EU.',
    'testi-eyebrow': 'Referenties',
    'testi-title': 'Vertrouwd door winkels, keukens & kopers',
    'cta-title': 'Klaar om ruwe melk, kaas of vee te bestellen?',
    'cta-sub': 'Vertel ons wat u nodig heeft — detailhandel of bulk — en wij bevestigen beschikbaarheid en prijs. Klantenservice is 24/7 beschikbaar via WhatsApp.',
    'cta-btn1': 'Neem Contact Op',
    'cta-btn2': 'Bel +31 6 13755767',
    'footer-desc': 'Ruwe melk, ruwwemelkkaas en kwaliteitsmelkvee — van onze biologische boerderij in Leuth, Nederland, naar huishoudens, kaasmakers en bulkkopers in heel Europa.',
    'footer-quick': 'Snelle Links',
    'footer-contact': 'Contact',
    'marquee-milk': 'Ruwe Melk · Vers verkocht, detailhandel & bulk',
    'marquee-cheese': 'Kaas · Ruwwemelk, boerderijkäse & export',
    'marquee-cattle': 'Vee · Levende export & kwaliteit vlees',
    'marquee-loc': 'Locatie · Leuth, Nederland',
  }
};

function switchLang(lang) {
  document.documentElement.lang = lang;
  const t = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });
  // Save preference
  try { localStorage.setItem('gh-lang', lang); } catch(e) {}
}

// Restore saved language on load
(function initLang() {
  const saved = (() => { try { return localStorage.getItem('gh-lang'); } catch(e) { return null; } })();
  if (saved && translations[saved]) {
    const sel = document.getElementById('langSelect');
    if (sel) sel.value = saved;
    switchLang(saved);
  }
})();
