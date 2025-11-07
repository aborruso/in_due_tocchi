## 2025-11-07

**Updated Film template**
- Aggiunto ordinamento decrescente per voto IMDb
- Precisato filtro esclusivo per Amazon Prime Video e Netflix
- Migliorata chiarezza istruzioni per AI

**Added device warning modal**
- Modale informativa per utenti non Android/mobile
- Avvisa che l'app è ottimizzata per dispositivi mobili
- Modale chiudibile con persistenza localStorage

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
