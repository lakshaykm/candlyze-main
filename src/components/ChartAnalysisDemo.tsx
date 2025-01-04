import React from 'react';
import { LineChart, ArrowRight, CheckCircle } from 'lucide-react';

export function ChartAnalysisDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-4">
      <div className="relative bg-white rounded-lg shadow-xl p-8 overflow-hidden">
        <div className="flex items-center justify-between gap-8">
          {/* Upload Step */}
          <div className="flex-1 text-center">
            <div className="relative mx-auto w-24 h-24 bg-blue-50 rounded-lg mb-4 animate-pulse">
              <LineChart className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" />
            </div>
            <p className="text-gray-700 font-medium">Upload Chart</p>
          </div>

          {/* Animated Arrow */}
          <div className="flex-shrink-0">
            <ArrowRight className="w-8 h-8 text-blue-600 animate-bounce" />
          </div>

          {/* Processing Step */}
          <div className="flex-1 text-center">
            <div className="relative mx-auto w-24 h-24 bg-blue-50 rounded-lg mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
            <p className="text-gray-700 font-medium">AI Analysis</p>
          </div>

          {/* Animated Arrow */}
          <div className="flex-shrink-0">
            <ArrowRight className="w-8 h-8 text-blue-600 animate-bounce" />
          </div>

          {/* Result Step */}
          <div className="flex-1 text-center">
            <div className="relative mx-auto w-24 h-24 bg-blue-50 rounded-lg mb-4">
              <CheckCircle className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 animate-bounce" />
            </div>
            <p className="text-gray-700 font-medium">Get Insights</p>
          </div>
        </div>

        {/* Sample Analysis Preview */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}