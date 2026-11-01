# Ehab Ahmed — Portfolio

A responsive, static graphic design portfolio. No build tools or packages are required.

## Local preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` in this directory and open http://127.0.0.1:8000.
You can also open `index.html` directly.

## Content

- `index.html`: biography, contact details and all 43 artwork entries.
- `styles.css`: responsive layout, colour and typography.
- `script.js`: category filters, progressive gallery expansion and accessible artwork dialog.
- `gallery/`: original artwork and résumé, preserved unchanged.
- `assets/`: optimized WebP previews, self-hosted fonts and favicon.

Filters and artwork links work without JavaScript: all pieces are shown and links open the original images. With JavaScript, the initial selection shows 12 pieces; filters update the URL, and the viewer supports Escape and left/right arrow keys.

Project captions describe the existing artwork; confirm preferred project names before publication.
Fonts: Libre Franklin and Source Serif 4, licensed under the SIL Open Font License. See `assets/*-OFL.txt`.
