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

## Live Demo

You can explore the live version at [https://auxonia-lms.vercel.app/](https://auxonia-lms.vercel.app/)

### How to Navigate

**For Students:**

- Browse available courses on the homepage
- Sign up using GitHub (recommended) or email
- Access your dashboard to track progress
- Enroll in courses and track your learning journey

**For Admins:**

- Sign up with any email to get started
- Access the admin panel at `/admin`
- Create and manage courses, chapters, and lessons
- View analytics and user progress

### Important Limitations

**Payment Testing:**

- Stripe is configured for test mode only
- Use test card numbers: `4242 4242 4242 4242`
- No real payments will be processed
- All transactions are simulated for demonstration

**Email Verification:**

- Email verification is disabled in the demo
- GitHub sign-ups work immediately
- Email sign-ups will work but verification emails won't be sent
- This prevents spam and keeps the demo clean

**Data Persistence:**

- Demo data resets periodically
- Your progress and courses may not persist long-term
- This is normal for a demonstration environment

## Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run linter
