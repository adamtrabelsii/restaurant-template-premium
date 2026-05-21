# Vela Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the site from Ardor (Spanish fine dining, Madrid) to Vela (Coastal Italian, Napoli) by updating colors, the Hero letter array, and both i18n JSON files.

**Architecture:** Token names in CSS and Tailwind are kept identical — only their hex values change, so no JSX component files need color class updates. i18n JSON files are fully replaced with Italian-cuisine content. Hero.jsx gets a 2-line change (LETTERS array + highlighted letter condition).

**Tech Stack:** React JSX · Vite · Tailwind CSS · CSS custom properties · i18n JSON

---

## File Map

| File | Change |
|------|--------|
| `src/index.css` | CSS variable values (9 vars + `::selection`) |
| `tailwind.config.js` | Color hex values (9 tokens) |
| `src/components/Hero.jsx` | `LETTERS` array + highlighted-letter condition |
| `src/i18n/locales/en.json` | Full replacement — Vela identity, Italian menu |
| `src/i18n/locales/es.json` | Full replacement — same in Spanish |

---

## Task 1: Update color tokens

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Replace `:root` block in `src/index.css`**

Open `src/index.css`. Find the `:root` block (lines 5–15) and replace it:

```css
:root {
  --red:    #C87941;
  --gold:   #7BA7BC;
  --copper: #E8D5B0;
  --dark:   #0D1B2A;
  --darker: #080E15;
  --mid:    #112030;
  --surface:#1B3A5C;
  --muted:  #8AABB8;
  --text:   #E8D5B0;
}
```

- [ ] **Step 2: Update `::selection` in `src/index.css`**

Find the `::selection` rule (currently `background: rgba(168, 50, 63, 0.4)`) and change it to:

```css
::selection { background: rgba(200, 121, 65, 0.4); color: var(--text); }
```

- [ ] **Step 3: Replace color values in `tailwind.config.js`**

Open `tailwind.config.js`. Find the `ardor:` color object and replace its values:

```js
ardor: {
  red:    '#C87941',
  gold:   '#7BA7BC',
  copper: '#E8D5B0',
  neon:   '#7BA7BC',
  dark:   '#0D1B2A',
  darker: '#080E15',
  mid:    '#112030',
  surface:'#1B3A5C',
  muted:  '#8AABB8',
  text:   '#E8D5B0',
},
```

- [ ] **Step 4: Verify build still passes**

```bash
npm run build 2>&1 | tail -5
```

Expected: exits 0, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/index.css tailwind.config.js
git commit -m "feat(rebrand): navy/terracotta/sea-glass palette for Vela"
```

---

## Task 2: Update Hero letters

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Replace `LETTERS` array and highlighted-letter condition**

Open `src/components/Hero.jsx`. Find these two things and change them:

**Change 1** — the `LETTERS` constant (currently line ~17):
```js
// OLD
const LETTERS = ['A', 'R', 'D', 'O', 'R']

// NEW
const LETTERS = ['V', 'E', 'L', 'A']
```

**Change 2** — the className condition on the `motion.span` inside the `LETTERS.map` (currently `L === 'O'`):
```jsx
// OLD
className={L === 'O' ? 'text-ardor-red' : ''}

// NEW
className={L === 'E' ? 'text-ardor-red' : ''}
```

No other changes to `Hero.jsx`.

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat(rebrand): Hero spells VELA with E highlighted"
```

---

## Task 3: Replace English i18n

**Files:**
- Modify: `src/i18n/locales/en.json`

- [ ] **Step 1: Replace the entire file**

Write this as the complete content of `src/i18n/locales/en.json`:

