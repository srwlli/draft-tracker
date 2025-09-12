// Client-side admin token helpers
// Stores a short-lived, path-scoped cookie per draft to avoid exposing tokens in URLs.

const COOKIE_PREFIX = 'dt_admin_';

export function setAdminToken(draftId: string, token: string, hours: number = 12) {
  try {
    const name = `${COOKIE_PREFIX}${draftId}`;
    const maxAge = hours * 60 * 60; // seconds
    const path = `/`;
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=${path}; SameSite=Strict${secure}`;
    try { sessionStorage.setItem(name, token); } catch {}
  } catch {}
}

export function getAdminToken(draftId: string): string | null {
  try {
    const name = `${COOKIE_PREFIX}${draftId}=`;
    const parts = document.cookie.split(';').map(p => p.trim());
    for (const part of parts) {
      if (part.startsWith(name)) {
        return decodeURIComponent(part.substring(name.length));
      }
    }
  } catch {}
  try {
    const s = sessionStorage.getItem(`${COOKIE_PREFIX}${draftId}`);
    if (s) return s;
  } catch {}
  return null;
}

export function clearAdminToken(draftId: string) {
  try {
    const name = `${COOKIE_PREFIX}${draftId}`;
    const path = `/`;
    document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Strict`;
    try { sessionStorage.removeItem(name); } catch {}
  } catch {}
}
