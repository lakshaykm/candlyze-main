import React from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { AnalysisResult } from '../components/AnalysisResult';
import { AppLayout } from '../components/AppLayout';
import { PageTransition } from '../components/PageTransition';
import { PremiumHeading } from '../components/PremiumHeading';

export function KeyLevelsAnalysis() {
  return (
    <PageTransition>
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <PremiumHeading title="Key Levels Analysis" />
          <ImageUploader onImageSelect={() => {}} isLoading={false} />
          <AnalysisResult analysis={null} />
        </div>
      </AppLayout>
    </PageTransition>
  );
}
