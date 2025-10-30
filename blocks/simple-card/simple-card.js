export default function decorate(block) {
    const [imageWrapper, titleWrapper, descWrapper] = block.children;
  
    // Create parent container
    const card = document.createElement('div');
    card.classList.add('simple-card');
  
    // Create image element
    const img = document.createElement('img');
    img.src = imageWrapper?.textContent?.trim() || '';
    img.alt = titleWrapper?.textContent?.trim() || '';
    img.classList.add('simple-card__image');
  
    // Create title
    const title = document.createElement('h3');
    title.textContent = titleWrapper?.textContent?.trim() || '';
    title.classList.add('simple-card__title');
  
    // Create description
    const desc = document.createElement('p');
    desc.innerHTML = descWrapper?.innerHTML?.trim() || '';
    desc.classList.add('simple-card__description');
  
    // Append all elements to parent
    card.append(img, title, desc);
  
    // Replace the block content
    block.replaceChildren(card);
  }
  export default function decorate(block) {
    // --- Skip AEM author mode (avoid breaking authoring DOM) ---
    if (document.querySelector('body[class*="author"]')) {
      return;
    }
  
    // Find the container holding multiple simple-card blocks
    const container = block.closest('.simple-card-container');
    if (!container) return;
  
    const allCards = [...container.querySelectorAll('.simple-card')];
    if (allCards.length <= 1) return; // No carousel needed if only one card
  
    // --- Create carousel wrapper ---
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('simple-card-carousel');
  
    const track = document.createElement('div');
    track.classList.add('simple-card-carousel__track');
  
    // Move all cards into the track
    allCards.forEach((card) => {
      const slide = document.createElement('div');
      slide.classList.add('simple-card-slide');
  
      // Move child elements (image, title, desc)
      while (card.firstChild) {
        slide.appendChild(card.firstChild);
      }
  
      track.append(slide);
    });
  
    // --- Controls (square boxes instead of arrows) ---
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-btn', 'prev');
  
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-btn', 'next');
  
    // Append track and buttons
    carouselWrapper.append(track, prevBtn, nextBtn);
    container.append(carouselWrapper);
  
    // --- Carousel Logic ---
    let currentIndex = 0;
    const slides = track.querySelectorAll('.simple-card-slide');
    const totalSlides = slides.length;
  
    function updateCarousel() {
      const offset = -(currentIndex * (100 / 3)); // Move by 1/3 each time
      track.style.transform = `translateX(${offset}%)`;
      updateActiveButton();
    }
  
    function updateActiveButton() {
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
  
    // --- Setup initial styles ---
    track.style.display = 'flex';
    track.style.transition = 'transform 0.5s ease';
    slides.forEach((s) => (s.style.flex = '0 0 33.333%'));
  
    updateActiveButton();
  }
  