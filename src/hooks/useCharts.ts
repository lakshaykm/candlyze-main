import { useState, useEffect } from 'react';
import { ChartEntry } from '../types';
import { getRecentCharts, saveChart } from '../services/chart-service';

export function useCharts() {
  const [charts, setCharts] = useState<ChartEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCharts();
  }, []);

  async function loadCharts() {
    try {
      setIsLoading(true);
      setError(null);
      const recentCharts = await getRecentCharts();
      setCharts(recentCharts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load charts');
    } finally {
      setIsLoading(false);
    }
  }

  async function addChart(imageUrl: string, analysis: string) {
    try {
      setError(null);
      await saveChart(imageUrl, analysis);
      await loadCharts(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save chart');
      throw err;
    }
  }

  return {
    charts,
    isLoading,
    error,
    addChart,
    refreshCharts: loadCharts
  };
}