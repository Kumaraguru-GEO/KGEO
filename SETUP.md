# Setup Guide

## Quick Start

Follow these steps to get the project running:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM with TypeScript types
- Vite build tool
- Tailwind CSS v4 with PostCSS
- ESLint and Prettier for code quality
- All UI component libraries

### 2. Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### 3. Verify Everything Works

You should see:
- ✅ No TypeScript errors
- ✅ Tailwind styles loading correctly
- ✅ Images displaying properly
- ✅ Responsive navigation working

## Troubleshooting

### TypeScript Errors About Missing Types

If you see errors like "Cannot find module '@types/react'":
```bash
npm install --save-dev @types/react @types/react-dom
```

### Tailwind Styles Not Loading

1. Check that `src/styles/tailwind.css` exists
2. Verify `postcss.config.js` is present
3. Restart the dev server: `Ctrl+C` then `npm run dev`

### Module Resolution Errors

The project uses Vite aliases for imports. If you see "Cannot find module '@radix-ui/react-dialog@1.1.6'":
- These are resolved by `vite.config.ts` aliases
- Make sure you've run `npm install`
- Restart your IDE/editor to refresh TypeScript

### Port 3000 Already in Use

Edit `vite.config.ts` and change the port:
```typescript
server: {
  port: 3001, // Change to any available port
  open: true,
}
```

## Development Workflow

### Before Committing Code

Run these commands to ensure code quality:

```bash
# Check for linting errors
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Building for Production

```bash
# Create optimized build
npm run build

# Preview the build locally
npm run preview
```

The build output will be in the `build/` directory.

## IDE Setup

### VS Code (Recommended)

Install these extensions for the best experience:
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### WebStorm/IntelliJ IDEA

- Enable ESLint: Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
- Enable Prettier: Settings → Languages & Frameworks → JavaScript → Prettier
- Enable TypeScript: Settings → Languages & Frameworks → TypeScript

## Next Steps

- Review `README.md` for full documentation
- Explore `src/App.tsx` to understand the component structure
- Check `src/styles/globals.css` for theme customization
- Modify content and styling as needed

## Need Help?

Contact the development team or refer to:
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
