# CodeNest V2 Media Asset Map

Created for the V2 preview. This document maps the current files in `CodeNEst media web/` to clean canonical names and recommends where each asset should be used later.

Inspection note: the folder currently contains cleanly named PNG screenshots. No duplicate or numbered files were found. Image dimensions and file names were inspected directly. Before wiring images into the UI, do one final browser-level visual QA pass for exact crop, visible browser chrome, mobile status bars, localhost URLs, and any sensitive admin data.

## Summary

- Assets found: 14 PNG files
- Duplicate or numbered files found: none
- Current naming quality: already clean and mostly canonical
- Highest-priority homepage assets: `gardony-hero-desktop.png`, `gardony-mobile-home.png`, `ildiko-fonad-desktop.png`, `googee-desktop.png`, `bossclub-desktop.png`
- Missing expected Gárdony admin assets: `gardony-directus-news-list.png`, `gardony-directus-news-create.png`, `gardony-directus-attractions-list.png`

## Current Assets

| Current file name | Recommended clean file name | What the image shows | Recommended usage | Priority | Use in | Cleanup / direct-use notes |
|---|---|---|---|---|---|---|
| `gardony-hero-desktop.png` | `gardony-hero-desktop.png` | Desktop screenshot of the Gárdony public portal/homepage. 1889x911. | Main visual for the Gárdony featured project; possible cropped UI layer in homepage hero. | High | Homepage hero: yes, if cropped carefully. Gárdony featured project: yes. Supporting cards: no. Future Munkák page: yes. Future Gárdony case study: yes. Future service pages: yes, for municipal portals. | Check for browser UI or localhost URL before use. Crop to emphasize portal content, not browser frame. Good candidate for premium featured visual. |
| `gardony-mobile-home.png` | `gardony-mobile-home.png` | Mobile screenshot of the Gárdony public portal/homepage. 1080x2255. | Secondary visual beside/overlapping the Gárdony desktop screenshot. | High | Homepage hero: possible small mobile layer. Gárdony featured project: yes. Supporting cards: no. Future Munkák page: yes. Future Gárdony case study: yes. Future service pages: yes. | Check for phone status bar/browser chrome. Crop top/bottom if needed. Use as a small supporting mockup, not full-height on homepage. |
| `googee-desktop.png` | `googee-desktop.png` | Desktop screenshot of the Googee business website. 1896x911. | Supporting project card thumbnail and future Munkák detail. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: yes. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe, for admin/business website examples. | Check crop and visible browser UI. Use as a restrained thumbnail; do not let it compete with Gárdony. |
| `googee-mobile.png` | `googee-mobile.png` | Mobile screenshot of the Googee website. 1080x2248. | Future Munkák page or responsive detail view. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: optional. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe. | Check phone status bar/browser chrome. Homepage card should probably use desktop thumbnail only unless there is room for a small mobile overlay. |
| `bossclub-desktop.png` | `bossclub-desktop.png` | Desktop screenshot of the BossClub platform/community website. 1893x897. | Supporting project card thumbnail and future Munkák detail. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: yes. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe, for platform/community examples. | Check crop and any login/member-sensitive information. Use directly only if public-facing. |
| `bossclub-mobile.png` | `bossclub-mobile.png` | Mobile screenshot of the BossClub website. 1080x2020. | Future responsive project detail. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: optional. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe. | Check phone status bar/browser chrome and member-sensitive data. Crop if top/bottom browser UI appears. |
| `rockvibe-desktop.png` | `rockvibe-desktop.png` | Desktop screenshot of the RockVibe music/event site. 1896x906. | Supporting project card thumbnail; future Munkák page. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: yes. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: no, unless showing campaign/event sites. | Check visual contrast with the warmer CodeNest V2 palette. Use as thumbnail, not a large homepage proof point. |
| `rockvibe-mobile.png` | `rockvibe-mobile.png` | Mobile screenshot of the RockVibe site. 1080x2240. | Future Munkák page responsive view. | Low / Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: optional. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: no. | Check phone status bar/browser chrome. Use only where responsive presentation matters. |
| `greengoo-desktop.png` | `greengoo-desktop.png` | Desktop screenshot of the GreenGoo brand/product site. 1916x907. | Supporting project card thumbnail; future Munkák page. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: yes. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe, for brand/product websites. | Largest file in the folder at about 2.63 MB. Should be optimized before production. Check crop and color intensity. |
| `greengoo-mobile.png` | `greengoo-mobile.png` | Mobile screenshot of the GreenGoo site. 1080x2261. | Future responsive project detail. | Low / Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: optional. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe. | Check phone status bar/browser chrome. Optimize if used beyond internal preview. |
| `ildiko-fonad-desktop.png` | `ildiko-fonad-desktop.png` | Desktop screenshot of the Ildiko Fonad expert/service website. 1892x906. | Supporting project card thumbnail; future Munkák detail. | High | Homepage hero: no. Gárdony featured project: no. Supporting cards: yes. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: yes, for expert/service websites. | Strong candidate for supporting cards because it shows a real service/professional site. Check crop and multilingual UI visibility. |
| `ildiko-fonad-mobile.png` | `ildiko-fonad-mobile.png` | Mobile screenshot of the Ildiko Fonad website. 1080x2240. | Future responsive detail; optional supporting card overlay. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: optional. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: yes. | Check phone status bar/browser chrome. Use as secondary asset, not primary homepage thumbnail. |
| `skillbridge-home-desktop.png` | `skillbridge-home-desktop.png` | Desktop screenshot of the SkillBridge Home education/application site. 1902x911. | Supporting project card thumbnail; future Munkák page. | Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: yes. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe, for forms/application flows. | Good candidate if the screenshot clearly shows application or conversion structure. Check crop. |
| `skillbridge-home-mobile.png` | `skillbridge-home-mobile.png` | Mobile screenshot of the SkillBridge Home site. 1080x2233. | Future responsive detail. | Low / Medium | Homepage hero: no. Gárdony featured project: no. Supporting cards: optional. Future Munkák page: yes. Future Gárdony case study: no. Future service pages: maybe. | Check phone status bar/browser chrome. Use only if responsive detail is needed. |

