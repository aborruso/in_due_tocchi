# Change: Add Release Notes Modal

## Why
ShareForge si aggiorna automaticamente quando viene pubblicata una nuova versione, ma l'utente non riceve alcun contesto sulle novità introdotte. Questo rende difficile comunicare micro miglioramenti o nuovi template e riduce il valore percepito degli aggiornamenti.

## What Changes
- Introdurre un file YAML con le comunicazioni di release (id, versione, titolo e testo markdown)
- Caricare e convertire tali contenuti in HTML durante il build per mostrarli lato client
- Mostrare una modale "Novità" dopo l'aggiornamento quando l'utente non ha ancora visto quella versione
- Salvare in localStorage l'ultima versione vista per non riproporre la stessa modale

## Impact
- Affected specs: ui-layout (nuovo requisito per la modale delle release)
- Affected code: src/pages/index.astro, src/data/release-notes.yaml, src/lib/translations.js, eventuali asset Tailwind/JS di supporto
