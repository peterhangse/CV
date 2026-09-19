# CONTEXT.md — CV (peterhang.se)

**Peter Hangs personliga CV/portfoljosajt** — en sida-resume med drag & drop-
sortering, en projekts-showcase och ett kontaktformulär. Live: **www.peterhang.se**
via GitHub Pages (CNAME).

## Teknik (verifierat)

- **Ren vanilla HTML + CSS + JS.** Inget ramverk, ingen package.json, ingen
  build, ingen runtime. Statisk hosting räcker.
- Delade resurser: `styles.css` + `script.js`. Projektsidan `projects/index.html`
  är en enda 408-rads fil med inline-stil + inline-JS (projekt-korten renderas ur
  en hårdkodad `const projects = [...]`).

## Struktur

```
index.html            — CV-sidan (header, Om mig, Erfarenhet, artiklar, kompetenser,
                        egenutvecklat, kontakt)
styles.css, script.js  — delad styling + drag&drop/kontakt-/parallax-logik
mitt-namn.jpg         — porträtt
projects/index.html   — "Mina projekt"-showcase (7 kort, hårdkodat JS-array)
projects/assets/thumbnails/*.jpg — skärmbilder
rattstavare.html, kommunprotokoll.html, postlistebot.html, thanks.html — undersidor
CNAME                 — www.peterhang.se
```

## Funktioner & data

- Sektioner: Om mig, Erfarenhet (BLT / Gota Media / SVT Morgonstudion),
  Publicerade artiklar (externa länkar), Kompetenser, Egenutvecklat + "Se alla
  mina projekt".
- `projects/index.html`: 7 kort (Press or Perish, Cold Zero, Simaja,
  Tidningssimulator, Kommungranskaren [Intern], Kommunkoll [Intern], Logopedia
  Rush [Prototyp]) med "Uppdaterad X sedan" hämtat klient-side från
  `api.github.com/repos/{repo}` — applikationen har inga nycklar.
- Kontaktformulär → **FormSubmit** (`formsubmit.co/...`), redirect till
  `thanks.html`. Inga DB-uppgifter.

## Köra / deploya

- Lokalt: `python3 -m http.server 8000`.
- Deploy: push till `main` → GitHub Pages (reporot). `.fabrik`-rad:
  `git add -A && git commit -m 'uppdatering' && git push origin main`.

## Gotchas

- `postlistebot.html` är **död kod** — ingen sida länkar till den.
- Formulärets `_next` pekar på rå-domen `peterhangse.github.io/CV/thanks.html`,
  inte `www.peterhang.se` (fungerar, men inkonsekvent med CNAME).
- Unga grenar på remoten (`origin/copilot/*`) — bara local `main` är aktiv.