# 🤖 AI Interview & Resume Optimization Platform

A full-stack web app that helps job seekers:
-  Practice technical interviews with real-time voice feedback
-  Optimize resumes using AI
-  Compare their resume with job descriptions
-  Get personalized study plans based on resume + job JD
-  Export enhanced resumes into beautiful templates

---

##  Features

###  AI Interview Prep
- Role-based dynamic question generation using OpenAI GPT-4
- Real-time voice interaction using Web Speech API
- Analysis after each answer:
  -  Technical & soft skill keywords
  -  Filler words
  -  Confidence scoring
-  Schedule emailed to your inbox
-  Option to resume interview session later

---

###  Resume & JD Comparison
- Upload your **resume (PDF)** and **Job Description (text/JSON)**
- Compares:
  -  Matched Keywords
  -  Unmatched Keywords
  -  ATS Match Score (aiming for 65%+)
- Uses `string-similarity`, `pdf-parse`, and OpenAI-based enhancements

---

###  Resume Optimizer
- Enhances your existing resume using:
  - AI-generated content
  - Strategic keyword insertion (into Experience & Skills)
- Adds unmatched keywords intelligently with natural phrasing
- Lets you preview changes before confirming
- Offers spell check, trust indicators, and undo/redo toggle

---

###  Resume Templates
- Choose from curated templates:
  - Junior, Mid-Level, Senior, Intern
- Automatically applies your optimized resume content
- Clean, modern UI (like Zety/Canva)
- Supports PDF download

---

###  Personalized Interview Study Plan
- Resume + JD-aware custom plan
- Tailored to your **experience level** and **interview date**
- Delivered via Email and also saved to MongoDB
- Tasks include:
  - Topic reviews
  - Mini projects
  - Quizzes
  - Mock interviews

---

##  Tech Stack

**Frontend:**
- React.js + Tailwind CSS
- Web Speech API
- Lottie animations
- OpenAI API (GPT-4)
- PDF parsing + keyword highlights

**Backend:**
- Node.js + Express
- Multer + pdf-parse
- Nodemailer (Gmail App Password)
- OpenAI SDK
- MongoDB + Mongoose
- dotenv

---
<img width="1280" height="757" alt="image" src="https://github.com/user-attachments/assets/ce7f27f0-7d22-4b06-bf8e-325894f93d16" />


##  .env Setup

```env
OPENAI_API_KEY=your_openai_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/?retryWrites=true&w=majority
