# PETE Learning UX Case Study

A narrative-first UX case study that shows how PETE Learning repositioned its AI training platform from a generic tool into an invaluable talent engine. The repo contains both the long-form story page and the clickable prototype that proves the redesigned experience.

## 🎯 What’s Inside

- **Story-driven landing page (`index.html`)** – Walks through the insight, process, solution, and takeaway pillars with bold typography, animated cards, and responsive layouts.
- **High-fidelity prototype (`prototype.html`)** – A Wise-inspired product simulation with guided navigation, a scheduling modal, and polished success state.
- **Custom theming (`styles.css`)** – Layered gradients, card treatments, and hover states that highlight the three conclusion pillars.
- **Interaction logic (`script.js`)** – Powers the rotating process stack, progress dots, and other motion cues while respecting reduced-motion preferences.

## 🧭 Page Highlights

### Hero & Positioning
- 20-hour research narrative distilled into a two-minute pitch.
- Primary CTA anchors visitors to the live prototype demo.

### Process Card Stack
- Interactive stack rotates automatically and via click or keyboard.
- Progress dots mirror the current step for quick orientation.

### Visibility & Messaging Story
- Narrative-driven bar layout illustrates PETE’s low awareness against well-known competitors.
- Before/after messaging cards showcase the shift from “faster courses” to “invaluable employees,” complete with supporting visuals.

### Takeaway Pillars
- Enlarged gradient icon badges and scannable bold lead-ins emphasize each conclusion theme: Intrepid & Authentic, Outcome-First Proof, and Delightfully Simple UX.
- Independent CTA sits beneath the grid so the action isn’t trapped in a card.

## 🧪 Prototype Highlights

The embedded `prototype.html` mirrors the final experience in a standalone page:

- **Guided landing flow** with sticky navigation, solution storytelling, and social-proof moments.
- **Schedule-a-demo modal** featuring:
  - Available dates rendered in a responsive calendar.
  - Vertically stacked time slots (maximum of five) for quick scanning.
  - Confirmation state with Add to Calendar download and centered icon/text alignment.
- **Form guardrails** such as inline validation, loading states, and success transitions to demonstrate polish end-to-end.

## 🚀 Getting Started

Serve the files locally to preserve relative asset paths and the prototype iframe:

```bash
# From the repo root
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html` for the case study page or `http://localhost:8000/prototype.html` for the full-screen prototype.

Alternative: use any static HTTP server (e.g., `npx serve`, VS Code Live Server).

## 📁 Project Structure

```
pete-ux-caseStudy/
├── index.html                # Story-driven case study page
├── prototype.html            # High-fidelity product simulation
├── styles.css                # Custom gradients, layout helpers, and component styling
├── script.js                 # Card stack rotation + shared interaction helpers
├── PETE_Ad.png               # “Before” ad creative
├── Stop Generic Training..png# “After” campaign creative
└── README.md                 # Project documentation
```

## 🎨 Customization Notes

- **Update process steps:** Edit the `.process-card` markup inside `index.html` to change copy or add cards (ensure matching progress dots).
- **Tweak pillar copy:** Each takeaway pillar lives near the end of `index.html`; adjust bold lead-ins to refine the scan-friendly messaging.
- **Modify time slots:** In `prototype.html`, change the `timeSlots` array inside the `loadTimeSlots()` function to alter available meetings.
- **Adjust theming:** Global colors and shadows live in `styles.css` near the top; Tailwind utilities supplement bespoke design layers.

## ♿ Accessibility & Responsiveness

- Semantic HTML structure with headings that progress logically through the story.
- Keyboard and screen-reader support for the process stack, modal dialog, and buttons.
- `prefers-reduced-motion` respected for animations and transitions.
- Fully responsive layouts from mobile through desktop using Tailwind’s utility classes plus custom breakpoints.

## 🛠️ Tech Stack

- HTML5 + Tailwind CDN for rapid layout iteration.
- Vanilla JavaScript for interactions (no build tooling required).
- CSS3 for gradients, shadows, and custom component styling.
- Chart.js is loaded for future data visualizations but currently unused in the live markup.

## 👤 Author

Created as a UX case study demonstration for PETE Learning, highlighting storytelling, UX writing, and product polish.

---

**Live Demo:** Open `index.html` locally or host on any static server.
**Prototype:** Explore `prototype.html` for the interactive scheduling flow.
