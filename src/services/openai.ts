import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

type AnalysisType = 'key-levels' | 'trend' | 'patterns' | 'indicators' | 'prediction' | 'general';

const ANALYSIS_PROMPTS: Record<AnalysisType, string> = {
  'key-levels': `Analyze this candlestick chart focusing on key price levels. Please provide:
1. Major support levels with detailed explanation of their significance
2. Major resistance levels with detailed explanation of their significance
3. Key psychological price levels and round numbers
4. Historical price reaction at these levels
5. Potential breakout or breakdown levels
6. Recommendations for stop loss and take profit levels based on key levels`,
  
  'trend': "Analyze this candlestick chart. Focus on trend analysis...",
  'patterns': "Analyze this candlestick chart. Focus on pattern recognition...",
  'indicators': "Analyze this candlestick chart. Focus on technical indicators...",
  'prediction': "Analyze this candlestick chart. Focus on price predictions...",
  'general': "Analyze this candlestick chart. Please provide:\n1. Key support and resistance levels\n2. Notable candlestick patterns\n3. Overall trend analysis\n4. Technical indicator analysis if present\n5. Potential price targets"
};

export async function analyzeChart(imageBase64: string, type: AnalysisType = 'general'): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: ANALYSIS_PROMPTS[type]
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64
              }
            }
          ],
        }
      ],
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "No analysis available";
  } catch (error) {
    console.error('Error analyzing chart:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to analyze chart: ${error.message}`);
    }
    throw new Error('Failed to analyze chart');
  }
}
