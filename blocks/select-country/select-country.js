export default function decorate(block) {
    // --- Extract authored elements from AEM ---
    const [flagImageEl, popupTitleEl, closeIconEl] = block.children;
  
    // --- Create outer container ---
    const container = document.createElement('div');
    container.classList.add('select-country-container');
  
    // --- Button: Trigger Image (flag) ---
    const triggerWrapper = document.createElement('div');
    triggerWrapper.classList.add('sc-trigger-wrapper');
  
    if (flagImageEl) {
      // if image element exists in authored content
      triggerWrapper.append(flagImageEl);
    }
  
    // --- Popup Wrapper ---
    const popup = document.createElement('div');
    popup.classList.add('sc-popup', 'sc-hidden');
  
    // --- Popup Head ---
    const popupHead = document.createElement('div');
    popupHead.classList.add('sc-panel-head');
  
    // Title (only if authored)
    const popupTitle = document.createElement('h3');
    popupTitle.className = 'sc-title';
    popupTitle.textContent =
      popupTitleEl?.textContent?.trim() || 'Select Your Country';
  
    popupHead.append(popupTitle);
  
    // Close icon (only if authored)
    if (closeIconEl) {
      const closeImg = closeIconEl.querySelector('img');
      if (closeImg) {
        const closeIcon = document.createElement('img');
        closeIcon.className = 'sc-close';
        closeIcon.src = closeImg.src;
        closeIcon.alt = 'Close';
        popupHead.append(closeIcon);
      }
    }
  
    // --- Popup Body ---
    const popupBody = document.createElement('div');
    popupBody.classList.add('sc-panel-body');
  
    const listContainer = document.createElement('div');
    listContainer.classList.add('sc-list');
    popupBody.append(listContainer);
  
    // --- Assemble Popup ---
    popup.append(popupHead, popupBody);
  
    // --- Dummy JSON for Country Data ---
    const countries = [
      { name: 'India', flag: '/images/india-flag.png', url: '/in' },
      { name: 'USA', flag: '/images/usa-flag.png', url: '/us' },
      { name: 'UK', flag: '/images/uk-flag.png', url: '/uk' },
      { name: 'Germany', flag: '/images/germany-flag.png', url: '/de' },
      { name: 'France', flag: '/images/france-flag.png', url: '/fr' },
      { name: 'Japan', flag: '/images/japan-flag.png', url: '/jp' },
      { name: 'Australia', flag: '/images/australia-flag.png', url: '/au' },
      { name: 'Brazil', flag: '/images/brazil-flag.png', url: '/br' },
      { name: 'Canada', flag: '/images/canada-flag.png', url: '/ca' },
      { name: 'Italy', flag: '/images/italy-flag.png', url: '/it' },
    ];
  
    // --- Render countries ---
    countries.forEach((country) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'sc-item';
      item.innerHTML = `
        <img src="${country.flag}" alt="${country.name} flag" />
        <span>${country.name}</span>
      `;
      item.addEventListener('click', () => {
        window.location.href = country.url;
      });
      listContainer.append(item);
    });
  
    // --- Append everything to container ---
    container.append(triggerWrapper, popup);
    block.innerHTML = ''; // Clear original
    block.append(container);
  
    // --- Interactivity ---
    const trigger = triggerWrapper.querySelector('img');
    const closeBtn = popup.querySelector('.sc-close');
  
    const openPopup = () => popup.classList.remove('sc-hidden');
    const closePopup = () => popup.classList.add('sc-hidden');
  
    if (trigger) trigger.addEventListener('click', openPopup);
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePopup();
    });
  }
  