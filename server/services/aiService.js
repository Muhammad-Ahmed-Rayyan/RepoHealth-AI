import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Function to get OpenAI client
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

// Function to get Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Generate AI-powered insights for the repository
 */
export async function generateAIInsights(repoData, healthScore) {
  // Debug logging
  console.log('🔍 Checking API keys...');
  console.log('OpenAI key exists:', !!process.env.OPENAI_API_KEY);
  console.log('Gemini key exists:', !!process.env.GEMINI_API_KEY);
  console.log('Gemini key value (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10));
  
  // Check which AI service is available
  const openaiClient = getOpenAIClient();
  const geminiClient = getGeminiClient();
  
  console.log('OpenAI client created:', !!openaiClient);
  console.log('Gemini client created:', !!geminiClient);

  if (!openaiClient && !geminiClient) {
    console.log('❌ No AI clients available');
    return {
      summary: "AI analysis unavailable. Please configure an API key for OpenAI or Google Gemini in your .env file.",
      strengths: [],
      suggestions: []
    };
  }

  const prompt = buildAnalysisPrompt(repoData, healthScore);

  try {
    if (openaiClient) {
      console.log('📡 Using OpenAI for analysis...');
      return await getOpenAIInsights(prompt, openaiClient);
    } else if (geminiClient) {
      console.log('📡 Using Gemini for analysis...');
      return await getGeminiInsights(prompt, geminiClient);
    }
  } catch (error) {
    console.error('❌ Error generating AI insights:', error.message);
    console.error('Full error:', error);
    return {
      summary: "Unable to generate AI insights at this time. Please try again later.",
      strengths: [],
      suggestions: [],
      error: error.message
    };
  }
}

/**
 * Build the analysis prompt for the AI
 */
function buildAnalysisPrompt(repoData, healthScore) {
  console.log('🤖 Building AI prompt with repoData:', {
    hasInfo: !!repoData?.info,
    hasReadme: !!repoData?.readme,
    hasCommits: !!repoData?.commits,
    hasContributors: !!repoData?.contributors,
    hasIssues: !!repoData?.issues,
    hasLanguages: !!repoData?.languages
  });

  const { info = {}, readme = {}, commits = {}, contributors = {}, issues = {}, languages = {} } = repoData || {};
  
  return `You are an expert code repository analyst. Analyze this GitHub repository and provide specific, actionable insights.

REPOSITORY DETAILS:
- Name: ${info?.fullName || 'Unknown'}
- Description: ${info?.description || 'No description'}
- Primary Language: ${languages?.primary || 'Unknown'}
- Stars: ${info?.stars || 0} | Forks: ${info?.forks || 0} | Watchers: ${info?.watchers || 0}
- Open Issues: ${issues?.open || 0} | Closed Issues: ${issues?.closed || 0}
- Contributors: ${contributors?.total || 0}
- Commits (last 30 days): ${commits?.totalCommits || 0}
- Has License: ${info?.hasLicense ? 'Yes (' + info.license + ')' : 'No'}
- Has README: ${readme?.exists ? 'Yes (' + readme.length + ' chars)' : 'No'}
- Last Updated: ${info?.pushedAt || 'Unknown'}

HEALTH SCORE: ${healthScore?.total || 0}/100 (${healthScore?.grade?.description || 'Unknown'})

README PREVIEW:
${readme?.content || 'No README available'}

TASK:
Provide a JSON response with the following structure:
{
  "summary": "A 2-3 sentence summary of the repository's overall health and purpose",
  "strengths": [
    "Strength 1 - what the repository does well",
    "Strength 2",
    "Strength 3"
  ],
  "suggestions": [
    {
      "priority": "High|Medium|Low",
      "category": "Documentation|Maintenance|Community|Testing|Security|Quality",
      "title": "Brief title of the suggestion",
      "description": "Detailed explanation of the issue and specific steps to fix it"
    }
  ]
}

Guidelines:
- Provide 3-5 genuine strengths based on the data
- Provide 4-6 prioritized, specific, actionable suggestions
- Focus on improvements that would have the most impact
- Be constructive and specific
- Consider the repository's activity level, community engagement, documentation, and code quality indicators
- Ensure all output is valid JSON`;
}

/**
 * Get insights from OpenAI
 */
async function getOpenAIInsights(prompt, openaiClient) {
  const completion = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an expert GitHub repository analyst. Provide insights in valid JSON format only."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1500,
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(completion.choices[0].message.content);
  return result;
}

/**
 * Get insights from Google Gemini
 */
/**
 * Get insights from Google Gemini
 */
/**
 * Get insights from Google Gemini
 */
async function getGeminiInsights(prompt, geminiClient) {
  const model = geminiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from markdown code blocks if present
  let jsonText = text;
  const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }
  
  return JSON.parse(jsonText);
}