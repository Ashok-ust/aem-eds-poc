export default function decorate(block) {
    const [image, heading, ...rest] = block.children;
  
    const container = document.createElement('div');
    container.classList.add('splendor-price-container');
  
    // Image
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('splendor-image');
    if (image) imgWrapper.append(image);
  
    // Content
    const content = document.createElement('div');
    content.classList.add('splendor-content');
  
    const title = document.createElement('h2');
    title.textContent = heading?.textContent?.trim() || 'SPLENDOR + PRICE';
  
    // Dropdowns
    const filters = document.createElement('div');
    filters.classList.add('splendor-filters');
    filters.innerHTML = `
      <div class="dropdown">
        <label>State</label>
        <select>
          <option>DELHI</option>
          <option>MUMBAI</option>
          <option>CHENNAI</option>
        </select>
      </div>
      <div class="dropdown">
        <label>City</label>
        <select>
          <option>DELHI</option>
          <option>MUMBAI</option>
          <option>CHENNAI</option>
        </select>
      </div>
    `;
  
    // Variant Table
    const table = document.createElement('table');
    table.classList.add('splendor-table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Variant</th>
          <th>Ex-Showroom Price</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>SPLENDOR+ DRUM BRAKE OBD2B</td><td>₹ 73,902</td></tr>
        <tr><td>SPLENDOR+ I3S OBD2B</td><td>₹ 75,055</td></tr>
        <tr><td>SPLENDOR+ SPECIAL EDITIONS OBD2B</td><td>₹ 75,055</td></tr>
        <tr><td>125 MILLION EDITION</td><td>₹ 76,437</td></tr>
      </tbody>
    `;
  
    // Buttons
    const btns = document.createElement('div');
    btns.classList.add('splendor-buttons');
    btns.innerHTML = `
      <button class="loan-btn">CHECK LOAN OFFERS</button>
      <button class="buy-btn">BUY NOW</button>
    `;
  
    content.append(title, filters, table, btns);
    container.append(imgWrapper, content);
    block.replaceChildren(container);
  }
  