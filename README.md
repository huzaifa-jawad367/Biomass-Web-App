﻿# Web Portal

A modern web application built with Next.js, featuring authentication, database integration, and a beautiful UI.

## Features

- 🔐 Authentication using Clerk and NextAuth.js
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📱 Responsive design
- 🔄 Real-time updates
- 📧 Email functionality with Nodemailer
- 🗄️ Database integration with MongoDB and Supabase

## Tech Stack

- **Frontend Framework**: Next.js 15
- **UI Components**: 
  - Tailwind CSS
  - Radix UI
  - Lucide React Icons
- **Authentication**: 
  - Clerk
  - NextAuth.js
- **Database**: 
  - MongoDB
  - Supabase
- **Styling**: 
  - Tailwind CSS
  - CSS Modules
- **Development Tools**:
  - TypeScript
  - ESLint
  - PostCSS
 
## Demo Video

[![Watch the video](https://img.youtube.com/vi/HZ9t7hmjr74/0.jpg)](https://youtu.be/HZ9t7hmjr74)

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- MongoDB database
- Supabase account
- Clerk account

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd web-portal
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the frontend directory with the following variables:
   ```
   # Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Database
   MONGODB_URI=your_mongodb_uri
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Email
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_user
   SMTP_PASSWORD=your_smtp_password
   SMTP_FROM=your_smtp_from_email
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── app/                    # Next.js app directory (pages and layouts)
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility functions and configurations
│   ├── db/              # Database configurations
│   └── utils/           # Helper utilities
├── models/              # Database models and schemas
├── public/              # Static assets
├── utils/               # Helper functions and hooks
├── .env.local          # Environment variables (not in git)
├── next.config.mjs     # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
