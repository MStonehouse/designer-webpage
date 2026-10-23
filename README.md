# I&CA Studio website

The website for **I&CA (Industrial & Communication Arts)**, a Vancouver design studio that makes logos, brand identities and websites for independent small businesses.

**Live site:** https://mstonehouse.github.io/designer-webpage/

It's a hand-built static site: plain HTML, CSS and JavaScript, with no frameworks, no build step and nothing to install. GitHub Pages serves the files exactly as they are in this repository.

---

## Pages

| Page | Address | What's on it |
|---|---|---|
| Home | `#home` | The I&CA masthead, an endless "Selected work" carousel, the studio statement, services, how a project runs |
| Work | `#work` | Every client as a swipeable strip of their images, with Identity / Digital / Print filters |
| Project | `#boris`, `#greenleaf`, `#strata`, `#modius`, `#mode`, `#brock` | The story of one project, its palette and full gallery, with a full-screen image viewer |
| Studio | `#about` | About I&CA, how they work, services |
| Contact | `#contact` | Inquiry form, email address, what happens next |

The whole site is one HTML page. The part of the address after `#` decides which page `js/main.js` draws, so moving between pages is instant and nothing reloads.

---

## Project structure

```
designer-webpage/
├── index.html              The page shell: header, footer, mobile menu, image viewer
├── css/
│   └── style.css           All the styling, in numbered sections (see the contents at the top)
├── js/
│   ├── projects.js         The content: every project, the services, the steps of a project
│   └── main.js             Builds the pages from projects.js and makes everything interactive
├── assets/
│   ├── fonts/              Self-hosted fonts (Bodoni Moda, Hanken Grotesk, DM Mono)
│   │   └── licenses/       Their open-source licences
│   ├── icons/              Browser tab icon and phone home-screen icon (the brass ampersand)
│   └── images/             Portfolio pictures, one folder per client
│       ├── studio/         hero.gif
│       ├── boris/          cover.jpg, cover-hover.jpg, 01.jpg, 02.jpg ...
│       └── ...
├── scripts/
│   └── get-images.sh       Downloads the portfolio pictures from I&CA's Adobe Portfolio
└── README.md
```

**The rule of thumb:** words and pictures live in `js/projects.js`, looks live in `css/style.css`, and behaviour lives in `js/main.js`. Most day-to-day changes only touch `projects.js`.

---

## Getting the images (first-time setup)

The portfolio pictures are still hosted on I&CA's old Adobe Portfolio. Run this once from the project folder to copy all of them into `assets/images/`:

```bash
bash scripts/get-images.sh
git add assets/images
git commit -m "Add portfolio images"
git push
```

It downloads 54 pictures (about 34 MB) into one folder per client. Pictures you already have are skipped, so it's safe to run again.

**Until then, nothing looks broken.** Every image in `projects.js` also records its Adobe Portfolio address. If a local file is missing, the site quietly loads the Adobe copy instead. Once the files are in `assets/images/`, the site uses those and stops depending on Adobe.

---

## Common changes

### Add a client

1. Make a folder for their pictures, e.g. `assets/images/acme/`, with `cover.jpg`, `cover-hover.jpg` and the gallery as `01.jpg`, `02.jpg`, and so on.
2. In `js/projects.js`, copy an existing entry in `PROJECTS` and change the text and file names. The `slug` (e.g. `"acme"`) becomes the page address `#acme`.
3. For pictures that aren't on Adobe Portfolio, use `""` as the third part of `image(...)`.

The Work page, the home carousel, the filters and the new project page all update themselves.

### Change wording

- Project text, services and the project steps: `js/projects.js`.
- Headlines and page copy: the page functions in `js/main.js` (`viewHome`, `viewAbout`, `viewContact`...).
- Header, footer and contact email: `index.html` (the email also appears in `main.js`).

### Change colours or fonts

The colours are named tokens at the top of `css/style.css` (section 2), with a light and a dark set. Change a token once and it updates everywhere. For example, `--brass` is the accent used on the ampersand.

---

## Running it on your computer

Double-click `index.html`, or, to see it exactly as GitHub Pages serves it:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

---

## Design notes

- **Typography:** Bodoni Moda for headings and the I&CA mark, Hanken Grotesk for text, DM Mono for small labels. Bodoni is pinned to its sturdier "small text" cut (see *Finishing rules* at the end of `style.css`), because at large sizes its default hairlines get so thin they disappear.
- **Colour:** gallery white and charcoal, with a single brass accent. It follows the visitor's light or dark mode.
- **Mobile first:** a bottom menu within thumb reach that tucks away while scrolling, swipeable carousels that loop endlessly, a swipe-through full-screen image viewer, and no sideways page scrolling.
- **Data on phones:** phones don't download the desktop-only hover pictures, and images load as they come into view.

---

## Before launch

- [ ] Run `scripts/get-images.sh` and commit the pictures (see above).
- [ ] Contact form: right now it opens the visitor's email app with the inquiry filled in. A form service such as [Formspree](https://formspree.io) would deliver inquiries straight to the inbox instead (see section 7 of `js/main.js`).
- [ ] Confirm with Kevin: the "Studio concept" tag on each project, and the exact palette colours (the current swatches are close approximations).
- [ ] Optional: the two animated GIFs (the About page hero and Greenleaf's hover image) are about 17 MB together. Converting them to video would make them much lighter.

---

## Credits

- Design work © Industrial & Communication Arts. All rights reserved.
- Fonts are open source under the SIL Open Font License 1.1 (see `assets/fonts/licenses/`): [Bodoni Moda](https://github.com/indestructible-type/Bodoni), [Hanken Grotesk](https://github.com/marcologous/hanken-grotesk), [DM Mono](https://github.com/googlefonts/dm-mono).
