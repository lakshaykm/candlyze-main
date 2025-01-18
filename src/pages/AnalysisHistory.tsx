import React, { useState, useEffect } from 'react';
import { AppLayout } from '../components/AppLayout';
import { PageTransition } from '../components/PageTransition';
import { getAllCharts } from '../services/chart-service';
import { ChartEntry } from '../types';
import { formatDistanceToNow } from '../utils/dateUtils';
import { Info } from 'lucide-react';

export function AnalysisHistory() {
  const [charts, setCharts] = useState<ChartEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartEntry | null>(null);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {
      setLoading(true);
      const data = await getAllCharts();
      setCharts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analysis history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <AppLayout>
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </AppLayout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analysis History</h1>
            <p className="text-gray-600">View your chart analyses from the past 7 days</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <Info className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {charts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No analyses found in the past 7 days</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {charts.map((chart) => (
                <div
                  key={chart.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(chart.timestamp)}
                      </span>
                      <button
                        onClick={() => setSelectedChart(selectedChart?.id === chart.id ? null : chart)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {selectedChart?.id === chart.id ? 'Hide Analysis' : 'Show Analysis'}
                      </button>
                    </div>
                    
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <img
                        src={chart.imageUrl}
                        alt="Chart analysis"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {selectedChart?.id === chart.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Analysis</h3>
                        <p className="text-gray-700 whitespace-pre-line">{chart.analysis}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AppLayout>
    </PageTransition>
  );
}
