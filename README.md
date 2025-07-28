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
<img width="1280" height="769" alt="image" src="https://github.com/user-attachments/assets/7418b8cf-0b79-49f2-ab5e-1c2a8f1380f0" />
<img width="2532" height="1461" alt="image" src="https://github.com/user-attachments/assets/fe4897a2-6786-46e6-9ca5-ea718ec4172f" />
<img width="1280" height="743" alt="image" src="https://github.com/user-attachments/assets/08a782c4-74e4-40d2-ac82-07f6b0b8bf9f" />
<img width="1280" height="765" alt="image" src="https://github.com/user-attachments/assets/673d417c-0919-4367-9769-79840f6f2005" />
<img width="1280" height="723" alt="image" src="https://github.com/user-attachments/assets/b8195fa8-ca69-4f60-bdfa-2fa6374b88cb" />
<img width="1280" height="660" alt="image" src="https://github.com/user-attachments/assets/1a5d8b50-753d-4c04-be87-4c399e0dc70a" />
<img width="1280" height="654" alt="image" src="https://github.com/user-attachments/assets/22f36373-f9d3-4927-b9c2-a936e232ac06" />
<img width="1280" height="780" alt="image" src="https://github.com/user-attachments/assets/981512f3-8795-40f2-bca7-801027e13f16" />
<img width="1280" height="751" alt="image" src="https://github.com/user-attachments/assets/debd44dc-6d4b-4c81-a39e-27ed273813e5" />
<img width="1600" height="932" alt="image" src="https://github.com/user-attachments/assets/4cef93a4-67f7-4ecb-b7cb-c1bc2e4ff258" />
<img width="1975" height="1400" alt="image" src="https://github.com/user-attachments/assets/90d7055a-6f63-4f36-b501-ff551a65c41c" />
<img width="1600" height="958" alt="image" src="https://github.com/user-attachments/assets/dc239996-9346-4a8e-a8a5-5a43f313a5cc" />
<img width="1600" height="957" alt="image" src="https://github.com/user-attachments/assets/fbb55d97-b6fb-46ec-a911-f47bb49e0881" />
<img width="1600" height="954" alt="image" src="https://github.com/user-attachments/assets/b15169df-6c4a-464e-9a10-6ebf3f7059e6" />

##  .env Setup

```env
OPENAI_API_KEY=your_openai_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/?retryWrites=true&w=majority
