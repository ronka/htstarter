# DevHunt - Project Showcase Platform

**Migrated from Vite to Next.js 15 with App Router**

A modern platform for developers to showcase and discover innovative projects. Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Migration Complete

This project has been successfully migrated from Vite to Next.js 15 using the modern App Router architecture. All features and functionality have been preserved during the migration.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **React 19** - Latest React with concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library
- **Radix UI** - Accessible component primitives
- **next-themes** - Theme switching support

## 📦 Development

### Prerequisites

- Node.js (18.17 or later)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**

   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── profile/[id]/      # Dynamic profile routes
│   ├── project/[id]/      # Dynamic project routes
│   ├── submit/            # Project submission
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   ├── ProjectCard.tsx   # Project display card
│   └── ProjectList.tsx   # Project listing
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── data/                 # Mock data and types
└── public/               # Static assets
```

## ✨ Features

- **Project Showcase** - Browse and discover developer projects
- **User Profiles** - View developer profiles and their work
- **Project Submission** - Submit new projects to the platform
- **Voting System** - Vote on your favorite projects
- **Responsive Design** - Works on desktop and mobile
- **Theme Support** - Light/dark mode switching
- **Type Safety** - Full TypeScript support

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```bash
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Customization

- **Tailwind Config**: `tailwind.config.ts`
- **Next.js Config**: `next.config.js`
- **TypeScript Config**: `tsconfig.json`
- **shadcn/ui Config**: `components.json`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🐛 Issues & Contributing

If you encounter any issues or want to contribute to the project, please create an issue or pull request on the repository.

---

_This project was successfully migrated from Vite to Next.js while maintaining all original functionality and improving performance._