## Missing Expected Assets

These clean names were expected for the Gárdony/admin story but are not currently present in `CodeNEst media web/`.

| Expected clean file name | Recommended source | Recommended usage | Priority | Cleanup / direct-use notes |
|---|---|---|---|---|
| `gardony-directus-news-list.png` | Directus/admin screenshot of the news list. | Gárdony featured project, future Gárdony case study, future service pages about editable/admin systems. | High | Must blur or remove sensitive/admin-only data if any. Avoid localhost URLs. Crop to the useful admin table/list area. |
| `gardony-directus-news-create.png` | Directus/admin screenshot of creating or editing a news item. | Gárdony case study and service pages explaining editable content. | High | Must check for admin-sensitive data, user names, tokens, draft content, or local environment URLs. |
| `gardony-directus-attractions-list.png` | Directus/admin screenshot of attractions/tourism content list. | Gárdony case study and municipal portal service proof. | Medium / High | Must blur sensitive data. Use only if it clearly shows structured content management. |

## Canonical Supporting Project Set

Below the highlighted Gárdony card, the homepage supporting project grid should use these six canonical projects:

1. `ildiko-fonad-desktop.png` for Ildiko Fonad
2. `googee-desktop.png` for Googee
3. `bossclub-desktop.png` for BossClub
4. `rockvibe-desktop.png` for RockVibe
5. `greengoo-desktop.png` for GreenGoo
6. `skillbridge-home-desktop.png` for SkillBridge Home

Mobile screenshots should be kept for future detail pages, responsive mockups, or subtle overlays. The homepage supporting cards should usually prefer desktop thumbnails for visual consistency.

## Highest Priority Wiring Order

1. Use `gardony-hero-desktop.png` in the Gárdony featured project card.
2. Add `gardony-mobile-home.png` as a small secondary mobile layer in the featured Gárdony visual.
3. Use the six desktop supporting screenshots in the 3x2 supporting project grid.
4. Add Directus/admin screenshots once available, after cleanup and sensitive-data review.
5. Save mobile screenshots for future Munkák detail pages or responsive case-study sections.

## Cleanup Checklist Before Production Use

- Check every desktop screenshot for visible browser UI or address bar.
- Check every mobile screenshot for visible phone status bar or browser toolbar.
- Check all Gárdony/admin screenshots for localhost URLs and admin-sensitive data before use.
- Optimize large files, especially `greengoo-desktop.png`.
- Crop screenshots to emphasize useful UI/product content instead of empty page margins.
- Avoid using mobile screenshots full-height on the homepage; they are better as small overlays or future detail-page assets.