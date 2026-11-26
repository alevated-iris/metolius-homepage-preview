/* Metolius Homepage v1 — shared nav + footer + logo.
 * Pure HTML strings injected on DOMContentLoaded.
 * No framework. No build step.
 */

// Metolius wordmark — stand-in matched to Nicola's real brand (bold editorial
// serif, dark navy ~#1A2E3B, with ® mark). The real logo SVG hasn't been sent
// yet; this is a typeset stand-in using Fraunces (GF, SIL OFL licensed) pinned
// to the correct weight + color so the pages read with the correct brand
// gravitas. Swap for the official asset the moment Nicola sends it.
const METOLIUS_LOGO_SVG = `
<span class="m-logo m-logo--wordmark" aria-hidden="true">Metolius<sup>®</sup></span>`;

const NAV_HTML = `
<nav class="nav" aria-label="Primary">
  <div class="container nav__inner">
    <a class="nav__logo" href="#" aria-label="Metolius Health">
      ${METOLIUS_LOGO_SVG}
    </a>
    <div class="nav__links">
      <a href="#platform">Platform</a>
      <a href="#solutions">Solutions</a>
      <a href="#who">Who we serve</a>
      <a href="#insights">Insights</a>
      <a href="#why">Why Metolius</a>
    </div>
    <div class="nav__cta">
      <a class="btn btn--ghost" href="#">Sign in</a>
      <a class="btn btn--primary" href="#cta">Talk to Metolius</a>
    </div>
    <button class="nav__burger" id="nav-burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-mobile-panel">
      <span class="nav__burger-bar"></span>
      <span class="nav__burger-bar"></span>
      <span class="nav__burger-bar"></span>
    </button>
  </div>
  <div class="nav__mobile-panel" id="nav-mobile-panel" hidden>
    <div class="container">
      <a href="#platform">Platform</a>
      <a href="#solutions">Solutions</a>
      <a href="#who">Who we serve</a>
      <a href="#insights">Insights</a>
      <a href="#why">Why Metolius</a>
      <div class="nav__mobile-cta">
        <a class="btn btn--ghost" href="#">Sign in</a>
        <a class="btn btn--primary" href="#cta">Talk to Metolius</a>
      </div>
    </div>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <a class="nav__logo" href="#" style="color:#fff;">
          ${METOLIUS_LOGO_SVG}
        </a>
        <p style="margin-top:20px; max-width:34ch; font-size:14.5px; line-height:1.6;">
          Human expertise. Intelligent tools. Provider readiness, simplified.
        </p>
      </div>
      <div>
        <h4>Platform</h4>
        <ul>
          <li><a href="#">Workflow</a></li>
          <li><a href="#">Visibility</a></li>
          <li><a href="#">Intelligence</a></li>
          <li><a href="#">Integrations</a></li>
        </ul>
      </div>
      <div>
        <h4>Solutions</h4>
        <ul>
          <li><a href="#">Credentialing &amp; enrollment</a></li>
          <li><a href="#">Managed credentialing</a></li>
          <li><a href="#">Revenue cycle management</a></li>
          <li><a href="#">Enterprise readiness</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="#">Why Metolius</a></li>
          <li><a href="#">Insights</a></li>
          <li><a href="#">Trust &amp; security</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      <div>
        <h4>Talk to us</h4>
        <ul>
          <li><a href="#">Request a briefing</a></li>
          <li><a href="#">Talk to our team</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__meta">
      <span>© 2026 Metolius Health. All rights reserved.</span>
      <span>Privacy · Accessibility · Security</span>
    </div>
  </div>
</footer>
`;

function injectShell(direction, name, note) {
  // Nav at top of body, footer at end.
  const navHost = document.getElementById('nav-mount');
  const footerHost = document.getElementById('footer-mount');
  if (navHost)    navHost.outerHTML    = NAV_HTML;
  if (footerHost) footerHost.outerHTML = FOOTER_HTML;

  const badge = document.createElement('div');
  badge.className = `direction-badge direction-badge--${direction}`;
  badge.innerHTML = `<span class="direction-badge__dot"></span>Direction ${direction} — ${name}`;
  document.body.appendChild(badge);
}

function wireBurger() {
  const burger = document.getElementById('nav-burger');
  const panel = document.getElementById('nav-mobile-panel');
  if (!burger || !panel) return;
  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.classList.remove('is-open');
    panel.hidden = true;
    document.body.classList.remove('nav-open');
  };
  const open = () => {
    burger.setAttribute('aria-expanded', 'true');
    burger.classList.add('is-open');
    panel.hidden = false;
    document.body.classList.add('nav-open');
  };
  burger.addEventListener('click', () => {
    (burger.getAttribute('aria-expanded') === 'true') ? close() : open();
  });
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

function wireJourneyTabs() {
  const tabs = document.querySelectorAll('.journey-tab');
  if (!tabs.length) return;
  const panels = {
    buyer: document.getElementById('journey-buyer'),
    sales: document.getElementById('journey-sales'),
    demo: document.getElementById('journey-demo'),
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => {
        t.classList.toggle('journey-tab--active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      Object.entries(panels).forEach(([key, el]) => {
        if (el) el.hidden = key !== target;
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const d = document.body.dataset;
  if (d.direction) injectShell(d.direction, d.directionName || '', d.directionNote || '');
  wireBurger();
  wireJourneyTabs();
});
