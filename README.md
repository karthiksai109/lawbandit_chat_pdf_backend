# LawBandit — Chat with PDFs (Backend)

This is the backend for **LawBandit**, a project where you upload a PDF and then ask questions about it.  
It handles parsing PDFs, creating embeddings, and connecting with the LLM.  

Live backend: [https://lawbandit-chat-pdf-backend27.onrender.com](https://lawbandit-chat-pdf-backend27.onrender.com)

---

## What I used
- **Node.js + Express**
- **TypeScript**
- **pdf-parse** for PDF text extraction
- **Multer** for file uploads
- **HuggingFace Transformers (embeddings)**
- **Groq API** for answering questions
- Deployed on **Render**

---

## Features
- Upload PDFs with `multer`
- Parse and store text
- Create embeddings for chunks
- Ask questions and get contextual answers
- Handles CORS for Vercel frontend

---

## Project structure
backend/
src/
routes/ # upload and ask routes
services/ # embedding + pdf handling
middleware/ # error handler
uploads/ # uploaded PDFs
.env # secrets


---

## Setup (local)

1. Clone this repo:
   ```bash
   git clone https://github.com/karthiksai109/lawbandit_chat_pdf_backend.git
   cd lawbandit_chat_pdf_backend


Install deps:

npm install


Create .env file:

PORT=5000
GROQ_API_KEY=your_groq_key_here


Run dev:

npm run dev


Build + run prod:

npm run build
npm start

API Endpoints
Upload PDF
POST /api/upload


Form-data → file: PDF file

Returns → { id }

Ask question
POST /api/ask


JSON → { id, question }

Returns → { answer }

Notes

Backend is on Render

Frontend is on Vercel

Both connected via CORS (update allowedOrigins in index.ts if frontend URL changes)

License

MIT