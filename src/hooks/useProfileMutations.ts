'use client';

import { useState } from 'react';
import type { UpdateProfilePayload } from '@/lib/validators/profileSchema';

interface UseProfileMutationsReturn {
  updateProfile: (
    payload: UpdateProfilePayload
  ) => Promise<{ success: boolean; error?: string | null }>;
  isLoading: boolean;
  error: string | null;
}

export function useProfileMutations(): UseProfileMutationsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (
    payload: UpdateProfilePayload
  ): Promise<{ success: boolean; error?: string | null }> => {
    setIsLoading(true);
    setError(null);
    console.log('[useProfileMutations] Sending update payload:', payload);

    try {
      const response = await fetch('/api/profile', {
        // Relative URL fine for client-side fetch
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMsg = `HTTP error ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
          console.error('[useProfileMutations] API Error:', errorData);
        } catch (e) {
          console.error(
            '[useProfileMutations] Failed to parse error response',
            e
          );
        }
        setError(errorMsg);
        setIsLoading(false);
        return { success: false, error: errorMsg };
      }

      // Optionally process success response if needed
      // const result = await response.json();
      console.log('[useProfileMutations] Update successful.');
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error('[useProfileMutations] Fetch error:', err);
      const errorMsg =
        err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMsg);
      setIsLoading(false);
      return { success: false, error: errorMsg };
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
  };
}
