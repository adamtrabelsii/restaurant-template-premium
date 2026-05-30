# Graph Report - .  (2026-05-25)

## Corpus Check
- Corpus is ~28,597 words - fits in a single context window. You may not need a graph.

## Summary
- 376 nodes · 434 edges · 36 communities (29 shown, 7 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_EN Dish Content|EN Dish Content]]
- [[_COMMUNITY_ES Dish Content|ES Dish Content]]
- [[_COMMUNITY_Core App Components|Core App Components]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_EN Form Labels|EN Form Labels]]
- [[_COMMUNITY_ES Form Labels|ES Form Labels]]
- [[_COMMUNITY_EN Footer Content|EN Footer Content]]
- [[_COMMUNITY_ES Footer Content|ES Footer Content]]
- [[_COMMUNITY_Container Scroll Animation|Container Scroll Animation]]
- [[_COMMUNITY_EN About Content|EN About Content]]
- [[_COMMUNITY_ES About Content|ES About Content]]
- [[_COMMUNITY_EN Menu Items|EN Menu Items]]
- [[_COMMUNITY_ES Menu Items|ES Menu Items]]
- [[_COMMUNITY_Shared UI Utilities|Shared UI Utilities]]
- [[_COMMUNITY_Footer & Navigation|Footer & Navigation]]
- [[_COMMUNITY_Dish Scroll Feature|Dish Scroll Feature]]
- [[_COMMUNITY_Locales & HTML Entry|Locales & HTML Entry]]
- [[_COMMUNITY_Reveal Animation & Menu|Reveal Animation & Menu]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_About Section|About Section]]
- [[_COMMUNITY_Dishes Section|Dishes Section]]
- [[_COMMUNITY_i18n Language System|i18n Language System]]
- [[_COMMUNITY_Agent Workspace Config|Agent Workspace Config]]
- [[_COMMUNITY_Reservations Section|Reservations Section]]
- [[_COMMUNITY_Drinks Section|Drinks Section]]
- [[_COMMUNITY_Gallery Section|Gallery Section]]
- [[_COMMUNITY_OpenClaw Workspace|OpenClaw Workspace]]
- [[_COMMUNITY_Ardor Build Plans|Ardor Build Plans]]
- [[_COMMUNITY_Tailwind Design System|Tailwind Design System]]
- [[_COMMUNITY_Vite Build Config|Vite Build Config]]
- [[_COMMUNITY_Ardor Pro Package|Ardor Pro Package]]
- [[_COMMUNITY_PostCSS Entry|PostCSS Entry]]

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 23 edges
2. `App Root Component` - 16 edges
3. `LanguageContext / useLanguage` - 12 edges
4. `reservations` - 11 edges
5. `reservations` - 11 edges
6. `about` - 10 edges
7. `footer` - 10 edges
8. `about` - 10 edges
9. `footer` - 10 edges
10. `Reveal Component` - 7 edges

## Surprising Connections (you probably didn't know these)
- `useActiveSection Hook` --conceptually_related_to--> `fix.md — ARDOR Audit & Upgrade Roadmap`  [INFERRED]
  src/hooks/useActiveSection.js → fix.md
- `ContainerScroll JSX Port Rationale` --rationale_for--> `ContainerScroll Animation Component`  [EXTRACTED]
  docs/superpowers/specs/2026-05-21-ardor-ui-overhaul-design.md → src/components/ui/container-scroll-animation.jsx
- `Custom i18n Context Rationale` --rationale_for--> `LanguageProvider`  [EXTRACTED]
  docs/superpowers/specs/2026-05-14-i18n-en-es-design.md → src/i18n/LanguageContext.jsx
- `index.html — App Entry & SEO Shell` --conceptually_related_to--> `English Locale Dictionary (en.json)`  [INFERRED]
  index.html → src/i18n/locales/en.json
- `index.html — App Entry & SEO Shell` --conceptually_related_to--> `Spanish Locale Dictionary (es.json)`  [INFERRED]
  index.html → src/i18n/locales/es.json

## Hyperedges (group relationships)
- **Reduced Motion Prop Drilling Pattern** — app_app, rationale_reducedmotion, common_cursorfollower, common_loadingscreen, component_hero, component_navbar, component_about, component_dishes, component_drinks, component_menu, component_gallery, component_reservations, component_footer [EXTRACTED 0.95]
- **i18n useLanguage Consumer Pattern** — i18n_languagecontext, component_hero, component_about, component_dishes, component_drinks, component_menu, component_gallery, component_navbar, component_press, component_reservations, component_footer, component_languagetoggle [EXTRACTED 1.00]
- **Reveal Animation Entry Pattern** — common_reveal, component_about, component_dishes, component_drinks, component_menu, component_gallery, component_reservations [EXTRACTED 1.00]
- **i18n Localization System** — languagecontext_LanguageProvider, languagecontext_useLanguage, en_EnglishLocale, es_SpanishLocale [EXTRACTED 0.95]
- **Scroll Animation Component System** — reveal_Reveal, scrollprogress_ScrollProgress, containerscroll_ContainerScroll, useactivesection_useActiveSection [INFERRED 0.85]
- **Agent Workspace Configuration System** — agents_AgentsWorkspace, soul_SoulPersonality, identity_IdentityTemplate, heartbeat_HeartbeatConfig [EXTRACTED 0.95]

## Communities (36 total, 7 thin omitted)

