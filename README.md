
  <h3 align="center">Logic Coach 🧠</h3>

  <p align="center">
    An intelligent, gamified platform to master Data Structures & Algorithms and Programming Languages with AI-driven insights.
    <br />
    <a href="https://logic-coach-web.vercel.app"><strong>Explore the platform »</strong></a>
    <br />
    <br />
    <a href="https://github.com/vaibhavv-labs/logic-coach-web/issues">Report Bug</a>
    ·
    <a href="https://github.com/vaibhavv-labs/logic-coach-web/issues">Request Feature</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## 💡 About The Project

Logic Coach is a next-generation learning platform built to help developers, students, and professionals master competitive programming, Data Structures & Algorithms (DSA), and core programming languages.

By integrating the powerful **Google Gemini 2.0 Flash AI**, the platform offers personalized guidance, real-time code analysis, and Big O complexity breakdowns as if you were pair-programming with an expert engineer. Users can write, test, and execute code directly in their browser using an integrated IDE powered by the **Piston Code Execution API**.

## ✨ Key Features

- **🎯 Personalized Onboarding:** Tailored learning paths adapted to your specific role, interests, and goals.
- **🤖 AI-Powered Mentorship:** Get real-time hints, debugging assistance, and step-by-step Socratic teaching from the integrated Gemini AI.
- **💻 Integrated Web IDE:** Write and execute code instantly in Python, JavaScript, C++, Java, Rust, and Go without leaving the browser.
- **📊 Real-Time Analytics:** Visualize your progress with GitHub-style activity heatmaps, daily streaks, and problem-solving statistics.
- **🏆 Global Leaderboard:** Compete against other developers in real-time.
- **🌙 Seamless Dark Mode:** A sleek, fully responsive dark theme designed for deep focus.
- **🔒 Secure Authentication:** Multi-provider authentication (Google, Email/Password, and Guest accounts) powered by Firebase.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vaibhavv-labs/logic-coach-web.git
   ```
2. Navigate to the project directory
   ```sh
   cd logic-coach-web
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following keys to connect your own Firebase and AI instances:

```env
# Gemini AI (Required)
GEMINI_API_KEY=your_gemini_api_key

# Firebase Configuration (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Telegram Notification Bot (Optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
