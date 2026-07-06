# CodeNest.hu V2 Homepage Implementation Plan

This is a non-invasive planning document. It maps the current static homepage to the intended V2 homepage and identifies how the new `data/` files should become the source of truth later.

No code is connected yet. `index.html`, `styles.css`, and `script.js` should remain unchanged until implementation starts.

## 1. Current Homepage Section Inventory

Current major blocks in `index.html`, in source order:

1. Header / navigation
   - Fixed header with logo, anchor navigation, language switcher, contact CTA, and mobile menu.
   - Current nav points to `#services`, `#portfolio`, `#team`, `#tools`, and `#contact`.

2. Hero (`section.hero#home`)
   - Current message: "Imagine · Build · Launch".
   - Uses generic web agency subtitle, CTA buttons, hero image, and metric counters.
   - Contains old positioning and fake/weak proof signals.

3. FAQ (`section.faq-section#faq`)
   - Present in source but commented out.
   - Still contains generic service FAQ copy and should not be revived unchanged.

4. Process (`section.process-section`)
   - Three cards: Imagine, Build, Launch.
   - Uses generic delivery language and tech stack references.

5. Services (`section.services-section#services`)
   - Current services: Web development, Web Applications, UI/UX Design, Maintenance & Support.
   - This is the strongest generic-agency section.

6. Portfolio (`section.portfolio-section#portfolio`)
   - Grid of project cards.
   - Includes WiseBoys, PocketGarden, personal branding, SkillBridge, restaurant app, GreenGoo, Rehabify.
   - Several cards are thin on context and do not explain usable systems/admin/workflows.

7. Featured case study (`section.featured-case-section#featured-project`)
   - WiseBoys spotlight with a campaign/microsite framing.
   - Stronger visually than the standard portfolio cards, but not aligned with the new institutional/admin-system positioning as the primary proof.

8. Team (`section.team-section#team`)
   - Shows old four-person team cards.
   - Must be replaced with Bors + David only.

9. Tools & Resources (`section.tools-section#tools`)
   - Promotes QR Code Generator and WiseBoys Game.
   - Makes the homepage feel unfocused for V2.

10. Why Choose Us (`section.why-section`)
    - Four generic agency benefits: Fast Launch, Measurable Impact, Modern Tech Stack, International Cooperation.
    - Contains a commented-out stats banner with fake/weak metric patterns.

11. Contact / CTA (`section.cta-section#contact`)
    - Generic "Ready to start your project?" CTA.
    - Existing form uses EmailJS and current generic project type options.

12. Footer (`footer.footer`)
    - Standard services/company/legal columns.
    - Still contains generic web agency language and old service labels.

13. Cookie consent placeholder and scripts
    - Cookie UI is injected by `cookie-consent.js`.
    - EmailJS, `script.js`, and cookie consent scripts load at the end of the body.

14. Structured data / metadata
    - JSON-LD schema, meta title, description, Open Graph, and FAQ schema still describe a generic web development agency.
    - These are outside visible sections but must be updated during V2 implementation.

## 2. V2 Target Homepage Structure

Target one-page homepage order:

1. Hero
2. Problem
3. Mit építünk
4. Kiemelt munkák
5. Folyamat
6. Miért CodeNest
7. Bors + Dávid
8. Scope / árazás magyarázat
9. Kapcsolat
10. Footer

The homepage should lead with the new positioning:

> Webes rendszerek, amiket nem csak nézni lehet, hanem használni is.

## 3. Section Replacement Map

### Header / Navigation

Decision: rewrite.

Reason: The current nav still points to old sections and includes Tools. V2 navigation should match the new one-page story.

Future place: keep on homepage, but use `siteContent.navigation`.

### Current Hero

Decision: rewrite.

Reason: The current hero is generic agency positioning and uses metrics that should not carry into V2.

Future place: replace with V2 Hero using `siteContent.hero`.

### Current FAQ

Decision: remove from homepage for now.

Reason: It is commented out and generic. A future FAQ can be rebuilt later around scope, maintenance, admin editing, hosting, and project process.

Future place: optional later FAQ block or separate support/scope page.

### Current Process

