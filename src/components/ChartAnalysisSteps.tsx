import React from 'react';
import { Upload, Sparkles } from 'lucide-react';

export function ChartAnalysisSteps() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 mb-24">
      {/* Steps Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI Analysis in Just One Click
        </h2>
        <p className="text-xl text-gray-600">
          Transform your trading with instant chart analysis
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Step 1 */}
        <div className="relative">
          <div className="bg-white rounded-xl shadow-lg p-8 h-full transform transition-transform hover:scale-105">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              1
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Upload Your Chart</h3>
              <p className="text-gray-600 mb-6">
                Simply drag and drop or click to upload your candlestick chart screenshot
              </p>
              
              {/* Upload Animation */}
              <div className="relative h-48 bg-blue-50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Upload className="w-16 h-16 text-blue-600 animate-bounce" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative">
          <div className="bg-white rounded-xl shadow-lg p-8 h-full transform transition-transform hover:scale-105">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              2
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Get Instant Analysis</h3>
              <p className="text-gray-600 mb-6">
                Receive comprehensive AI-powered analysis within seconds
              </p>
              
              {/* Analysis Animation */}
              <div className="relative h-48 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <div className="absolute top-4 left-4">
                  <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
                </div>
                <div className="absolute inset-4 flex flex-col justify-center space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {['Instant Results', 'Support & Resistance', 'Trend Analysis', 'Price Targets'].map((feature) => (
          <div key={feature} className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-blue-800">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}