```json
{
  "navbar": {
    "links": {
      "about": "About",
      "dishes": "Dishes",
      "drinks": "Drinks",
      "menu": "Menu"
    },
    "reserve": "Reserve",
    "toggleMenu": "Toggle menu",
    "switchToEnglish": "Switch language to English",
    "switchToSpanish": "Switch language to Spanish"
  },
  "hero": {
    "tagline": "Napoli · Est. 2019",
    "subtitle": "Where the Sea Meets the Table",
    "cta": "Reserve a Table",
    "scroll": "Scroll"
  },
  "about": {
    "eyebrow": "Our story",
    "quote": "\"Sea. Salt.<br />Soul.\"",
    "body": "Born on the shores of Napoli, VELA brings the untamed spirit of coastal Italian cuisine to every plate. We cook with the finest catches from the Tyrrhenian Sea, handmade pasta, and a relentless obsession with simplicity done perfectly.",
    "chefName": "Chef Emma Wiebach",
    "chefRole": "Executive Chef & Founder",
    "chefAlt": "Head chef at VELA",
    "imageAlt": "VELA kitchen atmosphere",
    "imageCaption": "Napoli, Italy",
    "stats": {
      "years":    "Years of craft",
      "michelin": "Michelin stars",
      "wines":    "Cellar selections",
      "chefs":    "Chefs in brigade"
    }
  },
  "press": { "eyebrow": "As featured in" },
  "gallery": {
    "eyebrow": "The space",
    "title": "A room for the senses"
  },
  "dishes": {
    "eyebrow": "Our Specialities",
    "title": "Signature Dishes",
    "items": [
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
  },
  "drinks": {
    "eyebrow": "Cocktails & Wine",
    "title": "The Bar",
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
  },
  "menu": {
    "eyebrow": "Explore",
    "title": "Our Menu",
    "tabs": {
      "tapas": "Antipasti",
      "mains": "Mains",
      "postres": "Desserts",
      "bebidas": "Drinks"
    },
    "items": {
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
    }
  },
  "reservations": {
    "eyebrow": "Join Us",
    "title": "Book a Table",
    "blurb": "Reserve your table at VELA. We look forward to welcoming you.",
    "labels": {
      "name": "Full Name",
      "email": "Email",
      "date": "Date",
      "time": "Time",
      "guests": "Guests"
    },
    "placeholders": {
      "name": "Marco Russo",
      "email": "marco@example.com",
      "time": "Select time",
      "guests": "Number of guests"
    },
    "guestsOptions": ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7+ Guests (please call)"],
    "submit": "Confirm Reservation",
    "submitting": "Reserving…",
    "successTitle": "Perfect! Your table is reserved.",
    "successBody": "A confirmation will be sent to your email."
  },
  "footer": {
    "tagline": "Where the Sea Meets the Table",
    "navigateHeading": "Navigate",
    "findUsHeading": "Find Us",
    "links": [
      { "label": "About", "href": "#about" },
      { "label": "Signature Dishes", "href": "#dishes" },
      { "label": "Drinks & Bar", "href": "#drinks" },
      { "label": "Full Menu", "href": "#menu" },
      { "label": "Reservations", "href": "#reservations" }
    ],
    "address": ["Via Posillipo, 24", "80123 Napoli, Italy"],
    "hours": {
      "weekdays": { "label": "Mon–Thu", "value": "7:00 PM – 11:00 PM" },
      "weekend": { "label": "Fri–Sat", "value": "7:00 PM – 12:30 AM" },
      "sunday": { "label": "Sunday", "value": "Closed" }
    },
    "copyright": "© 2026 VELA Napoli. All rights reserved.",
    "crafted": "Crafted with passion in Napoli",
    "socialAria": "VELA on {network}"
  }
}
```

- [ ] **Step 2: Verify valid JSON**

```bash
node -e "require('./src/i18n/locales/en.json'); console.log('valid')"
```

Expected: `valid`

- [ ] **Step 3: Commit**

```bash
git add src/i18n/locales/en.json
git commit -m "feat(rebrand): Italian identity and menu in English i18n"
```

---

## Task 4: Replace Spanish i18n

**Files:**
- Modify: `src/i18n/locales/es.json`

- [ ] **Step 1: Replace the entire file**

Write this as the complete content of `src/i18n/locales/es.json`:

