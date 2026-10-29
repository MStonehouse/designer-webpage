/* ==========================================================================
   I&CA — behaviour
   --------------------------------------------------------------------------
   This file builds each page from the content in js/projects.js and makes
   the site interactive. It is a "single-page" site: index.html is one shell,
   and the part after # in the address (#work, #boris, #contact...) decides
   which page is drawn into <main>.

   Contents
     1. Small helpers
     2. Images (with the Adobe Portfolio backup)
     3. Pages: Home, Work, Project, Studio, Contact
     4. The router: which page to show, and starting every page at the top
     5. Endless carousels (home "Selected work" and the Work page strips)
     6. Full-screen image viewer
     7. Contact form
     8. Always-on bits: copy email, header shadow, mobile menu, clock
   ========================================================================== */

/* ---------- 1. Small helpers ---------- */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* Makes text safe to place inside HTML (so "&" or "<" can't break the page). */
const esc = (text) =>
  String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* 1 → "01" */
const pad = (n) => String(n).padStart(2, "0");

/* Little bits of markup used in many places */
const ARROW = '<span class="arr" aria-hidden="true">→</span>';
const AMP = '<span class="amp">&amp;</span>';

/* True on devices with a mouse or trackpad (not phones and tablets). */
const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- 2. Images ---------- */

/* An <img> for one of the image(...) entries in projects.js. */
const imageTag = (img, alt, extra = "") =>
  `<img src="${img.src}" data-fallback="${img.fallback}" alt="${esc(alt)}" ${extra}>`;

/* If a local image file is missing, load I&CA's Adobe Portfolio copy instead (once).
   Image errors don't bubble up the page, so this listens in the "capture" phase. */
document.addEventListener(
  "error",
  (event) => {
    const img = event.target;
    if (img.tagName === "IMG" && img.dataset.fallback && !img.dataset.usedFallback) {
      img.dataset.usedFallback = "true";
      img.src = img.dataset.fallback;
    }
  },
  true,
);

/* A project's cover picture. On desktop a second picture fades in on hover;
   phones can't hover, so they never download it. */
function coverFrame(project, eager = false) {
  const main = imageTag(
    project.cover[0],
    `${project.name}, ${project.sector.toLowerCase()} identity`,
    `loading="${eager ? "eager" : "lazy"}" decoding="async"`,
  );
  const hover = canHover ? imageTag(project.cover[1], "", 'class="alt" loading="lazy" decoding="async"') : "";
  return `<div class="frame">${main}${hover}</div>`;
}

/* ---------- 3. Pages ---------- */

/* Home */
function viewHome() {
  const slides = withCopies(PROJECTS, REEL_COPIES)
    .map(
      ({ item: project, copy }, i) => `
        <a class="slide${copy ? " clone" : ""}" href="#${project.slug}"${copy ? ' tabindex="-1" aria-hidden="true"' : ""}>
          ${coverFrame(project, !copy && i < REEL_COPIES + 2)}
          <div class="cap">
            <h3>${esc(project.name)}</h3>
            <span class="mono">${esc(project.sector)}</span>
          </div>
        </a>`,
    )
    .join("");

  return `
    <div class="view">
      <section class="wrap hero">
        <div class="mast" aria-label="I and CA"><span class="l">I</span><span class="amp">&amp;</span><span class="l">CA</span></div>
        <div class="hero-grid">
          <h1>Identity for the <em>independent</em>.</h1>
          <div class="side">
            <p class="lede">A Vancouver design studio making logos, brand identities and websites for small businesses. Studio-quality work, sized for the business you actually run.</p>
            <div class="hero-actions">
              <a class="btn" href="#contact">Request a free proposal ${ARROW}</a>
              <a class="ghost" href="#work">See the work</a>
            </div>
          </div>
        </div>
      </section>

      <section class="selected-work" aria-labelledby="sel">
        <div class="wrap reel-head">
          <span class="mono" id="sel">Selected work · <span id="reel-n">01</span> / ${pad(PROJECTS.length)}</span>
          <div class="reel-ctrl">
            <button class="circ" id="rp" type="button" aria-label="Previous project">←</button>
            <button class="circ" id="rn" type="button" aria-label="Next project">→</button>
          </div>
        </div>
        <div class="reel" id="reel" tabindex="0" aria-label="Selected projects, swipe to browse">${slides}
        </div>
        <div class="wrap">
          <div class="progress" aria-hidden="true"><span id="reel-bar"></span></div>
        </div>
      </section>

      <section class="wrap section">
        <div class="eyebrow mono">The studio</div>
        <div class="split">
          <p class="statement">The corner bakery deserves the same care as the <em>global brand</em>.</p>
          <div class="body-lg">
            <p>Most studios compete for a few large accounts. We build for the bakeries, makers, co-ops and local cornerstones, and give each one an identity designed to last.</p>
            <a class="ghost" href="#about">About the studio ${ARROW}</a>
          </div>
        </div>
      </section>

      <section class="night section" aria-labelledby="why">
        <div class="wrap">
          <div class="eyebrow mono">Who we design for</div>
          <div class="grid2">
            <div class="fig" aria-hidden="true">98<sup>%</sup></div>
            <div class="why">
              <h2 id="why">of Canadian businesses have fewer than 100 employees. They are who we work for.</h2>
              <p>Small businesses are almost the whole economy, yet good design is usually priced for the few at the top. I&amp;CA exists to close that gap.</p>
              <p class="src mono">1.35M of 1.37M employer businesses · 1–99 employees</p>
            </div>
          </div>
        </div>
      </section>

      <section class="wrap section" aria-labelledby="svc">
        <div class="eyebrow mono" id="svc">What we make</div>
        ${servicesList()}
      </section>

      <section class="wrap section flush-top" aria-labelledby="how">
        <div class="eyebrow mono" id="how">How a project runs</div>
        <ol class="steps">
          ${PROCESS.map(([title, text]) => `<li><h3>${title.replace("&", AMP)}</h3><p>${text}</p></li>`).join("\n          ")}
        </ol>
      </section>

      <section class="wrap" aria-labelledby="go">
        <div class="cta">
          <h2 id="go">Let's make something that <em>lasts</em>.</h2>
          <div class="act">
            <a class="btn" href="#contact">Start a project ${ARROW}</a>
            <span class="mono">Free proposal · Reply within one business day</span>
          </div>
        </div>
      </section>
    </div>`;
}

/* The services list, used on Home and Studio */
function servicesList() {
  const items = SERVICES.map(([title, text]) => `<li><h3>${title.replace("&", AMP)}</h3><p>${text}</p></li>`);
  return `<ul class="svc">\n          ${items.join("\n          ")}\n        </ul>`;
}

/* Work */
let filter = "all";

function viewWork() {
  const filters = [
    ["all", "All work"],
    ["identity", "Identity"],
    ["digital", "Digital"],
    ["print", "Print"],
  ];
  const buttons = filters
    .map(
      ([key, label]) =>
        `<button class="chip" type="button" data-f="${key}" aria-pressed="${key === filter}">${label}</button>`,
    )
    .join("\n            ");

  return `
    <div class="view">
      <section class="wrap page-head">
        <h1>Selected <em>work</em></h1>
        <p class="lede">Identities, websites and print for independent businesses, from a neighbourhood bakery to a strata app.</p>
      </section>
      <div class="wrap">
        <div class="toolbar">
          <div class="chips" role="group" aria-label="Filter by discipline">
            ${buttons}
          </div>
        </div>
        <div id="work-list" aria-live="polite"></div>
      </div>
    </div>`;
}

/* One swipeable strip per client: the main picture first, then the gallery.
   Copies of the last two pictures sit before the first, and copies of the first two
   after the last, so the strip can loop forever (see section 5). */
function tileStrip(project, index) {
  const pictures = [project.cover[0], ...project.images];
  const total = pictures.length;

  const copy = (img) => `
            <a href="#${project.slug}" tabindex="-1" aria-hidden="true" class="clone">${imageTag(img, "", 'loading="lazy" decoding="async"')}</a>`;
  const real = pictures
    .map(
      (img, k) => `
            <a href="#${project.slug}" tabindex="${k ? -1 : 0}">${imageTag(
              img,
              `${project.name}, image ${k + 1} of ${total}`,
              `loading="${index < 2 && k < 2 ? "eager" : "lazy"}" decoding="async"`,
            )}</a>`,
    )
    .join("");

  return `
      <article class="tile" aria-label="${esc(project.name)}">
        <div class="strip-wrap">
          <div class="strip" tabindex="0" aria-label="${esc(project.name)} images, swipe to browse">${copy(pictures[total - 2] || pictures[total - 1])}${copy(pictures[total - 1])}${real}${copy(pictures[0])}${copy(pictures[1] || pictures[0])}
          </div>
          <span class="count" aria-hidden="true">01 / ${pad(total)}</span>
          <div class="strip-arrows">
            <button class="circ" type="button" data-dir="-1" aria-label="Previous ${esc(project.name)} image">←</button>
            <button class="circ" type="button" data-dir="1" aria-label="Next ${esc(project.name)} image">→</button>
          </div>
        </div>
        <div class="progress" aria-hidden="true"><span></span></div>
        <a class="tile-cap" href="#${project.slug}">
          <h3>${esc(project.name)}</h3>
          <span class="go">View project ${ARROW}</span>
        </a>
        <div class="sub">
          <span>${esc(project.sector)}</span>
          <span aria-hidden="true">·</span>
          <span>${esc(project.scope)}</span>
        </div>
      </article>`;
}

/* Draw the Work grid for the current filter */
function renderWork() {
  const list = PROJECTS.filter((p) => filter === "all" || p.tags.includes(filter));
  $("#work-list").innerHTML = `<div class="tiles">${list.map(tileStrip).join("")}\n      </div>`;
  $$("[data-f]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === filter));
  wireStrips();
}

function wireWork() {
  $$("[data-f]").forEach((button) => {
    button.onclick = () => {
      filter = button.dataset.f;
      renderWork();
    };
  });
  renderWork();
}

/* Project page (#boris, #greenleaf, ...) */
function viewProject(project) {
  const i = PROJECTS.indexOf(project);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const hasHalves = project.images.some((img) => img.width <= 1200);

  const swatches = project.palette
    .map((colour) => `<span class="sw" style="background:${colour}" title="${colour}"></span>`)
    .join("");
  const paragraphs = project.body.map((text) => `<p>${esc(text)}</p>`).join("\n          ");
  const gallery = project.images
    .map(
      (img, n) => `
        <figure class="${img.width <= 1200 ? "half" : ""}" data-i="${n}">${imageTag(
          img,
          `${project.name}, image ${n + 1} of ${project.images.length}`,
          `loading="${n < 2 ? "eager" : "lazy"}" decoding="async"`,
        )}</figure>`,
    )
    .join("");

  return `
    <article class="view">
      <header class="wrap p-top">
        <div class="crumbs">
          <a class="back" href="#work"><span class="arr" aria-hidden="true">←</span> All work</a>
          <span class="mono">${pad(i + 1)} / ${pad(PROJECTS.length)}</span>
        </div>
        <h1 class="p-title">${esc(project.name)}</h1>
        <div class="p-sub">
          <span class="mono">${esc(project.sector)}</span>
          <span class="tag">Studio concept</span>
        </div>
      </header>

      <div class="wrap">
        <figure class="p-cover bleed" data-i="cover">${imageTag(project.cover[0], `${project.name} key visual`, 'fetchpriority="high"')}</figure>
      </div>

      <section class="wrap p-intro">
        <p class="lead">${esc(project.intro)}</p>
        <dl class="facts">
          <div class="wide"><dt class="mono">Scope</dt><dd>${esc(project.scope)}</dd></div>
          <div><dt class="mono">Sector</dt><dd>${esc(project.sector)}</dd></div>
          <div><dt class="mono">Type</dt><dd>${esc(project.type)}</dd></div>
          <div class="wide">
            <dt class="mono">Palette</dt>
            <dd><div class="sws">${swatches}</div><span class="palette-names">${esc(project.paletteNames)}</span></dd>
          </div>
        </dl>
        <div class="p-text">
          ${paragraphs}
        </div>
      </section>

      <section class="wrap" aria-label="${esc(project.name)} images">
        <div class="gallery${hasHalves ? " has-halves" : ""}">${gallery}
        </div>
        <a class="next" href="#${next.slug}">
          <div class="row">
            <span class="mono">Next project</span>
            <span class="mono">${esc(next.sector)} ${ARROW}</span>
          </div>
          <h2>${esc(next.name)}</h2>
          ${coverFrame(next)}
        </a>
      </section>
    </article>`;
}

/* Studio (#about) */
function viewAbout() {
  return `
    <div class="view">
      <section class="wrap page-head">
        <h1>The <em>studio</em></h1>
      </section>

      <section class="wrap about-intro">
        <div class="split">
          <p class="statement">Good design should not be reserved for <em>big budgets</em>.</p>
          <div class="body-lg">
            <p>I&amp;CA, Industrial &amp; Communication Arts, started from a simple observation: small businesses were being quoted big-studio prices for work that often did not deserve them.</p>
            <p>So we built a studio around the other 98%. We work with founders directly, keep the process lean, and put the hours into the design rather than the overhead.</p>
            <p>We are based in Metro Vancouver and work remotely with clients anywhere. Every project starts with a conversation and a free, fixed-price proposal.</p>
          </div>
        </div>
        <figure class="about-mark bleed">${imageTag(HERO, "Animated showreel of I&CA's identity work, opening on the I&CA wordmark", 'loading="lazy"')}</figure>
      </section>

      <section class="wrap section" aria-labelledby="pr">
        <div class="eyebrow mono" id="pr">How we work</div>
        <ul class="principles">
          <li>
            <h3>Built as a <em>system</em></h3>
            <p>A logo alone does not carry a business. We design the colour, type and rules around it, so your sign, website and receipts all look like the same company.</p>
          </li>
          <li>
            <h3>Simple before <em>clever</em></h3>
            <p>Marks that reproduce cleanly at any size, in one colour, on any surface. If it does not work on a coffee cup and a storefront, it does not work.</p>
          </li>
          <li>
            <h3>Clear scope, <em>fixed price</em></h3>
            <p>You see the full scope and cost in the proposal before we start. No hourly surprises.</p>
          </li>
          <li>
            <h3>Everything is <em>yours</em></h3>
            <p>At hand-off you get every file in every format, plus guidelines that make it easy for anyone to use them correctly.</p>
          </li>
        </ul>
      </section>

      <section class="wrap about-services" aria-labelledby="svc2">
        <div class="eyebrow mono" id="svc2">Services</div>
        ${servicesList()}
      </section>

      <section class="wrap">
        <div class="cta">
          <h2>Have a business that deserves a <em>better brand</em>?</h2>
          <div class="act">
            <a class="btn" href="#contact">Request a free proposal ${ARROW}</a>
          </div>
        </div>
      </section>
    </div>`;
}

/* Contact */
function viewContact() {
  const needs = ["Logo", "Brand identity", "Website", "Signage", "Print", "Not sure yet"];
  const needChips = needs
    .map(
      (need, i) =>
        `<label class="chip"><input type="checkbox" id="need-${i}" name="needs" value="${need}">${need}</label>`,
    )
    .join("\n            ");
  const steps = PROCESS.slice(0, 3)
    .map(([title, text]) => `<li><h3>${title}</h3><p>${text}</p></li>`)
    .join("\n          ");

  return `
    <div class="view">
      <section class="wrap contact">
        <div>
          <span class="mono">Contact</span>
          <h1>Let's talk about your <em>brand</em>.</h1>
          <p class="intro">Tell us a little about your business and what you need. We reply within one business day, and every proposal is free.</p>
          <div class="mail-card">
            <span class="mono">Or write directly</span>
            <a class="addr" href="mailto:kevin@iandca.ca">kevin@iandca.ca</a>
            <div class="mail-row">
              <button class="ghost" type="button" data-copy="kevin@iandca.ca">Copy email</button>
              <a class="ghost" href="mailto:kevin@iandca.ca">Open mail app</a>
            </div>
          </div>
          <ol class="steps stacked">
          ${steps}
          </ol>
        </div>

        <form id="cform" novalidate>
          <div class="two">
            <div class="field">
              <label for="f-name">Your name</label>
              <input id="f-name" name="name" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="f-email">Email</label>
              <input id="f-email" name="email" type="email" inputmode="email" autocomplete="email" required>
            </div>
          </div>
          <div class="field">
            <label for="f-biz">Business <span class="optional">(optional)</span></label>
            <input id="f-biz" name="business" autocomplete="organization">
          </div>
          <fieldset>
            <legend>What do you need?</legend>
            <div class="need">
            ${needChips}
            </div>
          </fieldset>
          <div class="field">
            <label for="f-budget">Budget</label>
            <select id="f-budget" name="budget">
              <option value="">Choose a range</option>
              <option>Under $2,500</option>
              <option>$2,500 – $5,000</option>
              <option>$5,000 – $10,000</option>
              <option>$10,000+</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div class="field">
            <label for="f-msg">About the project</label>
            <textarea id="f-msg" name="message" required placeholder="What does your business do, and what would you like to make?"></textarea>
          </div>
          <p class="err" id="f-err" role="alert" hidden></p>
          <div class="send">
            <button class="btn" type="submit">Send inquiry ${ARROW}</button>
            <span class="mono">Free proposal · No obligation</span>
          </div>
        </form>
      </section>
    </div>`;
}

/* ---------- 4. The router ---------- */

/* We decide where each page starts, not the browser: no restoring old scroll positions. */
try {
  history.scrollRestoration = "manual";
} catch (e) {}

function toTop() {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

const main = $("#main");

/* Read the address (#work, #boris...) and draw that page */
function route() {
  const key = (location.hash || "#home").slice(1).toLowerCase();
  const project = PROJECTS.find((p) => p.slug === key);

  let html;
  let nav = "home";
  let title = "I&CA · Identity for the independent";

  if (project) {
    html = viewProject(project);
    nav = "work";
    title = `${project.name} · I&CA`;
  } else if (key === "work") {
    html = viewWork();
    nav = "work";
    title = "Work · I&CA";
  } else if (key === "about") {
    html = viewAbout();
    nav = "about";
    title = "Studio · I&CA";
  } else if (key === "contact") {
    html = viewContact();
    nav = "contact";
    title = "Contact · I&CA";
  } else {
    html = viewHome();
  }

  main.innerHTML = html;
  document.title = title;
  $$("[data-nav]").forEach((link) =>
    link.dataset.nav === nav ? link.setAttribute("aria-current", "page") : link.removeAttribute("aria-current"),
  );

  toTop();
  requestAnimationFrame(toTop); // once more, after the new page has laid out
  travel = 0;
  lastY = 0;
  setDock(false);

  if (key === "work") wireWork();
  if (project) wireGallery(project);
  if (key === "contact") wireForm();
  if (!project && !["work", "about", "contact"].includes(key)) wireReel();
}

addEventListener("hashchange", () => {
  route();
  main.focus({ preventScroll: true });
});

/* Tapping the link for the page you're already on glides back to the top */
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.closest(".strip")) return;
  const wanted = link.getAttribute("href") || "#home";
  const current = location.hash || "#home";
  if (wanted === current) {
    event.preventDefault();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }
});

