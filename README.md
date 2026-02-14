# 🏥 RepoHealth AI

> **GitHub Repository Health Dashboard with AI-Powered Improvement Suggestions**

A beautiful, full-stack web application that analyzes any public GitHub repository and provides comprehensive health metrics, visualizations, and AI-generated insights to help you improve your repository.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 📊 Comprehensive Analytics
- **Health Score Calculation**: Get a 0-100 score based on multiple repository health factors
- **Real-time Metrics**: Stars, forks, issues, contributors, and more
- **Beautiful Visualizations**: Interactive charts showing commit activity, language breakdown, top contributors, and issues trends
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### 🤖 AI-Powered Insights
- **Intelligent Analysis**: Uses OpenAI or Google Gemini to analyze your repository
- **Actionable Suggestions**: Get prioritized, specific recommendations to improve your repo
- **Strength Recognition**: Identifies what your repository does well
- **Category-based Improvements**: Suggestions organized by Documentation, Maintenance, Community, Testing, Security, and Quality

### 🎨 Modern UI/UX
- **Dark Theme**: Eye-friendly dark mode with gradient accents
- **Smooth Animations**: Counting animations, fade-ins, and transitions
- **Skeleton Loaders**: Beautiful loading states while fetching data
- **Error Handling**: User-friendly error messages with retry options

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icon set
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Axios** - GitHub API client
- **OpenAI API** - AI-powered insights (or Google Gemini as alternative)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Required API Keys

You'll need the following API keys:

1. **GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `public_repo` (or `repo` for private repos)
   - Copy the generated token

2. **AI Provider API Key** (choose ONE):
   - **OpenAI API Key** (Recommended)
     - Get from: https://platform.openai.com/api-keys
     - Requires credits/subscription
   
   **OR**
   
   - **Google Gemini API Key**
     - Get from: https://makersuite.google.com/app/apikey
     - Free tier available

