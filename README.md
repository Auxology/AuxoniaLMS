# Auxonia LMS

A learning management system built with Next.js, React, and PostgreSQL.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Better Auth, Prisma ORM, PostgreSQL
- **UI**: Radix UI components, shadcn/ui
- **Email**: Resend
- **Security**: Arcjet

## Features

- User authentication with email verification
- Admin dashboard with analytics
- Course management
- Responsive design
- Dark/light theme

## Getting Started

1. Install dependencies:

    ```bash
    bun install
    ```

2. Set up environment variables:

    ```bash
    cp .env.example .env.local
    ```

3. Set up the database:

    ```bash
    bun prisma generate
    bun prisma db push
    ```

4. Run the development server:
    ```bash
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/           # Next.js pages
├── components/    # Reusable components
├── features/      # Feature modules
├── lib/          # Utilities
└── hooks/        # Custom hooks
```

## Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run linter
