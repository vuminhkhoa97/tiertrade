'use client';

import { useState, useEffect } from 'react';
import { tiersService, themesService } from '../../../services';
import { ITier, ITheme } from '../../../services/types';

interface ApiSelectsData {
  tiers: ITier[];
  themes: ITheme[];
  loading: boolean;
  error: string | null;
}

// Cache for API data to avoid repeated calls
let cachedData: { tiers?: ITier[]; themes?: ITheme[] } = {};

export function useApiSelects(): ApiSelectsData {
  const [tiers, setTiers] = useState<ITier[]>(cachedData.tiers || []);
  const [themes, setThemes] = useState<ITheme[]>(cachedData.themes || []);
  const [loading, setLoading] = useState(!cachedData.tiers || !cachedData.themes);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // If we already have cached data, no need to fetch again
      if (cachedData.tiers && cachedData.themes) {
        setTiers(cachedData.tiers);
        setThemes(cachedData.themes);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch both tiers and themes in parallel
        const [fetchedTiers, fetchedThemes] = await Promise.all([
          !cachedData.tiers ? tiersService.getTiers() : Promise.resolve(cachedData.tiers),
          !cachedData.themes ? themesService.getThemes() : Promise.resolve(cachedData.themes),
        ]);

        // Cache the results
        cachedData.tiers = fetchedTiers;
        cachedData.themes = fetchedThemes;

        setTiers(fetchedTiers);
        setThemes(fetchedThemes);
      } catch (err) {
        console.error('Failed to fetch select data:', err);
        setError('Failed to load filter options');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tiers, themes, loading, error };
}

// Function to clear cache if needed (for data refresh)
export function clearApiSelectsCache() {
  cachedData = {};
}

// Function to clear all individual caches
export function clearAllApiCaches() {
  cachedData = {};
  // Import and call individual cache clearing functions
  const { clearTiersCache } = require('./useTiers');
  const { clearThemesCache } = require('./useThemes');
  clearTiersCache();
  clearThemesCache();
}
