export default function decorate(block) {
    // Create main popup container
    const container = document.createElement('div');
    container.classList.add('select-country-container');
  
    // Extract authored DOM elements
    const [buttonImgEl, popupTitleEl, closeIconEl] = block.children;
  
    // Get authored values or fallback to defaults
    const popupTitle = popupTitleEl?.textContent?.trim() || 'Select Your Country';
    const buttonImg = buttonImgEl?.querySelector('img')?.src || '';
    const closeIcon = closeIconEl?.querySelector('img')?.src || '';
  
    // Create button
    const button = document.createElement('button');
    button.classList.add('country-btn');
    if (buttonImg) {
      const img = document.createElement('img');
      img.src = buttonImg;
      img.alt = 'Country Selector';
      button.append(img);
    } else {
      button.textContent = 'Select Country';
    }
  
    // Create popup overlay
    const popup = document.createElement('div');
    popup.classList.add('country-popup');
    popup.innerHTML = `
      <div class="popup-header">
        <h2>${popupTitle}</h2>
        ${closeIcon ? `<img src="${closeIcon}" class="close-btn" alt="Close">` : ''}
      </div>
      <div class="popup-body"></div>
    `;
  
    // Append to container
    container.append(button);
    container.append(popup);
    block.replaceChildren(container);
  
    // Dummy JSON for countries (for now)
    const countries = [
      { name: 'India', flag: '/content/dam/hero-site/flags/india.png' },
      { name: 'France', flag: '/content/dam/hero-site/flags/france.png' },
      { name: 'Spain', flag: '/content/dam/hero-site/flags/spain.png' },
      { name: 'Italy', flag: '/content/dam/hero-site/flags/italy.png' },
    ];
  
    // Render countries inside popup
    const popupBody = popup.querySelector('.popup-body');
    countries.forEach(({ name, flag }) => {
      const item = document.createElement('div');
      item.classList.add('country-item');
      item.innerHTML = `
        <img src="${flag}" alt="${name}">
        <span>${name}</span>
      `;
      popupBody.append(item);
    });
  
    // Event handling
    button.addEventListener('click', () => popup.classList.add('active'));
    popup.querySelector('.close-btn')?.addEventListener('click', () => popup.classList.remove('active'));
  }
  