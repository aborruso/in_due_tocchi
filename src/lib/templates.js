import yaml from 'js-yaml';
import templatesYamlRaw from '../data/templates.yaml?raw';

const STORAGE_KEY = 'riformula-templates';
const VERSION_KEY = 'riformula-templates-version';
const CURRENT_VERSION = 2; // Increment when adding new default templates

// Load default templates from YAML file
const DEFAULT_TEMPLATES = (() => {
  try {
    const data = yaml.load(templatesYamlRaw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error parsing templates.yaml:', error);
    return [];
  }
})();

/**
 * Get all templates from localStorage
 */
export function getTemplates() {
  if (typeof localStorage === 'undefined') {
    return DEFAULT_TEMPLATES;
  }

  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const stored = localStorage.getItem(STORAGE_KEY);

    // If no stored data or version mismatch, force sync
    if (!stored || parseInt(storedVersion) !== CURRENT_VERSION) {
      console.log('Template version mismatch or first load, syncing with defaults');
      const merged = stored ? mergeTemplates(JSON.parse(stored)) : DEFAULT_TEMPLATES;
      saveTemplates(merged);
      localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
      return merged;
    }

    const storedTemplates = JSON.parse(stored);

    // Regular sync: add any new default templates
    const storedIds = new Set(storedTemplates.map(t => t.id));
    const newDefaults = DEFAULT_TEMPLATES.filter(t => !storedIds.has(t.id));

    if (newDefaults.length > 0) {
      console.log('Found new default templates, adding them');
      const merged = [...storedTemplates, ...newDefaults];
      saveTemplates(merged);
      localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
      return merged;
    }

    return storedTemplates;
  } catch (error) {
    console.error('Error loading templates:', error);
    return DEFAULT_TEMPLATES;
  }
}

/**
 * Merge stored templates with defaults, preserving custom templates
 */
function mergeTemplates(storedTemplates) {
  const customTemplates = storedTemplates.filter(t => t.id.startsWith('custom-'));
  const defaultIds = new Set(DEFAULT_TEMPLATES.map(t => t.id));

  // Keep custom templates and all current defaults
  return [...DEFAULT_TEMPLATES, ...customTemplates];
}

/**
 * Save templates to localStorage
 */
export function saveTemplates(templates) {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    return true;
  } catch (error) {
    console.error('Error saving templates:', error);
    return false;
  }
}

/**
 * Get a single template by ID
 */
export function getTemplate(id) {
  const templates = getTemplates();
  return templates.find(t => t.id === id);
}

/**
 * Add a new template
 */
export function addTemplate(name, template) {
  const templates = getTemplates();
  const newTemplate = {
    id: `custom-${Date.now()}`,
    name,
    template
  };
  templates.push(newTemplate);
  saveTemplates(templates);
  return newTemplate;
}

/**
 * Update an existing template
 */
export function updateTemplate(id, name, template) {
  const templates = getTemplates();
  const index = templates.findIndex(t => t.id === id);

  if (index === -1) {
    return false;
  }

  templates[index] = {
    ...templates[index],
    name,
    template
  };

  saveTemplates(templates);
  return true;
}

/**
 * Delete a template
 */
export function deleteTemplate(id) {
  const templates = getTemplates();
  const filtered = templates.filter(t => t.id !== id);

  if (filtered.length === templates.length) {
    return false; // Template not found
  }

  saveTemplates(filtered);
  return true;
}

/**
 * Apply template to data
 */
export function applyTemplate(templateText, data, appendUrl = true) {
  const { title = '', text = '', url = '' } = data;

  let result = templateText
    .replace(/\{title\}/g, title)
    .replace(/\{text\}/g, text)
    .replace(/\{url\}/g, url);

  // If appendUrl is true and URL is not already in the template, add it at the end
  if (appendUrl && url && !templateText.includes('{url}')) {
    result = result.trim() + '\n\n' + url;
  }

  return result;
}

/**
 * Export templates as JSON file
 */
export function exportTemplates() {
  const templates = getTemplates();
  const dataStr = JSON.stringify(templates, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'riformula-templates.json';
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * Import templates from JSON file
 */
export async function importTemplates(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const templates = JSON.parse(e.target.result);

        // Validate templates structure
        if (!Array.isArray(templates)) {
          throw new Error('Invalid format: must be an array');
        }

        // Merge with existing templates (avoid duplicates by id)
        const existing = getTemplates();
        const existingIds = new Set(existing.map(t => t.id));

        const newTemplates = templates.filter(t => {
          return t.id && t.name && t.template && !existingIds.has(t.id);
        });

        const merged = [...existing, ...newTemplates];
        saveTemplates(merged);

        resolve(newTemplates.length);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
