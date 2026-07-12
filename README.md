# Logic Coach 🧠

**Learn to think like a programmer.** Build coding logic step-by-step through interactive Socratic dialogue with your AI tutor.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-1.5-blue?style=flat-square&logo=google)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🎯 **7 Curated Logic Problems** — From FizzBuzz to Pyramid Patterns
- 🤖 **Socratic AI Coach** — Guides you with questions, never gives direct answers
- 🌐 **Multi-Lingual** — Supports English, Hindi, Marathi, and Hinglish
- 🔒 **Secure API** — Gemini key stays server-side, never exposed to the browser
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- 🌙 **Premium Dark UI** — Glassmorphism design with smooth micro-animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Gemini API Key ([Get one free here](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/vaibhavv-labs/logic-coach-web.git
cd logic-coach-web

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local

# Add your Gemini API key to .env.local
# GEMINI_API_KEY=your_key_here

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment

### Deploy on Vercel (Recommended — Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Import Project"** and select this repository
4. Add `GEMINI_API_KEY` as an Environment Variable
5. Click **Deploy** — your app will be live in ~60 seconds!

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with API routes |
| **Google Gemini 1.5 Flash** | AI-powered Socratic tutoring |
| **Vanilla CSS** | Premium glassmorphism dark UI |

## 📁 Project Structure

```
logic-coach-web/
├── app/
│   ├── api/chat/route.js    # Secure Gemini API backend
│   ├── data/problems.js     # 7 predefined logic problems
│   ├── globals.css           # Premium dark theme CSS
│   ├── layout.js             # Root layout with SEO
│   └── page.js               # Main app (Login + Chat UI)
├── .env.example              # Environment template
├── .env.local                # Your API key (git-ignored)
└── package.json
```

## 👨‍💻 Author

**Vaibhav Bhoyate** — [@vaibhavv-labs](https://github.com/vaibhavv-labs)

## 📄 License

This project is open source under the [MIT License](LICENSE).
