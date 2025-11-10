# Change: Aggiungi icone anchor link ai titoli nelle guide

## Why

Nelle pagine guida (desktop.astro, mobile.astro) i titoli con ID hanno ancore HTML ma non c'è modo visivo per l'utente di copiarli facilmente. Aggiungere icone hyperlink al hover sui titoli migliora l'accessibilità e permette di condividere facilmente sezioni specifiche delle guide.

## What Changes

- Aggiunge icona link (🔗 o SVG) visibile al hover sui titoli h2/h3 con ID
- Al click sull'icona, copia URL con anchor fragment negli appunti
- Feedback visivo dopo copy (es. checkmark temporaneo)
- Implementazione JavaScript inline nelle pagine guide
- Styling Tailwind per icona e animazioni hover

## Impact

- Affected specs: ui-layout
- Affected code: src/pages/desktop.astro, src/pages/mobile.astro
- Zero breaking changes
- Migliora UX per condivisione link diretti a sezioni
