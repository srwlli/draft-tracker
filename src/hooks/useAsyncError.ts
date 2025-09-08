import { useCallback } from 'react';

export function useAsyncError() {
  const throwError = useCallback((error: Error) => {
    // This will be caught by Error Boundary
    throw error;
  }, []);

  return throwError;
}