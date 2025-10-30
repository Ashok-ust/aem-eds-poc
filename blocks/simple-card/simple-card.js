export default function decorate(block) {
    // Find if this block is inside a container with multiple simple-card blocks
    const container = block.closest('.simple-card-container');
    if (!container) return;
  
    // Collect all simple-card blocks inside the container
    const allBlocks = [...container.querySelectorAll('.simple-card')];
    if (allBlocks.length > 1 && block === allBlocks[0]) {
      // Only the first block will initialize the carousel for the whole container
      const wrapper = document.createElement('div');
      wrapper.classList.add('simple-card-carousel');
  
      const track = document.createElement('div');
      track.classList.add('simple-card-carousel__track');
  
      // Loop through all simple-card blocks in the container
      allBlocks.forEach((cardBlock) => {
        const elements = [...cardBlock.children];
        const slide = document.createElement('div');
        slide.classList.add('simple-card-slide');
  
        const imageDiv = elements[0];
        const titleDiv = elements[1];
        const descDiv = elements[2];
  
        // --- Clone image ---
        const picture = imageDiv?.querySelector('picture, img');
        if (picture) {
          slide.append(picture.cloneNode(true));
        }
  
        // --- Clone title ---
        const title = titleDiv?.querySelector('p');
        if (title) {
          const h3 = document.createElement('h3');
          h3.innerHTML = title.innerHTML.trim();
          slide.append(h3);
        }
  
        // --- Clone description ---
        const desc = descDiv?.querySelector('p, div');
        if (desc) {
          const p = document.createElement('p');
          p.innerHTML = desc.innerHTML.trim();
          slide.append(p);
        }
  
        track.append(slide);
      });
  
      // --- Controls ---
      const prevBtn = document.createElement('button');
      prevBtn.classList.add('carousel-btn', 'prev');
      prevBtn.textContent = '‹';
  
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('carousel-btn', 'next');
      nextBtn.textContent = '›';
  
      wrapper.append(track, prevBtn, nextBtn);
      container.replaceChildren(wrapper);
  
      // --- Carousel Logic ---
      let currentIndex = 0;
      const slides = track.querySelectorAll('.simple-card-slide');
  
    //   function updateCarousel() {
    //     const offset = -currentIndex * 100;
    //     track.style.transform = `translateX(${offset}%)`;
    //   }
      function updateCarousel() {
        const offset = -(currentIndex * (100 / 3)); // each card = 1/3 width
        track.style.transform = `translateX(${offset}%)`;
      }
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      });
  
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      });
  
      // --- Inline styling ---
      track.style.display = 'flex';
      track.style.transition = 'transform 0.5s ease';
      slides.forEach((s) => (s.style.flex = '0 0 33.333%'));

    } else if (allBlocks.length === 1) {
      // If only one simple-card block, keep your original single-card logic
      const elements = [...block.children];
      const wrapper = document.createElement('div');
      wrapper.classList.add('simple-card-carousel');
  
      const track = document.createElement('div');
      track.classList.add('simple-card-carousel__track');
  
      for (let i = 0; i < elements.length; i += 3) {
        const slide = document.createElement('div');
        slide.classList.add('simple-card-slide');
  
        const imageDiv = elements[i];
        const titleDiv = elements[i + 1];
        const descDiv = elements[i + 2];
  
        const picture = imageDiv?.querySelector('picture, img');
        if (picture) {
          slide.append(picture.cloneNode(true));
        }
  
        const title = titleDiv?.querySelector('p');
        if (title) {
          const h3 = document.createElement('h3');
          h3.innerHTML = title.innerHTML.trim();
          slide.append(h3);
        }
  
        const desc = descDiv?.querySelector('p, div');
        if (desc) {
          const p = document.createElement('p');
          p.innerHTML = desc.innerHTML.trim();
          slide.append(p);
        }
  
        track.append(slide);
      }
  
      wrapper.append(track);
      block.replaceChildren(wrapper);
      track.style.display = 'flex';
      track.style.transition = 'transform 0.5s ease';
    }
  }
  