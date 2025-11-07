# Fix per l'Aggiornamento della PWA su Smartphone

## Problema
Dopo ogni aggiornamento e pubblicazione su GitHub, l'app su smartphone non si aggiornava perché il Service Worker continuava a servire la versione vecchia dalla cache.

## Soluzione Implementata

### 1. Cache Dinamico con Versioning
Il Service Worker ora usa un nome cache dinamico che cambia ad ogni build:
```javascript
const CACHE_VERSION = '20251107-2050';  // Aggiornato automaticamente
const CACHE_NAME = `riformula-v${CACHE_VERSION}`;
```

### 2. Script Automatico di Aggiornamento
Lo script `update-cache-version.js` aggiorna automaticamente la versione della cache con timestamp prima di ogni build.

### 3. Notifica di Aggiornamento
Quando una nuova versione è disponibile, l'app mostra un banner in alto con il pulsante "Aggiorna ora" che ricarica l'app.

### 4. Controllo Periodico degli Aggiornamenti
Il Service Worker controlla automaticamente ogni 5 minuti se ci sono nuove versioni disponibili.

## Come Funziona

1. **Durante il Build**:
   - Lo script `prebuild` esegue automaticamente `update-cache-version.js`
   - Il timestamp corrente viene inserito nel Service Worker
   - Il build procede con la nuova versione cache

2. **Quando l'Utente Visita l'App**:
   - Il browser scarica il nuovo Service Worker
   - Il nuovo SW installa la nuova cache
   - Quando si attiva, cancella le vecchie cache
   - Invia un messaggio "SW_UPDATED" all'app
   - L'app mostra il banner di aggiornamento

3. **L'Utente Aggiorna**:
   - Clicca su "Aggiorna ora"
   - L'app si ricarica
   - La nuova versione è attiva

## Uso

### Build Normale
```bash
npm run build
```
Lo script `prebuild` aggiornerà automaticamente la versione della cache.

### Aggiornamento Manuale della Cache
Se necessario, puoi aggiornare manualmente la versione:
```bash
node update-cache-version.js
```

## Testing

1. Fai una build e pubblica su GitHub Pages
2. Apri l'app su smartphone
3. Fai una modifica al codice
4. Fai una nuova build e pubblica
5. Riapri l'app su smartphone
6. Dovresti vedere il banner "Nuova versione disponibile!"
7. Clicca "Aggiorna ora"
8. L'app si ricarica con la nuova versione

## Note Tecniche

- **Cache Busting**: Ogni build ha un timestamp unico nel formato `YYYYMMDD-HHmm`
- **Skip Waiting**: Il nuovo SW si attiva immediatamente
- **Clients Claim**: Il nuovo SW prende controllo di tutte le pagine aperte
- **Update Check**: Controlla aggiornamenti ogni 5 minuti
- **Old Cache Cleanup**: Le vecchie cache vengono eliminate automaticamente

## File Modificati

- `public/sw.js` - Service Worker con versioning dinamico
- `src/pages/index.astro` - Aggiunto banner di aggiornamento e listener
- `update-cache-version.js` - Script di aggiornamento automatico della versione
- `package.json` - Aggiunto script `prebuild`
