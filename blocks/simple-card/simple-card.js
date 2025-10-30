export default function decorate(block) {
    const [imageWrapper, titleWrapper, descWrapper] = block.children;
  
    // Create parent container
    const card = document.createElement('div');
    card.classList.add('simple-card');
  
    // Create image element
    const img = document.createElement('img');
    img.src = imageWrapper?.textContent?.trim() || '';
    img.alt = titleWrapper?.textContent?.trim() || '';
    img.classList.add('simple-card__image');
  
    // Create title
    const title = document.createElement('h3');
    title.textContent = titleWrapper?.textContent?.trim() || '';
    title.classList.add('simple-card__title');
  
    // Create description
    const desc = document.createElement('p');
    desc.innerHTML = descWrapper?.innerHTML?.trim() || '';
    desc.classList.add('simple-card__description');
  
    // Append all elements to parent
    card.append(img, title, desc);
  
    // Replace the block content
    block.replaceChildren(card);
  }
  