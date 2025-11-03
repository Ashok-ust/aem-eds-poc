export default function decorate(block) {
    // Read AEM data attributes (set dynamically by AEM)
    const popupTitle = block.dataset.popupTitle || 'Select Your Country';
    const buttonImage = block.dataset.imageLabel || '/content/dam/hero-aem-website/brand/design/flags/india.png';
    const closeIcon = block.dataset.closeIcon || '/content/dam/hero-aem-website/brand/design/icons/close.png';
  
    // Create India flag trigger button
    const button = document.createElement('img');
    button.src = buttonImage;
    button.alt = 'Select Country';
    button.className = 'select-country-btn';
  
    // Create popup wrapper
    const popup = document.createElement('div');
    popup.className = 'select-country-popup hidden';
  
    // Popup header with dynamic title and close icon
    const popupHeader = document.createElement('div');
    popupHeader.className = 'popup-header';
    popupHeader.innerHTML = `
      <h2>${popupTitle}</h2>
      <img src="${closeIcon}" alt="Close" class="close-popup-icon" />
    `;
  
    // Country grid container
    const countriesContainer = document.createElement('div');
    countriesContainer.className = 'countries-grid';
  
    // Hardcoded country data (AEM will provide later)
    const countries = [
      { name: 'Angola', icon: '/content/dam/hero-aem-website/brand/design/flags/angola.png', link: 'https://www.heromotocorp.com/en-ao/' },
      { name: 'Argentina', icon: '/content/dam/hero-aem-website/brand/design/flags/argentina.jpg', link: 'https://heromotos.com.ar/' },
      { name: 'Bangladesh', icon: '/content/dam/hero-aem-website/brand/design/flags/bangladesh.png', link: 'https://www.heromotocorp.com/en-bd/' },
      { name: 'Bolivia', icon: '/content/dam/hero-aem-website/brand/design/flags/bolivia.jpg', link: 'https://heromotos.com.bo/' },
      { name: 'Colombia', icon: '/content/dam/hero-aem-website/brand/design/flags/columbia.jpg', link: 'https://www.heromotos.com.co/' },
      { name: 'Costa Rica', icon: '/content/dam/hero-aem-website/brand/design/flags/costa-rica.png', link: 'https://heromotos.cr/' },
      { name: 'Dominican Republic', icon: '/content/dam/hero-aem-website/brand/design/flags/dominican-republic.jpg', link: 'https://heromotos.com.do/' },
      { name: 'Ecuador', icon: '/content/dam/hero-aem-website/brand/design/flags/ecuador.png', link: 'https://heromotos.com.ec/' },
      { name: 'Ethiopia', icon: '/content/dam/hero-aem-website/brand/design/flags/ethiopia.jpg', link: 'https://www.heromotocorp.com/en-et/' },
      { name: 'Kenya', icon: '/content/dam/hero-aem-website/brand/design/flags/kenya.png', link: 'https://www.heromotocorp.com/en-ke/' },
    ];
  
    // Build country list (5 per row handled by CSS grid)
    countries.forEach(({ name, icon, link }) => {
      const country = document.createElement('a');
      country.href = link;
      country.className = 'country-item';
      country.innerHTML = `
        <img src="${icon}" alt="${name}">
        <p>${name}</p>
      `;
      countriesContainer.appendChild(country);
    });
  
    // Append all parts
    popup.append(popupHeader, countriesContainer);
    block.append(button, popup);
  
    // Event listeners
    button.addEventListener('click', () => popup.classList.remove('hidden'));
    popup.querySelector('.close-popup-icon').addEventListener('click', () => popup.classList.add('hidden'));
  }
  