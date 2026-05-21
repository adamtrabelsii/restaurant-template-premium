# Vela Rebrand Design

**Date:** 2026-05-21  
**Scope:** Identity-only rebrand — name, cuisine, colors. No layout, animation, or structural changes.

---

## Summary

Replace the Ardor Spanish fine-dining identity with **VELA**, an Amalfi Coast Italian restaurant. Changes are limited to: CSS color variables, Tailwind token values, the Hero letter array, and both i18n JSON files. No component JSX structure changes except `Hero.jsx` (letter array + highlighted letter).

---

## 1. Name & Concept

| Field | Old | New |
|-------|-----|-----|
| Name | ARDOR | VELA |
| Meaning | — | Italian: "sail" |
| Cuisine | Spanish fine dining | Coastal Italian · Amalfi |
| City | Madrid | Napoli |
| Est. | 2018 | 2019 |
| Tagline (EN) | "Where Passion Meets the Plate" | "Where the Sea Meets the Table" |
| Tagline (ES) | "Donde la Pasión se Encuentra con el Plato" | "Donde el Mar se Encuentra con la Mesa" |

---

## 2. Color Palette

Token names are **unchanged** — only their hex values change. This means no JSX component files need color class updates.

| Token (CSS var / Tailwind) | Old value | New value | Role |
|---|---|---|---|
| `--red` / `ardor-red` | `#A8323F` (burgundy) | `#C87941` (terracotta) | Primary accent |
| `--gold` / `ardor-gold` / `ardor-neon` | `#C9A961` (brass) | `#7BA7BC` (sea-glass) | Secondary accent |
| `--copper` / `ardor-copper` | `#B87333` | `#E8D5B0` (warm linen) | Warm highlight |
| `--dark` / `ardor-dark` | `#0C0A09` | `#0D1B2A` (deep navy) | Page base |
| `--darker` / `ardor-darker` | `#06050A` | `#080E15` (deep navy) | Darkest bg |
| `--mid` / `ardor-mid` | `#15110F` | `#112030` (mid navy) | Section bg |
| `--surface` / `ardor-surface` | `#1C1815` | `#1B3A5C` (navy surface) | Card bg |
| `--muted` / `ardor-muted` | `#A89E92` | `#8AABB8` (muted sea-glass) | Subdued text |
| `--text` / `ardor-text` | `#F4EFE7` | `#E8D5B0` (linen) | Body text |

Also update `::selection` background in `index.css`: `rgba(168, 50, 63, 0.4)` → `rgba(200, 121, 65, 0.4)`

---

## 3. Hero Letters

**File:** `src/components/Hero.jsx`

```js
// Old
const LETTERS = ['A', 'R', 'D', 'O', 'R']
// condition: L === 'O'  → ardor-red color

// New
const LETTERS = ['V', 'E', 'L', 'A']
// condition: L === 'E'  → ardor-red color (terracotta accent on the vowel)
```

---

## 4. i18n — English (`en.json`)

### hero
```json
"tagline": "Napoli · Est. 2019",
"subtitle": "Where the Sea Meets the Table"
```

### about
```json
"quote": "\"Sea. Salt.<br />Soul.\"",
"body": "Born on the shores of Napoli, VELA brings the untamed spirit of coastal Italian cuisine to every plate. We cook with the finest catches from the Tyrrhenian Sea, handmade pasta, and a relentless obsession with simplicity done perfectly.",
"chefAlt": "Head chef at VELA",
"imageAlt": "VELA kitchen atmosphere",
"imageCaption": "Napoli, Italy"
```

### dishes.items (replace all 3)
```json
[
  {
    "name": "Spaghetti alle Vongole",
    "description": "Fresh clams, white wine, garlic, chilli, flat-leaf parsley, hand-pulled spaghetti.",
    "price": "€26",
    "alt": "Spaghetti alle vongole in a wide bowl"
  },
  {
    "name": "Branzino al Sale",
    "description": "Whole sea bass baked in a salt crust, lemon butter, capers, Amalfi olive oil.",
    "price": "€38",
    "alt": "Sea bass emerging from salt crust"
  },
  {
    "name": "Risotto al Nero di Seppia",
    "description": "Carnaroli rice, cuttlefish ink, grilled calamari, mascarpone, Prosecco.",
    "price": "€32",
    "alt": "Black squid ink risotto with calamari"
  }
]
```

