
export default function decorate(block) {
  const container = block.closest('.simple-card-container');
  if (!container) return;

  // Make sure we only apply carousel effect once per container
  if (container.classList.contains('carousel-enabled')) return;
  container.classList.add('carousel-enabled');

  // Enable horizontal scroll with smooth behavior
  container.style.overflowX = 'auto';
  container.style.scrollBehavior = 'smooth';
  container.style.scrollSnapType = 'x mandatory';
  container.style.display = 'flex';
  container.style.gap = '16px';
  container.style.scrollbarWidth = 'none';

  // Hide native scrollbar (Firefox + Webkit)
  container.style.msOverflowStyle = 'none';
  container.querySelectorAll('.simple-card').forEach((card) => {
    card.style.scrollSnapAlign = 'start';
  });

  // --- Auto Scroll Logic ---
  let scrollAmount = 0;
  const scrollStep = container.offsetWidth; // one full container width
  const scrollDelay = 4000; // 4 seconds

  setInterval(() => {
    if (scrollAmount + scrollStep >= container.scrollWidth) {
      scrollAmount = 0; // go back to start
    } else {
      scrollAmount += scrollStep;
    }
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }, scrollDelay);
}