Decision: rewrite and move later.

Reason: The current process is too generic and appears before the visitor understands what CodeNest builds.

Future place: V2 Folyamat after Kiemelt munkak, fed by `siteContent.process`.

### Current Services

Decision: rewrite.

Reason: Current service taxonomy makes CodeNest feel like a generic web agency.

Future place: V2 Mit építünk, fed by `services`.

### Current Portfolio

Decision: rewrite and narrow.

Reason: Current project cards are too broad and thin. V2 should show fewer, more relevant projects with categories and tags from `projects`.

Future place: V2 Kiemelt munkák. Keep Gárdony Platform highlighted.

### Current Featured Case Study

Decision: merge into Kiemelt munkak or move to later page.

Reason: WiseBoys can remain a project, but it should not be the main homepage proof for the new municipal/institutional/admin positioning.

Future place: optional project detail page or lower-priority project card later.

### Current Team

Decision: replace.

Reason: It contains retired team members and the old four-person agency framing.

Future place: V2 Bors + David section, fed by `teamIntro` and `team`.

### Current Tools & Resources

Decision: remove from homepage.

Reason: It distracts from the V2 positioning and makes CodeNest feel unfocused.

Future place: optional separate `/tools` or `/kiserletek` page later.

### Current Why Choose Us

Decision: rewrite and merge with scope where useful.

Reason: Current benefits are generic and tech-stack led. V2 should focus on usable admin logic, institutional thinking, direct small-team collaboration, and post-launch support.

Future place: V2 Miért CodeNest, fed by `siteContent.whyCodeNest`.

### Current Contact / CTA

Decision: rewrite carefully, keep EmailJS behavior for now.

Reason: The form behavior is useful, but the copy and project type options need to match V2.

Future place: V2 Kapcsolat, fed by `siteContent.contact`.

### Current Footer

Decision: rewrite.

Reason: Current footer repeats generic service/company/legal structure and old labels.

Future place: V2 Footer, fed by `siteContent.footer`.

### Metadata / Schema

Decision: rewrite.

Reason: Metadata and structured data still describe CodeNest as a professional web development agency.

Future place: update before final V2 launch, ideally right after the first visible hero replacement.

## 4. Data Source Map

| V2 section | Primary data source | Notes |
| --- | --- | --- |
| Hero | `data/site-content.js` | Use `siteContent.hero`. |
| Problem | `data/site-content.js` | Use `siteContent.problem`. |
| Mit építünk | `data/services.js` | Use the three-item `services` array only. |
| Kiemelt munkák | `data/projects.js` | Use `projects`; only Gárdony Platform is highlighted for now. |
| Folyamat | `data/site-content.js` | Use `siteContent.process`. |
| Miért CodeNest | `data/site-content.js` | Use `siteContent.whyCodeNest`. |
| Bors + Dávid | `data/team.js` | Use `teamIntro` and the two-person `team` array. |
| Scope / árazás magyarázat | `data/site-content.js` | Use `siteContent.scope`; do not add public prices. |
| Kapcsolat | `data/site-content.js` | Use `siteContent.contact`; keep EmailJS wiring stable at first. |
| Footer | `data/site-content.js` | Use `siteContent.footer`. |
| Navigation | `data/site-content.js` | Use `siteContent.navigation`. |

## 5. HTML Implementation Notes

### Hero

- Likely section id: `home`.
- Reuse possible: `.hero`, `.hero-grid`, `.hero-content`, `.hero-title`, `.hero-subtitle`, `.hero-buttons`, `.btn`.
- Needs new markup: replace metric counters with concrete service hints or no metrics.
- Remove old content: "Imagine · Build · Launch", generic professional website subtitle, "Help us improve", `15+`, `100%`, `2+`.
- Possible new CSS classes: `.hero-kicker`, `.hero-proof-list`, `.hero-system-preview`.

### Problem

- Likely section id: `problem`.
- Reuse possible: `.section`, `.container`, `.section-header`.
- Needs new markup: text-led explanatory section with points from `siteContent.problem`.
- Remove old content: none directly; this is a new section.
- Possible new CSS classes: `.problem-section`, `.problem-grid`, `.problem-points`.

