# Why ShareForge?

Il web è pieno di rumore. Popup, pubblicità, titoli sensazionalisti, articoli con mille premesse vuote senza arrivare al nocciolo. La cosa che vogliamo veramente è scoprire il contenuto, valorizzarlo, approfondirlo.

Oggi Android Share porta direttamente l'URL su un modello linguistico (ChatGPT, Claude, Gemini...). Ma poi? Devi scrivere il *prompt*, le "istruzioni". Come ad esempio: "Fai una sintesi che mi aiuti ...", "Crea un messaggio per la chat ...", "Analizza i punti critici ...". Sono compiti base e spesso ripetitivi.

In alcuni casi si riceve l'output in inglese.

E in altri puoi mettere soltanto l'URL senza aggiungere altro testo.

**ShareForge** helps you overcome these problems: select the template you need (summary, analysis, social post, critical questions...), click, and the content is ready with the right instructions to be analyzed by AI and return what you need.

It's not a reading app. It's the bridge between discovery and action.

## Architectural Choices

ShareForge is deliberately simple: un'applicazione web statica, senza backend, senza database, senza server. Solo tecnologie client (HTML, CSS, JavaScript) e hosting gratuito su GitHub Pages.

Questa scelta limita cosa può fare l'app — niente chiamate API complesse, niente elaborazioni server-side, niente autenticazione centralizzata — ma offre vantaggi fondamentali:

- **Costi zero**: hosting, manutenzione, infrastruttura
- **Manutenzione minima**: nessun server da aggiornare, nessun database da gestire
- **Velocità**: deploy istantaneo, nessuna latenza backend
- **Privacy**: nessun dato trasmesso a server terzi, tutto resta sul dispositivo
- **Affidabilità**: funziona offline dopo il primo caricamento (PWA)

Le limitazioni diventano vincoli creativi. Non possiamo fare tutto, ma quello che facciamo è sostenibile nel lungo termine.

## Why No LLM Integration

ShareForge doesn't directly integrate any language model. Non c'è chiamata API a ChatGPT, Claude o Gemini. Perché?

Tutti abbiamo già un client LLM sul cellulare: app native, interfacce web, assistenti integrati. Invece di reinventare la ruota e costruire l'ennesimo wrapper attorno a un'API, **ShareForge genera il prompt e lo condivide** con qualsiasi app tu stia già usando.

Vantaggi concreti:

- **Libertà di scelta**: usi il modello che preferisci, senza vincoli
- **Zero costi per l'utente**: nessun abbonamento, nessun token da pagare tramite l'app
- **Zero costi di gestione**: non devo sostenere le spese API degli utenti, né implementare rate limiting, gestione crediti, autenticazione
- **Flessibilità totale**: puoi condividere il prompt con ChatGPT, Claude, Gemini, Perplexity, un client locale, o qualsiasi altro strumento installato sul tuo dispositivo
- **Meno codice**: nessuna logica di integrazione API, retry, error handling, token management

ShareForge does one thing well: **transforms links into ready-to-use prompts**. Everything else is delegated to tools that already exist and already work.

## Why Android-First (Desktop Limitations)

ShareForge is designed **primarily for Android**. The seamless "share to ShareForge from any app" experience that makes the app valuable is technically impossible to replicate on desktop platforms.

**Why it works on Android:**

- Android has a universal Share system built into the OS
- PWAs can register as Share Targets via Web Share Target API
- Any app can share content to ShareForge with a single tap

**Why it doesn't work on desktop:**

- Windows, macOS, and Linux lack a universal sharing system
- Desktop browsers support Web Share API only "outbound" (sharing FROM a web app), not "inbound" (receiving shared content)
- Desktop PWAs cannot register as share targets
- Each desktop app handles sharing in proprietary ways

**Current approach:**

- **Mobile users**: Native share integration via Share Target API (the core experience)
- **Desktop users**: Bookmarklet for one-click URL capture + manual template selection and copy-paste
- **Fallback**: Manual copy-paste workflow with clear instructions via modal and QR code for mobile installation

**Desktop bookmarklet solution:**

While native share integration is impossible on desktop, the **bookmarklet** provides a pragmatic workaround:

- **What it is**: A JavaScript snippet saved as a browser bookmark
- **How it works**: Clicking the bookmarklet captures the current page's `document.title` and `window.location.href` and opens ShareForge in a new tab with pre-filled fields
- **Installation**: Drag-and-drop a link to the bookmark bar (see [/desktop](https://aborruso.github.io/in_due_tocchi/desktop) guide)
- **Limitations**: No persistent storage, no background tasks, no native UI integration—but sufficient for the use case (capture URL + title, apply template, copy prompt)
- **Why not a browser extension?**: Bookmarklets require zero installation, zero maintenance, no per-browser packaging, and align with the project's static/zero-cost philosophy

This isn't a limitation of ShareForge—it's a fundamental platform constraint. The value proposition (eliminate repetitive prompt writing via native OS integration) only exists where native OS integration is possible. The bookmarklet bridges the gap for desktop users while maintaining the zero-cost, zero-dependency architecture.
