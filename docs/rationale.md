# Perché Riformula?

Il web è pieno di rumore. Popup, pubblicità, titoli sensazionalisti, articoli con mille premesse vuote senza arrivare al nocciolo. La cosa che vogliamo veramente è scoprire il contenuto, valorizzarlo, approfondirlo.

Oggi Android Share porta direttamente l'URL su un modello linguistico (ChatGPT, Claude, Gemini...). Ma poi? Devi scrivere il *prompt*, le "istruzioni". Come ad esempio: "Fai una sintesi che mi aiuti ...", "Crea un messaggio per la chat ...", "Analizza i punti critici ...". Sono compiti base e spesso ripetitivi.

In alcuni casi si riceve l'output in inglese.

E in altri puoi mettere soltanto l'URL senza aggiungere altro testo.

**Riformula** ti aiuta a superare questi problemi: selezioni il template che ti serve (riassunto, analisi, post social, domande critiche...), clicchi, e il contenuto è già pronto con le istruzioni giuste per essere analizzato dall'AI e restituirti quello che ti serve.

Non è un'app per leggere. È il ponte tra scoperta e azione.

## Scelte architetturali

Riformula è volutamente semplice: un'applicazione web statica, senza backend, senza database, senza server. Solo tecnologie client (HTML, CSS, JavaScript) e hosting gratuito su GitHub Pages.

Questa scelta limita cosa può fare l'app — niente chiamate API complesse, niente elaborazioni server-side, niente autenticazione centralizzata — ma offre vantaggi fondamentali:

- **Costi zero**: hosting, manutenzione, infrastruttura
- **Manutenzione minima**: nessun server da aggiornare, nessun database da gestire
- **Velocità**: deploy istantaneo, nessuna latenza backend
- **Privacy**: nessun dato trasmesso a server terzi, tutto resta sul dispositivo
- **Affidabilità**: funziona offline dopo il primo caricamento (PWA)

Le limitazioni diventano vincoli creativi. Non possiamo fare tutto, ma quello che facciamo è sostenibile nel lungo termine.

## Perché nessuna integrazione LLM

Riformula non integra direttamente nessun modello linguistico. Non c'è chiamata API a ChatGPT, Claude o Gemini. Perché?

Tutti abbiamo già un client LLM sul cellulare: app native, interfacce web, assistenti integrati. Invece di reinventare la ruota e costruire l'ennesimo wrapper attorno a un'API, **Riformula genera il prompt e lo condivide** con qualsiasi app tu stia già usando.

Vantaggi concreti:

- **Libertà di scelta**: usi il modello che preferisci, senza vincoli
- **Zero costi per l'utente**: nessun abbonamento, nessun token da pagare tramite l'app
- **Zero costi di gestione**: non devo sostenere le spese API degli utenti, né implementare rate limiting, gestione crediti, autenticazione
- **Flessibilità totale**: puoi condividere il prompt con ChatGPT, Claude, Gemini, Perplexity, un client locale, o qualsiasi altro strumento installato sul tuo dispositivo
- **Meno codice**: nessuna logica di integrazione API, retry, error handling, token management

Riformula fa una cosa sola, e la fa bene: **trasforma link in prompt pronti all'uso**. Il resto lo deleghiamo agli strumenti che già esistono e già funzionano.
