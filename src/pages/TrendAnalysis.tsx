import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { AnalysisResult } from '../components/AnalysisResult';
import { AppLayout } from '../components/AppLayout';
import { PageTransition } from '../components/PageTransition';
import { PremiumHeading } from '../components/PremiumHeading';
import { analyzeChart } from '../services/openai';
import { convertFileToBase64 } from '../utils/imageUtils';
import { useCharts } from '../hooks/useCharts';

export function TrendAnalysis() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addChart } = useCharts();

  const handleImageSelect = async (file: File) => {
    try {
      setError(null);
      setAnalyzing(true);

      const base64Image = await convertFileToBase64(file);
      const analysisResult = await analyzeChart(base64Image, 'trend');
      
      setAnalysis(analysisResult);
      await addChart(base64Image, analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <PageTransition>
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <PremiumHeading title="Trend Analysis" />
          
          {error && (
            <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <ImageUploader onImageSelect={handleImageSelect} isLoading={analyzing} />
          
          {analyzing && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Analyzing market trends...</p>
            </div>
          )}

          <AnalysisResult analysis={analysis} />
        </div>
      </AppLayout>
    </PageTransition>
  );
}