### Mit építünk

- Likely section id: `services` or `what-we-build`.
- Reuse possible: `.services-section`, `.services-grid`, `.service-card`, `.service-title`, `.service-description`.
- Needs new markup: three cards with title, shortDescription, supportingText, features, chips, CTA label.
- Remove old content: Web development, Web Applications, UI/UX Design, Maintenance & Support.
- Possible new CSS classes: `.service-features`, `.service-chips`, `.chip`, `.service-cta`.

### Kiemelt munkák

- Likely section id: `projects`.
- Reuse possible: `.portfolio-section`, `.portfolio-grid`, `.portfolio-card`, `.portfolio-title`, `.portfolio-category`, `.portfolio-description`.
- Needs new markup: data-shaped cards with title, category, status, tags, URL, highlighted state.
- Remove old content: old project list that does not match `data/projects.js`; old malformed heading closures should disappear during replacement.
- Possible new CSS classes: `.projects-section`, `.project-card`, `.project-card-highlighted`, `.project-tags`, `.project-status`.

### Folyamat

- Likely section id: `process`.
- Reuse possible: `.process-section`, `.process-grid`, `.process-card`, `.process-title`, `.process-description`.
- Needs new markup: four steps from `siteContent.process.steps` instead of three.
- Remove old content: Imagine, Build, Launch; React/Next/Node copy.
- Possible new CSS classes: `.process-step-list`, `.process-intro`.

### Miért CodeNest

- Likely section id: `why-codenest`.
- Reuse possible: `.why-section`, `.why-grid`, `.why-card`, `.why-title`, `.why-description`.
- Needs new markup: benefit cards from `siteContent.whyCodeNest.items`.
- Remove old content: Fast Launch, Measurable Impact, Modern Tech Stack, International Cooperation, commented stats banner.
- Possible new CSS classes: `.why-codenest-section`, `.why-intro`.

### Bors + Dávid

- Likely section id: `team`.
- Reuse possible: `.team-section`, `.team-grid`, `.team-name`, `.team-role`.
- Needs new markup: two-person layout, likely simpler and more personal than current image card grid.
- Remove old content: old team banner, four-person team grid, retired team references.
- Possible new CSS classes: `.founders-section`, `.founders-grid`, `.founder-card`, `.team-intro`.

### Scope / Árazás Magyarázat

- Likely section id: `scope`.
- Reuse possible: `.section`, `.container`, `.section-header`, card/list styles.
- Needs new markup: scope explanation and include-list from `siteContent.scope`.
- Remove old content: none directly; do not add package pricing or fake metrics.
- Possible new CSS classes: `.scope-section`, `.scope-list`, `.scope-note`.

### Kapcsolat

- Likely section id: `contact`.
- Reuse possible: `.cta-section`, `.cta-wrapper`, `.cta-content`, `.cta-title`, `.cta-subtitle`, `.cta-form`, `.contact-form`, `.form-group`.
- Needs new markup: project type options from `siteContent.contact.projectTypes`.
- Remove old content: generic CTA copy and old project type options.
- Possible new CSS classes: `.contact-section`, `.contact-context`.
- Important: keep existing form fields and `name` attributes stable until EmailJS templates are reviewed.

### Footer

- Likely element: `footer.footer`.
- Reuse possible: `.footer`, `.footer-content`, `.footer-links`, `.footer-bottom`.
- Needs new markup: smaller footer that reflects V2 links and tagline.
- Remove old content: old services/company columns and generic web agency labels.
- Possible new CSS classes: `.footer-tagline`, `.footer-nav`.

## 6. CSS Impact Estimate

Patterns that can stay:

