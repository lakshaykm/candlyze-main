import React, { useCallback } from 'react';
import { Upload, Info } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export function ImageUploader({ onImageSelect, isLoading }: ImageUploaderProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700">
            Drag and drop your chart image here
          </p>
          <p className="text-sm text-gray-500 mt-2">or click to select a file</p>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-medium text-blue-900">Remember:</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• You will get the chart analysis based on the timeframe your chart is in.</li>
              <li>• The screenshot of the chart should be clear.</li>
              <li>• Apply indicator and then capture screenshot, if you want analysis with selected indicator.</li>
              <li>• The screenshot must contain the price of the asset, which is usually on the right side of the chart.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