```json
{
  "navbar": {
    "links": {
      "about": "Nosotros",
      "dishes": "Platos",
      "drinks": "Bebidas",
      "menu": "Carta"
    },
    "reserve": "Reservar",
    "toggleMenu": "Abrir menú",
    "switchToEnglish": "Cambiar idioma a Inglés",
    "switchToSpanish": "Cambiar idioma a Español"
  },
  "hero": {
    "tagline": "Nápoles · Desde 2019",
    "subtitle": "Donde el Mar se Encuentra con la Mesa",
    "cta": "Reservar Mesa",
    "scroll": "Desliza"
  },
  "about": {
    "eyebrow": "Nuestra historia",
    "quote": "\"Mar. Sal.<br />Alma.\"",
    "body": "Nacido a orillas de Nápoles, VELA lleva el espíritu indómito de la cocina costera italiana a cada plato. Cocinamos con las mejores capturas del Mar Tirreno, pasta artesanal y una obsesión incansable por la sencillez llevada a la perfección.",
    "chefName": "Chef Emma Wiebach",
    "chefRole": "Chef Ejecutivo y Fundador",
    "chefAlt": "Chef principal en VELA",
    "imageAlt": "Ambiente de la cocina de VELA",
    "imageCaption": "Nápoles, Italia",
    "stats": {
      "years":    "Años de oficio",
      "michelin": "Estrellas Michelin",
      "wines":    "Vinos en bodega",
      "chefs":    "Chefs en brigada"
    }
  },
  "press": { "eyebrow": "Aparecemos en" },
  "gallery": {
    "eyebrow": "El espacio",
    "title": "Una sala para los sentidos"
  },
  "dishes": {
    "eyebrow": "Nuestras Especialidades",
    "title": "Platos Estrella",
    "items": [
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
  },
  "drinks": {
    "eyebrow": "Cócteles y Vinos",
    "title": "La Barra",
    "blurb": "Cócteles artesanales inspirados en los sabores de la costa de Amalfi. Cada copa cuenta una historia.",
    "items": [
      {
        "name": "Spritz della Costa",
        "label": "Insignia",
        "description": "Aperol, Prosecco DOC, naranja sanguina, romero, ralladura de limón de Amalfi.",
        "alt": "Cóctel Spritz della Costa"
      },
      {
        "name": "Limoncello Fizz",
        "label": "Refrescante",
        "description": "Limoncello de la casa, flor de saúco, agua con gas, menta fresca, limón confitado.",
        "alt": "Cóctel Limoncello Fizz"
      },
      {
        "name": "Negroni Scuro",
        "label": "Intenso",
        "description": "Ginebra, Campari, vermut dulce, carbón activado, piel de naranja, cedro ahumado.",
        "alt": "Cóctel Negroni Scuro"
      }
    ]
  },
  "menu": {
    "eyebrow": "Descubre",
    "title": "Nuestra Carta",
    "tabs": {
      "tapas": "Antipasti",
      "mains": "Principales",
      "postres": "Postres",
      "bebidas": "Bebidas"
    },
    "items": {
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
    }
  },
  "reservations": {
    "eyebrow": "Únete",
    "title": "Haz Tu Reserva",
    "blurb": "Reserva tu mesa en VELA. Te esperamos con ilusión.",
    "labels": {
      "name": "Nombre Completo",
      "email": "Correo Electrónico",
      "date": "Fecha",
      "time": "Hora",
      "guests": "Comensales"
    },
    "placeholders": {
      "name": "Marco Russo",
      "email": "marco@ejemplo.com",
      "time": "Selecciona hora",
      "guests": "Número de comensales"
    },
    "guestsOptions": ["1 Comensal", "2 Comensales", "3 Comensales", "4 Comensales", "5 Comensales", "6 Comensales", "7+ Comensales (por favor llama)"],
    "submit": "Confirmar Reserva",
    "submitting": "Reservando…",
    "successTitle": "¡Perfecto! Tu mesa está reservada.",
    "successBody": "Recibirás una confirmación en tu correo electrónico."
  },
  "footer": {
    "tagline": "Donde el Mar se Encuentra con la Mesa",
    "navigateHeading": "Navegar",
    "findUsHeading": "Encuéntranos",
    "links": [
      { "label": "Nosotros", "href": "#about" },
      { "label": "Platos Estrella", "href": "#dishes" },
      { "label": "Bebidas y Barra", "href": "#drinks" },
      { "label": "Carta Completa", "href": "#menu" },
      { "label": "Reservas", "href": "#reservations" }
    ],
    "address": ["Via Posillipo, 24", "80123 Nápoles, Italia"],
    "hours": {
      "weekdays": { "label": "Lun–Jue", "value": "19:00 – 23:00" },
      "weekend": { "label": "Vie–Sáb", "value": "19:00 – 00:30" },
      "sunday": { "label": "Domingo", "value": "Cerrado" }
    },
    "copyright": "© 2026 VELA Nápoles. Todos los derechos reservados.",
    "crafted": "Hecho con pasión en Nápoles",
    "socialAria": "VELA en {network}"
  }
}
```

- [ ] **Step 2: Verify valid JSON**

```bash
node -e "require('./src/i18n/locales/es.json'); console.log('valid')"
```

Expected: `valid`

- [ ] **Step 3: Final build check**

```bash
npm run build 2>&1 | tail -5
```

Expected: exits 0, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/locales/es.json
git commit -m "feat(rebrand): Italian identity and menu in Spanish i18n"
```
