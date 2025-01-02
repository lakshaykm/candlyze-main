import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeChart(imageBase64: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Analyze this candlestick chart. Please provide:\n1. Detailed Key support and resistance levels\n2. Notable candlestick patterns\n3. Overall detailed trend analysis\n4. Chart analysis with indicator, if any indicator is present on the chart\n5. Potential price targets" 
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
      max_tokens: 500,
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