### Community 0 - "EN Dish Content"
Cohesion: 0.07
Nodes (29): dishes, eyebrow, items, title, drinks, blurb, eyebrow, items (+21 more)

### Community 1 - "ES Dish Content"
Cohesion: 0.07
Nodes (29): dishes, eyebrow, items, title, drinks, blurb, eyebrow, items (+21 more)

### Community 2 - "Core App Components"
Cohesion: 0.12
Nodes (29): CountUp Animation, App Root Component, DishScene 3D Canvas, ProceduralDish 3D Mesh, CursorFollower Component, LoadingScreen Component, Reveal Animation Component, ScrollProgress Component (+21 more)

### Community 3 - "Package Dependencies"
Cohesion: 0.08
Nodes (24): dependencies, framer-motion, lucide-react, postprocessing, react, react-dom, @react-three/drei, @react-three/fiber (+16 more)

### Community 4 - "EN Form Labels"
Cohesion: 0.10
Nodes (20): date, email, guests, name, time, email, guests, name (+12 more)

### Community 5 - "ES Form Labels"
Cohesion: 0.10
Nodes (20): date, email, guests, name, time, email, guests, name (+12 more)

### Community 6 - "EN Footer Content"
Cohesion: 0.11
Nodes (19): footer, address, copyright, crafted, findUsHeading, hours, links, navigateHeading (+11 more)

### Community 7 - "ES Footer Content"
Cohesion: 0.11
Nodes (19): footer, address, copyright, crafted, findUsHeading, hours, links, navigateHeading (+11 more)

### Community 8 - "Container Scroll Animation"
Cohesion: 0.19
Nodes (15): ContainerScroll Animation Component, ScrollCard Sub-Component, ScrollHeader Sub-Component, fix2.md — ARDOR Tone-Down Pass, fix.md — ARDOR Audit & Upgrade Roadmap, public/models README — GLB Model Guide, Ardor UI Overhaul Implementation Plan, Blur-to-Sharp Reveal Pattern (+7 more)

### Community 9 - "EN About Content"
Cohesion: 0.14
Nodes (14): about, body, chefAlt, chefName, chefRole, eyebrow, imageAlt, imageCaption (+6 more)

### Community 10 - "ES About Content"
Cohesion: 0.14
Nodes (14): about, body, chefAlt, chefName, chefRole, eyebrow, imageAlt, imageCaption (+6 more)

### Community 11 - "EN Menu Items"
Cohesion: 0.15
Nodes (13): bebidas, mains, postres, tapas, menu, eyebrow, items, tabs (+5 more)

### Community 12 - "ES Menu Items"
Cohesion: 0.15
Nodes (13): bebidas, mains, postres, tapas, menu, eyebrow, items, tabs (+5 more)

### Community 13 - "Shared UI Utilities"
Cohesion: 0.17
Nodes (3): EASE, ITEMS, Press()

### Community 14 - "Footer & Navigation"
Cohesion: 0.24
Nodes (8): Footer(), SOCIAL, LanguageToggle(), LINK_KEYS, Navbar(), SECTION_IDS, useActiveSection(), useLanguage()

### Community 15 - "Dish Scroll Feature"
Cohesion: 0.25
Nodes (3): DISHES, EASE, ContainerScroll()

### Community 16 - "Locales & HTML Entry"
Cohesion: 0.43
Nodes (8): English Locale Dictionary (en.json), Spanish Locale Dictionary (es.json), index.html — App Entry & SEO Shell, LanguageProvider, lookup (dot-path traversal), useLanguage Hook, Custom i18n Context Rationale, i18n EN/ES Design Spec

### Community 17 - "Reveal Animation & Menu"
Cohesion: 0.29
Nodes (4): VARIANTS, FILTERS, Menu(), TABS

### Community 18 - "Hero Section"
Cohesion: 0.29
Nodes (6): container, EASE, Hero(), item, LETTERS, ORBS

### Community 19 - "About Section"
Cohesion: 0.29
Nodes (5): About(), EASE, statItem, STATS, statsContainer

### Community 20 - "Dishes Section"
Cohesion: 0.29
Nodes (4): DISH_IMAGES, Dishes(), EASE, SPANS

### Community 21 - "i18n Language System"
Cohesion: 0.33
Nodes (3): DICTS, LanguageContext, LanguageProvider()

### Community 22 - "Agent Workspace Config"
Cohesion: 0.40
Nodes (6): AGENTS.md — Agent Workspace Configuration, HEARTBEAT.md — Periodic Task Checklist, IDENTITY.md — Agent Identity Template, SOUL.md — Agent Personality & Values, TOOLS.md — Local Environment Notes, USER.md — Human User Profile

### Community 23 - "Reservations Section"
Cohesion: 0.33
Nodes (5): EASE, GUESTS, Reservations(), STEPS, TIMES

### Community 25 - "Gallery Section"
Cohesion: 0.50
Nodes (3): EASE, Gallery(), IMAGES

## Knowledge Gaps
- **225 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+220 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `reservations` connect `EN Form Labels` to `EN Dish Content`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `reservations` connect `ES Form Labels` to `ES Dish Content`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `footer` connect `EN Footer Content` to `EN Dish Content`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _232 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `EN Dish Content` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `ES Dish Content` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Core App Components` be split into smaller, more focused modules?**
  _Cohesion score 0.11822660098522167 - nodes in this community are weakly interconnected._