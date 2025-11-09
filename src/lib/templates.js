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
 * Get template order from localStorage, fallback to default order (template IDs array)
 * Automatically adds new templates that aren't in the saved order
 */
export function getTemplateOrder(defaultTemplates) {
  try {
    const stored = localStorage.getItem('shareforge-template-order');
    if (stored) {
      try {
        const order = JSON.parse(stored);
        const validIds = defaultTemplates.map(t => t.id);

        // Filter out invalid IDs from saved order
        const validOrder = order.filter(id => validIds.includes(id));

        // Add new templates that aren't in the saved order (append at end)
        const missingIds = validIds.filter(id => !validOrder.includes(id));

        return [...validOrder, ...missingIds];
      } catch (e) {
        console.warn('Invalid template order in localStorage:', e);
      }
    }
  } catch (e) {
    console.warn('localStorage not available for getting template order:', e);
  }
  // Fallback to default order
  return defaultTemplates.map(t => t.id);
}

/**
 * Save template order to localStorage
 */
export function saveTemplateOrder(templateIds) {
  try {
    localStorage.setItem('shareforge-template-order', JSON.stringify(templateIds));
  } catch (e) {
    console.warn('localStorage not available for saving template order:', e);
  }
}

/**
 * Reset template order (remove custom order)
 */
export function resetTemplateOrder() {
  try {
    localStorage.removeItem('shareforge-template-order');
  } catch (e) {
    console.warn('localStorage not available for resetting template order:', e);
  }
}
