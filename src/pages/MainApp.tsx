import React, { useState } from 'react';
import { Auth } from '../components/Auth';
import { ImageUploader } from '../components/ImageUploader';
import { AnalysisResult } from '../components/AnalysisResult';
import { HistoryTab } from '../components/HistoryTab';
import { useAuth } from '../hooks/useAuth';
import { useCharts } from '../hooks/useCharts';
import { analyzeChart } from '../services/openai';
import { convertFileToBase64 } from '../utils/imageUtils';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function MainApp() {
  const { user, loading: authLoading } = useAuth();
  const { charts, isLoading: chartsLoading, addChart } = useCharts();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const handleImageSelect = async (file: File) => {
    try {
      setError(null);
      setSelectedImage(file);
      setAnalyzing(true);

      const base64Image = await convertFileToBase64(file);
      const analysisResult = await analyzeChart(base64Image);
      
      setAnalysis(analysisResult);
      await addChart(base64Image, analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <ImageUploader onImageSelect={handleImageSelect} isLoading={analyzing} />
        
        {analyzing && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing your chart...</p>
          </div>
        )}

        <AnalysisResult analysis={analysis} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Analyses</h2>
          <HistoryTab 
            entries={charts} 
            onEntryClick={(entry) => setAnalysis(entry.analysis)}
            isLoading={chartsLoading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}