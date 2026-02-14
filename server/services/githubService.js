import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// Function to get GitHub API client with current token
function getGithubApi() {
  return axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
}

/**
 * Fetch basic repository information
 */
export async function getRepoInfo(owner, repo) {
  try {
    const { data } = await getGithubApi().get(`/repos/${owner}/${repo}`);
    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      openIssues: data.open_issues_count,
      language: data.language,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      pushedAt: data.pushed_at,
      hasLicense: !!data.license,
      license: data.license?.name || null,
      defaultBranch: data.default_branch,
      topics: data.topics || []
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Repository not found. Please check the URL and make sure the repository is public.');
    }
    if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later or check your API token.');
    }
    throw new Error(`Failed to fetch repository info: ${error.message}`);
  }
}

/**
 * Fetch README content
 */
export async function getReadme(owner, repo) {
  try {
    const { data } = await getGithubApi().get(`/repos/${owner}/${repo}/readme`);
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return {
      exists: true,
      length: content.length,
      content: content.substring(0, 1000) // First 1000 chars for AI analysis
    };
  } catch (error) {
    return {
      exists: false,
      length: 0,
      content: ''
    };
  }
}

/**
 * Fetch commit activity for the last 30 days
 */
export async function getCommitActivity(owner, repo) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data } = await getGithubApi().get(`/repos/${owner}/${repo}/commits`, {
      params: {
        since: thirtyDaysAgo.toISOString(),
        per_page: 100
      }
    });

    // Group commits by date
    const commitsByDate = {};
    data.forEach(commit => {
      const date = commit.commit.author.date.split('T')[0];
      commitsByDate[date] = (commitsByDate[date] || 0) + 1;
    });

    // Create array of last 30 days with commit counts
    const chartData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      chartData.push({
        date: dateStr,
        commits: commitsByDate[dateStr] || 0
      });
    }

    return {
      totalCommits: data.length,
      chartData
    };
  } catch (error) {
    console.error('Error fetching commit activity:', error.message);
    return {
      totalCommits: 0,
      chartData: []
    };
  }
}

/**
 * Fetch contributors
 */
export async function getContributors(owner, repo) {
  try {
    const { data } = await getGithubApi().get(`/repos/${owner}/${repo}/contributors`, {
      params: { per_page: 10 }
    });

    return {
      total: data.length,
      top: data.slice(0, 10).map(contributor => ({
        login: contributor.login,
        contributions: contributor.contributions,
        avatar: contributor.avatar_url
      }))
    };
  } catch (error) {
    console.error('Error fetching contributors:', error.message);
    return {
      total: 0,
      top: []
    };
  }
}

/**
 * Fetch language statistics
 */
export async function getLanguages(owner, repo) {
  try {
    const { data } = await getGithubApi().get(`/repos/${owner}/${repo}/languages`);
    
    const total = Object.values(data).reduce((sum, bytes) => sum + bytes, 0);
    const languages = Object.entries(data).map(([name, bytes]) => ({
      name,
      bytes,
      percentage: ((bytes / total) * 100).toFixed(2)
    }));

    return {
      languages,
      primary: languages[0]?.name || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching languages:', error.message);
    return {
      languages: [],
      primary: 'Unknown'
    };
  }
}

/**
 * Fetch issues data
 */
export async function getIssuesData(owner, repo) {
  try {
    // Fetch open issues
    const openResponse = await getGithubApi().get(`/repos/${owner}/${repo}/issues`, {
      params: { state: 'open', per_page: 1 }
    });
    const openCount = parseInt(openResponse.headers['link']?.match(/page=(\d+)>; rel="last"/)?.[1] || openResponse.data.length);

    // Fetch closed issues
    const closedResponse = await getGithubApi().get(`/repos/${owner}/${repo}/issues`, {
      params: { state: 'closed', per_page: 1 }
    });
    const closedCount = parseInt(closedResponse.headers['link']?.match(/page=(\d+)>; rel="last"/)?.[1] || closedResponse.data.length);

    // Get recent issues activity
    const recentResponse = await getGithubApi().get(`/repos/${owner}/${repo}/issues`, {
      params: { state: 'all', per_page: 30, sort: 'updated' }
    });

    return {
      open: openCount,
      closed: closedCount,
      total: openCount + closedCount,
      recent: recentResponse.data.length
    };
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    return {
      open: 0,
      closed: 0,
      total: 0,
      recent: 0
    };
  }
}

/**
 * Get last commit date
 */
export async function getLastCommitDate(owner, repo, defaultBranch) {
  try {
    const { data } = await getGithubApi().get(`/repos/${owner}/${repo}/commits/${defaultBranch}`);
    return data.commit.author.date;
  } catch (error) {
    console.error('Error fetching last commit:', error.message);
    return null;
  }
}