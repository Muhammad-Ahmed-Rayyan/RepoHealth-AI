/**
 * Calculate repository health score (0-100)
 * Based on multiple factors that indicate a healthy, well-maintained repository
 */
export function calculateHealthScore(repoData) {
  if (!repoData) {
    console.error('❌ No repoData provided to calculateHealthScore');
    return {
      total: 0,
      breakdown: {},
      grade: { letter: 'F', description: 'No Data' }
    };
  }

  let score = 0;
  const breakdown = {};

  // 1. README Quality (20 points)
  let readmeScore = 0;
  if (repoData?.readme?.exists) {
    readmeScore += 10;
    breakdown.readme_exists = 10;
  }
  if (repoData?.readme?.length > 500) {
    readmeScore += 10;
    breakdown.readme_quality = 10;
  } else if (repoData?.readme?.exists) {
    const partialScore = Math.floor((repoData.readme.length / 500) * 10);
    readmeScore += partialScore;
    breakdown.readme_quality = partialScore;
  }
  score += readmeScore;

  // 2. License (15 points)
  if (repoData?.info?.hasLicense) {
    score += 15;
    breakdown.license = 15;
  }

  // 3. Issues Activity (20 points)
  let issuesScore = 0;
  if (repoData?.issues?.total > 0) {
    const closedRatio = repoData.issues.closed / repoData.issues.total;
    issuesScore = Math.floor(closedRatio * 15);
    breakdown.issues_management = issuesScore;
    
    // Bonus for recent activity
    if (repoData.issues.recent > 0) {
      issuesScore += 5;
      breakdown.issues_activity = 5;
    }
  } else {
    // New repos with no issues get partial credit
    issuesScore = 10;
    breakdown.issues_management = 10;
  }
  score += Math.min(issuesScore, 20);

  // 4. Commit Frequency (20 points)
  const commitCount = repoData?.commits?.totalCommits || 0;
  let commitScore = 0;
  if (commitCount >= 10) {
    commitScore = 20;
  } else if (commitCount >= 5) {
    commitScore = 15;
  } else if (commitCount >= 1) {
    commitScore = 10;
  }
  score += commitScore;
  breakdown.commit_frequency = commitScore;

  // 5. Contributors (10 points)
  const contributorCount = repoData?.contributors?.total || 0;
  let contributorScore = 0;
  if (contributorCount >= 6) {
    contributorScore = 10;
  } else if (contributorCount >= 2) {
    contributorScore = 7;
  } else if (contributorCount >= 1) {
    contributorScore = 3;
  }
  score += contributorScore;
  breakdown.contributors = contributorScore;

  // 6. Community Engagement (15 points)
  let engagementScore = 0;
  const stars = repoData?.info?.stars || 0;
  const forks = repoData?.info?.forks || 0;
  
  // Stars indicate popularity
  if (stars >= 100) {
    engagementScore += 7;
  } else if (stars >= 10) {
    engagementScore += 5;
  } else if (stars >= 1) {
    engagementScore += 2;
  }
  
  // Healthy fork ratio
  if (stars > 0) {
    const forkRatio = forks / stars;
    if (forkRatio >= 0.1 && forkRatio <= 0.5) {
      engagementScore += 8;
    } else if (forkRatio > 0) {
      engagementScore += 4;
    }
  }
  
  score += Math.min(engagementScore, 15);
  breakdown.community_engagement = Math.min(engagementScore, 15);

  return {
    total: Math.min(score, 100),
    breakdown,
    grade: getGrade(score)
  };
}

/**
 * Get letter grade based on score
 */
function getGrade(score) {
  if (score >= 90) return { letter: 'A+', description: 'Excellent Health' };
  if (score >= 80) return { letter: 'A', description: 'Great Health' };
  if (score >= 70) return { letter: 'B', description: 'Good Health' };
  if (score >= 60) return { letter: 'C', description: 'Fair Health' };
  if (score >= 50) return { letter: 'D', description: 'Needs Improvement' };
  return { letter: 'F', description: 'Poor Health' };
}
