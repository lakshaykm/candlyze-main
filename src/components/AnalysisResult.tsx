import React from 'react';
import { LineChart, Target, TrendingUp } from 'lucide-react';

interface AnalysisResultProps {
  analysis: string | null;
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  if (!analysis) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <LineChart className="w-6 h-6" />
        Chart Analysis
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Key Levels</h3>
            <p className="text-gray-700 whitespace-pre-line">{analysis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}