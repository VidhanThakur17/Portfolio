# Vidhan Thakur — Security Portfolio

A single-page portfolio site styled like a live security assessment report/terminal — built with plain HTML, CSS, and JavaScript. No frameworks, no build step, no Docker.

## Run it locally

You don't need to "install" anything. Pick whichever is easiest:

**Option A — just open the file**
Double-click `index.html` (or right-click → Open With → your browser). Everything works, since it's fully static.

**Option B — local server (recommended, avoids browser file:// quirks)**

If you have Python installed:
```bash
cd portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

If you have Node.js installed:
```bash
cd portfolio
npx serve .
```
Then open the URL it prints (usually `http://localhost:3000`).

That's it — no Docker, no dependencies to install, no build process.

## Deploy it for free (so you can share a real link)

Any static host works since this is plain HTML/CSS/JS:
- **GitHub Pages**: push this folder to a GitHub repo, then Settings → Pages → deploy from the `main` branch.
- **Netlify / Vercel**: drag-and-drop the `portfolio` folder onto their dashboard (netlify.com/drop is the fastest — no account needed for a quick test).
- **Cloudflare Pages**: connect your GitHub repo, no build command needed.

## Folder structure

```
portfolio/
├── index.html          # all page content/sections
├── css/
│   └── styles.css      # design system, layout, animations
├── js/
│   └── script.js       # terminal typing effect, counters, scroll reveal
├── assets/
│   └── Vidhan_Thakur_Resume.pdf   # powers the "download cv" button
└── README.md
```

## What's inside

- **Hero terminal**: types out a simulated `whoami` / `nmap` sequence — respects `prefers-reduced-motion` (shows static text instantly if a visitor has that OS setting on).
- **Findings section**: your independent bug bounty disclosures (Max Healthcare, Deutsche Telekom, Stanford, Tata Motors) styled as vulnerability report cards with severity badges — ties the whole design language back to what you actually do.
- **Experience timeline, skills grid, proficiency bars, certifications, education, contact cards** — all scroll-reveal animated via `IntersectionObserver`.
- Fully responsive down to mobile, with a hamburger nav under 760px.
- Keyboard-focus outlines are visible (don't strip these — they matter for accessibility, and reviewers occasionally check).

## Customizing content

Everything is in `index.html` as plain markup — search for the text you want to change and edit it directly. A few pointers:

- **Stats in the hero** (`data-count="7"` etc.) — update the numbers to match reality as your findings/certs grow.
- **Proficiency bars** (`.prof-fill`, `style="--val:92%"`) — these are self-assessed; adjust honestly.
- **Colors**: all defined as CSS variables at the top of `css/styles.css` under `:root`. Change `--accent` to re-theme the whole site in one edit.
- **Resume file**: swap `assets/Vidhan_Thakur_Resume.pdf` with an updated version any time — keep the filename the same and the download button keeps working, or update the `href` in the nav's `download cv` link if you rename it.

## Notes

- Fonts (`JetBrains Mono` + `Inter`) load from Google Fonts via CDN — needs an internet connection on first load; browsers cache it after.
- No analytics, no tracking scripts, no external dependencies beyond the two fonts.
