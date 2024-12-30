import { supabase } from '../lib/supabase';
import { ChartEntry } from '../types';

const HOURS_48 = 48 * 60 * 60 * 1000;

export async function saveToHistory(imageUrl: string, analysis: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to save charts');
  }

  await supabase
    .from('charts')
    .insert({
      image_url: imageUrl,
      analysis,
      user_id: user.id
    });
}

export async function getHistory(): Promise<ChartEntry[]> {
  const now = Date.now();
  const cutoffDate = new Date(now - HOURS_48).toISOString();

  const { data: charts, error } = await supabase
    .from('charts')
    .select('*')
    .gte('created_at', cutoffDate)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching history:', error);
    return [];
  }

  return charts.map(chart => ({
    id: chart.id,
    imageUrl: chart.image_url,
    analysis: chart.analysis,
    timestamp: new Date(chart.created_at).getTime()
  }));
}