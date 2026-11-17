/* Metolius Homepage v1 — shared nav + footer + logo.
 * Pure HTML strings injected on DOMContentLoaded.
 * No framework. No build step.
 */

const METOLIUS_LOGO_SVG = `
<svg class="m-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M8 36 L18 20 L24 28 L32 16 L40 36 Z" fill="#A0E4BC"/>
  <circle cx="36" cy="12" r="5" fill="#FCE5B0"/>
  <path d="M4 40 C14 36, 22 42, 34 38 C40 36, 44 40, 44 40 L44 44 L4 44 Z" fill="#00AEE6"/>
</svg>`;

const NAV_HTML = `
<nav class="nav" aria-label="Primary">
  <div class="container nav__inner">
    <a class="nav__logo" href="#" aria-label="Metolius Health">
      ${METOLIUS_LOGO_SVG}
      <span>Metolius</span>
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
          <span>Metolius</span>
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

document.addEventListener('DOMContentLoaded', () => {
  const d = document.body.dataset;
  if (d.direction) injectShell(d.direction, d.directionName || '', d.directionNote || '');
});
