export default function decorate(block) {
    if (!block) return;
  
    // Extract authored wrappers (usually <div> for each element)
    const [flagWrapper, titleWrapper, closeWrapper] = block.children;
  
    // Get authored values safely (works even if nested)
    const popupTitle =
      titleWrapper?.querySelector('h3, p, span')?.textContent?.trim() ||
      titleWrapper?.textContent?.trim() ||
      'Select Your Country';
  
    const flagImage =
      flagWrapper?.querySelector('img')?.src || '';
  
    const closeIcon =
      closeWrapper?.querySelector('img')?.src || '';
  
    // Clear authored HTML
    block.innerHTML = '';
  
    // --- Create container ---
    const container = document.createElement('div');
    container.classList.add('select-country-container');
    block.appendChild(container);
  
    // --- Create open button (flag image) ---
    const openBtn = document.createElement('button');
    openBtn.className = 'sc-open-btn';
    openBtn.type = 'button';
    if (flagImage) {
      openBtn.innerHTML = `<img src="${flagImage}" alt="Country flag" />`;
    } else {
      openBtn.textContent = 'Select Country';
    }
  
    container.appendChild(openBtn);
  
    // --- Create popup structure ---
    const popup = document.createElement('div');
    popup.className = 'sc-popup sc-hidden';
    popup.innerHTML = `
      <div class="sc-backdrop" data-sc-role="backdrop"></div>
      <div class="sc-panel" role="dialog" aria-modal="true" aria-label="${popupTitle}">
        <div class="sc-panel-head">
          <h3 class="sc-title">${popupTitle}</h3>
          <button class="sc-close" aria-label="Close">
            ${closeIcon ? `<img src="${closeIcon}" alt="Close" />` : ''}
          </button>
        </div>
        <div class="sc-panel-body">
          <div class="sc-list" role="list"></div>
        </div>
      </div>
    `;
    container.appendChild(popup);
  
    // --- Get popup elements ---
    const listEl = popup.querySelector('.sc-list');
    const backdrop = popup.querySelector('[data-sc-role="backdrop"]');
    const closeBtn = popup.querySelector('.sc-close');
  
    // --- Dummy JSON data (replace with AEM multifield later) ---
    const countries = [
      { name: 'India', icon: '/content/dam/hero-aem-website/brand/design/flags/india.png', path: 'https://www.heromotocorp.com/en-in/' },
      { name: 'Bangladesh', icon: '/content/dam/hero-aem-website/brand/design/flags/bangladesh.png', path: 'https://www.heromotocorp.com/en-bd/' },
      { name: 'Nepal', icon: '/content/dam/hero-aem-website/brand/design/flags/nepal.jpg', path: 'https://www.heromotocorp.com/en-np/' },
      { name: 'Sri Lanka', icon: '/content/dam/hero-aem-website/brand/design/flags/sri-lanka.jpg', path: 'https://www.heromotocorp.com/en-lk/' },
      { name: 'Mexico', icon: '/content/dam/hero-aem-website/brand/design/flags/mexico.png', path: 'https://www.heromotocorp.com/en-mx/' },
    ];
  
    // --- Render Country Flags ---
    countries.forEach((country) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'sc-item';
      item.innerHTML = `
        <img class="sc-flag" src="${country.icon}" alt="${country.name} flag"/>
        <span class="sc-name">${country.name}</span>
      `;
      item.addEventListener('click', () => {
        window.location.href = country.path;
      });
      listEl.appendChild(item);
    });
  
    // --- Popup handlers ---
    const openPopup = () => {
      popup.classList.remove('sc-hidden');
      document.addEventListener('keydown', onKeyDown);
    };
  
    const closePopup = () => {
      popup.classList.add('sc-hidden');
      document.removeEventListener('keydown', onKeyDown);
    };
  
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closePopup();
    };
  
    openBtn.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
  }
  