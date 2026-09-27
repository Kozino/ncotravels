# NCO Lifestyle Travel — Website

A classic, professional 4-page website for **NCO Lifestyle Travel** — an online
travel & lifestyle business based in **Qatar**, serving the 🇳🇬 Nigeria – 🇲🇹 Malta corridor.

**Design:** Deep emerald + champagne gold + warm cream · Playfair Display (headings) + Inter (body) · fully responsive · WhatsApp-first contact.

## Pages

| File | Page | Highlights |
|---|---|---|
| `index.html` | Home | Hero, services overview, about preview, why-us stats, 4-step process, destinations, testimonials, CTA |
| `about.html` | About | Story, mission & vision, 6 core values, what sets us apart |
| `services.html` | Services | Detailed breakdown of all 4 services, Complete Journey Package, process, FAQ preview |
| `contact.html` | Contact | Contact cards, **enquiry form that sends via WhatsApp**, full FAQ accordion |

Also included: floating WhatsApp button, scroll-reveal animations, sticky glass navbar,
mobile slide-in menu, back-to-top button, SEO meta tags, SVG favicon.

## Contact wiring (already configured)

- Phone / WhatsApp: **+234 810 060 1817** → `tel:+2348100601817` / `https://wa.me/2348100601817`
- The contact form validates input, then opens WhatsApp with the message pre-written.
  (No server or backend needed — ideal for an online business.)

## Branding

- **Name:** NCO Lifestyle Travel (the earlier draft name has been fully removed)
- **Logo:** `assets/logo.png` (cropped from the supplied logo) appears in the header and
  footer; `assets/favicon.png` is the browser tab icon. To swap the logo, replace these
  files with the same names.
- **Palette:** navy blue + amber/gold, sampled from the logo — change it in the
  `:root` block of `css/style.css`.

## How to run locally

```bash
cd titkok-travel
python3 -m http.server 8080
# open http://localhost:8080
```

Or simply double-click `index.html` — the site is pure HTML/CSS/JS with no build step.

## Deploying (free options)

Upload the `titkok-travel` folder as-is to any of:
- **Netlify Drop** (drag & drop: https://app.netlify.com/drop)
- **GitHub Pages** (push the folder to a repo → Settings → Pages)
- **Vercel** / **Cloudflare Pages** / any shared hosting (cPanel)

## Before going live — customise these

1. **Testimonials** (`index.html`, "Client Stories") — placeholder reviews marked with an
   HTML comment. Replace with real client feedback, or remove the section.
2. **Stats** ("Why NCO Lifestyle Travel" band) — descriptive placeholders (4+ services, 3 countries…).
   Adjust to real figures as the business grows.
3. **Business hours** — currently *Daily · 9:00 AM – 10:00 PM (GMT+3)* (footer + contact page).
4. **Social links** — footer Instagram/TikTok icons point to `#`; drop in the real profile URLs.
5. **Photos** — art panels are pure CSS/SVG (so the site works offline). If you add photos,
   replace the `.art-panel` blocks with `<img>` tags.
6. **Email** — no email address was provided; the form uses WhatsApp instead. If you get a
   business email (e.g. `info@...`), add it to the contact page and footer.

## File structure

```
titkok-travel/
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/style.css        ← all styling (change colours via CSS variables at the top)
├── js/main.js           ← nav, animations, FAQ, form → WhatsApp
├── assets/
│   ├── logo.png         ← brand logo (header & footer) — from the supplied logo
│   ├── logo-full.png    ← full logo incl. service icons
│   ├── favicon.png      ← logo-based favicon
│   ├── hero-home.jpg    ← homepage hero background
│   ├── home-about.jpg   ← homepage "Who We Are" photo
│   ├── story-about.jpg  ← about page story photo
│   ├── intro-about.jpg / intro-services.jpg / intro-contact.jpg  ← page intro photos
│   └── dest-qatar.jpg / dest-nigeria.jpg / dest-malta.jpg        ← destination photos
└── README.md
```

## Changing the brand colours

Open `css/style.css` and edit the `:root` block at the top — e.g. `--pine` (main navy blue),
`--gold` (accent), `--cream` (background). Everything else updates automatically.
