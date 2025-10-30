export default function decorate(block) {
    // Extract children (in order as defined in author)
    const [
      imageEl, 
      headingEl, 
      stateLabelEl, 
      cityLabelEl,
      buyButtonE1, 
      loanButtonE1,
      ...rest
    ] = block.children;
  
    const container = document.createElement('div');
    container.classList.add('splendor-price-container');
  
    // 🖼️ Image
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('splendor-image');
    if (imageEl) imgWrapper.append(imageEl);
  
    // 📄 Content
    const content = document.createElement('div');
    content.classList.add('splendor-content');
  
    // 🏷️ Heading
    const title = document.createElement('h2');
    title.textContent = headingEl?.textContent?.trim() || 'SPLENDOR + PRICE';
  
    // 📍 State & City Labels
    const stateLabel = stateLabelEl?.textContent?.trim() || 'State';
    const cityLabel = cityLabelEl?.textContent?.trim() || 'City';
  
    // 🧩 Extract variants and buttons (multifield & buttons from author)
    const variantRows = [];
    const buyButton = buyButtonE1?.textContent?.trim() || "Check loan offers";
    const loanButton = loanButtonE1?.textContent?.trim();
    
  
    rest.forEach((child) => {
      const text = child.textContent.trim();
  
      if (text.toUpperCase().includes('LOAN')) {
        loanButton = text;
      } else if (text.toUpperCase().includes('BUY')) {
        buyButton = text;
      } else if (text.includes('₹')) {
        // variant and price rows
        const [variantName, price] = text.split('₹').map((t) => t.trim());
        variantRows.push({ variantName, price: `₹ ${price}` });
      }
    });
  
   
    const filters = document.createElement('div');
    filters.classList.add('splendor-filters');
    filters.innerHTML = `
      <div class="dropdown">
        <label>${stateLabel}</label>
        <select>
          <option>DELHI</option>
          <option>MUMBAI</option>
          <option>CHENNAI</option>
        </select>
      </div>
      <div class="dropdown">
        <label>${cityLabel}</label>
        <select>
          <option>DELHI</option>
          <option>MUMBAI</option>
          <option>CHENNAI</option>
        </select>
      </div>
    `;
  
    // 📊 Table Section
    const table = document.createElement('table');
    table.classList.add('splendor-table');
    const tbody = variantRows
      .map(
        (row) =>
          `<tr><td>${row.variantName}</td><td>${row.price}</td></tr>`
      )
      .join('');
  
    table.innerHTML = `
      <thead>
        <tr>
          <th>Variant</th>
          <th>Ex-Showroom Price</th>
        </tr>
      </thead>
      <tbody>${tbody}</tbody>
    `;
  
    // 🔘 Buttons Section
    const btns = document.createElement('div');
    btns.classList.add('splendor-buttons');
    btns.innerHTML = `
      <button class="loan-btn">${loanButton}</button>
      <button class="buy-btn">${buyButton}</button>
    `;
  
    // 🧱 Combine All
    content.append(title, filters, table, btns);
    container.append(imgWrapper, content);
    block.replaceChildren(container);
  }
  