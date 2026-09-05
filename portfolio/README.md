# Htet Myat Phone Naing — Data Scientist & Analyst Portfolio

A minimalist, white-background portfolio built with plain HTML, CSS, and
JavaScript — no build step, no framework. Design direction takes cues from
Apple's restraint and vismarketing.co.uk's bold type and network-graph
motif, adapted for a data professional: a canvas node-and-edge animation in
the hero, a monospace type accent for labels/numbers/tags (nodding to a
data scientist's life in notebooks and terminals), and one signal-blue
accent color throughout.

---

## 1. Preview it locally

Project card data loads via `fetch('data/projects.json')`, which most
browsers block on a plain double-clicked `file://` page (CORS). Run a tiny
local server from the project root instead:

```bash
# Python (built in on most machines)
python3 -m http.server 8000

# or Node
npx serve .
```

Then open **http://localhost:8000** in your browser.

## 2. Where to personalize

Everything that needs your own content is marked with `[bracketed
placeholders]`. Search the project for `[Your` to find all of them quickly.

| What | Where |
|---|---|
| Name, title, hero copy | `index.html` → `#home` section |
| Bio, stats | `index.html` → `#about` section |
| Skills/tools | `index.html` → `#skills` section |
| Projects | `data/projects.json` (edit/add/remove entries — cards render automatically) |
| Project thumbnails | `assets/images/project-*.svg` (swap for real screenshots, or keep the charts) |
| Work history | `index.html` → `#experience` section |
| Email / LinkedIn / GitHub / Kaggle links | `index.html` → `#contact` and footer, plus `DESTINATION_EMAIL` in `js/contactForm.js` |
| Your photo | Replace `assets/images/avatar-placeholder.svg` with a real photo (any format — update the `src` in the `#about` section) |
| Résumé | Replace `assets/resume.pdf` with your real résumé (same filename, or update the two links in `index.html`) |
| Social preview image | Regenerate `assets/images/og-cover.png` with your name once the rest is finalized |
| Site title/description | `<title>` and `<meta name="description">` in `index.html`'s `<head>` |

## 3. How the pieces fit together

```
portfolio/
├── index.html                  # All markup, all sections
├── css/
│   ├── reset.css                # Normalize default browser styles
│   ├── variables.css             # Design tokens: color, type, spacing, radius
│   ├── base.css                  # Global typography & base element styles
│   ├── layout.css                # Container, grid helpers, section spacing
│   ├── animations.css            # Keyframes + scroll-reveal classes
│   └── components/               # One file per section/component
├── js/
│   ├── main.js                   # Entry point — wires up every module
│   ├── navbar.js                 # Sticky nav, mobile menu, active-link tracking
│   ├── scrollProgress.js         # Top reading-progress bar
│   ├── scrollReveal.js           # Fade/slide-in on scroll
│   ├── heroNetwork.js            # Canvas node network in the hero
│   ├── projectsRender.js         # Fetches projects.json → renders cards
│   ├── projectFilter.js          # Category filter buttons
│   ├── contactForm.js            # Validation + mailto: submission
│   └── chartDemo.js              # Live Chart.js chart in the Projects section
├── data/projects.json            # Project content — edit this, not the HTML
└── assets/                       # Icons (SVG sprite), images, résumé
```

Each CSS/JS file owns exactly one section or feature, so you can open, say,
`css/components/projects.css` or `js/projectFilter.js` and know you're only
touching the Projects section.

## 4. A few implementation notes

- **Contact form has no backend.** A valid submission opens the visitor's
  email client with the message pre-filled (`mailto:`). To use a real
  form service instead (Formspree, Netlify Forms, etc.), replace the
  `submitViaMailto()` call in `js/contactForm.js` with a `fetch()` POST to
  your endpoint — the validation logic above it doesn't need to change.
- **Live chart** in the Projects section uses [Chart.js](https://www.chartjs.org/)
  loaded from a CDN with sample data in `js/chartDemo.js` — swap in a real
  metric whenever you have one.
- **Project thumbnails** are hand-drawn SVG charts (no external images, so
  nothing to break) — replace them with real dashboard/notebook screenshots
  whenever you like; just keep the same 16:10 aspect ratio.
- **No dark mode.** Kept the site to a single disciplined light theme per
  the "white background, minimalist" brief rather than diluting it — easy
  to add later if you want it (start in `css/variables.css`).
- **Accessibility:** semantic landmarks, visible focus states, alt text on
  all images, `prefers-reduced-motion` respected (hero animation and scroll
  reveals turn off), skip-to-content link, ARIA labels on icon-only buttons.

## 5. Deploying

Any static host works since there's no build step or server:

- **GitHub Pages** — push this folder to a repo, enable Pages on the `main`
  branch (root), done.
- **Netlify / Vercel** — drag-and-drop the folder in their dashboard, or
  connect the repo. No build command needed.

### Vercel contact form

The contact form uses `api/contact.js` and Resend for server-side delivery.
In the Vercel project settings, add these environment variables:

```text
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=htetmyatphonenaing2004@gmail.com
```

Keep `RESEND_API_KEY` in Vercel only; do not commit it to the repository.

---

*Built as a template — replace every `[bracketed placeholder]` with your
own details before publishing.*
