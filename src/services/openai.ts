import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

type AnalysisType = 'key-levels' | 'trend' | 'patterns' | 'indicators' | 'prediction' | 'general' | 'quick';

const ANALYSIS_PROMPTS: Record<AnalysisType, string> = {
  'key-levels': `Analyze this candlestick chart focusing on key price levels. Please provide:
1. Major support levels with detailed explanation of their significance
2. Major resistance levels with detailed explanation of their significance
3. Key psychological price levels and round numbers
4. Historical price reaction at these levels
5. Potential breakout or breakdown levels
6. Recommendations for stop loss and take profit levels based on key levels`,
  
  'trend': `Analyze this candlestick chart focusing on trend analysis. Please provide:
1. Primary trend direction (bullish, bearish, or sideways)
2. Trend strength analysis using price action and candlestick patterns
3. Key trend lines and channels
4. Potential trend reversal signals or continuation patterns
5. Multiple timeframe trend analysis if visible
6. Volume analysis and its relationship with the trend
7. Momentum analysis
8. Key swing highs and lows
9. Potential trend targets based on price action
10. Risk management suggestions for trend trading`,

  'patterns': `Analyze this candlestick chart focusing on pattern recognition. Please provide:
1. Identification of any classical chart patterns (e.g., Head & Shoulders, Double Top/Bottom, Triangle, etc.)
2. Candlestick patterns and their significance
3. Pattern completion percentage and validity analysis
4. Potential price targets based on the identified patterns
5. Suggested entry points with specific price levels
6. Stop loss levels based on pattern structure
7. Take profit targets with rationale
8. Pattern reliability assessment
9. Volume confirmation analysis
10. Risk-to-reward ratio for the potential trade setup
11. Additional confirmation signals to watch for
12. Time frame considerations for the pattern`,

  'indicators': "Analyze this candlestick chart. Focus on technical indicators...",
  'prediction': "Analyze this candlestick chart. Focus on price predictions...",
  'general': "Analyze this candlestick chart. Please provide:\n1. Key support and resistance levels\n2. Notable candlestick patterns\n3. Overall trend analysis\n4. Technical indicator analysis if present\n5. Potential price targets",
  'quick': `Provide a concise analysis of this candlestick chart focusing on:

1. Key Levels Analysis:
   - Major support levels
   - Major resistance levels
   - Key psychological levels
   - Potential breakout/breakdown points

2. Trend Analysis:
   - Current trend direction and strength
   - Key trend lines
   - Potential reversal signals
   - Important price targets

Please keep the analysis brief but actionable.`
};

export async function analyzeChart(imageBase64: string, type: AnalysisType = 'quick'): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
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
