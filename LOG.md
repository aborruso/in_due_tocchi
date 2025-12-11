## 2025-12-11

**Fixed Italian translations: removed title case, improved wording (IT/EN)**
- Removed all title case from Italian translations (sentence case is correct in Italian)
- Examples: "Testo Generato" → "Testo generato", "Prepara il Contesto" → "Prepara il contesto"
- Changed benefit title: "Subito, Offline" → "Pronto in un tap" (IT), "Instant, Offline" → "Ready in a Tap" (EN)
- Changed benefit title: "Invia al miglior LLM" → "Invia all'LLM giusto" (IT), "Send to the Best LLM" → "Send to the Right LLM" (EN)
- Updated benefit text: removed misleading "zero connessione" claim, clarified app has no backend but needs connection for LLM
- Updated benefit text: "modello migliore" → "modello più adatto" (IT), "best model" → "most suitable model" (EN)
- Removed hardcoded "11" from template count: "11 template" → "Template" (both IT/EN)
- Changes in src/lib/translations.js (both IT and EN sections)

## 2025-11-10

**Added heading anchor links with copy, scroll, and URL update**
- Anchor link icons (🔗) appear on hover for h2/h3 headings with IDs
- Click behavior: copies URL with fragment to clipboard + updates browser URL + scrolls to heading
- Visual feedback: icon changes to checkmark (✓) for 1.5s after successful copy
- Implemented in desktop.astro and mobile.astro guide pages
- Uses history.replaceState() to update URL without page reload
- Smooth scroll animation with scrollIntoView({ behavior: 'smooth', block: 'start' })
- Accessibility: aria-label "Copia link a questa sezione" for screen readers
- OpenSpec proposal: `add-heading-anchor-links` (validated, completed)

**Added desktop bookmarklet for one-click URL capture**
- Created `/desktop` page with drag-and-drop bookmarklet installation guide
- Bookmarklet captures `document.title` and `window.location.href` from any webpage
- Opens ShareForge in new tab with pre-filled title and URL parameters
- Two installation methods: drag & drop to bookmark bar, or manual copy-paste
- Updated desktop device modal with link to `/desktop` guide page
- Documented desktop workaround in README.md and docs/rationale.md
- Bookmarklet code syntax validated and tested with Node.js
- Fallback to manual method emphasized as more reliable cross-browser
- OpenSpec proposal: `add-bookmarklet-desktop-share` (validated, completed)

## 2025-11-09

**Updated PWA icon: link emoji with gradient background**
- Replaced "R" placeholder with 🔗 emoji (clearer brand identity)
- Gradient background: blue→purple (tech/AI aesthetic)
- Generated 8 PNG sizes (72-512px) + favicon.svg
- Flat/Material style for optimal readability at all sizes

**Added video guides to mobile landing page**
- Integrated installation video (installa.mp4/webm, 107s) in PWA Installation Guide section
- Integrated usage demo video (uso.mp4/webm, 93s) in Demo Section
- Optimized videos: WebM VP9 (primary) + H.264 MP4 fallback for Safari/iOS
- Target bitrate 450 kbps for mobile, file sizes <10MB each (WebM)
- Generated poster images (<62KB JPG) for instant preview
- No autoplay, user-initiated playback only, lazy loading
- Total dist size: 31MB (videos not cached by SW, loaded on demand)
- OpenSpec proposal: `add-video-guides` (validated, completed)

**BREAKING: Project renamed from Riformula to ShareForge**
- Updated all branding: package.json, manifest, translations (IT/EN)
- Updated cache name: `shareforge-v*` (replaces `riformula-v*`)
- Updated localStorage keys: `shareforge-template-order`, `shareforge-language`
- Updated all documentation: README, CLAUDE.md, rationale, evoluzioni
- Name works in both IT/EN, evokes transformation/forge concept
- No breaking changes for users: localStorage migration handled automatically

**Implemented template drag-and-drop with localStorage persistence**
- Aggiunto drag-and-drop per riordinare template nella griglia principale
- Ordine personalizzato salvato in localStorage (chiave: `shareforge-template-order`)
- Visual feedback minimal: opacità 0.5 durante drag
- Bottone reset (↺) ripristina ordine originale da YAML
- Persistenza survives reload e disattivazione PWA
- Validazione ordine: fallback automatico se localStorage corrotto
- Test completato: drag, persistenza, reset funzionano correttamente

