/**
 * Translation strings for all supported languages
 */

export const translations = {
  it: {
    // Common
    common: {
      share: 'Condividi',
      copy: 'Copia',
      close: 'Chiudi',
      menu: 'Menu',
      templates: 'Template',
      guide: 'Guida',
    },

    // Header
    header: {
      title: 'ShareForge',
      subtitle: 'Trasforma link in messaggi curati',
    },

    // Template section
    templateSection: {
      title: 'Scegli un template',
      resetOrder: 'Ripristina ordine originale',
      resetFeedback: 'Ordine template ripristinato',
    },

    // Text preview section
    preview: {
      title: 'Testo generato',
      placeholder: 'Il testo generato apparirà qui...',
      charCount: '{count} caratteri',
      appendUrl: 'Aggiungi URL in coda (se non già presente nel template)',
    },

    // Input section
    input: {
      title: 'Dati in ingresso',
      titleLabel: 'Titolo',
      titlePlaceholder: 'Titolo del contenuto',
      textLabel: 'Testo',
      textPlaceholder: 'Testo o descrizione',
      urlLabel: 'URL',
      urlPlaceholder: 'https://esempio.it',
    },

    // Share feedback
    feedback: {
      noTextToShare: 'Nessun testo da condividere',
      noTextToCopy: 'Nessun testo da copiare',
      shareSuccess: 'Testo condiviso con successo',
      copySuccess: 'Testo copiato negli appunti',
      shareUnavailable: 'Condivisione non disponibile. Testo copiato negli appunti',
      shareError: 'Errore durante la condivisione',
      copyError: 'Errore durante la copia',
    },

    // Device modal
    deviceModal: {
      title: 'Quest\'app funziona meglio su smartphone Android',
      instructions: 'Per usarla:',
      step1: 'Apri questo link da Chrome Android',
      step2: 'Installa l\'app (Chrome menu → "Installa app")',
      step3: 'Condividi link da qualsiasi app → seleziona ShareForge',
      qrTitle: 'Scansiona con Chrome Android',
      learnMore: 'Guida completa',
    },

    // Update banner
    updateBanner: {
      message: 'Nuova versione disponibile!',
      update: 'Aggiorna ora',
    },

    // Release modal
    releaseModal: {
      badge: 'Novità',
      placeholderTitle: 'Cosa cambia in questa versione',
      versionLabel: 'Versione',
      close: 'Chiudi',
      cta: 'Ho capito',
    },

    // Footer
    footer: {
      version: 'ShareForge v1.0 - PWA offline-first',
      github: 'Codice su GitHub',
    },

    // Templates page
    templatesPage: {
      title: 'Template disponibili',
      subtitle: 'Scegli in base allo scopo',
      backToApp: 'Torna all\'app',
      noTemplates: 'Nessun template disponibile.',
    },

    // Mobile page
    mobilePage: {
      heroTitle: 'Prepara il contesto<br />per i tuoi LLM',
      heroSubtitle: 'Su smartphone non puoi scrivere prompt prima di inviare l\'URL. Con ShareForge, crei il contesto attorno al link e lo invii al miglior LLM per il tuo obiettivo.',
      openApp: 'Apri ShareForge',
      openAppCta: 'Apri ShareForge ora →',

      benefitsTitle: 'Perché ShareForge?',
      benefit1Title: 'Crea il contesto prima',
      benefit1Text: 'Scegli un template e circonda l\'URL con contesto strutturato. Così l\'LLM capisce cosa vuoi, senza doverlo spiegare dopo.',
      benefit2Title: 'Pronto in un tap',
      benefit2Text: 'Nessun backend da contattare. L\'app si avvia istantaneamente e genera il contesto subito, pronto per essere inviato al tuo LLM.',
      benefit3Title: 'Template = prompt strutturati',
      benefit3Text: 'Template per diversi LLM use case: SEO analysis, fact-check, sintesi, thread social. Ognuno è un prompt ottimizzato.',
      benefit4Title: 'Invia all\'LLM giusto',
      benefit4Text: 'Condividi il contesto a ChatGPT, Claude, Gemini o altri. Scegli il modello più adatto al tuo template/obiettivo.',

      demoTitle: 'Il flusso: URL → contesto → LLM → utente',
      demoPlaceholder: 'Video demo in arrivo',
      demoDescription: 'Mostra come: condividere URL → scegliere template → inviare a un LLM',

      flowTitle: 'Come funziona (6 passi)',
      flow1: 'Apri un contenuto (articolo, video, post...)',
      flow2: 'Fai click su Share',
      flow3: 'Condividilo con ShareForge',
      flow4: 'Sull\'app, scegli cosa vuoi fare con quella sorgente (template)',
      flow5: 'Fai click su Condividi',
      flow6: 'Invialo al tuo sistema LLM preferito',

      installTitle: 'Installa come app',
      installSubtitle: 'Testata solo su Chrome per Android. Parti da <a href="https://aborruso.github.io/in_due_tocchi/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">https://aborruso.github.io/in_due_tocchi/</a> e aggiungi ShareForge alla schermata iniziale in 30 secondi',
      step1Title: 'Apri Chrome',
      step1Text: 'Accedi a ShareForge tramite il browser Chrome del tuo Android',
      step2Title: 'Tap menu (⋮)',
      step2Text: 'Premi i tre puntini in alto a destra del browser',
      step2Note: 'Vedrai il bottone <strong>"Installa app"</strong> o <strong>"Aggiungi a Home"</strong>',
      step3Title: 'Tap "Installa app"',
      step3Text: 'Seleziona l\'opzione per aggiungere l\'app alla schermata iniziale',
      step3Note: 'Confermando, ShareForge apparirà come app nativa sul tuo telefono',
      step4Title: 'Goditi l\'app',
      step4Text: 'Ora puoi usarla offline, direttamente dalla tua schermata iniziale. Nessun browser necessario.',
      installVideoTitle: 'Video guida all\'installazione',
      installVideoDescription: 'Il video mostra i passaggi per installare ShareForge su Android Chrome.',
      installTip: 'Consiglio',
      installTipText: 'Se vedi il messaggio <strong>"Pagina web non disponibile offline"</strong> la prima volta, non ti preoccupare. ShareForge caricherà i dati la volta successiva. L\'offline mode migliora nel tempo.',

      ctaTitle: 'Pronto a preparare il contesto?',
      ctaSubtitle: 'Apri ShareForge, scegli un template, e invia il contesto strutturato al tuo LLM preferito',
    },

    // Language selector
    languageSelector: {
      label: 'Lingua',
      it: 'Italiano',
      en: 'English',
    },

    // Mobile help banner
    mobileHelp: {
      title: 'Come si usa ShareForge?',
      step1: 'Condividi un link da un\'altra app',
      step2: 'Scegli un template',
      step3: 'Invia al tuo LLM preferito',
      guideLink: 'Vedi guida completa →',
    },
  },

  en: {
    // Common
    common: {
      share: 'Share',
      copy: 'Copy',
      close: 'Close',
      menu: 'Menu',
      templates: 'Templates',
      guide: 'Guide',
    },

    // Header
    header: {
      title: 'ShareForge',
      subtitle: 'Transform links into curated messages',
    },

    // Template section
    templateSection: {
      title: 'Choose a template',
      resetOrder: 'Reset to original order',
      resetFeedback: 'Template order reset',
    },

    // Text preview section
    preview: {
      title: 'Generated Text',
      placeholder: 'Generated text will appear here...',
      charCount: '{count} characters',
      appendUrl: 'Append URL at the end (if not already in template)',
    },

    // Input section
    input: {
      title: 'Input Data',
      titleLabel: 'Title',
      titlePlaceholder: 'Content title',
      textLabel: 'Text',
      textPlaceholder: 'Text or description',
      urlLabel: 'URL',
      urlPlaceholder: 'https://example.com',
    },

    // Share feedback
    feedback: {
      noTextToShare: 'No text to share',
      noTextToCopy: 'No text to copy',
      shareSuccess: 'Text shared successfully',
      copySuccess: 'Text copied to clipboard',
      shareUnavailable: 'Share unavailable. Text copied to clipboard',
      shareError: 'Error while sharing',
      copyError: 'Error while copying',
    },

    // Device modal
    deviceModal: {
      title: 'This app works best on Android smartphones',
      instructions: 'To use it:',
      step1: 'Open this link from Chrome Android',
      step2: 'Install the app (Chrome menu → "Install app")',
      step3: 'Share link from any app → select ShareForge',
      qrTitle: 'Scan with Chrome Android',
      learnMore: 'Complete guide',
    },

    // Update banner
    updateBanner: {
      message: 'New version available!',
      update: 'Update now',
    },

    // Release modal
    releaseModal: {
      badge: "What's new",
      placeholderTitle: 'What changed in this release',
      versionLabel: 'Version',
      close: 'Close',
      cta: 'Got it',
    },

    // Footer
    footer: {
      version: 'ShareForge v1.0 - Offline-First PWA',
      github: 'Code on GitHub',
    },

    // Templates page
    templatesPage: {
      title: 'Available Templates',
      subtitle: 'Choose based on your goal',
      backToApp: 'Back to app',
      noTemplates: 'No templates available.',
    },

    // Mobile page
    mobilePage: {
      heroTitle: 'Prepare Context<br />for your LLMs',
      heroSubtitle: 'On smartphones you can\'t write prompts before sending the URL. With ShareForge, you create context around the link and send it to the best LLM for your goal.',
      openApp: 'Open ShareForge',
      openAppCta: 'Open ShareForge Now →',

      benefitsTitle: 'Why ShareForge?',
      benefit1Title: 'Create Context First',
      benefit1Text: 'Choose a template and surround the URL with structured context. The LLM understands what you want, without having to explain afterwards.',
      benefit2Title: 'Ready in a Tap',
      benefit2Text: 'No backend to contact. The app starts instantly and generates context immediately, ready to send to your LLM.',
      benefit3Title: 'Templates = Structured Prompts',
      benefit3Text: 'Templates for different LLM use cases: SEO analysis, fact-checking, summaries, social threads. Each is an optimized prompt.',
      benefit4Title: 'Send to the Right LLM',
      benefit4Text: 'Share context to ChatGPT, Claude, Gemini or others. Choose the most suitable model for your template/goal.',

      demoTitle: 'The Flow: URL → Context → LLM → User',
      demoPlaceholder: 'Video demo coming soon',
      demoDescription: 'Shows how to: share URL → choose template → send to an LLM',

      flowTitle: 'How it works (6 steps)',
      flow1: 'Open content (article, video, post...)',
      flow2: 'Click Share',
      flow3: 'Share it with ShareForge',
      flow4: 'In the app, choose what you want to do with that source (template)',
      flow5: 'Click Share',
      flow6: 'Send it to your preferred LLM system',

      installTitle: 'Install as App',
      installSubtitle: 'Tested only on Chrome for Android. Start from <a href="https://aborruso.github.io/in_due_tocchi/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">https://aborruso.github.io/in_due_tocchi/</a> and add ShareForge to your home screen in 30 seconds',
      step1Title: 'Open Chrome',
      step1Text: 'Access ShareForge via Chrome browser on your Android',
      step2Title: 'Tap Menu (⋮)',
      step2Text: 'Press the three dots at the top right of the browser',
      step2Note: 'You will see the <strong>"Install app"</strong> or <strong>"Add to Home"</strong> button',
      step3Title: 'Tap "Install app"',
      step3Text: 'Select the option to add the app to your home screen',
      step3Note: 'By confirming, ShareForge will appear as a native app on your phone',
      step4Title: 'Enjoy the app',
      step4Text: 'You can now use it offline, directly from your home screen. No browser needed.',
      installVideoTitle: 'Installation video guide',
      installVideoDescription: 'The video shows the steps to install ShareForge on Android Chrome.',
      installTip: 'Tip',
      installTipText: 'If you see <strong>"Web page not available offline"</strong> the first time, don\'t worry. ShareForge will load the data next time. Offline mode improves over time.',

      ctaTitle: 'Ready to prepare context?',
      ctaSubtitle: 'Open ShareForge, choose a template, and send structured context to your favorite LLM',
    },

    // Language selector
    languageSelector: {
      label: 'Language',
      it: 'Italiano',
      en: 'English',
    },

    // Mobile help banner
    mobileHelp: {
      title: 'How to use ShareForge?',
      step1: 'Share a link from another app',
      step2: 'Choose a template',
      step3: 'Send to your favorite LLM',
      guideLink: 'See complete guide →',
    },
  },
};
