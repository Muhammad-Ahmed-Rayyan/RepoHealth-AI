import { generateAIInsights } from '../services/aiService.js';
import { calculateHealthScore } from '../utils/healthScore.js';

/**
 * Route handler for generating AI insights separately
 */
export async function generateAIInsightsRoute(req, res) {
  try {
    const { repoUrl, repoData } = req.body;

    console.log('📥 AI Insights request received');
    console.log('🔗 Repo URL:', repoUrl);
    console.log('📦 RepoData received:', {
      hasInfo: !!repoData?.info,
      hasReadme: !!repoData?.readme,
      hasCommits: !!repoData?.commits,
      hasContributors: !!repoData?.contributors,
      hasIssues: !!repoData?.issues,
      hasLanguages: !!repoData?.languages
    });

    if (!repoUrl || !repoData) {
      console.error('❌ Missing required data in request');
      return res.status(400).json({
        error: 'Missing required data',
        message: 'Please provide repository URL and data'
      });
    }

    console.log(`🤖 Generating AI insights for: ${repoUrl}`);

    // Calculate health score from the provided data
    const healthScore = calculateHealthScore(repoData);
    console.log('📊 Calculated health score:', healthScore.total);

    // Generate AI insights
    const aiAnalysis = await generateAIInsights(repoData, healthScore);
    
    console.log('✅ AI analysis complete');

    res.json(aiAnalysis);
  } catch (error) {
    console.error('❌ AI generation error:', error);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({
      error: 'AI generation failed',
      message: error.message
    });
  }
}
