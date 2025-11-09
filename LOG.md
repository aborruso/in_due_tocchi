## 2025-11-09

**Implemented template drag-and-drop with localStorage persistence**
- Aggiunto drag-and-drop per riordinare template nella griglia principale
- Ordine personalizzato salvato in localStorage (chiave: `riformula-template-order`)
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
