# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
pnpm dev          # Start development server on http://localhost:3000
pnpm build        # Build for production
pnpm serve        # Preview production build
```

### Code Quality

```bash
pnpm format       # Format code with Prettier
pnpm format:check # Check formatting without fixing
pnpm lint         # Run ESLint with autofix
pnpm lint:fix     # Same as pnpm lint
```

### Testing

```bash
pnpm test         # Run tests in watch mode
pnpm test:coverage # Run tests once with coverage report
```

### Map Data Generation

When modifying `src/data/places.json` (visited/planned locations), the GeoJSON data needs regeneration:

```bash
python3 generateMapOverlayGeoDataJson.py  # Manually generate filtered_provinces.geojson
```

Note: A pre-commit hook automatically runs this when places.json changes. Setup:

```bash
cp hooks/pre-commit .git/hooks/ && chmod +x .git/hooks/pre-commit
```

## Architecture

### Tech Stack

- **Framework**: SolidJS with Vite
- **Styling**: TailwindCSS v4 with CSS Modules
- **Routing**: @solidjs/router with language-aware routes
- **Maps**: Leaflet for interactive travel map
- **i18n**: @solid-primitives/i18n with 7 languages (EN, ES, DE, RU, SE, PT, JA)
- **Meta/SEO**: @solidjs/meta for dynamic meta tags

### Routing Structure

All routes support optional language prefix (`/:lang/path`):

- `/` or `/:lang` → Index page with terminal animation
- `/extra` or `/:lang/extra` → Extra content page
- `/links` or `/:lang/links` → Social/professional links
- `/map` or `/:lang/map` → Interactive travel map
- `*` → 404 page

### Key Architectural Patterns

#### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@layouts/` → `src/layouts/`
- `@i18n/` → `src/i18n/`
- `@data/` → `src/data/`
- `@styles/` → `src/styles/`
- `@utils/` → `src/utils/`

#### i18n System

- Language detection priority: URL → localStorage → browser → default (EN)
- Translations stored in `src/i18n/translations.ts`
- Global `useI18n()` hook provides `t()` translator and `language()` signal
- Components use `Ei18nToken` enum for type-safe translation keys

#### Theme System

- Dark/light theme support with system preference detection
- Theme stored in localStorage
- Applied via CSS custom properties and Tailwind dark mode class
- Initial theme applied in index.html to prevent flash

#### Map System

- Travel data stored in `src/data/places.json` (regions, provinces, planned)
- GeoJSON data in `src/data/filtered_provinces.geojson` (auto-generated)
- Map component lazy-loaded for performance
- OpenStreetMap tiles with Leaflet

#### Component Organization

- `components/ui/` - Reusable UI primitives
- `components/terminal/` - Terminal animation components
- `components/languages/` - Language display components
- `components/extraLinks/` - Social link components
- Page-level components in `src/pages/`

### Build Configuration

- Code splitting: Leaflet and SolidJS vendor bundles separated
- Production: Console logs automatically removed via Terser
- CSS Modules with camelCase convention
- Target: ESNext for modern browsers

### Security Headers

Production deployment includes security headers via `public/_headers`:

- CSP configured for fonts, maps, and external resources
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff

## Important Files

### Data Files

- `src/data/places.json` - Travel locations (triggers map regeneration on change)
- `src/data/terminalData.ts` - Terminal animation content
- `src/data/languagesData.ts` - Programming languages display data
- `src/data/booksData.ts` - Book recommendations
- `src/data/linksData.ts` - Social/professional links

### Configuration

- `vite.config.ts` - Build configuration with path aliases and optimizations
- `tsconfig.json` - TypeScript configuration with strict mode
- `index.html` - Entry point with theme initialization script

## Git Commit Guidelines

- Use conventional commits format: `type(scope): description`
- Use 50/72 rule
- Keep commit messages clean and focused on code changes only
- NEVER add co-authors, "Generated with" tags, or other metadata
- Use separate commits for different file types/purposes:
  - Scripts/automation: `feat:` or `fix:`
  - Documentation: `docs:`
  - Configuration: `fix:` or `refactor:`
- Focus on what changed and why, not who or how it was generated
