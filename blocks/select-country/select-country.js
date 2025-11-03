 // blocks/select-country/select-country.js
// Simple Franklin-style decorator: export default function decorate(block)

export default function decorate(block) {
    if (!block) return;
  
    // Clear block content (Franklin passes the block root)
    block.innerHTML = '';
  
    // --- Button that opens popup ---
    const openBtn = document.createElement('button');
    openBtn.className = 'sc-open-btn';
    openBtn.type = 'button';
    openBtn.textContent = 'Select Country';
    block.appendChild(openBtn);
  
    // --- Popup (kept inside the block) ---
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
          <input class="sc-search" type="search" placeholder="Search country..." aria-label="Search country" />
          <div class="sc-list" role="list"></div>
        </div>
        <div class="sc-panel-foot">
          <button class="sc-continue" type="button">Continue</button>
        </div>
      </div>
    `;
    block.appendChild(popup);
  
    // --- Hardcoded country data (add more as needed) ---
    const countries = [
      { name: 'India', flag: 'https://flagcdn.com/w40/in.png', url: 'https://www.heromotocorp.com/en-in/' },
      { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', url: 'https://heromotos.com.ar/' },
      { name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png', url: 'https://www.heromotocorp.com/en-bd/' },
      { name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png', url: 'https://www.heromotocorp.com/en-za/' },
      { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png', url: 'https://heromotos.mx/' }
    ];
  
    const listEl = popup.querySelector('.sc-list');
    const searchEl = popup.querySelector('.sc-search');
    const backdrop = popup.querySelector('[data-sc-role="backdrop"]');
    const closeBtn = popup.querySelector('.sc-close');
    const continueBtn = popup.querySelector('.sc-continue');
  
    // render list items
    function renderList(items) {
      listEl.innerHTML = '';
      if (!items.length) {
        const empty = document.createElement('div');
        empty.className = 'sc-empty';
        empty.textContent = 'No countries found';
        listEl.appendChild(empty);
        return;
      }
      items.forEach((c, idx) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'sc-item';
        item.dataset.url = c.url || '#';
        item.innerHTML = `<img class="sc-flag" src="${c.flag}" alt="${c.name} flag"/><span class="sc-name">${c.name}</span>`;
        item.addEventListener('click', () => {
          // mark selected
          listEl.querySelectorAll('.sc-item').forEach(i => i.classList.remove('sc-selected'));
          item.classList.add('sc-selected');
        });
        listEl.appendChild(item);
      });
    }
  
    // initial render
    renderList(countries);
  
    // open / close helpers
    function openPopup() {
      popup.classList.remove('sc-hidden');
      // focus search for accessibility
      setTimeout(() => searchEl.focus(), 50);
      document.addEventListener('keydown', onKeyDown);
    }
    function closePopup() {
      popup.classList.add('sc-hidden');
      document.removeEventListener('keydown', onKeyDown);
    }
  
    function onKeyDown(e) {
      if (e.key === 'Escape') closePopup();
    }
  
    // click handlers
    openBtn.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
  
    continueBtn.addEventListener('click', () => {
      const selected = listEl.querySelector('.sc-item.sc-selected');
      if (!selected) {
        // if none selected, choose first visible
        const firstVisible = Array.from(listEl.children).find(ch => ch.offsetParent !== null && ch.classList.contains('sc-item'));
        if (firstVisible) window.location.href = firstVisible.dataset.url;
        else alert('Please select a country.');
        return;
      }
      window.location.href = selected.dataset.url;
    });
  
    // search filter
    searchEl.addEventListener('input', (e) => {
      const q = (e.target.value || '').trim().toLowerCase();
      const filtered = countries.filter(c => c.name.toLowerCase().includes(q));
      renderList(filtered);
    });
  
    // ensure popup is removed on block unload (Framework may reuse) -- optional
    if (typeof block.dataset !== 'undefined') {
      // no-op but placeholder for lifecycle hooks if needed
    }
  }
  