# Quick Start Guide - Multi-Page K-GEO Website

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
- **Home Page**: http://localhost:3000/
- **About Page**: http://localhost:3000/about

## 📄 Pages Overview

### Home Page (`/`)
**Purpose**: Landing page to introduce K-GEO and its offerings

**Sections**:
- 🎯 Hero with CTA buttons
- 📊 Statistics (25+ partners, 10+ countries)
- ⭐ Feature cards (4 key offerings)
- 📚 Programs showcase (3 main programs)
- 📰 Latest updates (3 news items)
- 📞 Contact CTA

### About Page (`/about`)
**Purpose**: Detailed information about K-GEO and the team

**Sections**:
- 🏛️ Legacy and vision
- 📈 Institutional statistics (7 metrics)
- 🌍 K-GEO pillars (6 strategic areas)
- 👥 Team members (3 profiles)
- 🏫 School anchors (6 departments)
- 📞 Contact CTA

## 🎨 Customization

### Update Home Page Content

Edit `src/components/pages/HomePage.tsx`:

```typescript
// Change hero heading
<h1>Your New Heading</h1>

// Update statistics
const stats = [
  { value: '25+', label: 'Partner Universities' },
  // Add more...
];

// Modify programs
const programs = [
  { title: 'Your Program', desc: '...', image: '...' },
  // Add more...
];
```

### Update About Page Content

Edit `src/components/pages/AboutPage.tsx`:

```typescript
// Change team members
const teamMembers = [
  { name: 'Dr. Name', role: 'Title', email: 'email@...' },
  // Add more...
];
```

### Update Navigation

Edit `src/components/layout/Navigation.tsx`:

```typescript
// Add new menu items
<Link to="/new-page">New Page</Link>
```

### Update Footer

Edit `src/components/layout/Footer.tsx`:

```typescript
// Change contact info, social links, etc.
```

## 🎯 Common Tasks

### Add a New Page

1. **Create page component**:
   ```bash
   # Create file: src/components/pages/NewPage.tsx
   ```

2. **Add route in App.tsx**:
   ```typescript
   import { NewPage } from './components/pages/NewPage';
   
   <Route path="/new-page" element={<NewPage />} />
   ```

3. **Add navigation link**:
   ```typescript
   // In Navigation.tsx
   <Link to="/new-page">New Page</Link>
   ```

### Change Colors

Edit `src/styles/globals.css`:

```css
:root {
  --university-blue: #1b2840;
  --university-blue-light: #228be6;
  --university-blue-action: #1565d8;
}
```

### Add Images

1. Place images in `src/assets/`
2. Import in component:
   ```typescript
   import myImage from '@/assets/my-image.png';
   ```
3. Use with fallback:
   ```typescript
   <ImageWithFallback src={myImage} alt="Description" />
   ```

## 🔍 Troubleshooting

### Navigation not working?
- Make sure you ran `npm install` to get React Router
- Check that links use `<Link to="/path">` not `<a href="/path">`

### Styles not loading?
- Restart dev server: `Ctrl+C` then `npm run dev`
- Clear browser cache

### TypeScript errors?
- Run `npm run type-check` to see all errors
- Make sure all imports are correct

## 📱 Mobile Testing

Test responsive design:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `build/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify/Vercel
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

## 📞 Need Help?

- Check `README.md` for full documentation
- See `MULTI-PAGE-UPDATE.md` for detailed changes
- Review `SETUP.md` for troubleshooting

## ✅ Verification Checklist

After setup, verify:
- [ ] Home page loads at `/`
- [ ] About page loads at `/about`
- [ ] Navigation links work
- [ ] Footer appears on both pages
- [ ] Mobile view looks good
- [ ] All images load
- [ ] No console errors

---

**Ready to customize?** Start editing the page components and make it yours! 🎨
