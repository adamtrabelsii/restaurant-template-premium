# i18n: English / Spanish Toggle

## Goal

Allow visitors to switch the entire site between Spanish (default) and English via a toggle button in the navbar. The choice persists across visits.

## Non-goals

- No URL-based routing (`/es`, `/en`). Single-page site; in-memory + localStorage is sufficient.
- No third-party i18n library (react-i18next, FormatJS). Project is small enough for a custom Context.
- No pluralization rules or ICU message format. Plain string lookup only.
- No additional languages beyond EN/ES in this iteration (structure should make adding more trivial).

## Architecture

### Context module — `src/i18n/LanguageContext.jsx`

Exposes:

- `LanguageProvider` — wraps the app in `main.jsx`.
- `useLanguage()` hook returning `{ lang, setLang, t }`.
  - `lang`: `'es' | 'en'`.
  - `setLang(next)`: updates state, writes `localStorage.lang`, sets `document.documentElement.lang`.
  - `t(key)`: dot-path lookup against the active dictionary (e.g. `t('hero.title')`). Returns the key itself if missing (visible signal during dev).

Initialization order on mount:

1. Read `localStorage.lang`. If `'es'` or `'en'`, use it.
2. Otherwise default to `'es'`.
3. Sync `document.documentElement.lang`.

### Dictionaries — `src/i18n/locales/en.json` and `es.json`

Nested JSON keyed by section. Sections mirror the components:

```
{
  "navbar": { ... },
  "hero": { ... },
  "about": { ... },
  "menu": { ... },
  "dishes": { items: [ { name, description }, ... ] },
  "drinks": { items: [ ... ] },
  "reservations": { ... form labels, placeholders, success message ... },
  "footer": { ... }
}
```

Arrays (menu items, dishes, drinks) live inside the JSON so their names and descriptions translate together with surrounding copy. Components map over `t('dishes.items')` and render.

`t()` must support returning non-string values (arrays, objects) for these list cases — the lookup is just a path traversal; type coercion is the caller's job.

### Toggle component — `src/components/LanguageToggle.jsx`

- Pill with two segments: `EN` | `ES`. Active segment highlighted with the brand accent color.
- Clicking either segment calls `setLang`.
- Framer Motion: subtle scale/opacity transition on the active highlight. Wrapped to honor `useReducedMotion()` like the rest of the site.
- Accessible: `<button>` elements with `aria-pressed` reflecting the active language; `aria-label="Switch language to English"` / `"Cambiar idioma a Español"`.

Mounted inside `Navbar.jsx` — visible on desktop nav and inside the existing mobile menu drawer.

### Wiring

- `main.jsx`: wrap `<App />` with `<LanguageProvider>`.
- Each section component (`Hero`, `About`, `Menu`, `Dishes`, `Drinks`, `Reservations`, `Footer`, `Navbar`) imports `useLanguage` and replaces hardcoded strings with `t()` calls.
- `Reservations` form: `htmlFor`/`id` associations preserved; label text, placeholder text, submit button text, and success message all translated. The htmlFor fix from commit `d77b2be` stays intact.

## Data flow

```
User clicks toggle
  → setLang('en')
  → Context state updates
  → localStorage.lang = 'en'
  → document.documentElement.lang = 'en'
  → All consumers re-render with new t() output
```

## Error handling

- Missing translation key: `t()` returns the key string. No throw. Easy to spot visually during dev.
- Corrupted/invalid `localStorage.lang`: ignored, falls back to default `'es'`.
- Both dictionaries must define the same key set. Enforced by code review (no automated check in this iteration).

## Testing

Manual verification (no test suite in the project):

- Toggle switches every visible string on every section.
- Reload preserves the chosen language.
- First-ever visit (cleared localStorage) loads in Spanish.
- `<html lang>` updates correctly (inspect element).
- Reservation form submission still works in both languages and shows the translated success message.
- Reduced-motion preference disables the toggle's animation.

## Out of scope (future)

- Browser-language auto-detect on first visit.
- Additional languages.
- URL-based routing per locale.
- Translation-key linter/CI check.
