# Valutazione ShareForge

_Aggiornamento del 13 novembre 2025_

## 1. Sintesi

ShareForge resta un PWA static-first ben documentato e distribuibile (la build `npm run build` passa senza errori). Il valore differenziante è nel ponte tra la condivisione Android e la generazione di prompt tramite template YAML precompilati. Tuttavia l’assenza totale di testing, la logica UI concentrata in un unico script inline e una strategia offline parziale rischiano di rallentare qualsiasi evoluzione futura. Questo documento riepiloga lo stato attuale e mette in fila le azioni prioritarie per preservare la qualità del progetto.

## 2. Stato attuale del progetto

- **Documentazione**: `README.md` spiega bene il problema e il flusso, `LOG.md` traccia ogni iterazione, `openspec/` dà il processo di change management.
- **Codice**: template caricati da `src/data/templates.yaml` a build-time dentro `src/pages/index.astro`; componenti UI separati in `src/components`, logica condivisa in `src/lib/`.
- **Build/Deploy**: script `npm run build` lancia `update-cache-version.js` e poi `astro build`, producendo output statico per GitHub Pages.
- **PWA**: `public/manifest.webmanifest` definisce Share Target GET e icone; `public/sw.js` gestisce cache versionata manualmente.

## 3. Punti di forza

1. **Narrazione e onboarding** – Il README e le landing (desktop/mobile) comunicano in modo chiaro la value proposition e riducono lo sforzo di chi contribuisce.
2. **Change log disciplinato** – `LOG.md` mantiene memoria delle decisioni, utile per regressioni e audit.
3. **Architettura coerente con il target** – Static SSR con Astro, niente backend, ottimo per GitHub Pages e per l’uso offline su Android.
4. **Template system semplice ma efficace** – YAML con flag `active`, placeholders `{title,text,url}` e drag & drop persistito in `localStorage` coprono i casi principali.
5. **UX mobile curata** – Share Target, barra sticky per share/copy, device modal e bookmarklet desktop offrono un percorso pulito tra discovery e azione.

## 4. Punti critici

1. **Testing assente** – Non esiste lint, type-check, unit o E2E test. Ogni refactor è potenzialmente regressivo.
2. **Script monolitico in `index.astro`** – Oltre 800 righe di JS inline gestiscono stato, i18n, drag-and-drop, share e menu. Difficile da testare, versionare e riusare.
3. **YAML non validato** – `src/data/templates.yaml` accetta qualsiasi formato: basta un refuso per rompere la UI senza errori in build.
4. **Cache offline limitata** – Il service worker pre-cacha solo `/in_due_tocchi/` e il manifest; tutte le altre risorse (JS, CSS, video) dipendono da cache lazy → utenti offline ricevono spesso “Offline - content not available”.
5. **Branding incompleto** – `shareText()` usa ancora il titolo "Riformula", quindi Android mostra il vecchio nome nello sheet di condivisione.
6. **Automazione cache rumorosa** – `update-cache-version.js` sovrascrive `public/sw.js` ad ogni build, sporcando la working tree e creando merge conflict potenziali.

## 5. Roadmap consigliata

### Brevissimo termine (entro 2 settimane)

1. **Introdurre verifiche automatiche**
   - Aggiungere `npm run lint` (ESLint base Astro) e `npm run check` (es. `astro check` o `tsc --noEmit`).
   - Integrare Vitest per unit test di `src/lib/share.js`, `src/lib/templates.js` e `src/lib/i18n.js`.
2. **Validare i template**
   - Definire uno schema JSON (campi obbligatori, lunghezze massime, placeholder richiesti) e validarlo a build-time con Ajv.
3. **Correggere il brand nello share**
   - Aggiornare il default title di `shareText()` da "Riformula" a "ShareForge" e testare su un dispositivo Android reale.

### Breve termine (entro 1 mese)

4. **Estrarre la logica UI in moduli**
   - Spostare lo script inline di `index.astro` in moduli ES (`src/scripts/`) o componenti Astro/Islands per poterli testare e riusare.
   - Introdurre una gestione stato più chiara (es. Preact Signals) per `currentTemplate`, `currentData`, feedback, i18n.
5. **Rafforzare l’offline**
   - Generare automaticamente la lista di asset (via manifest Vite) e precache nel service worker o adottare Workbox precache.
   - Aggiungere fallback offline per pagine secondarie e per i video.
6. **Automatizzare il cache versioning senza modificare i sorgenti**
   - Passare `CACHE_VERSION` come variabile d’ambiente o generare il service worker nel passo di build per non toccare `public/sw.js`.

### Medio termine (entro 3 mesi)

7. **Potenziare il template engine**
   - Valutare Handlebars/Nunjucks o funzioni custom per supportare condizioni, cicli e filtri.
8. **Copertura E2E**
   - Aggiungere Playwright/Cypress per il flusso Share Target + share/copy + drag-&-drop.
9. **Metriche e osservabilità**
   - Integrare Sentry o Plausible per capire uso dei template, errori JS e share success rate.

## 6. Conclusione

ShareForge è solido per lo scope corrente ma ha raggiunto il limite naturale del “solo build + deploy”. Prima di aggiungere altre feature conviene investire in fondazioni tecniche (testing, modularità, offline affidabile). Una settimana di debito tecnico dedicato sbloccherebbe la roadmap successiva senza compromettere la qualità.
