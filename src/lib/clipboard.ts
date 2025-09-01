/**
 * Copy text to clipboard with fallback for non-secure contexts
 * 
 * This utility handles clipboard operations across different browser contexts.
 * Uses modern Clipboard API when available (HTTPS), falls back to execCommand
 * for HTTP/localhost environments.
 * 
 * Note: The fallback method uses DOM manipulation which violates our standard
 * practices, but is necessary for browser compatibility in development environments.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern Clipboard API - preferred method for HTTPS contexts
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for HTTP/localhost - requires temporary DOM manipulation
    // This is the ONLY acceptable use of createElement in our codebase
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return success;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}