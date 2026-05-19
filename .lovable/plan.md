# Plan: Expand Services + Service Areas, wire all pages

## Goal
Add the complete list of interior services and the 12-district service area (Assam + Arunachal Pradesh, within 200 km) across the site, and make sure every page is fully working end-to-end.

## 1. Services — full catalog

Replace the current 5-card Services page with the full list (grouped for readability):

**Interiors**
- Full home / total room interior
- Commercial interior projects
- Modular kitchen
- Wardrobe
- TV unit
- Bed & bedroom interior

**Design & Drawing**
- 2D drawing & design
- 3D drawing & visualisation

**Ceiling & Walls**
- False ceiling
- PVC ceiling
- PVC wall panel
- Wallpaper

**Doors, Windows & Glass**
- uPVC window
- Aluminium window
- Tuffon (toughened) glass work

**Metal & Exterior**
- ACP sheet work
- Steel railing & gate

**Flooring**
- Wooden flooring
- 3D epoxy flooring

Each item: icon, title, 1-line description, hover state. Same dark-bento aesthetic as today, but a denser grid (3-4 cols on desktop, 2 on tablet, 1 on mobile) so all ~18 services fit cleanly.

## 2. Service Areas — new section

Add a "Service Areas" block (on `/contact` and as a section on `/about`, plus a small footer mention) listing all 12 districts we cover within a 200 km radius:

Assam: Tinsukia, Dibrugarh, Charaideo, Dhemaji, Majuli
Arunachal Pradesh: Namsai, Tirap, Lohit, Lower Dibang Valley, Upper Dibang Valley, Changlang, Longding

Presentation: chip/pill grid with a short intro line ("Serving 12 districts across Upper Assam & Arunachal Pradesh — within a 200 km radius of Tinsukia.").

## 3. Make all pages working

- **/** (home): refresh hero CTA → `/contact`, surface 6 top services with link to `/services`, add service-area teaser.
- **/services**: full catalog (section 1) with anchor IDs per category, CTA → `/contact`.
- **/projects**: keep existing 3 cards (placeholder until real photos arrive); add note + CTA to request portfolio.
- **/about**: add service-areas section + "what we do" summary linked to `/services`.
- **/contact**: verify form posts to `contact_submissions` (already wired), add service-area block + map/phone/WhatsApp CTAs.
- **Nav/Footer**: confirm all 5 routes link correctly; footer lists services (short) + districts.

## 4. SEO

Per-route `head()` updated with district + service keywords (e.g. "Interior Designer in Tinsukia & Dibrugarh — Shree Durga Interior").

## Technical notes

- All edits in frontend React/TSX under `src/routes/` and `src/components/`. No DB changes — `contact_submissions` already exists.
- Services data extracted to `src/lib/services.ts` (single source of truth used by `/services`, home highlights, and footer).
- Districts extracted to `src/lib/service-areas.ts`.
- Reuses existing dark theme tokens; no new dependencies.

## Out of scope (ask before adding)

- Real project photos / case studies
- Per-service detail pages (`/services/modular-kitchen` etc.)
- Multi-language (Hindi/Assamese) content
- Google Maps embed (needs API key)
