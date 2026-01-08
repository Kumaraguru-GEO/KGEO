# K-Geo Website

A modern, responsive website for Kumaraguru Institutions' Global Engagement Office (K-GEO), featuring Home and About Us pages, built with React, TypeScript, Vite, and Tailwind CSS v4.

## 🚀 Tech Stack

- **Framework**: React 18.3 with TypeScript
- **Routing**: React Router v6
- **Build Tool**: Vite 6.3
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier
- **Type Safety**: TypeScript with strict mode

## 📦 Project Structure

```
k-geo-about-us/
├── src/
│   ├── assets/          # Static images and assets
│   ├── components/
│   │   ├── figma/       # Figma-exported components
│   │   ├── layout/      # Shared layout components (Nav, Footer)
│   │   ├── pages/       # Page components (Home, About)
│   │   └── ui/          # Reusable UI components (Radix wrappers)
│   ├── styles/
│   │   ├── globals.css  # Global styles and CSS variables
│   │   └── tailwind.css # Tailwind source file
│   ├── App.tsx          # Router setup and layout
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── postcss.config.js    # PostCSS configuration
├── eslint.config.js     # ESLint configuration
└── package.json         # Project dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   ```
   Output will be in the `build/` directory

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

## 🎨 Styling

This project uses **Tailwind CSS v4** with a custom design system:

- **Color Palette**: University blue (`#1b2840`, `#228be6`, `#1565d8`)
- **Typography**: Inter font family
- **Components**: Built with Radix UI for accessibility
- **Responsive**: Mobile-first design with breakpoints at 48rem (md) and 64rem (lg)

### Customizing Styles

Edit `src/styles/globals.css` to modify CSS variables and theme tokens. Tailwind utilities are generated automatically via PostCSS.

## 🧩 Key Features

### Home Page
- **Hero Section**: Engaging introduction with CTA buttons
- **Statistics Dashboard**: Key metrics at a glance
- **Feature Cards**: Highlighting K-GEO's core offerings
- **Programs Showcase**: Study abroad, faculty exchange, and research
- **Latest Updates**: News and events section

### About Page
- **Legacy Section**: Split layout with gradient background
- **Statistics Cards**: Animated hover effects showcasing institutional metrics
- **K-GEO Pillars**: Six strategic pillars with numbered cards
- **Team Section**: Global engagement team members with contact info
- **School Anchors**: Department-wise anchor listing

### Shared Components
- **Responsive Navigation**: Sticky header with routing support
- **Footer**: Contact information and social links
- **Image Fallback**: Graceful handling of broken images

## 🔧 Configuration

### Path Aliases

The project uses `@/*` as an alias for `src/*`. Configure in:
- `tsconfig.json` → `compilerOptions.paths`
- `vite.config.ts` → `resolve.alias`

### Vite Asset Aliases

Images imported with `figma:asset/*` are resolved via `vite.config.ts` aliases.

## 📝 Code Quality

- **ESLint**: Configured with TypeScript and React rules
- **Prettier**: Enforces consistent code formatting
- **TypeScript**: Strict mode enabled for type safety

Run checks before committing:
```bash
npm run lint
npm run format
npm run type-check
```

## 🚢 Deployment

### Build Output

```bash
npm run build
```

The `build/` directory contains optimized static files ready for deployment.

### Deployment Platforms

- **Netlify**: Drag and drop the `build/` folder or connect your Git repository
- **Vercel**: Import project and set build command to `npm run build`
- **GitHub Pages**: Use `gh-pages` package or GitHub Actions

## 📄 License

This project is private and proprietary to Kumaraguru Institutions.

## 🤝 Contributing

For internal development:
1. Create a feature branch
2. Make changes and test locally
3. Run `npm run lint` and `npm run format`
4. Submit for review

## 📞 Contact

For questions or support, contact the K-GEO team at global@kumaraguru.in

---

**Original Design**: [Figma Project](https://www.figma.com/design/Q3BBo5r1iaXwqbcNp6jGOH/K-Geo---About-us)
