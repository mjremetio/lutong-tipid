# Lutong Tipid - AI-Powered Filipino Meal Planner

Lutong Tipid is a full-stack web app that generates affordable, nutritious weekly meal plans for Filipino families on a budget. Powered by AI (Groq/Llama 3.3 70B), it creates authentic Filipino meal plans with real palengke prices, detailed recipes in Taglish, and smart grocery lists.

## Screenshots

<!-- Add your screenshots here -->
| Home | Meal Plan | Grocery List |
|------|-----------|--------------|
| ![Home](screenshots/home.png) | ![Meal Plan](screenshots/mealplan.png) | ![Grocery List](screenshots/grocery.png) |

| Budget Form | Recipe View | Export |
|-------------|-------------|--------|
| ![Budget Form](screenshots/budget-form.png) | ![Recipe](screenshots/recipe.png) | ![Export](screenshots/export.png) |

> To add screenshots: create a `screenshots/` folder in the project root and add your images there.

## Features

- **AI Meal Planning** — Generates 7-day meal plans with authentic Filipino dishes (Adobo, Sinigang, Tinola, Pinakbet, etc.)
- **Budget-Aware** — Plans stay within your weekly budget using real Philippine wet market prices
- **Family Size Scaling** — Supports 1-50 people with automatic portion scaling
- **Smart Grocery List** — Auto-generated, consolidated grocery list grouped by store section
- **Detailed Recipes** — Step-by-step Taglish cooking instructions, the way nanay teaches sa kusina
- **Meal Swapping** — Don't like a dish? Swap it for an AI-suggested alternative
- **Budget Feasibility Check** — Real-time budget analysis before generating the plan
- **Export Options** — Download as text, CSV, or print your meal plan and grocery list
- **Regional Pricing** — Supports Metro Manila, Luzon, Visayas, and Mindanao pricing
- **Dietary Restrictions** — No pork, no beef, no seafood, pescatarian, vegetarian, low sodium, low sugar
- **Mobile Responsive** — Works great on phones, tablets, and desktop

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS v4
- React Router v6
- Axios
- Lucide React icons

### Backend
- Express.js + TypeScript
- Groq SDK (Llama 3.3 70B Versatile)
- PostgreSQL + Drizzle ORM
- Zod validation
- Helmet + rate limiting

### Deployment
- Vercel (frontend + serverless API)
- Neon/Supabase (PostgreSQL)

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Groq API key ([get one here](https://console.groq.com))

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/mjremetio/lutong-tipid.git
   cd lutong-tipid
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example server/.env
   ```
   Edit `server/.env` and fill in your values:
   ```
   PORT=3001
   NODE_ENV=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lutong_tipid
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.3-70b-versatile
   CLIENT_URL=http://localhost:5173
   ```

3. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. **Push database schema**
   ```bash
   cd server && npx drizzle-kit push
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 — Backend
   cd server && npm run dev

   # Terminal 2 — Frontend
   cd client && npm run dev
   ```

6. Open http://localhost:5173

## Deployment (Vercel)

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:

   | Variable | Value |
   |----------|-------|
   | `GROQ_API_KEY` | Your Groq API key |
   | `GROQ_MODEL` | `llama-3.3-70b-versatile` |
   | `DATABASE_URL` | Your cloud PostgreSQL URL |
   | `CLIENT_URL` | Your Vercel app URL |
   | `NODE_ENV` | `production` |

4. Deploy!

## Project Structure

```
lutong-tipid/
├── api/                    # Vercel serverless entry point
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utils, types, API client
│       └── pages/          # Route pages
├── server/                 # Express backend
│   └── src/
│       ├── config/         # Env, CORS config
│       ├── controllers/    # Route handlers
│       ├── data/           # Ingredient price database
│       ├── db/             # Drizzle schema & connection
│       ├── middleware/      # Auth, validation, rate limiting
│       ├── routes/         # API routes
│       ├── services/       # Business logic & AI integration
│       └── types/          # TypeScript types
└── vercel.json             # Vercel config
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/mealplan/generate` | Generate a 7-day meal plan |
| POST | `/api/mealplan/swap` | Swap a single meal |
| POST | `/api/mealplan/validate` | Check budget feasibility |
| POST | `/api/recipe` | Get detailed recipe for a dish |
| GET | `/api/grocery/:planId` | Get grocery list for a plan |
| GET | `/api/health` | Health check |

## License

MIT