- Buttons: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-small`, `.btn-full`.
- Simple cards: usable if reduced and made less repetitive.
- Grids: `.services-grid`, `.portfolio-grid`, `.process-grid`, `.why-grid`, `.footer-content` can be adapted.
- Responsive utilities and breakpoints.
- Fade-in animation, if it remains subtle and does not fight readability.
- Form controls and focus states.

Patterns to reduce or rewrite:

- Repetitive card grids across every section.
- Generic blue/white agency gradients in hero, CTA, icons, and featured case study.
- Old metric blocks and counter animation dependency.
- Old four-person team cards.
- Tools cards on the homepage.
- Large decorative glows/geometric patterns if they keep the page feeling template-like.
- Portfolio hover overlays if project cards need clearer text/proof instead of image-first behavior.

CSS change size estimate:

- Low risk: reusing buttons, containers, form styling, and responsive grids.
- Medium risk: replacing hero, services, projects, team, and contact while keeping old class names.
- Higher risk: a full visual redesign. That should be a later pass, not the first V2 content wiring pass.

## 7. JavaScript / i18n Impact

Current state:

- `script.js` has a large `translations` object.
- Many visible strings in `index.html` use `data-en` and `data-hu`.
- A second language system exists near the bottom of `script.js`, duplicating `setLanguage`.
- The current switcher only really handles EN/HU, while the new navigation data lists HU/EN/DE.
- EmailJS form handling depends on `.contact-form`, field names, and submit behavior.

Recommended staged approach:

1. Keep `data-en` / `data-hu` attributes temporarily during the first HTML replacement so the current language switcher does not break.
2. Treat the new `data/` files as the editorial source of truth, but do not introduce a full render system during the first visible V2 pass.
3. Add German UI only after there is real German copy. Until then, `DE` can exist in data but should not become an active language toggle.
4. After the homepage content is replaced, remove stale entries from `script.js` that mention fake teams, fake projects, fake metrics, or old services.
5. In a later refactor, simplify i18n to one system. Either:
   - keep static HTML with `data-hu`, `data-en`, `data-de` attributes, or
   - add small data-driven render functions that import the new data files with `<script type="module">`.

Recommendation for V2 first pass:

- Do a staged replacement.
- Keep the existing static HTML approach.
- Avoid dynamic rendering until the content and layout are stable.
- Clean the duplicate language logic only after the page has been replaced and manually tested.

## 8. Risk List Before Editing

- Breaking the language switcher by removing expected `data-en` / `data-hu` attributes too quickly.
- Breaking EmailJS by changing form class names, field names, or submit button behavior.
- Broken anchor links if navigation points to new IDs before the sections exist.
- Old routes relying on `.htaccess` pretty URL rewrites while GitHub Pages or Nginx may behave differently.
- Stale metadata/schema still describing CodeNest as a generic agency after visible content changes.
- Old team references remaining in image alt text, schema, JS translations, footer, or hidden/commented blocks.
- Fake metrics remaining in hero, stats banner, JS translations, or schema.
- Duplicate i18n systems fighting each other in `script.js`.
- Footer/legal text becoming inconsistent with the new studio positioning.
- New `DE` language label implying German content that does not exist yet.

## 9. Recommended Implementation Order

1. Create a backup/index snapshot or commit boundary before homepage editing.
2. Replace metadata, title, Open Graph, and schema with V2 positioning.
3. Replace the hero with `siteContent.hero`.
4. Add the new Problem section from `siteContent.problem`.
5. Replace Services with Mit építünk using `services`.
6. Replace Projects with Kiemelt munkák using `projects`.
7. Rewrite Process using `siteContent.process`.
8. Rewrite Why using `siteContent.whyCodeNest`.
9. Replace Team with Bors + David using `teamIntro` and `team`.
10. Remove Tools & Resources from the homepage.
11. Add Scope / árazás magyarázat using `siteContent.scope`.
12. Rewrite Contact copy and project type options using `siteContent.contact`, while keeping EmailJS-safe form structure.
13. Rewrite Footer using `siteContent.footer`.
14. Update navigation anchors to match the new section IDs.
15. Clean stale `script.js` translations and duplicate language logic only after the HTML is stable.
16. Test language switcher, contact form validation, anchor links, mobile menu, and project links.
17. Search the full repo for retired team names and fake metrics before launch.

## 10. Final Next Action

Next coding step after this plan:

Create a safe homepage edit branch/commit boundary, then replace only the metadata and hero section first. That gives the V2 positioning immediate control of the page while keeping the rest of the old homepage intact for staged replacement.
