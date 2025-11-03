export default function decorate(block) {
    // Create main button
    const button = document.createElement('button');
    button.className = 'open-popup-btn';
    button.textContent = 'Select Country';
    block.appendChild(button);
  
    // Create popup container
    const popup = document.createElement('div');
    popup.className = 'country-popup hidden';
    popup.innerHTML = `
      <div class="popup-content">
        <h3>Select Your Country</h3>
        <ul class="country-list">
          <li data-id="in"><img src="https://flagcdn.com/w20/in.png"> India</li>
          <li data-id="us"><img src="https://flagcdn.com/w20/us.png"> United States</li>
          <li data-id="uk"><img src="https://flagcdn.com/w20/gb.png"> United Kingdom</li>
          <li data-id="au"><img src="https://flagcdn.com/w20/au.png"> Australia</li>
        </ul>
        <button class="close-popup-btn">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
  
    // Open popup
    button.addEventListener('click', () => {
      popup.classList.remove('hidden');
    });
  
    // Close popup
    popup.querySelector('.close-popup-btn').addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  
    // Handle country click
    popup.querySelectorAll('.country-list li').forEach((item) => {
      item.addEventListener('click', () => {
        alert(`You selected: ${item.textContent.trim()}`);
        popup.classList.add('hidden');
      });
    });
  }
  