## 2025-11-08

**Fixed UI layout: sticky bottom bar for share buttons**
- Ridotto header: da py-8/text-4xl a py-4/text-3xl
- Pulsanti Condividi/Copia spostati in barra sticky fixed in basso
- Body con padding-bottom per evitare overlap con sticky bar
- Pulsanti sempre visibili durante scroll - nessun scroll necessario per azione principale
- Risolti bug e-target null checks in event listeners
- Console clean, nessun errore

**Added "Comprendi e Apprendi" template (🧠)**
- Nuovo template per analisi approfondita di qualsiasi contenuto web
- Strutturato in 7 sezioni: sintesi esecutiva, concetti, terminologia, contesto, implicazioni, collegamenti, domande
- Ottimizzato per apprendimento profondo (20+ minuti) con output sempre in italiano
- Attivo subito, pronto per testing con vari tipi di contenuti

**Added mobile landing page + redesigned desktop warning**
- Creata pagina landing `/mobile` elegante e professionale (design magazine-style)
- Modale desktop riscritta: tono diretto, emoji 📱, link a landing page
- Landing page contiene: hero, 4 benefici chiave, demo placeholder, guida PWA con 4 step numerati
- Guida PWA visibile come sezione principale (non collassata) con design elegante
- CTA primario "Scopri come usarla 📲" collegato a `/mobile`
- Build completato, pronto per deployment

## 2025-11-07

**Added 3 new templates + refactored docs for LLM-focused positioning**
- Aggiunti template: SEO Brief, Thread Twitter, Fact-Check (tutti attivi)
- README riscritto: flusso di due share (articolo → Riformula → LLM)
- Enfatizzato valore core: "smart preprocessor per prompt strutturati"
- PRD aggiornato: contesto d'uso, utenti target, visione allineati a "reading → AI analysis"

**Fixed PWA update mechanism for smartphones**
- Implementato cache versioning dinamico basato su timestamp
- Creato script automatico `update-cache-version.js` che aggiorna la versione cache ad ogni build
- Aggiunto banner di notifica "Nuova versione disponibile" con pulsante reload
- Service Worker ora controlla aggiornamenti ogni 5 minuti
- Risolto problema di app non aggiornata dopo push su GitHub
- Vedi `APP_UPDATE_FIX.md` per dettagli tecnici completi

**Updated Film template**
- Aggiunto ordinamento decrescente per voto IMDb
- Precisato filtro esclusivo per Amazon Prime Video e Netflix
- Migliorata chiarezza istruzioni per AI

**Added device warning modal**
- Modale informativa per utenti non Android/mobile
- Avvisa che l'app è ottimizzata per dispositivi mobili
- Modale chiudibile con persistenza localStorage
- Rilevamento automatico dispositivo via user agent

**Rewritten Telegram template**
- Riscritto per analizzare contenuto URL invece di testo fornito
- Sintesi italiana ottimizzata per condivisione Telegram
- Mantenuto formato markdown con emoji e grassetto

**Added template active flag**
- Campo `active` booleano aggiunto allo schema YAML dei template
- Possibilità di abilitare/disabilitare template senza rimuoverli dal codice
- Filtraggio automatico dei template attivi durante il caricamento

**Added "Telegram" template**
- Nuovo template per creare riassunti italiani ottimizzati per condivisione su gruppi Telegram
- Utilizza formattazione markdown e emoji per migliore engagement
- Sintetizza contenuti invece di tradurli direttamente

**Refactor: template completamente staticizzati (come pa_mi_senti)**
- Rimosso localStorage per template
- Template caricati da YAML a build-time con `define:vars`
- Template inline nell'HTML, zero sync issues
- Rimosse funzionalità gestione custom template (nuovo/modifica/elimina/import/export)
- Template ora read-only dal file `src/data/templates.yaml`
- Fix definitivo per Android PWA: reload garantisce sempre template aggiornati
- Ridotto bundle JS (-200 righe codice)

**Added "Film" template**
- Nuovo template per filtrare film/serie per piattaforma streaming + voto IMDb

**Template system migrated to YAML**
- Creato `src/data/templates.yaml` per template di default
- Installato js-yaml per parsing YAML a build-time
- Pattern simile a pa_mi_senti: YAML → build → static HTML
