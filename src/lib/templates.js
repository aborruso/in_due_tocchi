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
 */
export function getTemplateOrder(defaultTemplates) {
  try {
    const stored = localStorage.getItem('riformula-template-order');
    if (stored) {
      try {
        const order = JSON.parse(stored);
        // Validate stored order contains valid IDs
        const validIds = defaultTemplates.map(t => t.id);
        if (order.every(id => validIds.includes(id))) {
          return order;
        }
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
    localStorage.setItem('riformula-template-order', JSON.stringify(templateIds));
  } catch (e) {
    console.warn('localStorage not available for saving template order:', e);
  }
}

/**
 * Reset template order (remove custom order)
 */
export function resetTemplateOrder() {
  try {
    localStorage.removeItem('riformula-template-order');
  } catch (e) {
    console.warn('localStorage not available for resetting template order:', e);
  }
}
