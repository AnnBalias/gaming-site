# Deployment Guide - CyberStrike Arena

This guide explains how to deploy the CyberStrike Arena gaming website to GitHub Pages or any other static hosting service.

## 🚀 Quick Deployment

### GitHub Pages (Recommended)

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Enable GitHub Pages**: Go to repository Settings → Pages
3. **Select Source**: Choose "GitHub Actions" as the source
4. **Automatic Deployment**: The site will automatically deploy when you push to the main branch

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your web server

## 📁 Project Structure

```
gaming-site/
├── src/                    # Source files
│   ├── components/         # HTML components
│   ├── scss/              # Stylesheets
│   ├── js/                # JavaScript files
│   ├── assets/            # Images, icons, etc.
│   ├── config/            # Configuration files
│   └── *.html             # Main HTML files
├── dist/                   # Built files (generated)
├── .github/workflows/      # GitHub Actions
├── gulpfile.js            # Build configuration
├── package.json           # Dependencies and scripts
├── deploy.sh              # Deployment script
└── README.md              # Project documentation
```

## 🔧 Build Process

The project uses Gulp for build automation:

- **HTML**: Template processing with file includes
- **SCSS**: Compilation, autoprefixing, and minification
- **JavaScript**: Minification and optimization
- **Assets**: Copy and optimize images and other assets
- **Data**: Process JSON configuration files

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run watch` - Watch files for changes
- `npm run clean` - Clean build directory

## 🌐 Deployment Options

### 1. GitHub Pages (Automatic)

The project includes GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:

1. Builds the project on every push to main branch
2. Deploys to the `gh-pages` branch
3. Makes the site available at `https://username.github.io/repository-name`

### 2. Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on every push

### 3. Vercel

1. Import your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on every push

### 4. Traditional Web Server

1. Run `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Ensure your server serves `index.html` for the root path

## ⚙️ Configuration

### Environment Settings

The project automatically detects the environment:

- **Development**: `localhost`, `127.0.0.1`, ports `3000`, `9998`
- **Production**: Any other domain

### External Services

- **GameMonetize**: Game hosting and monetization
- **YYGGames**: Game SDK integration

All external services have graceful fallbacks and won't break the site if they fail to load.

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are installed (`npm install`)
2. **Styles not loading**: Ensure SCSS compilation is working
3. **Game not loading**: Check if external services are blocked by ad blockers
4. **404 errors**: Ensure all paths are relative (use `./` instead of `/`)

### Performance Optimization

The build process automatically:

- Minifies CSS and JavaScript
- Optimizes images
- Removes development-only code
- Handles external service failures gracefully

## 📝 Customization

### Content Updates

1. Edit `src/data.json` for dynamic content
2. Modify HTML components in `src/components/`
3. Update styles in `src/scss/`
4. Rebuild with `npm run build`

### Adding New Pages

1. Create HTML file in `src/`
2. Add to navigation in `src/components/header.html`
3. Update routing if needed
4. Rebuild the project

## 🔒 Security

- All external scripts are loaded with error handling
- CSP violations are handled gracefully
- No sensitive data is exposed in client-side code
- Form validation is implemented client-side

## 📊 Analytics

The project is ready for analytics integration:

- Google Analytics
- Facebook Pixel
- Custom tracking

Add your tracking codes to the appropriate HTML files.

## 🆘 Support

For deployment issues:

1. Check the build logs
2. Verify all dependencies are installed
3. Ensure Node.js version is 14 or higher
4. Check browser console for errors

---

**CyberStrike Arena** - Ready for deployment! 🎮⚡
