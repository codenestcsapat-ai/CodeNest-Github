# CodeNest.hu V2 Preview Test Checklist

Use this checklist to manually test the separate V2 preview page. This preview does not replace the live homepage.

## 1. Start Local Server

From the repository root, start a simple static server:

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/v2-preview.html
```

## 2. Basic Page Load Checks

- [ ] Preview loads without a blank page.
- [ ] Browser console has no JavaScript errors.
- [ ] `v2-styles.css` loads correctly.
- [ ] Data-rendered content appears instead of loading placeholders.
- [ ] Navigation, hero, services, projects, team, scope, and contact content appear.

## 3. Anchor / Navigation Checks

Verify these anchors scroll to the correct sections:

- [ ] `#hero`
- [ ] `#problema`
- [ ] `#mit-epitunk`
- [ ] `#munkak`
- [ ] `#folyamat`
- [ ] `#miert-codenest`
- [ ] `#bors-david`
- [ ] `#scope-arazas`
- [ ] `#kapcsolat`

Also check:

- [ ] Logo link returns to `#hero`.
- [ ] Primary hero CTA scrolls to `#kapcsolat`.
- [ ] Secondary hero CTA scrolls to `#mit-epitunk`.
- [ ] Scope CTA scrolls to `#kapcsolat`.

## 4. Content Checks

- [ ] No Dani, Dániel, or Ábel appears anywhere in the preview.
- [ ] No fake metrics appear.
- [ ] No public prices appear.
- [ ] Hero uses the V2 headline: "Webes rendszerek, amiket nem csak nézni lehet, hanem használni is."
- [ ] Services show exactly 3 main services.
- [ ] Gárdony Platform is visually highlighted.
- [ ] Bors + Dávid team section appears.
- [ ] Contact section feels friendly and usable.
- [ ] Scope / árazás explains project scope without showing package prices.

## 5. Responsive Checks

Check at these viewport widths:

- [ ] 1440px desktop
- [ ] 1024px laptop
- [ ] 768px tablet
- [ ] 375px mobile

For each width, verify:

- [ ] Navigation does not break.
- [ ] Hero remains readable.
- [ ] Cards stack correctly.
- [ ] Contact section remains usable.
- [ ] There is no horizontal scrolling.

## 6. Visual Checks

- [ ] Warm off-white background is visible.
- [ ] Text reads as dark navy, not pure black.
- [ ] Muted green accent is used consistently.
- [ ] Cards are rounded and calm.
- [ ] Spacing feels calm and readable.
- [ ] No flashy neon/startup look.
- [ ] No generic agency gradient dominates the page.

## 7. Known Limitation

The preview uses ES module imports from local data files:

- `data/site-content.js`
- `data/services.js`
- `data/projects.js`
- `data/team.js`

Because of this, test through a local server instead of opening `v2-preview.html` directly with `file://`.
