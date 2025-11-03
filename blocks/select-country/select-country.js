export default function decorate(block) {
    if (!block) return;
  
    // Clear block content
    block.innerHTML = '';
  
    // --- India flag button (to open popup) ---
    const openBtn = document.createElement('button');
    openBtn.className = 'sc-open-btn';
    openBtn.type = 'button';
    openBtn.innerHTML = `<img src="/content/dam/hero-aem-website/brand/design/flags/india.png" alt="India flag" />`;
    block.appendChild(openBtn);
  
    // --- Popup container ---
    const popup = document.createElement('div');
    popup.className = 'sc-popup sc-hidden';
    popup.innerHTML = `
      <div class="sc-backdrop" data-sc-role="backdrop"></div>
      <div class="sc-panel" role="dialog" aria-modal="true" aria-label="Select Country">
        <div class="sc-panel-head">
          <h3 class="sc-title">Select Your Country</h3>
          <button class="sc-close" aria-label="Close">&times;</button>
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
  
    // --- Country Data (from JSON) ---
    const countriesData = {
      "item0": { "countrypagepath": "https://www.heromotocorp.com/en-ao/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/angola.png", "countryname": "Angola" },
      "item1": { "countrypagepath": "https://heromotos.com.ar/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/argentina.jpg", "countryname": "Argentina" },
      "item2": { "countrypagepath": "https://www.heromotocorp.com/en-bd/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/bangladesh.png", "countryname": "Bangladesh" },
      "item3": { "countrypagepath": "https://heromotos.com.bo/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/bolivia.jpg", "countryname": "Bolivia" },
      "item4": { "countrypagepath": "https://www.heromotos.com.co/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/columbia.jpg", "countryname": "Colombia" },
      "item5": { "countrypagepath": "https://heromotos.cr/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/costa-rica.png", "countryname": "Costa Rica" },
      "item6": { "countrypagepath": "https://heromotos.com.do/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/dominican-republic.jpg", "countryname": "Dominican Republic" },
      "item7": { "countrypagepath": "https://www.heromotocorp.com/en-dc/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/democratic-republic-of-the-congo.jpg", "countryname": "DRC" },
      "item8": { "countrypagepath": "https://heromotos.com.ec/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/ecuador.png", "countryname": "Ecuador" },
      "item9": { "countrypagepath": "https://heromotos.com.sv/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/el-salvador.jpg", "countryname": "El Salvador" },
      "item10": { "countrypagepath": "https://www.heromotocorp.com/en-et/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/ethiopia.jpg", "countryname": "Ethiopia" },
      "item11": { "countrypagepath": "https://www.heromotocorp.com/en-gc/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/gcc.jpg", "countryname": "GCC" },
      "item12": { "countrypagepath": "https://heromotos.com.gt/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/guatemala.jpg", "countryname": "Guatemala" },
      "item13": { "countrypagepath": "https://www.heromotocorp.com/en-gn/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/guinea.jpg", "countryname": "Guinea" },
      "item14": { "countrypagepath": "https://www.heromotocorp.com/en-gy/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/guyana.jpg", "countryname": "Guyana" },
      "item15": { "countrypagepath": "https://heromotos.com.ht/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/haiti_flag.png", "countryname": "Haiti" },
      "item16": { "countrypagepath": "https://heromotos.com.hn/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/honduras.jpg", "countryname": "Honduras" },
      "item17": { "countrypagepath": "https://www.heromotocorp.com/en-ke/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/kenya.png", "countryname": "Kenya" },
      "item18": { "countrypagepath": "https://www.heromotocorp.com/en-mg/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/madagascar.jpg", "countryname": "Madagascar" },
      "item19": { "countrypagepath": "https://www.heromotos.mx/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/mexico.png", "countryname": "Mexico" },
      "item20": { "countrypagepath": "https://www.heromotocorp.com/en-mm/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/myanmar.jpg", "countryname": "Myanmar" },
      "item21": { "countrypagepath": "https://www.heromotocorp.com/en-np/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/nepal.jpg", "countryname": "Nepal" },
      "item22": { "countrypagepath": "https://heromotos.com.ni/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/nicaragua.png", "countryname": "Nicaragua" },
      "item23": { "countrypagepath": "https://www.heromotocorp.com/en-ng/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/nigeria.jpg", "countryname": "Nigeria" },
      "item24": { "countrypagepath": "https://www.heromotocorp.com/en-pa/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/panama.jpg", "countryname": "Panama" },
      "item25": { "countrypagepath": "https://heromotos.com.pe/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/peru.jpg", "countryname": "Peru" },
      "item26": { "countrypagepath": "https://www.heromotocorp.com/en-ph/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/philippines.png", "countryname": "Philippines" },
      "item27": { "countrypagepath": "https://www.heromotocorp.com/en-za/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/south-africa.jpg", "countryname": "South Africa" },
      "item28": { "countrypagepath": "https://www.heromotocorp.com/en-lk/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/sri-lanka.jpg", "countryname": "Sri Lanka" },
      "item29": { "countrypagepath": "https://www.heromotocorp.com/en-tz/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/tanzania.png", "countryname": "Tanzania" },
      "item30": { "countrypagepath": "https://www.heromotocorp.com/en-tt/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/trinidad.jpg", "countryname": "Trinidad" },
      "item31": { "countrypagepath": "https://www.heromotor.com.tr/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/turkey.jpg", "countryname": "Turkey" },
      "item32": { "countrypagepath": "https://www.heromotocorp.com/en-ug/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/uganda.png", "countryname": "Uganda" },
      "item33": { "countrypagepath": "https://www.heromotocorp.com/en-zm/", "countryicon": "/content/dam/hero-aem-website/brand/design/flags/zambia.png", "countryname": "Zambia" }
    };
  
    // --- Convert to array ---
    const countries = Object.values(countriesData);
  
    // --- Render ---
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
  