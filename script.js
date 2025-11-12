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
  const dotsWrap = document.querySelector('.progress-dots');

  // Store original step index for each card
  if (!stack || !dotsWrap) {
    return;
  }

  const dots = Array.from(dotsWrap.querySelectorAll('.progress-dot'));
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  let cards = Array.from(stack.querySelectorAll('.process-card'));
  let interactive = false;
  const pendingTimeouts = new Set();

  function clearCardStyles(targetCards) {
    targetCards.forEach(card => {
      card.style.transform = '';
      card.style.zIndex = '';
      card.classList.remove('exit', 'active');
    });
  }

  
  function layout() {
    cards.forEach((card, idx) => {
      card.style.transform = `translateY(${idx * 20}px) scale(${1 - idx * 0.05})`;
      card.style.zIndex = String(cards.length - idx);
      card.classList.toggle('active', idx === 0);
      card.classList.remove('exit');
    });

    // Update progress dots
    const activeStep = Number(cards[0]?.dataset.step || 0);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeStep);
    });
  }

  /**
   * Rotate cards - move top card to bottom
   */
  function rotate() {
    const topCard = cards[0];
     if (!topCard) {
      return;
    }

    // Animate exit
    topCard.classList.add('exit');

    // After animation completes, reorder cards
    const timeoutId = window.setTimeout(() => {
      cards.push(cards.shift());
      stack.appendChild(topCard);
      layout();
       pendingTimeouts.delete(timeoutId);
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
  unction handleCardKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick({ currentTarget: event.currentTarget });
    }
  }

  function handleDotClick(event) {
    const targetStep = Number(event.currentTarget.dataset.index);
    const position = cards.findIndex(card => Number(card.dataset.step) === targetStep);

    if (position <= 0) {
      layout();
      return;
    }

    let rotations = 0;
    const rotateStep = () => {
      if (rotations++ < position) {
        rotate();
        const timeoutId = window.setTimeout(() => {
          pendingTimeouts.delete(timeoutId);
          rotateStep();
        }, 340);

    // Keyboard accessibility
    pendingTimeouts.add(timeoutId);
      }
    };
    rotateStep();
  }

  function teardownInteractive() {
    const cardElements = Array.from(stack.querySelectorAll('.process-card'));

    pendingTimeouts.forEach(timeoutId => {
      window.clearTimeout(timeoutId);
      }
    });
     pendingTimeouts.clear();

    cardElements.forEach(card => {
      card.removeEventListener('click', handleCardClick);
      card.removeEventListener('keydown', handleCardKeydown);
      card.style.cursor = '';
    });

    clearCardStyles(cardElements);

  /**
   * Handle dot click - jump to specific card
   */
  dots.forEach(dot => {
      dot.classList.remove('active');
      dot.removeEventListener('click', handleDotClick);
    });

    stack.classList.add('card-stack-mobile');
    dotsWrap.style.display = 'none';
    dotsWrap.setAttribute('aria-hidden', 'true');
    interactive = false;
  }

      // Find position of target card in current stack
      function setupInteractive() {
    cards = Array.from(stack.querySelectorAll('.process-card'));

      cards.forEach((card, index) => {
      if (!card.dataset.step) {
        card.dataset.step = index;
      }
         card.addEventListener('click', handleCardClick);
      card.addEventListener('keydown', handleCardKeydown);
      card.style.cursor = 'pointer';
    });

      // Rotate multiple times to reach target
      dots.forEach(dot => {
      dot.addEventListener('click', handleDotClick);
    });

  // Initial layout
  stack.classList.remove('card-stack-mobile');
    dotsWrap.style.display = 'flex';
    dotsWrap.setAttribute('aria-hidden', 'false');
    interactive = true;
    layout();
  }

  function handleBreakpointChange(event) {
    if (event.matches) {
      teardownInteractive();
    } else if (!interactive) {
      setupInteractive();
    }
  }

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', handleBreakpointChange);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(handleBreakpointChange);
  }

  if (mobileQuery.matches) {
    teardownInteractive();
  } else {
    setupInteractive();
  }
}

