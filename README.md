# Riformula

**Riformula** è una Progressive Web App (PWA) che trasforma link in testo curato da inviare direttamente a un LLM (ChatGPT, Claude, etc.). Scegli il template, condividi. Due tocchi, zero copia-incolla.

## Caratteristiche

- ✅ **Web Share Target**: Riceve contenuti condivisi da altre app Android
- ✅ **Template personalizzabili**: Crea, modifica ed elimina template con segnaposto `{title}`, `{text}`, `{url}`
- ✅ **Drag-and-drop**: Riordina i template via trascinamento, ordine salvato in localStorage
- ✅ **Offline-first**: Funziona completamente offline dopo il primo caricamento
- ✅ **Condivisione rapida**: Usa Web Share API o copia negli appunti
- ✅ **Leggera e veloce**: Nessun backend, solo file statici

## Stack Tecnologico

- **Astro** - Framework per build statico
- **Tailwind CSS** - Styling
- **js-yaml** - Parser YAML per template di default
- **Service Worker** - Cache offline
- **LocalStorage** - Salvataggio template personalizzati

## Installazione e Sviluppo

### Prerequisiti

- Node.js 18+ e npm

### Setup

```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build
npm run preview
```

## Come Funziona

Il flusso è in **due share**:

```
[Leggi articolo/post]
    ↓ share (Android)
[Riformula + scegli template]
    ↓ share (Android)
[LLM: ChatGPT, Claude, Ollama, etc]
    ↓
[Risposta strutturata]
```

### 1. Condivisione in Ingresso (dal lettore)

L'app è configurata come **Share Target** nel file `manifest.webmanifest`. Quando condividi un link da un'altra app Android e selezioni "Riformula":

1. L'app si apre con i parametri URL: `?title=...&text=...&url=...`
2. I dati vengono estratti e popolati nei campi
3. Scegli il template adatto (es: "Analizza film", "Riassumi articolo", "Crea domanda")

### 2. Template

I template sono la **chiave del valore**: trasformano il contenuto grezzo in un prompt strutturato per l'LLM.

I template supportano tre segnaposto:
- `{title}` - Titolo del contenuto condiviso
- `{text}` - Testo o descrizione
- `{url}` - URL del contenuto

**Template di default**: Gestiti tramite file YAML (`src/data/templates.yaml`), facili da manutenere e versionare nel codice.

**Template personalizzati**: Creati e modificati via UI, salvati in `localStorage` per persistenza locale.

Esempio di template per film:
```
Analismi questo film:

Titolo: {title}

Trama/Descrizione: {text}

Ulteriori info: {url}

Mi piacerebbe sapere:
- Genere principale e sottogeneri
- Pubblico consigliato
- Trama breve
- Giudizio critico
```

#### Gestione Template YAML

Modifica template di default in `src/data/templates.yaml`:

```yaml
- id: mio-template
  name: Nome Template
  template: |
    {title}

    {text}

    {url}
```

I template custom creati dall'utente tramite UI rimangono in localStorage e vengono mostrati assieme ai template di default.

### 3. Condivisione in Uscita (verso LLM)

Il testo riformulato viene ricondiviso verso qualsiasi app LLM installata:

- **Web Share API**: Condividi verso ChatGPT app, Claude app, browser con LLM, Ollama locale, etc.
- **Clipboard Fallback**: Se Web Share non è disponibile, copia negli appunti per incollare manualmente

Zero copia-incolla nel flusso ideale: tutto passa via Android share intent.

## Struttura Progetto

```
project/
├── src/
│   ├── data/
│   │   └── templates.yaml       # Template di default in YAML
│   ├── pages/
│   │   └── index.astro          # Pagina principale
│   ├── components/
│   │   ├── TemplateSelect.astro # Gestione template
│   │   ├── TextPreview.astro    # Anteprima testo generato
│   │   └── ShareButtons.astro   # Pulsanti condivisione
│   └── lib/
│       ├── templates.js         # Logica template (CRUD)
│       └── share.js             # Web Share API e clipboard
├── public/
│   ├── manifest.webmanifest     # Manifest PWA
│   ├── sw.js                    # Service Worker
│   ├── favicon.svg              # Favicon
│   └── icons/                   # Icone PWA
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

## Deploy

L'app è statica e può essere deployata su qualsiasi hosting che supporti file statici:

- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Cloudflare Pages**

### Build

```bash
npm run build
```

Il contenuto della cartella `dist/` è pronto per il deploy.

### Requisiti per PWA e Share Target

Per funzionare come Share Target su Android, l'app deve:

1. ✅ Essere servita via HTTPS
2. ✅ Avere un `manifest.webmanifest` valido con `share_target`
3. ✅ Avere un Service Worker registrato
4. ✅ Essere installata dall'utente

## Testing

### Test locale

```bash
npm run build
npm run preview
```

Poi apri l'app su Chrome Android e:
1. Vai al menu → "Installa app"
2. Dopo l'installazione, prova a condividere un link da un'altra app
3. Seleziona "Riformula" dalla lista

### Debug

- Console del browser per errori JavaScript
- Chrome DevTools → Application → Manifest (verifica configurazione PWA)
- Chrome DevTools → Application → Service Workers (verifica cache)

## Licenza

MIT

## Roadmap

- [x] MVP: Share Target + Template base + PWA
- [ ] V1.1: Sincronizzazione template via file export/import
- [ ] V2: Template "intelligenti" con suggerimenti automatici
- [ ] V3: Statistiche d'uso

## Contribuire

Pull request e issue sono benvenute!
