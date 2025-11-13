/**
 * Check if Web Share API is available
 */
export function canShare() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Share text using Web Share API
 * @param {string} text - The text to share
 * @param {string} title - Optional title for the share
 * @returns {Promise<boolean>} - True if shared successfully, false otherwise
 */
export async function shareText(text, title = 'ShareForge') {
  if (!canShare()) {
    console.log('Web Share API not available');
    return false;
  }

  try {
    await navigator.share({
      title,
      text
    });
    return true;
  } catch (error) {
    // User cancelled or error occurred
    if (error.name !== 'AbortError') {
      console.error('Error sharing:', error);
    }
    return false;
  }
}

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} - True if copied successfully, false otherwise
 */
export async function copyToClipboard(text) {
  // Modern Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  }

  // Fallback for older browsers
  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      return successful;
    } catch (error) {
      console.error('Error copying to clipboard (fallback):', error);
      return false;
    }
  }

  return false;
}

/**
 * Parse URL parameters from Web Share Target
 * @returns {Object} - Object with title, text, and url properties
 */
export function parseSharedData() {
  if (typeof window === 'undefined') {
    return { title: '', text: '', url: '' };
  }

  const params = new URLSearchParams(window.location.search);

  let title = params.get('title') || '';
  let text = params.get('text') || '';
  let url = params.get('url') || '';

  // Android workaround: if url is empty, try to extract it from text
  // Many Android apps put the URL in the text field instead of url field
  if (!url && text) {
    const urlMatch = text.match(/https?:\/\/[^\s]+/);
    if (urlMatch) {
      url = urlMatch[0];
      // Remove the URL from text to avoid duplication
      text = text.replace(url, '').trim();
    }
  }

  return {
    title,
    text,
    url
  };
}

/**
 * Check if the page was opened via share target
 * @returns {boolean}
 */
export function isSharedContent() {
  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return params.has('title') || params.has('text') || params.has('url');
}

/**
 * Clear shared data from URL without reloading
 */
export function clearSharedDataFromUrl() {
  if (typeof window === 'undefined' || typeof history === 'undefined') {
    return;
  }

  // Remove query parameters without reloading
  const url = new URL(window.location.href);
  url.search = '';
  history.replaceState({}, '', url);
}