/* ==========================================
   CHART INITIALIZATION
   ========================================== */

/**
 * Initialize Chart.js visualizations
 */
function initCharts() {
  // Chart 1: Brand Visibility Comparison Chart
  const talentChart = document.getElementById('talentMasteryChart');
  if (talentChart) {
    const ctx = talentChart.getContext('2d');

    // Create gradients
    const purpleGradient = ctx.createLinearGradient(0, 0, 0, 400);
    purpleGradient.addColorStop(0, '#8a23e9');
    purpleGradient.addColorStop(1, '#5f4bb6');

    const greenGradient = ctx.createLinearGradient(0, 0, 0, 400);
    greenGradient.addColorStop(0, '#34C759');
    greenGradient.addColorStop(1, '#2A9D48');

    new Chart(talentChart, {
      type: 'bar',
      data: {
        labels: ['Articulate', 'Docebo', 'Cornerstone', 'Skillsoft', 'PETE'],
        datasets: [{
          label: 'Brand Visibility Score',
          data: [85, 78, 82, 75, 12],
          backgroundColor: [purpleGradient, purpleGradient, purpleGradient, purpleGradient, greenGradient]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            top: 60,
            right: 5,
            bottom: 10,
            left: 5
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Brand Visibility: PETE vs. Competitors',
            font: {
              size: 20,
              weight: 'bold',
              family: 'Poppins, sans-serif'
            },
            color: '#374151',
            padding: {
              top: 5,
              bottom: 10
            }
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const labels = [
                  '🏆 Recognition',
                  '📊 Market Share',
                  '🤝 Trust',
                  '⏳ Legacy',
                  '⚡ Innovation'
                ];
                return labels[context.dataIndex] + ': ' + context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      },
      plugins: [{
        afterDatasetsDraw: function(chart) {
          const ctx = chart.ctx;
          const emojis = ['🏆', '📊', '🤝', '⏳', '⚡'];
          const labels = [
            'Recognition',
            'Market Share',
            'Trust',
            'Legacy',
            'Innovation'
          ];

          chart.data.datasets.forEach(function(dataset, i) {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach(function(bar, index) {
              const data = dataset.data[index];
              const emoji = emojis[index];
              const label = labels[index];

              const x = bar.x;

              // Special handling for PETE (index 4) - bar is too short for text
              if (index === 4) {
                // Draw red rounded rectangle callout above the bar
                const rectWidth = 120;
                const rectHeight = 60;
                const rectX = x - rectWidth / 2;
                const rectY = bar.y - 70;
                const radius = 8;

                // Draw rounded rectangle
                ctx.fillStyle = '#ec4899';
                ctx.beginPath();
                ctx.roundRect(rectX, rectY, rectWidth, rectHeight, radius);
                ctx.fill();

                // Draw text inside pink rectangle
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Emoji
                ctx.font = '18px Arial';
                ctx.fillText(emoji, x, rectY + 15);

                // Label
                ctx.font = 'bold 10px Poppins, sans-serif';
                ctx.fillText(label, x, rectY + 32);

                // Percentage inside red rectangle
                ctx.font = 'bold 16px Poppins, sans-serif';
                ctx.fillText(data + '%', x, rectY + 48);
              } else {
                // Regular bars - text inside
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Draw emoji at top
                ctx.font = '20px Arial';
                ctx.fillText(emoji, x, bar.y + 18);

                // Draw label text below emoji
                ctx.font = 'bold 10px Poppins, sans-serif';
                ctx.fillText(label, x, bar.y + 38);

                // Draw percentage at bottom
                ctx.font = 'bold 16px Poppins, sans-serif';
                ctx.fillText(data + '%', x, bar.y + 56);
              }
            });
          });
        }
      }]
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