/* ---------- 5. Endless carousels ----------
   A carousel row holds C copies of its last items, then the real items, then C copies
   of its first items. When a swipe stops on a copy, we jump instantly to its real twin,
   which looks identical, so the row seems to go on forever. C must cover everything
   visible at once, so the edges always match: 4 for the home carousel (desktop shows
   about three cards), 2 for the Work page strips. */

const REEL_COPIES = 4;

function withCopies(items, C) {
  const n = items.length;
  const at = (k) => items[((k % n) + n) % n];
  return [...Array(C)]
    .map((_, k) => ({ item: at(k - C), copy: true }))
    .concat(items.map((item) => ({ item, copy: false })))
    .concat([...Array(C)].map((_, k) => ({ item: at(k), copy: true })));
}

function makeLoop(row, C, onShow) {
  const slides = row.children;
  const total = slides.length - 2 * C;
  const pos = (k) => slides[k].offsetLeft - slides[0].offsetLeft;
  const at = () => Math.round(row.scrollLeft / (pos(1) || row.clientWidth));
  const realOf = (k) => (((k - C) % total) + total) % total;

  // Move instantly with snapping paused
  const freeze = (fn) => {
    row.style.scrollSnapType = "none";
    fn();
    requestAnimationFrame(() => requestAnimationFrame(() => (row.style.scrollSnapType = "")));
  };
  const jump = (k) => freeze(() => (row.scrollLeft = pos(k)));
  // Hop from a copy to its real twin by their exact on-screen distance (fractions of a
  // pixel included), so what's on screen lands in exactly the same place.
  const hop = (from, to) =>
    freeze(
      () => (row.scrollLeft += slides[to].getBoundingClientRect().left - slides[from].getBoundingClientRect().left),
    );

  let shown = -1;
  let ticking = false;
  let idle = 0;
  let target = null;
  let warmed = false;

  const show = () => {
    const real = realOf(at());
    if (real === shown) return;
    onShow(real, total, shown !== -1 && Math.abs(real - shown) > 1);
    shown = real;
  };

  // The swipe has stopped: if we're on a copy, hop to its twin
  const settle = () => {
    target = null;
    const k = at();
    if (k < C) hop(k, k + total);
    else if (k >= C + total) hop(k, k - total);
    show();
  };

  // On first touch, load the pictures around both ends so nothing pops in at the loop point
  const warm = () => {
    if (warmed) return;
    warmed = true;
    [...slides].forEach((slide, k) => {
      if (k < 2 * C || k >= total) slide.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
    });
  };

  row.addEventListener(
    "scroll",
    () => {
      warm();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          show();
        });
      }
      clearTimeout(idle);
      idle = setTimeout(settle, 180);
    },
    { passive: true },
  );
  row.addEventListener("pointerenter", warm, { once: true });
  row.addEventListener("touchstart", warm, { once: true, passive: true });

  // Arrow buttons: plan from where we're heading, not from mid-glide
  const move = (direction) => {
    clearTimeout(idle);
    let k = target ?? at();
    if (k < C) {
      hop(k, k + total);
      k += total;
    } else if (k >= C + total) {
      hop(k, k - total);
      k -= total;
    }
    target = k + direction;
    row.scrollTo({ left: pos(target), behavior: "smooth" });
  };

  row._reset = () => {
    jump(C + (shown < 0 ? 0 : shown));
    shown = -1;
    show();
  };

  jump(C); // start on the first real item
  show();
  return { move };
}

