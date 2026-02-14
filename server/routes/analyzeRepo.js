import {
  getRepoInfo,
  getReadme,
  getCommitActivity,
  getContributors,
  getLanguages,
  getIssuesData,
  getLastCommitDate
} from '../services/githubService.js';
import { calculateHealthScore } from '../utils/healthScore.js';
import { generateAIInsights } from '../services/aiService.js';

/**
 * Extract owner and repo name from GitHub URL
 */
function parseGitHubUrl(url) {
  try {
    // Handle different GitHub URL formats
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/]+)/,
      /^([^\/]+)\/([^\/]+)$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        const owner = match[1];
        let repo = match[2];
        
        // Remove .git suffix if present
        repo = repo.replace(/\.git$/, '');
        
        // Remove trailing slashes or other characters
        repo = repo.replace(/[\/\s]*$/, '');
        
        return { owner, repo };
      }
    }
    
    throw new Error('Invalid GitHub URL format');
  } catch (error) {
    throw new Error('Invalid GitHub URL. Please use format: https://github.com/owner/repo');
  }
}

/**
 * Main route handler for repository analysis
 */
export async function analyzeRepository(req, res) {
  try {
    const { repoUrl, includeAI = false } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        error: 'Missing repository URL',
        message: 'Please provide a GitHub repository URL'
      });
    }

    // Parse the GitHub URL
    const { owner, repo } = parseGitHubUrl(repoUrl);
    console.log(`📊 Analyzing repository: ${owner}/${repo}`);

    // Fetch all GitHub data in parallel for better performance
    const [
      info,
      readme,
      commits,
      contributors,
      languages,
      issues
    ] = await Promise.all([
      getRepoInfo(owner, repo),
      getReadme(owner, repo),
      getCommitActivity(owner, repo),
      getContributors(owner, repo),
      getLanguages(owner, repo),
      getIssuesData(owner, repo)
    ]);

    // Get last commit date
    const lastCommitDate = await getLastCommitDate(owner, repo, info.defaultBranch);

    // Compile all repository data
    const repoData = {
      info: {
        ...info,
        lastCommitDate
      },
      readme,
      commits,
      contributors,
      languages,
      issues
    };

    // Calculate health score
    const healthScore = calculateHealthScore(repoData);
    console.log(`✅ Health Score: ${healthScore.total}/100`);

    // Prepare response
    const response = {
      repository: {
        name: info.name,
        fullName: info.fullName,
        description: info.description,
        url: `https://github.com/${owner}/${repo}`
      },
      healthScore: {
        total: healthScore.total,
        breakdown: healthScore.breakdown,
        grade: healthScore.grade
      },
      stats: {
        stars: info.stars,
        forks: info.forks,
        watchers: info.watchers,
        openIssues: issues.open,
        closedIssues: issues.closed,
        contributors: contributors.total,
        language: languages.primary,
        lastCommit: lastCommitDate,
        hasLicense: info.hasLicense,
        license: info.license
      },
      charts: {
        commitActivity: commits.chartData,
        languages: languages.languages,
        topContributors: contributors.top,
        issues: {
          open: issues.open,
          closed: issues.closed
        }
      },
      // Include raw repoData for AI generation later
      _rawData: repoData
    };

    // Only include AI analysis if requested
    if (includeAI) {
      console.log('🤖 Generating AI insights...');
      const aiAnalysis = await generateAIInsights(repoData, healthScore);
      response.aiAnalysis = aiAnalysis;
      console.log('✅ AI analysis complete');
    }

    res.json(response);
  } catch (error) {
    console.error('❌ Analysis error:', error);
    
    // Send appropriate error response
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
}
