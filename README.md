# Ishwer Singh — 3D Portfolio

A single-page, frontend-only portfolio built with plain HTML, CSS and JavaScript, using
[Three.js](https://threejs.org/) (loaded via CDN) for the animated 3D background. No build
step, no backend — just open `index.html` or deploy it as a static site.

## Structure

```
index.html        Page markup
css/style.css      All styling (dark theme, glassmorphism, responsive)
js/script.js       Three.js background, scroll reveal, tilt cards, typing effect, nav
assets/            Downloadable resume PDF
```

## Before you deploy — update these

- **Profile photo**: `assets/ishwer_singh.png` is already wired into the "About Me" section.
  If that file is ever missing, the site automatically falls back to an "IS" initials avatar,
  so nothing breaks either way.
- Project card links point to the live client sites (muscletonik.com, blegendusa.com,
  icorepharma.com) and to the GitHub repos / GitHub Pages demos for the personal builds.
  Update them if any repo name or URL changes.
- The downloadable CV at `assets/Ishwer_Singh_Resume.pdf` is wired into the nav/hero buttons —
  replace that file whenever the resume is updated so the download stays in sync.

Contact info (email, phone, GitHub, LinkedIn) is already filled in.

## Run it locally

Just open `index.html` in a browser, or serve it so relative paths behave the same as they
will on GitHub Pages:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `portfolio`) and push this folder as its contents:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Source** → select the `main` branch, `/ (root)` folder →
   **Save**.
3. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a
   minute or two.

If you want it at `https://<your-username>.github.io/` directly (no repo name in the path),
name the repo `<your-username>.github.io`.