/* The thin progress line: one segment per item, wrapping straight back at the loop point */
function showBar(bar, real, total, wrapped) {
  if (wrapped) bar.style.transition = "none";
  bar.style.width = 100 / total + "%";
  bar.style.transform = `translateX(${real * 100}%)`;
  if (wrapped) requestAnimationFrame(() => (bar.style.transition = ""));
}

/* Left/right arrow keys on a focused carousel */
function arrowKeys(row, loop) {
  row.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      loop.move(event.key === "ArrowRight" ? 1 : -1);
    }
  });
}

/* Home: Selected work */
function wireReel() {
  const reel = $("#reel");
  if (!reel) return;
  const counter = $("#reel-n");
  const bar = $("#reel-bar");
  const loop = makeLoop(reel, REEL_COPIES, (real, total, wrapped) => {
    counter.textContent = pad(real + 1);
    showBar(bar, real, total, wrapped);
  });
  $("#rp").onclick = () => loop.move(-1);
  $("#rn").onclick = () => loop.move(1);
  arrowKeys(reel, loop);
}

/* Work: one strip per client */
function wireStrips() {
  $$(".tile").forEach((tile) => {
    const strip = $(".strip", tile);
    const counter = $(".count", tile);
    const bar = $(".progress span", tile);
    const loop = makeLoop(strip, 2, (real, total, wrapped) => {
      counter.textContent = `${pad(real + 1)} / ${pad(total)}`;
      showBar(bar, real, total, wrapped);
    });
    $$(".strip-arrows button", tile).forEach((button) => (button.onclick = () => loop.move(+button.dataset.dir)));
    arrowKeys(strip, loop);
  });
}

