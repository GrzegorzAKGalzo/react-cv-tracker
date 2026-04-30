# CV Tracker

A clean, fast job application tracker built with Next.js 16 and React 19. Sign in with Google, add applications, and track every stage of your job search — from first apply to offer.

## Features

- **Google OAuth** — one-click sign-in, no passwords
- **Full CRUD** — add, edit, and delete job applications
- **Status tracking** — Applied, Interviewing, Offered, Rejected
- **Live stats dashboard** — counts per status at a glance
- **Filter by status** with live counts in the dropdown
- **Toast notifications** — instant feedback on every action
- **Accessible** — WCAG 2.1 AA: label associations, dialog roles, keyboard navigation, Escape to close
- **Fully responsive** — mobile-first layout, works on any screen size
- **Skeleton loading** — no content flash on initial load

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Auth | NextAuth v4 (Google OAuth) |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |
| Language | TypeScript |

## Architecture

Data is stored in `localStorage` via a typed `ApplicationRepository` interface (`src/lib/repository.ts`). The repository pattern decouples the UI from the storage layer — swapping to Prisma/PostgreSQL requires only a new implementation of that interface, with zero changes to components.

```
src/
├── app/
│   ├── (auth)/login/       # Google sign-in page
│   ├── api/auth/           # NextAuth route handler
│   ├── dashboard/          # Protected dashboard
│   └── layout.tsx          # Root layout + Toaster
├── components/
│   ├── ApplicationCard     # Card with hover-reveal actions
│   ├── ApplicationModal    # Add/edit form modal
│   ├── StatsCards          # Status count overview
│   └── StatusBadge         # Color + symbol status pill
├── lib/
│   └── repository.ts       # localStorage CRUD (swappable)
├── middleware.ts            # Route protection
└── types/
    └── application.ts      # Shared TypeScript types
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/react-cv-tracker.git
cd react-cv-tracker
npm install
```

### 2. Set up Google OAuth

Create a project in [Google Cloud Console](https://console.cloud.google.com/), enable the OAuth 2.0 API, and add `http://localhost:3000/api/auth/callback/google` as an authorised redirect URI.

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Application Fields

| Field | Required | Notes |
|---|---|---|
| Position | Yes | Job title |
| Company | Yes | Company name |
| Status | Yes | Applied / Interviewing / Offered / Rejected |
| Date Applied | Yes | Defaults to today |
| Job URL | No | Link to the job posting |
| Salary | No | e.g. $120k–$150k |
| Notes | No | Max 500 characters |

## Roadmap

- [ ] PostgreSQL backend via Prisma
- [ ] Sort by date / company / status
- [ ] Dark mode
- [ ] CSV export
- [ ] Application timeline / activity log

## License

MIT