You'll also need API keys:
- **GitHub Personal Access Token** - [Create one here](https://github.com/settings/tokens)
  - For public repos: Select `public_repo` scope
  - For private repos: Select `repo` scope
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
  - OR **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## 🚀 Installation & Setup

### 1. Clone or Download the Repository

```bash
cd RepoHealthAI
```

### 2. Install Dependencies

Install dependencies for the root, client, and server:

```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

Or use the convenient script:

```bash
npm run install-all
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file and add your API keys:

```env
# GitHub Personal Access Token (Required)
GITHUB_TOKEN=your_github_personal_access_token_here

# AI Provider (Choose ONE)
# Option 1: OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Option 2: Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important Notes:**
- The GitHub token is **required** for the app to work
- You only need **one** AI provider (OpenAI OR Gemini)
- If both AI keys are provided, OpenAI will be used by default
- **Never commit your `.env` file** - it's already in `.gitignore`

### 4. Run the Application

Start both frontend and backend servers concurrently:

```bash
npm run dev
```

This will start:
- **Backend** on `http://localhost:5000`
- **Frontend** on `http://localhost:5173`

The browser should automatically open to `http://localhost:5173`

### Alternative: Run Servers Separately

In separate terminal windows:

```bash
# Terminal 1 - Start backend
npm run start:server

# Terminal 2 - Start frontend
npm run start:client
```

## 📖 How to Use

1. **Open the Application**: Navigate to `http://localhost:5173` in your browser

2. **Enter a Repository URL**: Paste any public GitHub repository URL in the search bar
   - Example: `https://github.com/facebook/react`
   - Also accepts format: `owner/repo`

3. **View the Analysis**: Wait a few seconds while the app:
   - Fetches repository data from GitHub
   - Calculates health score
   - Generates AI-powered insights

4. **Explore the Results**:
   - **Health Score**: See the overall health rating (0-100)
   - **Stats Cards**: View key metrics at a glance
   - **Charts**: Analyze commit activity, language distribution, contributors, and issues
   - **AI Insights**: Read the summary, strengths, and improvement suggestions

5. **Analyze Another Repository**: Simply enter a new URL in the search bar

## 🎯 Health Score Breakdown

The health score (0-100) is calculated based on:

| Factor | Points | Criteria |
|--------|--------|----------|
| **README Quality** | 20 | Has README (10) + Length > 500 chars (10) |
| **License** | 15 | Has a license file |
| **Issues Activity** | 20 | Closed/total ratio (15) + Recent activity (5) |
| **Commit Frequency** | 20 | Commits in last 30 days |
| **Contributors** | 10 | Number of contributors |
| **Community Engagement** | 15 | Stars and healthy fork ratio |

**Grade Scale:**
- 90-100: A+ (Excellent Health)
- 80-89: A (Great Health)
- 70-79: B (Good Health)
- 60-69: C (Fair Health)
- 50-59: D (Needs Improvement)
- 0-49: F (Poor Health)

## 📁 Project Structure

```
RepoHealthAI/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── SearchBar.jsx
│   │   │   ├── HealthScore.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── Charts.jsx
│   │   │   ├── AIAnalysis.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   └── ErrorDisplay.jsx
│   │   ├── utils/         # Utility functions
│   │   │   └── api.js     # API client
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                # Backend Node.js/Express
│   ├── routes/
│   │   └── analyzeRepo.js # Main API endpoint
│   ├── services/
│   │   ├── githubService.js  # GitHub API integration
│   │   └── aiService.js      # OpenAI/Gemini integration
│   ├── utils/
│   │   └── healthScore.js    # Health score calculator
│   ├── index.js           # Server entry point
│   └── package.json
├── .env                   # Environment variables (create this)
├── .env.example          # Environment variables template
├── .gitignore
├── package.json          # Root package.json with scripts
└── README.md
```

## 🔒 Security

- ✅ All API keys are stored in `.env` file (never committed)
- ✅ Backend reads environment variables using `dotenv`
- ✅ Frontend **never** has direct access to API keys
- ✅ All external API calls (GitHub, OpenAI, Gemini) go through backend
- ✅ `.env` is included in `.gitignore`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Add Environment Variables:**
   In Vercel Dashboard → Settings → Environment Variables:
   - `GITHUB_TOKEN` - Your GitHub Personal Access Token
   - `OPENAI_API_KEY` or `GEMINI_API_KEY` - Your AI provider key

4. **Deploy:** Click "Deploy" and you're live! 🎉

📖 **Detailed deployment guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🐛 Troubleshooting

### Backend won't start
- Make sure you're in the correct directory
- Check that `.env` file exists and has valid API keys
- Ensure port 5000 is not already in use

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check browser console for errors
- Make sure proxy is configured in `vite.config.js`

### GitHub API Rate Limiting
- Unauthenticated requests: 60 per hour
- Authenticated requests: 5,000 per hour
- Solution: Make sure your `GITHUB_TOKEN` is set in `.env`

### AI Analysis Not Working
- Verify you have either `OPENAI_API_KEY` or `GEMINI_API_KEY` in `.env`
- Check your API key is valid and has available credits
- Look at server logs for specific error messages

### Chart Data Not Showing
- Some repositories may have limited data
- Very new repositories may not have enough commit history
- Check browser console for any JavaScript errors

## 🚧 Known Limitations

- Only works with **public** GitHub repositories
- AI analysis requires an active API key with available credits
- GitHub API rate limits apply (5,000 requests/hour with token)
- Some charts may be empty for very new repositories

## 🔮 Future Improvements

- [ ] Support for private repositories
- [ ] User authentication system
- [ ] Save and compare multiple repositories
- [ ] Historical health score tracking
- [ ] Export reports as PDF
- [ ] More detailed code quality metrics
- [ ] Pull request analysis
- [ ] Integration with GitHub Actions
- [ ] Repository comparison tool
- [ ] Dark/Light theme toggle
- [ ] Customizable health score weights

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is licensed under the MIT License.

## 👏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)
- AI powered by [OpenAI](https://openai.com/) and [Google Gemini](https://ai.google.dev/)
- Data from [GitHub API](https://docs.github.com/en/rest)

---

**Made with ❤️ and AI**

If you find this project useful, please give it a ⭐️ on GitHub!
