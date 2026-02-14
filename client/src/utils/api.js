import axios from 'axios';

const API_BASE_URL = '/api';

/**
 * Analyze a GitHub repository
 * @param {string} repoUrl - The GitHub repository URL
 * @param {boolean} includeAI - Whether to include AI analysis (default: false)
 * @returns {Promise<Object>} The analysis data
 */
export async function analyzeRepo(repoUrl, includeAI = false) {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-repo`, {
      repoUrl,
      includeAI
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      throw new Error(error.response.data.message || 'Failed to analyze repository');
    } else if (error.request) {
      // Request was made but no response
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      // Something else happened
      throw new Error('Failed to make request: ' + error.message);
    }
  }
}

/**
 * Generate AI insights for a repository
 * @param {string} repoUrl - The GitHub repository URL
 * @param {Object} repoData - The repository data
 * @returns {Promise<Object>} The AI analysis
 */
export async function generateAIInsights(repoUrl, repoData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-ai-insights`, {
      repoUrl,
      repoData
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to generate AI insights');
    } else if (error.request) {
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      throw new Error('Failed to make request: ' + error.message);
    }
  }
}

/**
 * Check if the server is healthy
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data.status === 'Server is running';
  } catch (error) {
    return false;
  }
}
