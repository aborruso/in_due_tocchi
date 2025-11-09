# ShareForge

**ShareForge** is a Progressive Web App (PWA) that transforms shared links into curated prompts for LLMs (ChatGPT, Claude, etc.). Pick a template, share. Two taps, zero copy-paste.

## Features

- ✅ **Web Share Target**: Receives shared content from other Android apps
- ✅ **Customizable templates**: Create, edit, and delete templates with `{title}`, `{text}`, `{url}` placeholders
- ✅ **Drag-and-drop**: Reorder templates via drag-and-drop, order saved in localStorage
- ✅ **Offline-first**: Works completely offline after first load
- ✅ **Quick sharing**: Uses Web Share API or clipboard fallback
- ✅ **Lightweight & fast**: No backend, just static files

## Tech Stack

- **Astro** - Static site framework
- **Tailwind CSS** - Styling
- **js-yaml** - YAML parser for default templates
- **Service Worker** - Offline cache
- **LocalStorage** - Custom template persistence

## Installation & Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## How It Works

The flow uses **two shares**:

```
[Read article/post]
    ↓ share (Android)
[ShareForge + pick template]
    ↓ share (Android)
[LLM: ChatGPT, Claude, Ollama, etc]
    ↓
[Structured response]
```

### 1. Inbound Sharing (from reader)

The app is configured as a **Share Target** in `manifest.webmanifest`. When you share a link from another Android app and select "ShareForge":

1. App opens with URL params: `?title=...&text=...&url=...`
2. Data is extracted and populated in fields
3. Pick the right template (e.g., "Analyze movie", "Summarize article", "Create question")

### 2. Templates

Templates are the **key value**: they transform raw content into a structured LLM prompt.

Templates support three placeholders:
- `{title}` - Shared content title
- `{text}` - Text or description
- `{url}` - Content URL

**Default templates**: Managed via YAML file (`src/data/templates.yaml`), easy to maintain and version in code.

**Custom templates**: Created and edited via UI, saved in `localStorage` for local persistence.

Example movie template:
```
Analyze this movie:

Title: {title}

Plot/Description: {text}

More info: {url}

I'd like to know:
- Main genre and subgenres
- Recommended audience
- Brief plot
- Critical review
```

#### Managing YAML Templates

Edit default templates in `src/data/templates.yaml`:

```yaml
- id: my-template
  name: Template Name
  template: |
    {title}

    {text}

    {url}
```

Custom templates created by user via UI remain in localStorage and are shown alongside default templates.

### 3. Outbound Sharing (to LLM)

The reformulated text is re-shared to any installed LLM app:

- **Web Share API**: Share to ChatGPT app, Claude app, browser with LLM, local Ollama, etc.
- **Clipboard Fallback**: If Web Share unavailable, copy to clipboard for manual paste

Zero copy-paste in ideal flow: everything passes via Android share intent.

## Project Structure

```
project/
├── src/
│   ├── data/
│   │   └── templates.yaml       # Default templates in YAML
│   ├── pages/
│   │   └── index.astro          # Main page
│   ├── components/
│   │   ├── TemplateSelect.astro # Template management
│   │   ├── TextPreview.astro    # Generated text preview
│   │   └── ShareButtons.astro   # Share buttons
│   └── lib/
│       ├── templates.js         # Template logic (CRUD)
│       └── share.js             # Web Share API & clipboard
├── public/
│   ├── manifest.webmanifest     # PWA manifest
│   ├── sw.js                    # Service Worker
│   ├── favicon.svg              # Favicon
│   └── icons/                   # PWA icons
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

## Deployment

The app is static and can be deployed to any static file hosting:

- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Cloudflare Pages**

### Build

```bash
npm run build
```

Content of `dist/` folder is ready for deployment.

### PWA & Share Target Requirements

To work as Share Target on Android, the app must:

1. ✅ Be served via HTTPS
2. ✅ Have a valid `manifest.webmanifest` with `share_target`
3. ✅ Have a Service Worker registered
4. ✅ Be installed by the user

## Testing

### Local testing

```bash
npm run build
npm run preview
```

Then open the app on Android Chrome and:
1. Go to menu → "Install app"
2. After installation, try sharing a link from another app
3. Select "ShareForge" from the list

### Debugging

- Browser console for JavaScript errors
- Chrome DevTools → Application → Manifest (verify PWA config)
- Chrome DevTools → Application → Service Workers (verify cache)

## License

MIT

## Roadmap

- [x] MVP: Share Target + Base templates + PWA
- [ ] V1.1: Template sync via file export/import
- [ ] V2: "Smart" templates with auto-suggestions
- [ ] V3: Usage statistics

## Contributing

Pull requests and issues are welcome!
