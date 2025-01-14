import React from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { AnalysisResult } from '../components/AnalysisResult';
import { AppLayout } from '../components/AppLayout';
import { PageTransition } from '../components/PageTransition';
import { PremiumHeading } from '../components/PremiumHeading';

export function IndicatorAnalysis() {
  return (
    <PageTransition>
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <PremiumHeading title="Indicator Analysis" />
          <ImageUploader onImageSelect={() => {}} isLoading={false} />
          <AnalysisResult analysis={null} />
        </div>
      </AppLayout>
    </PageTransition>
  );
}
