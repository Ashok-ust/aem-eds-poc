export default async function decorate(block) {
    const response = await fetch(
      'https://dev1.heromotocorp.com/content/experience-fragments/hero-aem-website/in/en/site/modal/master.10.json'
    );
    const json = await response.json();
    const data = json?.root?.children?.selectcountry || {};
    const title = data.title || 'Please Select Your Country';
    const countries = data.countries || {};
  
    const modal = document.createElement('div');
    modal.className = 'country-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${title}</h2>
        <div class="country-grid">
          ${Object.values(countries)
            .map(
              (item) => `
            <a href="${item.countrypagepath}" class="country-item">
              <img src="${item.countryicon}" alt="${item.countryname}">
              <span>${item.countryname}</span>
            </a>
          `
            )
            .join('')}
        </div>
        <button class="close-btn">×</button>
      </div>
    `;
  
    document.body.appendChild(modal);
    modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
  }
  