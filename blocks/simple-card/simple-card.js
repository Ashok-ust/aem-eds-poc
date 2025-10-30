export default function decorate(block) {
  // Prevent breaking AEM authoring mode
  if (document.querySelector('body[class*="author"]')) return;

  // Find parent container
  const container = block.closest('.simple-card-container');
  if (!container) return;

  // Collect all simple-card blocks inside the container
  const allCards = [...container.querySelectorAll('.simple-card')];
  if (allCards.length <= 1) return; // no carousel needed for one card

  // --- Create carousel wrapper ---
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('simple-card-carousel');

  const track = document.createElement('div');
  track.classList.add('simple-card-carousel__track');

  // Move all cards into the track
  allCards.forEach((card) => {
    const slide = document.createElement('div');
    slide.classList.add('simple-card-slide');

    // Move card’s children into the slide
    while (card.firstChild) {
      slide.appendChild(card.firstChild);
    }
    track.append(slide);
  });

  // Add track to wrapper
  carouselWrapper.append(track);

  // --- Navigation (square boxes) ---
  const controls = document.createElement('div');
  controls.classList.add('carousel-controls');

  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');

  prevBtn.classList.add('carousel-btn', 'prev');
  nextBtn.classList.add('carousel-btn', 'next');

  controls.append(prevBtn, nextBtn);
  carouselWrapper.append(controls);

  // Replace container content
  container.innerHTML = '';
  container.append(carouselWrapper);

  // --- Carousel Logic ---
  let currentIndex = 0;
  const slides = track.querySelectorAll('.simple-card-slide');
  const totalSlides = slides.length;

  function updateCarousel() {
    const offset = -(currentIndex * (100 / 3)); // show 3 cards per view
    track.style.transform = `translateX(${offset}%)`;
    updateButtonStates();
  }

  function updateButtonStates() {
    prevBtn.classList.toggle('active', currentIndex > 0);
    nextBtn.classList.toggle('active', currentIndex < totalSlides - 3);
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 3) {
      currentIndex++;
      updateCarousel();
    }
  });

  // --- Initial Styles ---
  track.style.display = 'flex';
  track.style.transition = 'transform 0.5s ease';
  slides.forEach((slide) => (slide.style.flex = '0 0 33.333%'));

  updateButtonStates();
}
