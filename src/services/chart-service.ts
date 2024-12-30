import { supabase } from '../lib/supabase-client';
import { ChartEntry } from '../types';

const HOURS_48 = 48 * 60 * 60 * 1000;

export async function saveChart(imageUrl: string, analysis: string): Promise<void> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('Please sign in to save charts');
  }

  const { error } = await supabase
    .from('charts')
    .insert({
      image_url: imageUrl,
      analysis,
      user_id: user.id
    });

  if (error) {
    throw new Error('Failed to save chart');
  }
}

export async function getRecentCharts(): Promise<ChartEntry[]> {
  const cutoffDate = new Date(Date.now() - HOURS_48).toISOString();

  const { data, error } = await supabase
    .from('charts')
    .select('*')
    .gte('created_at', cutoffDate)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch charts');
  }

  return data.map(chart => ({
    id: chart.id,
    imageUrl: chart.image_url,
    analysis: chart.analysis,
    timestamp: new Date(chart.created_at).getTime()
  }));
}