/* When the window changes size, re-align every carousel on its current item */
addEventListener("resize", () => $$(".strip, .reel").forEach((row) => row._reset && row._reset()));

/* ---------- 6. Full-screen image viewer ----------
   A row of full-screen pictures that snaps one at a time, so swiping works natively. */

const viewer = $("#lb");
const track = $("#lb-track");
const viewerCount = $("#lb-count");
let viewerTotal = 0;

function wireGallery(project) {
  const pictures = [project.cover[0], ...project.images];
  viewerTotal = pictures.length;
  track.innerHTML = pictures
    .map(
      (img, k) =>
        `<figure>${imageTag(img, `${project.name}, image ${k + 1} of ${pictures.length}`, 'loading="lazy" decoding="async"')}</figure>`,
    )
    .join("");

  const open = (k) => {
    viewer.showModal();
    requestAnimationFrame(() => {
      track.scrollTo({ left: k * track.clientWidth, behavior: "instant" });
      updateViewerCount();
    });
  };

  $$(".gallery figure, .p-cover").forEach((figure) => {
    const k = figure.dataset.i === "cover" ? 0 : +figure.dataset.i + 1;
    figure.tabIndex = 0;
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", "View image full screen");
    figure.onclick = () => open(k);
    figure.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(k);
      }
    };
  });
}

