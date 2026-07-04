# CodeNest.hu V2 Manual Visual Review

This checklist supports a manual browser review of the V2 preview and V2 case study pages. It does not replace the automated validation checklist, and it is not a launch checklist.

## Scope

Review only the V2 preview experience:

- `v2-preview.html`
- `case-study.html?project=<slug>` pages
- V2 data-rendered content
- V2 screenshots and case study visuals

Do not review or edit the current live homepage in this pass.

## Start The Preview

From the repository root:

```powershell
python -m http.server 8080
```

Open:

```text
http://localhost:8080/v2-preview.html
```

Use the browser console during review. The page should have no JavaScript errors.

## Viewports

Review the homepage and at least three representative case studies at:

- 1440px desktop
- 1024px laptop
- 768px tablet
- 375px mobile

Recommended case studies for the first pass:

- Gárdony Platform
- Ildiko Fonad
- SkillBridge Home

Then spot-check the remaining case studies.

## Homepage Review

### Hero

- [ ] The headline is strong but not overwhelming.
- [ ] The subheadline and CTAs appear early enough.
- [ ] The right-side UI mockup feels connected to usable systems, not decoration.
- [ ] The hero feels warm, calm, and professional.
- [ ] CTAs are clear: primary contact, secondary services.

### Problem

- [ ] The section clearly explains why a normal static website is not enough.
- [ ] Pain points feel practical, not fear-based.
- [ ] The before/after framing is readable on mobile.
- [ ] The solution sentence feels like CodeNest positioning.

### Services

- [ ] Exactly three service cards are visible.
- [ ] Each service feels concrete and system-oriented.
- [ ] Cards are readable and not too dense.
- [ ] Chips help scanning without crowding the card.
- [ ] CTA wording is consistent.

### Projects

- [ ] Gárdony Platform clearly feels like the featured project.
- [ ] Supporting project grid is balanced and readable.
- [ ] Screenshot thumbnails stay inside their frames.
- [ ] Screenshot click opens the live external project in a new tab.
- [ ] `Megnyitás` opens the internal case study page.
- [ ] Supporting order is: Ildiko Fonad, Googee, BossClub, RockVibe, GreenGoo, SkillBridge Home.

### Process

- [ ] The five-step flow is easy to scan.
- [ ] It feels reassuring and practical, not bureaucratic.
- [ ] Step cards do not feel cramped on mobile.

### Why CodeNest

- [ ] The section explains why a small two-person studio is a benefit.
- [ ] The three trust cards feel specific to CodeNest.
- [ ] The copy does not sound like generic agency claims.

### Bors + Dávid

- [ ] The section clearly communicates a small, direct team.
- [ ] Only Bors and Dávid appear.
- [ ] Founder cards feel personal without fake credentials.
- [ ] Initials/placeholders feel intentional enough for preview.

### Scope / Árazás

- [ ] The section explains why scope matters before pricing.
- [ ] No public prices or package names appear.
- [ ] The checklist is useful and not too long.
- [ ] CTA is visible and consistent.

### Contact

- [ ] The section feels low-pressure and human.
- [ ] It is clear that no finished specification is needed.
- [ ] Contact options are easy to understand.
- [ ] Form preview remains readable on mobile.

### Footer

- [ ] Footer transition feels intentional.
- [ ] Links are useful without clutter.
- [ ] Footer does not introduce old positioning or fake social links.

## Case Study Review

Open each page:

```text
http://localhost:8080/case-study.html?project=gardony-platform
http://localhost:8080/case-study.html?project=ildiko-fonad
http://localhost:8080/case-study.html?project=googee
http://localhost:8080/case-study.html?project=bossclub
http://localhost:8080/case-study.html?project=rockvibe
http://localhost:8080/case-study.html?project=greengoo
http://localhost:8080/case-study.html?project=skillbridge-home
```

For each case study:

- [ ] The page loads the correct project.
- [ ] The title and summary are short enough for a reference page.
- [ ] The project does not claim hidden admin/CMS functionality unless known.
- [ ] The overview cards are readable.
- [ ] Challenge and solution sections are concise.
- [ ] Screenshots stay inside their frames.
- [ ] Desktop and mobile screenshots are both visible.
- [ ] Screenshot click opens the live external project in a new tab.
- [ ] CTA links return to the V2 contact section.
- [ ] Mobile layout does not feel too long or repetitive.

## Brand And Positioning Checks

- [ ] The page feels warm, human, calm, and professional.
- [ ] The page does not feel neon/startup-like.
- [ ] The page does not feel cold corporate.
- [ ] The page does not feel like a generic web agency template.
- [ ] CodeNest is positioned around usable, editable web systems.
- [ ] The core line remains visible: `Webes rendszerek, amiket nem csak nézni lehet, hanem használni is.`

## Content Safety Checks

- [ ] No retired team member names appear.
- [ ] No fake metrics appear.
- [ ] No invented client quotes appear.
- [ ] No public prices appear.
- [ ] No named pricing package tiers appear.
- [ ] Gárdony remains the only highlighted project.

## Visual Issue Log

Use this table during manual review.

| Page / section | Viewport | Issue | Severity | Suggested action |
|---|---:|---|---|---|
|  |  |  |  |  |

Severity guide:

- `Must fix`: blocks preview approval or causes broken layout.
- `Should fix`: visible awkwardness, but not blocking.
- `Later`: polish idea for a future pass.

## Review Outcome

- [ ] Approved for homepage migration planning.
- [ ] Approved after small targeted fixes.
- [ ] Needs another visual polish pass before migration planning.

Reviewer notes:

```text

```