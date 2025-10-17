CV BUILDER – DEFAULT v3
=======================

Contents
--------
- index.html          → React single-page app (templates: Default, Classic, Sideband, Minimal)
- styles.css          → global styles + font-face + print/PDF rules
- data.json           → clean example dataset (loaded by default)
- data_default.json   → your filled dataset (Benedetta Lia Mandelli)
- fonts/              → put your .woff/.woff2 files here
- icons/              → 10 base SVG icons (calendar, location, trophy, bulb, book, camera, globe, palette, heart, dumbbell)

Quick start
-----------
1) Serve locally (required for fetching JSON/icons/fonts):
   $ python3 -m http.server 8080
   Open http://localhost:8080/index.html

2) Switch template from the top toolbar (Default/Classic/Sideband/Minimal).
   Your last selection is saved to localStorage and restored on reload.

3) Edit content:
   - Change values directly in the UI (they persist in localStorage if you Export/Import JSON),
   - OR edit data.json / data_default.json and reload the page.

4) Export a PDF:
   - Click "Export PDF". A true A4 PDF will download as "Default_CV.pdf"
     with exact margins and layout (no browser print dialog needed).

Data model (overview)
---------------------
header:   name, role, email, phone, residence, birthdate, avatar
summary:  short professional summary (multiline allowed)
skills:   array of groups → { group, items[] }  (subchapters like your CV)
languages:[ { name, score(1..5), level("A1..C2" or "Native") }, ... ]
experience:[ { title, company, period, location, bullets[] }, ... ]
education:[ { degree, school, period, location, gpa }, ... ]
online:   { website:{label,url}, linkedin:{label,url} }
laws:     [ "text line 1", "text line 2", ... ]

Default layout specifics
------------------------
- Experience / Education rows are inline:
    Role
    Company (accent color)  📅 Period   📍 Location
  Education also shows GPA on the right.

- Skills appear as subchapters:
    group (accent color)
    [Pill] [Pill] [Pill]

- Languages use compact bars + text level (A1–C2, Native, etc.)

- "Online" (Website, LinkedIn) is in a separate section (left column).
- "Laws" appears at the bottom of the left column in light gray.

Sections & columns
------------------
- You can move sections between columns (Left / Right). The layout is
  saved together with your exported JSON.

- You can also create new sections (title + format + target column).
  Formats supported:
    • List (bulleted items)
    • Description (paragraph text)
    • Table (simple two-column rows)

Fonts
-----
- Place your .woff/.woff2 files under /fonts.
- By default the app uses:
    @font-face → CustomSans (400 normal, 600 light-bold)
- Choose your font from the toolbar. The app lists known presets and
  CustomSans from /fonts. You can also edit styles.css to register
  more weights or additional families if needed.

Icons
-----
- Base icon set (10 SVG files) in /icons:
    calendar.svg   (🗓)
    location.svg   (📍)
    trophy.svg     (award)
    bulb.svg       (idea/insight)
    book.svg       (reading/learning)
    camera.svg     (photography/media)
    globe.svg      (world/communication)
    palette.svg    (creativity/design)
    heart.svg      (care/volunteering)
    dumbbell.svg   (fitness)

- You can add more SVGs: just drop them into /icons and reference by file name.

PDF export (exact A4)
---------------------
- The "Export PDF" button renders the A4 sheet to canvas (html2canvas)
  and embeds it into a single-page PDF (jsPDF). Margins and proportions
  are preserved. Output file name: "Default_CV.pdf".

Tips for precise alignment
--------------------------
- Use the "font size" and "line height" sliders in the toolbar.
- Section spacing is tuned for an A4 page with 14 mm margins.
- Company and University names inherit the accent color.
- Icons (calendar/location) also use the accent.

How to use your own data by default
-----------------------------------
Option A) Replace data.json with your content (copy data_default.json → data.json).
Option B) Click "Import JSON" in the UI and load your saved file.

Creating a new custom layout (template)
---------------------------------------
1) Open index.html in your editor (VS Code recommended).
2) Locate the template components near the end:
     function DefaultTemplate(...) { ... }
     function ClassicTemplate(...) { ... }
     function SidebandTemplate(...) { ... }
     function MinimalTemplate(...) { ... }
3) Duplicate the component you want to use as a base, e.g.:
     function MyCustomTemplate(props) { ... }
4) Adjust layout, section order, styles (Tailwind classes), icons, etc.
5) Register the new template in the App toolbar:
     <option value="mycustom">My Custom</option>
   And render conditionally:
     {template==="mycustom" && <MyCustomTemplate accent={accent} data={data} />}
6) Save and reload the page. Your new template will appear in the selector.

Troubleshooting
---------------
- Blank data:
  Ensure you are serving via http://localhost (not file://). Use the
  "python -m http.server" command above.

- Icons not visible:
  Check that /icons/*.svg files exist and paths are correct.

- Fonts not applied:
  Confirm your files are in /fonts and @font-face in styles.css points
  to the correct file names and formats (woff2 preferred).

- PDF looks different:
  Try a higher display scaling (system/browser), then re-export.
  The exporter already uses x2 scale to keep text crisp.

License & attribution
---------------------
- This CV builder is provided as-is for personal/professional use.
- All icons in /icons are simple, original SVGs intended for free use.
- Do not copy proprietary layouts or assets from third parties.


cd /percorso/dove/hai/estratto/cv-builder-separated
python3 -m http.server 8080
# poi apri nel browser:
http://localhost:8080/home.html