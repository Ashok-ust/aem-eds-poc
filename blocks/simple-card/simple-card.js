
  export default function decorate(block) {
    const cards = [...block.children];
  
    const wrapper = document.createElement('div');
    wrapper.classList.add('simple-card-wrapper');
  
    cards.forEach((card) => {
      const [titleEl, descEl] = card.children;
  
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card-item');
  
      const title = document.createElement('h3');
      title.textContent = titleEl?.textContent?.trim() || '';
  
      const desc = document.createElement('p');
      desc.innerHTML = descEl?.innerHTML || '';
  
      cardDiv.append(title, desc);
      wrapper.append(cardDiv);
    });
  
    block.textContent = '';
    block.append(wrapper);
  }
    