const viewerIndex = () => Math.round(track.scrollLeft / track.clientWidth);
const updateViewerCount = () => (viewerCount.textContent = `${pad(viewerIndex() + 1)} / ${pad(viewerTotal)}`);
const viewerGo = (d) =>
  track.scrollTo({
    left: Math.max(0, Math.min(viewerTotal - 1, viewerIndex() + d)) * track.clientWidth,
    behavior: "smooth",
  });

track.addEventListener("scroll", () => requestAnimationFrame(updateViewerCount), { passive: true });
$("#lb-prev").onclick = () => viewerGo(-1);
$("#lb-next").onclick = () => viewerGo(1);
$("#lb-x").onclick = () => viewer.close();
viewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") viewerGo(1);
  if (event.key === "ArrowLeft") viewerGo(-1);
});
// Tapping the dark space around a picture closes the viewer
track.addEventListener("click", (event) => {
  if (event.target.tagName === "FIGURE") viewer.close();
});

/* ---------- 7. Contact form ----------
   There's no server yet: submitting opens the visitor's email app with the inquiry
   filled in. To receive inquiries directly, connect a form service (e.g. Formspree). */

function wireForm() {
  const form = $("#cform");
  const error = $("#f-err");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const missing = [];

    [
      ["name", "your name"],
      ["email", "a valid email"],
      ["message", "a few words about the project"],
    ].forEach(([name, description]) => {
      const field = form.elements[name];
      const bad = !String(data.get(name) || "").trim() || !field.checkValidity();
      field.closest(".field").classList.toggle("invalid", bad);
      if (bad) missing.push(description);
    });

    if (missing.length) {
      error.hidden = false;
      error.textContent = `Please add ${missing.join(", ")}.`;
      form.querySelector(".invalid input, .invalid textarea")?.focus();
      return;
    }

    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Business: ${data.get("business") || "-"}`,
      `Needs: ${data.getAll("needs").join(", ") || "-"}`,
      `Budget: ${data.get("budget") || "-"}`,
      "",
      data.get("message"),
    ].join("\n");
    const subject = encodeURIComponent("Project inquiry from " + data.get("name"));
    location.href = `mailto:kevin@iandca.ca?subject=${subject}&body=${encodeURIComponent(body)}`;

    form.outerHTML = `
      <div class="done">
        <span class="mono">One more step</span>
        <h2>Your email app should open with the inquiry ready to send.</h2>
        <p>Press send there and we will reply within one business day. If nothing opened, write to kevin@iandca.ca.</p>
      </div>`;
  });
}

/* ---------- 8. Always-on bits ---------- */

/* "Copy email" buttons */
const toast = $("#toast");
document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    toast.textContent = "Email copied";
  } catch {
    toast.textContent = button.dataset.copy;
  }
  toast.classList.add("on");
  setTimeout(() => toast.classList.remove("on"), 1800);
});

/* Header shadow, and the mobile menu (dock) that hides while you scroll down.
   The dock only hides after a deliberate scroll down (48px) and returns after 24px up.
   Bounce at the top and bottom and tiny jitters are ignored, and the page is only
   touched when the state actually changes (at most once per frame). */
const header = $("#top");
const dock = $("#dock");
let lastY = Math.max(0, scrollY);
let travel = 0;
let dockHidden = false;
let scrolled = false;
let scrollTicking = false;

function setDock(hide) {
  if (hide === dockHidden) return;
  dockHidden = hide;
  dock.classList.toggle("away", hide);
}

function onScrollFrame() {
  scrollTicking = false;
  const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const y = Math.min(Math.max(scrollY, 0), max); // ignore the rubber-band bounce
  const dy = y - lastY;
  lastY = y;

  const isScrolled = y > 8;
  if (isScrolled !== scrolled) {
    scrolled = isScrolled;
    header.classList.toggle("scrolled", isScrolled);
  }

  if (!dy) return;
  if (dy > 0 !== travel > 0) travel = 0; // direction changed: start counting again
  travel += dy;

  if (y < 120 || y > max - 80)
    setDock(false); // always visible near the top and bottom
  else if (travel > 48) setDock(true);
  else if (travel < -24) setDock(false);
}

addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScrollFrame);
    }
  },
  { passive: true },
);

/* Vancouver clock, and this year in the footer */
const clockFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Vancouver",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const tick = () => $$(".clock").forEach((clock) => (clock.textContent = clockFormat.format(new Date())));
tick();
setInterval(tick, 15000);
$("#yr").textContent = new Date().getFullYear();

/* ---------- Start ---------- */
route();
