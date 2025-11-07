# PRD: Riformula

## Visione
Riformula è una web app installabile (PWA) pensata per chi condivide spesso link da app diverse (browser, social, news) e vuole trasformare rapidamente quell’URL in un messaggio curato secondo un template. L’app
- riceve automaticamente titolo, testo e URL tramite la funzione di Condivisione di Android,
- permette di scegliere un template personalizzabile,
- genera un testo compiuto,
- consente di ricondividerlo verso qualsiasi app.

L’obiettivo è **ridurre il tempo tra "condividi link" e "testo pronto da inviare"** a meno di 5 secondi.

## Obiettivi
- Consentire all’utente di **comporre testi coerenti** e leggibili partendo da contenuti condivisi.
- Permettere la **personalizzazione dei template**, mantenendoli salvati localmente.
- Offrire un flusso di **condivisione → riformulazione → ricondivisione** semplice e veloce.
- Funzionare **offline dopo il primo caricamento**, essendo una PWA.
- Essere **leggera** (caricamento rapido, nessun backend).

## Utenti Target
- Giornalisti, content creator, ricercatori, attivisti.
- Chi condivide articoli e post per creare sintesi o commenti.
- Utenti che vogliono messaggi coerenti senza riscrivere ogni volta.

## Contesto d’Uso
1. L’utente legge un contenuto in un’app.
2. Tappa “Condividi”.
3. Sceglie **Riformula** come destinazione.
4. L’app si apre già con *titolo*, *testo* e *URL* precompilati.
5. L’utente sceglie un template.
6. L’app genera il testo.
7. L’utente lo **condivide verso Telegram, WhatsApp, Mastodon, Email…**

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

