'use client';

import { useState, useEffect } from 'react';
import { tiersService } from '../../../services';
import { ITier } from '../../../services/types';

interface UseTiersResult {
  tiers: ITier[];
  loading: boolean;
  error: string | null;
}

// Cache for tiers data to avoid repeated calls
let cachedTiers: ITier[] | null = null;

export function useTiers(): UseTiersResult {
  const [tiers, setTiers] = useState<ITier[]>(cachedTiers || []);
  const [loading, setLoading] = useState(!cachedTiers);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTiers = async () => {
      // If we already have cached data, no need to fetch again
      if (cachedTiers) {
        setTiers(cachedTiers);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fetchedTiers = await tiersService.getTiers();
        
        // Cache the results
        cachedTiers = fetchedTiers;
        setTiers(fetchedTiers);
      } catch (err) {
        console.error('Failed to fetch tiers:', err);
        setError('Failed to load tiers');
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  return { tiers, loading, error };
}

// Function to clear cache if needed (for data refresh)
export function clearTiersCache() {
  cachedTiers = null;
}