### drinks
```json
"blurb": "Handcrafted cocktails inspired by the flavours of the Amalfi coast. Each glass tells a story.",
"items": [
  {
    "name": "Spritz della Costa",
    "label": "Signature",
    "description": "Aperol, Prosecco DOC, blood orange, rosemary, Amalfi lemon zest.",
    "alt": "Spritz della Costa cocktail"
  },
  {
    "name": "Limoncello Fizz",
    "label": "Refreshing",
    "description": "House limoncello, elderflower, sparkling water, fresh mint, candied lemon.",
    "alt": "Limoncello Fizz cocktail"
  },
  {
    "name": "Negroni Scuro",
    "label": "Bold",
    "description": "Gin, Campari, sweet vermouth, activated charcoal, orange peel, smoked cedar.",
    "alt": "Negroni Scuro cocktail"
  }
]
```

### menu.items (replace all tabs)
```json
"tapas": [
  { "name": "Bruschetta al Pomodoro", "desc": "Toasted sourdough, heirloom tomato, basil, Sicilian olive oil, sea salt", "price": "€9" },
  { "name": "Burrata Pugliese", "desc": "Fresh burrata, Datterini tomatoes, basil oil, aged balsamic, flor di sale", "price": "€14" },
  { "name": "Fritto Misto", "desc": "Light-battered squid, prawns, courgette flowers, lemon aioli", "price": "€16" },
  { "name": "Carpaccio di Tonno", "desc": "Bluefin tuna, capers, rocket, shaved Parmigiano, lemon oil", "price": "€18" }
],
"mains": [
  { "name": "Spaghetti alle Vongole", "desc": "Fresh clams, white wine, garlic, chilli, flat-leaf parsley", "price": "€26" },
  { "name": "Branzino al Sale", "desc": "Whole sea bass, salt crust, lemon butter, capers, Amalfi olive oil", "price": "€38" },
  { "name": "Ossobuco alla Milanese", "desc": "Braised veal shank, saffron risotto, gremolata", "price": "€42" },
  { "name": "Risotto al Nero di Seppia", "desc": "Cuttlefish ink, grilled calamari, mascarpone, Prosecco", "price": "€32" }
],
"postres": [
  { "name": "Panna Cotta", "desc": "Vanilla cream, Amalfi lemon curd, candied zest", "price": "€9" },
  { "name": "Tiramisù della Casa", "desc": "Mascarpone, espresso-soaked savoiardi, Marsala, cocoa", "price": "€11" },
  { "name": "Cannolo Siciliano", "desc": "Crispy shell, ricotta, pistachios, candied orange peel", "price": "€10" }
],
"bebidas": [
  { "name": "Spritz della Costa", "desc": "Aperol, Prosecco, blood orange, rosemary, Amalfi lemon", "price": "€14" },
  { "name": "Brunello di Montalcino", "desc": "Biondi-Santi, aged 5 years, complex dark fruit, earthy finish", "price": "€18" },
  { "name": "Limoncello della Casa", "desc": "House-made from Amalfi lemons, ice cold", "price": "€9" }
]
```

### reservations
```json
"blurb": "Reserve your table at VELA. We look forward to welcoming you.",
"placeholders": {
  "name": "Marco Russo",
  "email": "marco@example.com"
}
```

### footer
```json
"tagline": "Where the Sea Meets the Table",
"address": ["Via Posillipo, 24", "80123 Napoli, Italy"],
"copyright": "© 2026 VELA Napoli. All rights reserved.",
"crafted": "Crafted with passion in Napoli",
"socialAria": "VELA on {network}"
```

---

## 5. i18n — Spanish (`es.json`)

### hero
```json
"tagline": "Nápoles · Desde 2019",
"subtitle": "Donde el Mar se Encuentra con la Mesa"
```

### about
```json
"quote": "\"Mar. Sal.<br />Alma.\"",
"body": "Nacido a orillas de Nápoles, VELA lleva el espíritu indómito de la cocina costera italiana a cada plato. Cocinamos con las mejores capturas del Mar Tirreno, pasta artesanal y una obsesión incansable por la sencillez llevada a la perfección.",
"chefAlt": "Chef principal en VELA",
"imageAlt": "Ambiente de la cocina de VELA",
"imageCaption": "Nápoles, Italia"
```

### dishes.items (same dishes, Spanish descriptions)
```json
[
  {
    "name": "Spaghetti alle Vongole",
    "description": "Almejas frescas, vino blanco, ajo, guindilla, perejil, espagueti artesanal.",
    "price": "€26",
    "alt": "Spaghetti alle vongole en un cuenco ancho"
  },
  {
    "name": "Branzino al Sale",
    "description": "Lubina entera al horno en costra de sal, mantequilla de limón, alcaparras, aceite de oliva de Amalfi.",
    "price": "€38",
    "alt": "Lubina emergiendo de la costra de sal"
  },
  {
    "name": "Risotto al Nero di Seppia",
    "description": "Arroz Carnaroli, tinta de sepia, calamar a la plancha, mascarpone, Prosecco.",
    "price": "€32",
    "alt": "Risotto negro de tinta de calamar"
  }
]
```

