import React, { useState } from 'react';
import { Auth } from '../components/Auth';
import { ImageUploader } from '../components/ImageUploader';
import { AnalysisResult } from '../components/AnalysisResult';
import { HistoryTab } from '../components/HistoryTab';
import { useAuth } from '../hooks/useAuth';
import { useCharts } from '../hooks/useCharts';
import { useCredits } from '../hooks/useCredits';
import { analyzeChart } from '../services/openai';
import { convertFileToBase64 } from '../utils/imageUtils';
import { AppLayout } from '../components/AppLayout';
import { LineChart, TrendingUp, Target, BarChart2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MainApp() {
  const { user, loading: authLoading } = useAuth();
  const { charts, isLoading: chartsLoading, addChart } = useCharts();
  const { credits, loading: creditsLoading } = useCredits();
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
      const analysisResult = await analyzeChart(base64Image, 'quick');
      
      setAnalysis(analysisResult);
      await addChart(base64Image, analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setAnalyzing(false);
    }
  };

  const analysisTypes = [
    {
      title: 'Key Levels Analysis',
      description: 'Identify crucial support and resistance levels',
      icon: <Target className="w-6 h-6" />,
      link: '/app/analysis/key-levels',
      color: 'bg-blue-500'
    },
    {
      title: 'Trend Analysis',
      description: 'Analyze market trends and momentum',
      icon: <TrendingUp className="w-6 h-6" />,
      link: '/app/analysis/trend',
      color: 'bg-green-500'
    },
    {
      title: 'Pattern Recognition',
      description: 'Detect chart patterns and formations',
      icon: <LineChart className="w-6 h-6" />,
      link: '/app/analysis/patterns',
      color: 'bg-purple-500'
    },
    {
      title: 'Price Prediction',
      description: 'Get AI-powered price predictions',
      icon: <BarChart2 className="w-6 h-6" />,
      link: '/app/analysis/prediction',
      color: 'bg-orange-500'
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.user_metadata.full_name}!
          </h1>
          <p className="text-gray-600">
            Start analyzing your charts or explore our specialized analysis tools.
          </p>
        </div>

        {/* Credits Status */}
        {!creditsLoading && credits && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Available Credits</h2>
                <p className="text-3xl font-bold">{credits.credits}</p>
                <p className="text-sm opacity-90 mt-1">{credits.plan} Plan</p>
              </div>
              <Link
                to="/subscription"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        )}

        {/* Analysis Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {analysisTypes.map((type) => (
            <Link
              key={type.title}
              to={type.link}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${type.color} text-white p-3 rounded-lg inline-block mb-4`}>
                {type.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </Link>
          ))}
        </div>

        {/* Quick Analysis Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Quick Analysis</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <Info className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-red-700">{error}</p>
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
        </div>

        {/* Recent Analyses */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">Recent Analyses</h2>
          <HistoryTab 
            entries={charts} 
            onEntryClick={(entry) => setAnalysis(entry.analysis)}
            isLoading={chartsLoading}
          />
        </div>
      </div>
    </AppLayout>
  );
}
