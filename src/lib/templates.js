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
