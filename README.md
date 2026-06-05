# AI Tweet & Thread Generator

A  Next.js web application that integrates open-source Large Language Models (LLMs) to instantly generate attention-grabbing tweets and structured, multi-part Twitter threads based on user-defined topics, domains, keywords, and tones.

---

## 🚀 Key Features
* **Dual-Mode Generation:** Features separate dashboard interfaces to toggle interactively between building standalone optimized tweets or structured, multi-part threads.
* **Streamlined API Handler:** Utilizes lightweight, native asynchronous HTTP network layer handlers rather than heavy external SDK packages.
* **Low-Latency Inference:** Connects directly to the Groq API Gateway to tap into the high-speed execution performance of the open-source Llama 3.1 model.
* **Fault-Tolerant UI:** Built with strict conditional evaluation guards and optional chaining in React to handle network issues or API errors gracefully without application crashes.

---

## 🛠️ Tech Stack

### Frontend (Client-Side)
* **Framework:** Next.js (Pages Router)
* **Library:** React.js (State tracking hooks & asynchronous handling)
* **Styling:** Tailwind CSS (Responsive utility layout)

### Backend (Server-Side)
* **Runtime Environment:** Node.js
* **Server Architecture:** Next.js Serverless API Routes (`/api/returnThread`, `/api/returnJobDescription`)
* **Network Layer:** Native Asynchronous Fetch API

### AI Inference
* **Gateway Platform:** Groq Cloud API
* **Large Language Model (LLM):** Llama 3.1 (`llama-3.1-8b-instant`)

---

## ⚙️ Local Setup Instructions

Follow these steps to clone, configure, and boot the application locally on your machine.

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd AI-Tweet-Generator-main
```

### 3. Install Dependencies
Install the required packages managed via `package.json` (Note: `node_modules` are excluded from version tracking via `.gitignore` to keep the codebase lightweight):
```bash
npm install
```

### 4. Configure Environment Variables
Create a new file named `.env.local` in the **root directory** of the project and add your Groq API key:

```text
OPENAI_API_KEY=gsk_your_actual_groq_api_key_here
```


### 5. Launch the Development Server
Boot up the local Node.js compilation environment by running:
```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`** to test the application!

---

## 📁 Project Architecture & Data Flow

When a user initiates a text generation request, the data travels through the following loop:

1. **React Client State:** User inputs (topic, tone, length bounds) are gathered via component hooks (`useState`).
2. **Next.js Serverless API Route:** The client dispatches an HTTP `POST` fetch payload containing the form metrics to the hidden Node.js serverless environment.
3. **Groq Cloud Inference:** The server retrieves the protected environment variable key via `process.env`, constructs a standard chat completion message array schema, and handles raw network transmissions to Groq's endpoint.
4. **UI Reconciliation:** The raw generated text streams back to the serverless route, returns to the React view layer, calculates output field sizing dynamically, and displays inside the application text panel.
