/**
 * ============================================
 * PETE Learning UX Case Study - Main Script
 * ============================================
 *
 * Features:
 * - Interactive card stack with rotation
 * - Progress dot navigation
 * - Chart.js visualizations
 * - Accordion interactions
 * - Animated progress bars
 */

/* ==========================================
   CARD STACK COMPONENT
   ========================================== */

/**
 * Initialize the card stack rotation system
 */
function initCardStack() {
  const stack = document.querySelector('.card-stack-container');
  const cards = Array.from(stack.querySelectorAll('.process-card'));
  const dotsWrap = document.querySelector('.progress-dots');
  const dots = Array.from(dotsWrap.querySelectorAll('.progress-dot'));

  // Store original step index for each card
  cards.forEach((card, index) => {
    card.dataset.step = index;
  });

  /**
   * Layout cards in stacked position
   * Top card is largest, subsequent cards are smaller and offset
   */
  function layout() {
    cards.forEach((card, idx) => {
      // Create depth effect with translateY and scale
      card.style.transform = `translateY(${idx * 20}px) scale(${1 - idx * 0.05})`;
      card.style.zIndex = String(cards.length - idx);

      // Mark only top card as active
      card.classList.toggle('active', idx === 0);
      card.classList.remove('exit');
    });

    // Update progress dots
    const activeStep = Number(cards[0].dataset.step || 0);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeStep);
    });
  }

  /**
   * Rotate cards - move top card to bottom
   */
  function rotate() {
    const topCard = cards[0];

    // Animate exit
    topCard.classList.add('exit');

    // After animation completes, reorder cards
    setTimeout(() => {
      cards.push(cards.shift()); // Move first to end
      stack.appendChild(topCard); // Move in DOM
      layout();
    }, 300);
  }

  /**
   * Handle card click - only rotate if clicking the top card
   */
  function handleCardClick(event) {
    if (cards[0] === event.currentTarget) {
      rotate();
    }
  }

  // Add click and keyboard handlers to cards
  cards.forEach(card => {
    card.addEventListener('click', handleCardClick);

    // Keyboard accessibility
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCardClick({ currentTarget: card });
      }
    });
  });

  /**
   * Handle dot click - jump to specific card
   */
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetStep = Number(dot.dataset.index);

      // Find position of target card in current stack
      let position = cards.findIndex(c => Number(c.dataset.step) === targetStep);

      if (position <= 0) {
        layout();
        return;
      }

      // Rotate multiple times to reach target
      let rotations = 0;
      const rotateStep = () => {
        if (rotations++ < position) {
          rotate();
          setTimeout(rotateStep, 340);
        }
      };
      rotateStep();
    });
  });

  // Initial layout
  layout();

  // Auto-rotation timer
  let autoRotateTimer = setInterval(rotate, 4000);

  // Pause on hover
  stack.addEventListener('mouseenter', () => {
    clearInterval(autoRotateTimer);
  });

  // Resume on mouse leave
  stack.addEventListener('mouseleave', () => {
    autoRotateTimer = setInterval(rotate, 4000);
  });
}

/* ==========================================
   CHART INITIALIZATION
   ========================================== */

/**
 * Initialize Chart.js visualizations
 */
function initCharts() {
  // Chart 1: Talent Mastery Bar Chart
  const talentChart = document.getElementById('talentMasteryChart');
  if (talentChart) {
    new Chart(talentChart, {
      type: 'bar',
      data: {
        labels: ['Replaceable', 'Manual Training', 'PETE Adaptive'],
        datasets: [{
          label: 'Mastery %',
          data: [20, 45, 95],
          backgroundColor: ['#9ca3af', '#ef4444', '#22c55e']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  // Chart 2: Market Trends Line Chart
  const trendsChart = document.getElementById('marketTrendsChart');
  if (trendsChart) {
    new Chart(trendsChart, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Adaptive Learning',
            data: [40, 55, 70, 85],
            borderColor: '#5f4bb6',
            tension: 0.3
          },
          {
            label: 'Static LMS',
            data: [65, 60, 58, 55],
            borderColor: '#9ca3af',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  // Chart 3: Keyword Demand Doughnut Chart
  const keywordChart = document.getElementById('keywordDemandChart');
  if (keywordChart) {
    new Chart(keywordChart, {
      type: 'doughnut',
      data: {
        labels: [
          'Adaptive Learning Systems',
          '$65.68 CPC',
          'Predictive Analytics',
          'Content Libraries'
        ],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: ['#22c55e', '#5f4bb6', '#f59e0b', '#9ca3af']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}

/* ==========================================
   ACCORDION COMPONENT
   ========================================== */

/**
 * Initialize accordion toggle functionality
 */
function initAccordions() {
  const toggleButtons = document.querySelectorAll('.accordion-toggle');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const accordionItem = button.closest('.accordion-item');
      const isOpen = accordionItem.classList.contains('open');

      // Toggle open state
      accordionItem.classList.toggle('open');

      // Update ARIA attribute for accessibility
      button.setAttribute('aria-expanded', !isOpen);
    });
  });
}

/* ==========================================
   ANIMATED PROGRESS BARS
   ========================================== */

/**
 * Animate progress bars in accordion
 */
function initProgressBars() {
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');

  if (bar1 && bar2) {
    // Delay animation slightly for better UX
    setTimeout(() => {
      bar1.style.width = '95%';
      bar2.style.width = '45%';
    }, 500);
  }
}

/* ==========================================
   MAIN INITIALIZATION
   ========================================== */

/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initCardStack();
  initCharts();
  initAccordions();
  initProgressBars();
});
