export default async function decorate(block) {
    const apiUrl =
      "https://dev1.heromotocorp.com/content/experience-fragments/hero-aem-website/in/en/site/modal/master.10.json";
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Navigate into the JSON to reach "countries"
      const countries =
        data["container-item0"]?.modal_comp?.responsivegrid?.country_selector
          ?.countries || {};
  
      const heading =
        data["container-item0"]?.modal_comp?.responsivegrid?.country_selector
          ?.heading || "Please Select Your Country";
  
      // Create modal container
      const modalContainer = document.createElement("div");
      modalContainer.className = "country-modal-container";
  
      // Create modal header
      const header = document.createElement("h2");
      header.className = "country-modal-heading";
      header.textContent = heading;
      modalContainer.appendChild(header);
  
      // Create grid
      const grid = document.createElement("div");
      grid.className = "country-grid";
  
      // Iterate over all country items
      Object.keys(countries).forEach((key) => {
        const item = countries[key];
        const card = document.createElement("div");
        card.className = "country-card";
  
        const img = document.createElement("img");
        img.src = item.countryicon || "";
        img.alt = item.countryname || "";
  
        const name = document.createElement("p");
        name.textContent = item.countryname || "";
  
        const link = document.createElement("a");
        link.href = item.countrypagepath || "#";
        link.target = "_blank";
        link.appendChild(img);
        link.appendChild(name);
  
        card.appendChild(link);
        grid.appendChild(card);
      });
  
      modalContainer.appendChild(grid);
  
      // Append to block (container in your framework)
      block.innerHTML = "";
      block.appendChild(modalContainer);
    } catch (error) {
      console.error("Error loading country modal:", error);
      block.innerHTML = `<p class="error">Failed to load country data.</p>`;
    }
  }
  