### drinks
```json
"blurb": "Cócteles artesanales inspirados en los sabores de la costa de Amalfi. Cada copa cuenta una historia.",
"items": [
  { "name": "Spritz della Costa", "label": "Insignia", "description": "Aperol, Prosecco DOC, naranja sanguina, romero, ralladura de limón de Amalfi.", "alt": "Cóctel Spritz della Costa" },
  { "name": "Limoncello Fizz", "label": "Refrescante", "description": "Limoncello de la casa, flor de saúco, agua con gas, menta fresca, limón confitado.", "alt": "Cóctel Limoncello Fizz" },
  { "name": "Negroni Scuro", "label": "Intenso", "description": "Ginebra, Campari, vermut dulce, carbón activado, piel de naranja, cedro ahumado.", "alt": "Cóctel Negroni Scuro" }
]
```

### menu.items (same Italian dishes, Spanish descriptions)
```json
"tapas": [
  { "name": "Bruschetta al Pomodoro", "desc": "Pan de masa madre tostado, tomate de temporada, albahaca, aceite de oliva siciliano, sal marina", "price": "€9" },
  { "name": "Burrata Pugliese", "desc": "Burrata fresca, tomates Datterini, aceite de albahaca, balsámico añejo, flor di sale", "price": "€14" },
  { "name": "Fritto Misto", "desc": "Calamar, gambas y flor de calabacín en tempura ligera, alioli de limón", "price": "€16" },
  { "name": "Carpaccio di Tonno", "desc": "Atún rojo, alcaparras, rúcula, parmesano en lascas, aceite de limón", "price": "€18" }
],
"mains": [
  { "name": "Spaghetti alle Vongole", "desc": "Almejas frescas, vino blanco, ajo, guindilla, perejil", "price": "€26" },
  { "name": "Branzino al Sale", "desc": "Lubina entera, costra de sal, mantequilla de limón, alcaparras, aceite de Amalfi", "price": "€38" },
  { "name": "Ossobuco alla Milanese", "desc": "Jarrete de ternera estofado, risotto al azafrán, gremolata", "price": "€42" },
  { "name": "Risotto al Nero di Seppia", "desc": "Tinta de sepia, calamar a la plancha, mascarpone, Prosecco", "price": "€32" }
],
"postres": [
  { "name": "Panna Cotta", "desc": "Crema de vainilla, crema de limón de Amalfi, ralladura confitada", "price": "€9" },
  { "name": "Tiramisù della Casa", "desc": "Mascarpone, savoiardi empapados en espresso, Marsala, cacao", "price": "€11" },
  { "name": "Cannolo Siciliano", "desc": "Masa crujiente, ricotta, pistachos, piel de naranja confitada", "price": "€10" }
],
"bebidas": [
  { "name": "Spritz della Costa", "desc": "Aperol, Prosecco, naranja sanguina, romero, limón de Amalfi", "price": "€14" },
  { "name": "Brunello di Montalcino", "desc": "Biondi-Santi, añejado 5 años, fruta oscura compleja, final terroso", "price": "€18" },
  { "name": "Limoncello della Casa", "desc": "Elaborado en casa con limones de Amalfi, bien frío", "price": "€9" }
]
```

### reservations
```json
"blurb": "Reserva tu mesa en VELA. Te esperamos con ilusión."
```

### footer
```json
"tagline": "Donde el Mar se Encuentra con la Mesa",
"address": ["Via Posillipo, 24", "80123 Nápoles, Italia"],
"copyright": "© 2026 VELA Nápoles. Todos los derechos reservados.",
"crafted": "Hecho con pasión en Nápoles",
"socialAria": "VELA en {network}"
```

---

## 6. Files Changed

| File | Change |
|------|--------|
| `src/index.css` | CSS variable values (9 vars + ::selection) |
| `tailwind.config.js` | Color hex values (9 tokens) |
| `src/components/Hero.jsx` | LETTERS array + highlighted letter condition |
| `src/i18n/locales/en.json` | All ARDOR/Spain/Madrid references → VELA/Italy/Napoli + full menu rework |
| `src/i18n/locales/es.json` | Same in Spanish |

---

## Out of Scope

- No JSX layout changes
- No animation changes
- No new components
- No font changes
- No Navbar component changes (uses i18n for all text)
- `DishScroll.jsx` hardcoded text ("Signature Dishes", "Crafted with obsession.") — kept as-is, already Italian-cuisine neutral
