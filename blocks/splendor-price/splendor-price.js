    export default function decorate(block) {
    const data = block.dataset;
  
    const container = document.createElement('div');
    container.classList.add('splendor-price-container');
  
    // 🖼️ Image
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('splendor-image');
    const image = block.querySelector('picture, img');
    if (image) imgWrapper.append(image);
  
    // 📄 Content
    const content = document.createElement('div');
    content.classList.add('splendor-content');
  
    // 🏷️ Title
    const title = document.createElement('h2');
    title.textContent = data.title || 'SPLENDOR + PRICE';
  
    // 📍 Filters
    const filters = document.createElement('div');
    filters.classList.add('splendor-filters');
    filters.innerHTML = `
      <div class="dropdown">
        <label>${data.stateLabel || 'State'}</label>
        <select>
          <option>DELHI</option>
          <option>MUMBAI</option>
          <option>CHENNAI</option>
        </select>
      </div>
      <div class="dropdown">
        <label>${data.cityLabel || 'City'}</label>
        <select>
          <option>DELHI</option>
          <option>MUMBAI</option>
          <option>CHENNAI</option>
        </select>
      </div>
    `;
  
    // 📊 Variant Table (from multifield)
    const variants = JSON.parse(data.variants || '[]');
    const table = document.createElement('table');
    table.classList.add('splendor-table');
    const rows = variants.map(
      (v) => `<tr><td>${v.variantName}</td><td>${v.price}</td></tr>`
    ).join('');
  
    table.innerHTML = `
      <thead>
        <tr><th>Variant</th><th>Ex-Showroom Price</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    `;
  
    // 🔘 Buttons
    const btns = document.createElement('div');
    btns.classList.add('splendor-buttons');
    btns.innerHTML = `
      <button class="loan-btn">${data.loanButton || 'CHECK LOAN OFFERS'}</button>
      <button class="buy-btn">${data.buyButton || 'BUY NOW'}</button>
    `;
  
    // Combine
    content.append(title, filters, table, btns);
    container.append(imgWrapper, content);
    block.replaceChildren(container);
  }
  