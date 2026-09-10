# Sooyeun Yang — Research Portfolio

Source for my project page: 3D Gaussian Splatting research, control & robotics work,
applied reconstruction projects, and supporting tools.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Layout

```
index.html                     # the whole page (single file)
static/images/tidi/            # TIDI-GS paper figures
static/images/metric/          # METRIC-GS paper figures
static/images/projects/        # per-project figures
static/images/posters/         # video poster frames
static/videos/tidi/            # TIDI-GS fly-throughs (autoplay in carousel)
static/videos/metric/          # METRIC-GS own-capture renders (autoplay in carousel)
static/videos/revisit/         # ReVisit-GS ghosts, policies, submission video
static/videos/fogs/            # FOGS vs. 3DGS interior comparisons
static/videos/isaac/           # Isaac Sim runs on reconstructed scenes
static/videos/projects/        # applied-project videos (click to play)
static/css/, static/js/        # Bulma + carousel/slider (Nerfies template)
```

## Adding a project

Copy any `<div class="project">` block in `index.html` and edit it. The pieces are:

- `.project-header` — title plus a status chip
  (`chip-review`, `chip-progress`, `chip-done`, `chip-applied`)
- `.project-role` — your contribution, one line
- `.project-links` — repository link buttons; add `<span class="lock">private</span>`
  inside the anchor for a repo that is not public yet
- `.abstract` — the paper's own abstract, verbatim, in a `.abstract-label` + `<p>` pair
- `.content` — the prose description
- `.keyfacts` — the bulleted results list
- `<figure>` / `<video>` — media

## Media encoding

Figures are converted from paper PDFs with `pdftoppm -png -r 220`, and large renders are
stored as JPEG. Videos:

```bash
ffmpeg -i in.mp4 -vf "scale='min(960,iw)':-2" -c:v libx264 -crf 30 -preset slow \
       -pix_fmt yuv420p -an -movflags +faststart out.mp4
```

Carousel videos autoplay and carry a `poster`. Applied-section videos use
`preload="none"` with a poster so the page does not download the whole set on first
load. A carousel mixing portrait and landscape clips takes the extra `mixed-carousel`
class, which pins tile height and letterboxes with `object-fit: contain`.
Poster frames:

```bash
ffmpeg -ss 2 -i video.mp4 -frames:v 1 -q:v 5 static/images/posters/video.jpg
```

## Notes before publishing

- **TIDI-GS (ACCV 2026), FOGS (ECCV 2026), METRIC-GS (WACV 2027) and ReVisit-GS
  (ICRA 2027) are under review.** No PDFs are published here for that reason; each
  project carries its abstract instead. To add papers after acceptance, drop the
  de-anonymized camera-ready builds into `static/pdfs/` and add link buttons next to
  the existing repository buttons.
- **Internal submission IDs are deliberately kept off the page**, because publishing one
  next to the author's name links an anonymous submission record to a real identity. The
  chips name the venue and the stage only (`ECCV 2026 · rebuttal stage`), never the number.
  ICCAS 2026 #493 was likewise dropped even though that paper is already accepted. Do not
  add any of them back while a paper is in review.
- **Every linked repository except this one is private.** The hero says so explicitly.
  Flip them public as the corresponding papers are accepted — the links already point
  at the right names and need no edit:
  `TIDI-GS`, `SEGGS` (FOGS codebase), `ReVisitGS`, `METRIC-GS`, `DiSDF-GS`, `InterGS`,
  `AR-Data-Collection`, `iccas2026_sooyeunYang`.
- The page names funded work (RAPA/MetaReal) but **deliberately omits the NRF grant number** —
  it is kept out pending clearance. Do not add it back without checking first.
- The repository is **private**. GitHub Pages does not serve private repositories on the free
  plan, so the site goes live only once the repository is made public — which is also the point
  at which the under-review papers below become publicly linked to the author's name.
- Patents filed by the lab are **not** listed: the sole listed inventor on all four
  applications is J. B. Choi, not the page author.

## Website License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.

The website template is borrowed from [Nerfies](https://github.com/nerfies/nerfies.github.io).
