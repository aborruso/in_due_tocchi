export const OG_IMAGE = 'share_forge_og.png';
export const OG_IMAGE_ALT = 'Diagramma ShareForge che mostra smartphone, template e cervello AI';

export const OG_LOCALES = {
  it: 'it_IT',
  en: 'en_US',
};

export const SEO_META = {
  home: {
    path: '',
    type: 'website',
    translations: {
      it: {
        title: 'ShareForge · Trasforma link in messaggi curati',
        description: 'Genera prompt strutturati dai link condivisi con template personalizzabili e inviali subito al tuo LLM.',
      },
      en: {
        title: 'ShareForge · Turn links into curated messages',
        description: 'Generate structured prompts from shared links with customizable templates and send them to your favorite LLM.',
      },
    },
  },
  templates: {
    path: 'templates',
    type: 'website',
    translations: {
      it: {
        title: 'Template ShareForge · Panoramica completa',
        description: 'Sfoglia tutti i template ShareForge e trova il prompt ottimizzato per SEO, fact-checking, sintesi e altri casi d\'uso.',
      },
      en: {
        title: 'ShareForge Templates · Complete overview',
        description: 'Browse every ShareForge template and pick the optimized prompt for SEO, fact-checking, summaries, and more.',
      },
    },
  },
  mobile: {
    path: 'mobile',
    type: 'website',
    translations: {
      it: {
        title: 'ShareForge Mobile · Prepara il contesto sugli smartphone',
        description: 'Impara a usare ShareForge da smartphone: crea il contesto prima di condividere l\'URL e installa l\'app PWA in pochi tap.',
      },
      en: {
        title: 'ShareForge Mobile · Prepare context on your phone',
        description: 'Learn how to use ShareForge on smartphones: craft context before sharing a link and install the offline PWA in a few taps.',
      },
    },
  },
};

const DEFAULT_SITE = 'https://aborruso.github.io/';

export function getSeoData(pageKey, AstroContext) {
  const meta = SEO_META[pageKey];

  if (!meta) {
    throw new Error(`Missing SEO meta definition for page: ${pageKey}`);
  }

  const siteAddress = (AstroContext?.site ?? new URL(DEFAULT_SITE)).toString();
  const baseUrl = new URL(import.meta.env.BASE_URL ?? '/', siteAddress);
  const relativePath = meta.path ? meta.path.replace(/^\//, '') : '';
  const pageUrl = new URL(relativePath || '.', baseUrl).toString();
  const imageUrl = new URL(OG_IMAGE, baseUrl).toString();

  return {
    meta,
    pageUrl,
    imageUrl,
  };
}
