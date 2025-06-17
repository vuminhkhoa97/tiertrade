'use client';

import { useState, useEffect } from 'react';
import { themesService } from '../../../services';
import { ITheme } from '../../../services/types';

interface UseThemesResult {
  themes: ITheme[];
  loading: boolean;
  error: string | null;
}

// Cache for themes data to avoid repeated calls
let cachedThemes: ITheme[] | null = null;

export function useThemes(): UseThemesResult {
  const [themes, setThemes] = useState<ITheme[]>(cachedThemes || []);
  const [loading, setLoading] = useState(!cachedThemes);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      // If we already have cached data, no need to fetch again
      if (cachedThemes) {
        setThemes(cachedThemes);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fetchedThemes = await themesService.getThemes();
        
        // Cache the results
        cachedThemes = fetchedThemes;
        setThemes(fetchedThemes);
      } catch (err) {
        console.error('Failed to fetch themes:', err);
        setError('Failed to load themes');
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { themes, loading, error };
}

// Function to clear cache if needed (for data refresh)
export function clearThemesCache() {
  cachedThemes = null;
}
