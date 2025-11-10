# ShareForge

**ShareForge** is a Progressive Web App (PWA) that transforms shared links into curated prompts for LLMs (ChatGPT, Claude, etc.).

## The Problem

The web is full of noise. Popup, ads, sensational headlines, articles with empty preambles. What we really want is to discover content, enhance it, explore it deeply.

Today you can share URLs directly to LLMs via Android Share. But then what? You have to write the **prompt**, the "instructions". Like: "Summarize this to help me...", "Create a message for chat...", "Analyze critical points...". These are basic, often repetitive tasks.

In some cases you get output in English when you don't want it.

In others you can only put the URL without adding any additional text.

**ShareForge helps you overcome these problems**: select the template you need (summary, analysis, social post, critical questions...), click, and the content is ready with the right instructions to be analyzed by AI and return what you need.

It's not a reading app. It's the bridge between discovery and action.

## Features

- ✅ **Web Share Target**: Receives shared content from other Android apps
- ✅ **Desktop bookmarklet**: One-click URL capture for desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ **Customizable templates**: Create, edit, and delete templates with `{title}`, `{text}`, `{url}` placeholders
- ✅ **Drag-and-drop**: Reorder templates via drag-and-drop, order saved in localStorage
- ✅ **Offline-first**: Works completely offline after first load
- ✅ **Quick sharing**: Uses Web Share API or clipboard fallback
- ✅ **Lightweight & fast**: No backend, just static files

> **Note**: ShareForge is designed for **Android mobile devices** with native Share Target integration. Desktop users can use the **bookmarklet** for one-click URL capture—see [Desktop Guide](/desktop) for installation instructions.

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

### Android: Native Share Target

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

### Desktop: Bookmarklet

Desktop users can use a **bookmarklet** to capture URLs with one click:

```
[Browse webpage]
    ↓ click bookmarklet (in bookmark bar)
[ShareForge opens with URL + title pre-filled]
    ↓ pick template → copy
[Paste in LLM: ChatGPT, Claude, etc]
```

**Installation**: Visit [/desktop](https://aborruso.github.io/in_due_tocchi/desktop) for drag-and-drop bookmarklet setup.

**How it works**: The bookmarklet is a JavaScript snippet saved as a browser bookmark. Clicking it captures `document.title` and `window.location.href` from the current page and opens ShareForge in a new tab with pre-filled fields.

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

The reformulated prompt is re-shared to any installed LLM app:

- **Web Share API**: Share to ChatGPT app, Claude app, browser with LLM, local Ollama, etc.
- **Clipboard Fallback**: If Web Share unavailable, copy to clipboard

### Why No LLM Integration?

ShareForge doesn't directly integrate any language model. No API calls to ChatGPT, Claude or Gemini. Why?

You already have an LLM client on your phone: native apps, web interfaces, integrated assistants. Instead of reinventing the wheel and building yet another wrapper around an API, **ShareForge generates the prompt and shares it** with whatever app you're already using.

Concrete benefits:

- **Freedom of choice**: Use the model you prefer, without constraints
- **Zero costs for users**: No subscription, no tokens to pay through the app
- **Zero management costs**: No need to cover users' API expenses, nor implement rate limiting, credit management, authentication
- **Total flexibility**: Share the prompt with ChatGPT, Claude, Gemini, Perplexity, a local client, or any other tool installed on your device
- **Less code**: No API integration logic, retry, error handling, token management

ShareForge does one thing well: **transforms links into ready-to-use prompts**. Everything else is delegated to tools that already exist and already work.

## Architectural Choices

ShareForge is deliberately simple: a static web application, no backend, no database, no server. Only client-side technologies (HTML, CSS, JavaScript) and free hosting on GitHub Pages.

This choice limits what the app can do — no complex API calls, no server-side processing, no centralized authentication — but offers fundamental advantages:

- **Zero costs**: Hosting, maintenance, infrastructure
- **Minimal maintenance**: No servers to update, no databases to manage
- **Speed**: Instant deploy, no backend latency
- **Privacy**: No data transmitted to third-party servers, everything stays on device
- **Reliability**: Works offline after first load (PWA)

The limitations become creative constraints. We can't do everything, but what we do is sustainable in the long term.

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
