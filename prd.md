# PRD: Riformula

## Visione
Riformula è una web app installabile (PWA) che **trasforma contenuti web in prompt strutturati per LLM** con un flusso di due share. L'utente legge un articolo, lo condivide, sceglie il template (che riformula il contenuto in base al contesto), e lo ricondivide direttamente verso ChatGPT/Claude/Ollama/etc per ottenere risposte intelligenti.

L'app
- riceve automaticamente titolo, testo e URL tramite la funzione di Condivisione di Android,
- permette di scegliere un template personalizzabile (specifico per ogni tipo di analisi),
- genera un prompt strutturato ottimizzato per l'LLM,
- consente di ricondividerlo via share intent verso qualsiasi app LLM.

L'obiettivo è **ridurre il tempo tra "leggo qualcosa" e "chiedo all'LLM"** a meno di 5 secondi, eliminando copia-incolla manuale.

## Obiettivi
- Consentire all’utente di **comporre testi coerenti** e leggibili partendo da contenuti condivisi.
- Permettere la **personalizzazione dei template**, mantenendoli salvati localmente.
- Offrire un flusso di **condivisione → riformulazione → ricondivisione** semplice e veloce.
- Funzionare **offline dopo il primo caricamento**, essendo una PWA.
- Essere **leggera** (caricamento rapido, nessun backend).

## Utenti Target
- **Power user di LLM** (giornalisti, ricercatori, analyst, developer).
- Chi legge continuamente e vuole **chiedere all'AI** per riassunti, analisi, idee.
- Utenti che vogliono **prompt coerenti** senza riscrivere ogni volta.
- Chi vuole flusso **reading → AI analysis → risposta** senza copia-incolla né context-switching.

## Contesto d'Uso

**Flusso di due share (da articolo a LLM)**

1. L'utente **legge** un articolo/news/post in un browser o app lettore.
2. Tappa **Condividi**.
3. Sceglie **Riformula** come destinazione. ← *primo share*
4. L'app si apre già con *titolo*, *testo* e *URL* precompilati.
5. L'utente **sceglie un template** adatto al tipo di analisi (es: "Riassumi", "Analizza film", "Estrai domande").
6. L'app **genera il prompt strutturato**.
7. L'utente tappa **Condividi** di nuovo.
8. Sceglie un'app LLM (ChatGPT, Claude, Ollama, browser con AI, etc). ← *secondo share*
9. **Riceve la risposta** senza mai lasciare il flusso di lettura.

**Alternativa**: copia negli appunti se il flusso share non è disponibile per l'LLM specifico.

## Requisiti Funzionali
1. **Ricezione di dati da Condividi**
   - Supporto Web Share Target.
   - Parametri supportati: `title`, `text`, `url`.

2. **Gestione Template**
   - Lista template visualizzabile da Select.
   - Template salvati in `localStorage`.
   - Segnaposto supportati: `{title}`, `{text}`, `{url}`.
   - CRUD template:
     - Crea
     - Modifica
     - Elimina

3. **Generazione Testo**
   - Sostituzione dei segnaposto.
   - Opzione: “Aggiungi URL in coda” (default: attiva).
   - Preview istantanea.

4. **Condivisione in uscita**
   - Preferenza Web Share API.
   - Fallback copia in clipboard.

5. **PWA**
   - `manifest.webmanifest` + `service worker`.
   - Offline-first.
   - Installabile da Chrome su Android.

## Requisiti Non Funzionali
- **Nessun backend**: solo file statici.
- **Compatibilità**: Chrome/Android ≥ 12.
- **Performance**: caricamento sotto 200 ms al secondo avvio.
- **Localizzazione**: interfaccia in italiano.

## Stack Tecnico
- **Astro** per struttura progetto e build.
- **Tailwind CSS** per layout e stile.
- Service Worker manuale o plugin Astro.
- Nessuna dipendenza complessa.

### Struttura Progetto (indicativa)
```
project/
  src/
    pages/
      index.astro
    components/
      TemplateSelect.astro
      TextPreview.astro
      ShareButtons.astro
    lib/
      templates.js
      share.js
  public/
    manifest.webmanifest
    sw.js
    icons/
```

## Design UI
- **Stile minimale**, leggibile.
- Layout a schede (come nella versione prototipo).
- Spaziatura ampia, bordi arrotondati.

Sezioni principali:
1. Selettore Template + gestione
2. Area testo generato
3. Area dati in ingresso
4. Pulsanti condivisione

## User Stories
- *Come utente*, quando condivido un link, voglio che l’app precompili i campi così non devo copiarli a mano.
- *Come utente*, voglio creare template personalizzati così posso controllare tono e struttura.
- *Come utente*, quando genero il testo, voglio condividerlo in due tocchi.

## Roadmap
| Fase | Funzioni | Durata |
|---|---|---|
| MVP | Share Target + Template base + PWA | 2 giorni |
| V1 | Editor template UI + condivisione + offline stabile | 3–5 giorni |
| V1.1 | Sincronizzazione template via file export/import | 1 giorno |
| V2 | Template «intelligenti» con suggerimenti automatici | TBD |

## Metriche di Successo
- Tempo mediano da “Condividi” a “Testo inviato” < **5 secondi**.
- Numero medio di template creati per utente ≥ 3.
- Aperture via “Condividi” ≥ 80% degli accessi.

---
**Fine PRD**

