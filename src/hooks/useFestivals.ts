import { useState, useEffect, useCallback } from 'react';
import type { Festival, FestivalFilterParams } from '../types/festival';
import { fetchFestivals } from '../services/festivalApi';

export function useFestivals(filters: FestivalFilterParams = {}) {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFestivals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFestivals(filters);
      setFestivals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadFestivals();
  }, [loadFestivals]);

  return { festivals, loading, error, refetch: loadFestivals };
}
