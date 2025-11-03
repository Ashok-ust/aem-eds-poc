export default function decorate(block) {
    if (!block) return;
  
    // --- Fetch AEM model data (fallback to defaults) ---
    const model = window.aemComponents?.['select-country'] || {};
    const popupTitle = model.popup_title || 'Select Your Country';
    const flagIcon = model.button_flag || '';
    const closeIcon = model.close_icon || '';
  
    // Clear block content
    block.innerHTML = '';
  
    // --- Flag button (to open popup) ---
    const openBtn = document.createElement('button');
    openBtn.className = 'sc-open-btn';
    openBtn.type = 'button';
    openBtn.innerHTML = `<img src="${flagIcon}" alt="India flag" />`;
    block.appendChild(openBtn);
  
    // --- Popup container ---
    const popup = document.createElement('div');
    popup.className = 'sc-popup sc-hidden';
    popup.innerHTML = `
      <div class="sc-backdrop" data-sc-role="backdrop"></div>
      <div class="sc-panel" role="dialog" aria-modal="true" aria-label="${popupTitle}">
        <div class="sc-panel-head">
          <h3 class="sc-title">${popupTitle}</h3>
          <button class="sc-close" aria-label="Close">
            <img src="${closeIcon}" alt="Close" />
          </button>
        </div>
        <div class="sc-panel-body">
          <div class="sc-list" role="list"></div>
        </div>
      </div>
    `;
    block.appendChild(popup);
  
    const listEl = popup.querySelector('.sc-list');
    const backdrop = popup.querySelector('[data-sc-role="backdrop"]');
    const closeBtn = popup.querySelector('.sc-close');
  
    // --- Country Data (Hardcoded for now) ---
    const countriesData = {
      "item0": { "countrypagepath": "https://www.heromotocorp.com/en-ao/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/angola.png", "countryname": "Angola" },
      "item1": { "countrypagepath": "https://heromotos.com.ar/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/argentina.jpg", "countryname": "Argentina" },
      "item2": { "countrypagepath": "https://www.heromotocorp.com/en-bd/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/bangladesh.png", "countryname": "Bangladesh" },
      "item3": { "countrypagepath": "https://heromotos.com.bo/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/bolivia.jpg", "countryname": "Bolivia" },
      "item4": { "countrypagepath": "https://www.heromotos.com.co/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/columbia.jpg", "countryname": "Colombia" },
      "item5": { "countrypagepath": "https://heromotos.cr/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/costa-rica.png", "countryname": "Costa Rica" }
    };
  
    const countries = Object.values(countriesData);
  
    // --- Render countries ---
    countries.forEach((c) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'sc-item';
      item.innerHTML = `
        <img class="sc-flag" src="${c.countryicon}" alt="${c.countryname} flag"/>
        <span class="sc-name">${c.countryname}</span>
      `;
      item.addEventListener('click', () => {
        window.location.href = c.countrypagepath;
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
  