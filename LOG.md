## 2025-11-07

**Added "Film Filtrati" template**
- New template for filtering movies/series by streaming platform + IMDb rating
- Build verified

**Template system migrated to YAML**
- Created `src/data/templates.yaml` for default templates (Semplice, Formale, Breve)
- Installed js-yaml dependency for parsing YAML at build-time
- Updated `src/lib/templates.js` to load default templates from YAML
- Two-tier system: YAML defaults + localStorage custom templates
- Updated documentation (README, openspec/project.md) with YAML patterns
- Build verified, all templates loading correctly from YAML source
