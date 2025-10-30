export default function decorate(block) {
    const [titleEl, descEl] = block.children;
  
    const title = document.createElement('h3');
    title.textContent = titleEl?.textContent?.trim() || '';
  
    const description = document.createElement('p');
    description.innerHTML = descEl?.innerHTML || '';
  
    block.textContent = '';
    block.append(title, description);
  }
  