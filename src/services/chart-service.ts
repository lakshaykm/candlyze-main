import { supabase } from '../lib/supabase-client';
import { ChartEntry } from '../types';

const DAYS_7 = 7 * 24 * 60 * 60 * 1000;
const CREDITS_PER_ANALYSIS = 100;

export async function saveChart(imageUrl: string, analysis: string): Promise<void> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('Please sign in to save charts');
  }

  // Get user's current credits
  const { data: creditData, error: creditError } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', user.id)
    .single();

  if (creditError) {
    throw new Error('Failed to check credits');
  }

  if (!creditData || creditData.credits < CREDITS_PER_ANALYSIS) {
    throw new Error('Insufficient credits. Please upgrade your plan to continue analyzing charts.');
  }

  // Start a transaction to update credits and save chart
  const { error: updateError } = await supabase
    .from('user_credits')
    .update({ credits: creditData.credits - CREDITS_PER_ANALYSIS })
    .eq('user_id', user.id);

  if (updateError) {
    throw new Error('Failed to update credits');
  }

  const { error } = await supabase
    .from('charts')
    .insert({
      image_url: imageUrl,
      analysis,
      user_id: user.id
    });

  if (error) {
    // If chart save fails, refund the credits
    await supabase
      .from('user_credits')
      .update({ credits: creditData.credits })
      .eq('user_id', user.id);
    throw new Error('Failed to save chart');
  }
}

export async function getRecentCharts(): Promise<ChartEntry[]> {
  const cutoffDate = new Date(Date.now() - DAYS_7).toISOString();

  const { data, error } = await supabase
    .from('charts')
    .select('*')
    .gte('created_at', cutoffDate)
    .order('created_at', { ascending: false })
    .limit(10); // Limit to 10 most recent entries for the dashboard

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

export async function getAllCharts(): Promise<ChartEntry[]> {
  const cutoffDate = new Date(Date.now() - DAYS_7).toISOString();

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
