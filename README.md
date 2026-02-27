<div align="center">
  <img src="https://github.com/Muhammad-Ahmed-Rayyan/RepoHealth-AI/blob/main/RepoHealth-AI.png" width="500">
  
  #
  
  <p><b>GitHub Repository Health Dashboard with AI-Powered Improvement Suggestions</b></p>

![Last Commit](https://img.shields.io/github/last-commit/Muhammad-Ahmed-Rayyan/RepoHealth-AI)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![languages](https://img.shields.io/github/languages/count/Muhammad-Ahmed-Rayyan/RepoHealth-AI)

<br>
 
Built with the tools and technologies:
 
![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884d8.svg?style=for-the-badge&logo=recharts&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-white.svg?style=for-the-badge&logo=openai&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini-white.svg?style=for-the-badge&logo=google-gemini&logoColor=4285F4)
![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🧠 Project Summary

**RepoHealth AI** is a full-stack web application that analyzes any public GitHub repository and provides a comprehensive health evaluation using real-time metrics and AI-powered insights.

The platform calculates a repository health score (0–100) based on documentation quality, activity, community engagement, and maintenance patterns — then generates actionable AI recommendations to improve the repository.

🔗 Live: [RepoHealth-AI](https://repohealth-ai.vercel.app)

---

## 🌟 Core Features

### 📊 Comprehensive Analytics

- Health Score calculation (0–100)
- Real-time GitHub metrics
- Interactive charts (commits, languages, contributors, issues)
- Fully responsive design
- Dark / Light theme support

### 🤖 AI-Powered Insights

- Manual AI trigger
- Intelligent repository analysis
- Actionable improvement suggestions
- Strength recognition
- Categorized recommendations

### 🎨 Modern UI/UX

- Professional dashboard layout
- Smooth animations & skeleton loaders
- Error handling with retry support
- Mobile-optimized interface

---

## ⚙️ Technical Architecture

- Frontend: React 18 + Vite
- Styling: Tailwind CSS
- Data Visualization: Recharts
- Backend: Node.js + Express
- GitHub Integration: GitHub REST API
- AI Engine: OpenAI API or Google Gemini
- HTTP Client: Axios
- Deployment: Vercel

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Muhammad-Ahmed-Rayyan/RepoHealth-AI.git
cd RepoHealth-AI

# Install dependencies
npm run install-all

# Run the development server
npm run dev
```

---

## 🔑 Environment Configuration

Create a `.env` file:

```env
GITHUB_TOKEN=your_github_personal_access_token
OPENAI_API_KEY=your_openai_api_key
# OR
GEMINI_API_KEY=your_gemini_api_key
```

---

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

---


## 🎯 Health Score Breakdown

| Factor | Points |
|--------|--------|
| README Quality | 20 |
| License Presence | 15 |
| Issues Activity | 20 |
| Commit Frequency | 20 |
| Contributors | 10 |
| Community Engagement | 15 |

---


<div align="center">

⭐ Like this repo? Star it to keep it going!

</div>
