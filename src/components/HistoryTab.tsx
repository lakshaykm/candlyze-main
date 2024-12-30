import React from 'react';
import { History } from 'lucide-react';
import { ChartEntry } from '../types';
import { formatDistanceToNow } from '../utils/dateUtils';

interface HistoryTabProps {
  entries: ChartEntry[];
  onEntryClick: (entry: ChartEntry) => void;
  isLoading: boolean;
}

export function HistoryTab({ entries, onEntryClick, isLoading }: HistoryTabProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your chart history...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No charts analyzed in the last 48 hours</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onEntryClick(entry)}
        >
          <img
            src={entry.imageUrl}
            alt="Chart history"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(entry.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}