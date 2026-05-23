/* La Mezzaluna — shared partials (v2: single crescent, 6 pages, newsletter) */

// Crescent — rendered as PNG <img> tags. Wine variant everywhere except footer (paper).
// Vertical-align baseline so it sits cleanly inline with text.
function crescent(size, variant) {
  size = size || 12;
  const src = variant === 'paper' ? 'img/crescent-paper.png' : 'img/crescent-wine.png';
  return `<img src="${src}" width="${size}" height="${size}" alt="" style="display:inline-block;width:${size}px;height:${size}px;vertical-align:-0.12em;object-fit:contain;" />`;
}

const PAGES = [
  { href: 'restaurant.html', label: 'The Restaurant' },
  { href: 'menu.html',       label: 'Menu' },
  { href: 'visit.html',      label: 'Visit' },
  { href: 'gift-cards.html', label: 'Gift Cards' },
  { href: 'contact.html',    label: 'Contact' },
];

const ORDER_URL = 'https://app.getyomojo.com/mojoweb/?vendor=QWtkWXGFDM';

function renderNav(active) {
  const desktop = PAGES.map(p => `
    <a class="nav-link ${active === p.href ? 'active' : ''}" href="${p.href}">
      <span class="nav-moon">${crescent(8)}</span>${p.label}
    </a>
  `).join('');

  const mobile = PAGES.map(p => `
    <a class="${active === p.href ? 'active' : ''}" href="${p.href}">
      ${p.label}<span class="moon-inline">${crescent(14)}</span>
    </a>
  `).join('');

  return `
    <nav class="nav">
      <a class="wordmark" href="index.html" aria-label="La Mezzaluna home">
        <img src="img/wordmark-wine.png" alt="La Mezzaluna · A Taste of Italy" />
      </a>
      <div class="nav-right">
        <div class="nav-links">${desktop}</div>
        <a class="btn nav-cta" href="${ORDER_URL}" target="_blank" rel="noopener">Order Online →</a>
      </div>
      <button class="hamburger" aria-label="Open menu" id="hamburger">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-overlay" id="mobile-overlay">
      <div class="mobile-overlay-top">
        <a class="wordmark" href="index.html">
          <img src="img/wordmark-wine.png" alt="La Mezzaluna" />
        </a>
        <button class="mobile-close" id="mobile-close" aria-label="Close menu">CLOSE</button>
      </div>
      <div class="mobile-links">${mobile}</div>
      <a class="btn mobile-order" href="${ORDER_URL}" target="_blank" rel="noopener">Order Online →</a>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <a class="f-wordmark" href="index.html" aria-label="La Mezzaluna home">
        <img src="img/wordmark-paper.png" alt="La Mezzaluna · A Taste of Italy" />
      </a>
      <div class="f-tagline">A Taste of Italy &nbsp;·&nbsp; Est. MMX</div>

      <div class="f-block">
        <a href="https://www.google.com/maps/search/?api=1&query=25+Witherspoon+Street+Princeton+NJ" target="_blank" rel="noopener">25 Witherspoon Street, Princeton, NJ</a><br>
        <a href="tel:+16096888515">(609) 688-8515</a><br>
        <a href="mailto:lamezzalunaprinceton@gmail.com">lamezzalunaprinceton@gmail.com</a>
      </div>

      <div class="f-block hours">
        <span>Sun – Thu</span><span>11AM – 9PM</span>
        <span>Fri – Sat</span><span>11AM – 10PM</span>
      </div>

      <div class="f-divider-row">
        <span class="f-rule"></span>
        <span class="f-cresc">${crescent(14, 'paper')}</span>
        <span class="f-rule"></span>
      </div>

      <form class="f-news" id="f-news" onsubmit="event.preventDefault(); document.getElementById('f-news').classList.add('done');">
        <div class="f-news-label">Stay up to date.</div>
        <div class="f-news-row">
          <input type="email" required placeholder="your@email.com" aria-label="Email">
          <button type="submit">Sign Up →</button>
        </div>
        <div class="f-news-confirm">Grazie. Welcome to the table.</div>
      </form>

      <div class="f-divider-row">
        <span class="f-rule"></span>
        <span class="f-cresc">${crescent(14, 'paper')}</span>
        <span class="f-rule"></span>
      </div>

      <div class="f-block">
        <a href="https://www.instagram.com/lamezzaluna_princeton/" target="_blank" rel="noopener">Instagram</a>
        <span class="f-divider">·</span>
        <a href="https://www.opentable.com/la-mezzaluna" target="_blank" rel="noopener">OpenTable</a>
      </div>

      <div class="f-block">
        <a href="restaurant.html">The Restaurant</a>
        <span class="f-divider">·</span>
        <a href="menu.html">Menu</a>
        <span class="f-divider">·</span>
        <a href="visit.html">Visit</a>
        <span class="f-divider">·</span>
        <a href="gift-cards.html">Gift Cards</a>
        <span class="f-divider">·</span>
        <a href="contact.html">Contact</a>
      </div>
    </footer>
  `;
}

function mountChrome(active) {
  const navHost = document.getElementById('nav-host');
  const footHost = document.getElementById('footer-host');
  if (navHost) navHost.innerHTML = renderNav(active);
  if (footHost) footHost.innerHTML = renderFooter();

  const ham = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-overlay');
  const close = document.getElementById('mobile-close');
  if (ham && overlay) {
    ham.addEventListener('click', () => overlay.classList.add('open'));
    if (close) close.addEventListener('click', () => overlay.classList.remove('open'));
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

window.LM = { mountChrome, crescent };
