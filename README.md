# CyberStrike Arena - Gaming Website

A modern, responsive gaming website featuring Friday Night Funkin with keyboard controls, contact forms, and comprehensive gaming content.

## 🎮 Features

- **Interactive Game**: Friday Night Funkin with keyboard controls via postMessage
- **Responsive Design**: Fully adaptive layout for all devices
- **Contact Form**: Functional contact form with validation and autofill support
- **Modern UI**: Gaming-themed design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized assets and minified code

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gaming-site.git
cd gaming-site
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📁 Project Structure

```
gaming-site/
├── src/
│   ├── components/          # HTML components
│   ├── scss/               # Stylesheets
│   ├── js/                 # JavaScript files
│   ├── assets/             # Images, icons, etc.
│   ├── config/             # Configuration files
│   └── *.html              # Main HTML files
├── dist/                   # Built files (generated)
├── gulpfile.js            # Build configuration
└── package.json           # Dependencies and scripts
```

## 🎯 Key Components

### Game Controls
- Keyboard-based controls using postMessage API
- WASD and arrow key support
- Focus management for accessibility

### Contact Form
- Client-side validation
- Autofill support with custom styling
- Success/error feedback

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox
- Optimized for all screen sizes

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run watch` - Watch files for changes
- `npm run clean` - Clean build directory

### File Structure

The project uses Gulp for build automation with the following tasks:

- **HTML**: Template processing with file includes
- **SCSS**: Compilation, autoprefixing, and minification
- **JavaScript**: Minification and optimization
- **Assets**: Copy and optimize images and other assets
- **Data**: Process JSON configuration files

## 🌐 Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Push the `dist/` directory to the `gh-pages` branch or configure GitHub Pages to serve from the `dist/` directory.

3. Enable GitHub Pages in your repository settings.

### Other Platforms

The built files in `dist/` can be deployed to any static hosting service:

- Netlify
- Vercel
- AWS S3
- Any web server

## 🎨 Customization

### Styling
- Modify `src/scss/_variables.scss` for colors and spacing
- Update component styles in `src/scss/components/`
- Add new styles following the existing pattern

### Content
- Edit `src/data.json` for dynamic content
- Update HTML components in `src/components/`
- Modify JavaScript functionality in `src/js/`

### Configuration
- Environment settings in `src/config/environment.js`
- Build settings in `gulpfile.js`

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and accessibility
- **SCSS**: Advanced CSS with variables and mixins
- **JavaScript (ES6+)**: Modern JavaScript features
- **Gulp**: Build automation and optimization
- **Browser-Sync**: Development server with live reload

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Minified CSS and JavaScript
- Optimized images
- Efficient asset loading
- Responsive images

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**CyberStrike Arena** - Where gaming meets innovation! 🎮⚡
