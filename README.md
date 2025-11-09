# PETE Learning UX Case Study

An interactive case study website showcasing the UX design process for transforming PETE Learning from a "generic AI tool" into an invaluable, high-ROI platform.

## 🎯 Overview

This case study demonstrates how strategic UX research and design transformed PETE Learning's messaging from selling a generic 25% improvement to showcasing their true 125% growth potential. The site features:

- **Interactive card stack** for process walkthrough
- **Data visualizations** using Chart.js
- **Accordion components** for solution details
- **Embedded prototype demo** in an iframe
- **Smooth animations** and responsive design

## 🚀 Quick Start

### Option 1: Python Server (Recommended)
```bash
python3 -m http.server 8000
```
Then open: `http://localhost:8000/index.html`

### Option 2: Live Server with Auto-Reload
```bash
npx live-server
```

### Option 3: Direct File
Simply open `index.html` in your browser.

## 📁 Project Structure

```
pete-ux-caseStudy/
├── index.html      # Main HTML file (clean, semantic structure)
├── styles.css      # All custom styles and animations
├── script.js       # Interactive components and Chart.js
└── README.md       # This file
```

## ✨ Features

### Interactive Components

1. **Card Stack Rotation**
   - Auto-rotates every 4 seconds
   - Click top card to advance manually
   - Click progress dots to jump to specific card
   - Keyboard accessible (Enter/Space)
   - Pauses on hover

2. **Data Visualizations**
   - Bar chart: Talent mastery comparison
   - Line chart: Market trends over time
   - Doughnut chart: Keyword demand analysis

3. **Accordions**
   - ARIA-compliant for accessibility
   - Smooth height transitions
   - Animated progress bars inside

4. **Embedded Prototype**
   - Full interactive demo in iframe
   - Browser-style chrome with traffic lights
   - Toggle between generic vs. PETE training

### Design System

**Colors:**
- Purple: `#5f4bb6` (Primary brand)
- Green: `#34c759` (Success/Growth)
- Red: `#ef476f` (Problems/Baseline)
- Grays: Various shades for UI

**Typography:**
- Font: Poppins (Google Fonts)
- Weights: 400, 500, 600, 700, 800

**Animations:**
- Respects `prefers-reduced-motion`
- Smooth card transitions
- Floating CTA button
- Pulsing glow effects

## 🎨 Customization

### Change Brand Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --pete-purple: #5f4bb6;
  --pete-green: #34c759;
  /* ... */
}
```

### Adjust Animation Speed
In `script.js`, change the auto-rotate interval:
```javascript
let autoRotateTimer = setInterval(rotate, 4000); // 4 seconds
```

### Modify Charts
Chart data is in `script.js` under `initCharts()` function.

## ♿ Accessibility

- Semantic HTML5 structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Respects `prefers-reduced-motion`
- Proper heading hierarchy

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Stacks vertically on mobile
- Touch-friendly tap targets

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, Grid/Flexbox
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **Chart.js** - Data visualizations (CDN)
- **Google Fonts** - Poppins typeface

## 📊 Performance

- Minimal dependencies (only Tailwind & Chart.js from CDN)
- Optimized CSS with will-change for animations
- Lazy-loaded charts
- External CSS/JS for better caching

## 🤝 Contributing

This is a portfolio piece, but suggestions are welcome! To experiment:

1. Clone or fork the repo
2. Make changes to HTML, CSS, or JS
3. Refresh browser to see updates
4. Commit your improvements

## 📝 License

This case study is for portfolio purposes. Feel free to use the code structure and patterns for your own projects.

## 👤 Author

Created as a UX case study demonstration for PETE Learning.

---

**Live Demo:** Open `index.html` in your browser
**View Code:** All files are commented and organized for easy reading
