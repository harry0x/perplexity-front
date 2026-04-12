# 🔮 Perplexity — Frontend

A modern, real-time AI chat interface built with **React 19**, **Vite**, **TailwindCSS v4**, and **Redux Toolkit**. Communicates with the backend via REST APIs and Socket.IO for a seamless conversational experience.

---

## 🚀 Tech Stack

| Layer           | Technology                               |
| --------------- | ---------------------------------------- |
| Framework       | React 19                                 |
| Build Tool      | Vite 7                                   |
| Styling         | TailwindCSS v4 (Vite plugin)             |
| State Mgmt      | Redux Toolkit + React-Redux              |
| Routing         | React Router v7                          |
| HTTP Client     | Axios                                    |
| Real-time       | Socket.IO Client                         |
| Linting         | ESLint 9 + React Hooks / Refresh plugins |

---

## 📁 Project Structure

```
Frontend/
├── index.html                 # HTML entry point
├── vite.config.js             # Vite + React + TailwindCSS config
├── eslint.config.js           # ESLint configuration
├── package.json
├── public/                    # Static assets
└── src/
    ├── main.jsx               # React DOM root
    ├── app/
    │   ├── App.jsx            # Root component
    │   ├── app.routes.jsx     # Route definitions (React Router v7)
    │   ├── app.store.js       # Redux store configuration
    │   └── index.css          # Global styles
    └── features/
        ├── auth/
        │   ├── auth.slice.js          # Auth Redux slice
        │   ├── componenta/            # Auth components (Protected route)
        │   ├── hook/                  # Auth custom hooks
        │   ├── pages/                 # Login, Register pages
        │   └── service/               # Auth API service
        └── chat/
            ├── hooks/                 # Chat custom hooks
            ├── pages/                 # Dashboard (main chat UI)
            └── service/               # Chat API service
```

---

## ✨ Features

- **🔐 Authentication** — Register, login, email verification, and session persistence via JWT cookies
- **🛡️ Protected Routes** — Dashboard is wrapped in a `Protected` component that enforces auth
- **💬 AI Chat** — Real-time conversational interface powered by Gemini + Mistral on the backend
- **📂 Chat Management** — Create, view, switch between, and delete chat conversations
- **⚡ Real-time Updates** — Socket.IO integration for live message streaming
- **🎨 Modern UI** — TailwindCSS v4 with a clean, responsive design
- **🗃️ State Management** — Centralised state with Redux Toolkit for auth and chat slices

---

## 🛣️ Routes

| Path          | Component     | Auth Required | Description              |
| ------------- | ------------- | ------------- | ------------------------ |
| `/`           | `Dashboard`   | ✓             | Main chat interface      |
| `/dashboard`  | —             | —             | Redirects to `/`         |
| `/login`      | `Login`       | ✗             | User login page          |
| `/register`   | `Register`    | ✗             | User registration page   |

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- Backend server running on `http://localhost:3000` (see [perplexity backend](https://github.com/harry0x/perplexity))

### Installation

```bash
# Clone the repository
git clone git@github.com:harry0x/perplexity-front.git
cd perplexity-front

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will start on **`http://localhost:5173`** with hot module replacement enabled.

---

## 📜 Scripts

| Script    | Command           | Description                            |
| --------- | ----------------- | -------------------------------------- |
| `dev`     | `vite`            | Start dev server with HMR              |
| `build`   | `vite build`      | Build production bundle                |
| `preview` | `vite preview`    | Preview the production build locally   |
| `lint`    | `eslint .`        | Run ESLint across the project          |

---

## 🔧 Configuration

### Vite

The project uses [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) for Fast Refresh and [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/vite) for TailwindCSS v4 integration.

```js
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### ESLint

For production apps, consider enabling type-aware lint rules with TypeScript. See the [Vite TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for integration guidance with [`typescript-eslint`](https://typescript-eslint.io).

---

## 🤝 Related

- **Backend** → [perplexity](https://github.com/harry0x/perplexity) — Express + MongoDB + LangChain + Socket.IO

---

## 📄 License

Private
