// export default function decorate(block) {
//     const cards = [...block.children];
  
//     // Parent wrapper for all cards
//     const wrapper = document.createElement('div');
//     wrapper.classList.add('simple-card-wrapper');
  
//     cards.forEach((card) => {
//       const [imageEl, titleEl, descEl] = card.children;
  
//       // Create parent card container
//       const cardDiv = document.createElement('div');
//       cardDiv.classList.add('card-item');
  
//       // Image
//       const img = document.createElement('img');
//       img.src = imageEl?.textContent?.trim() || '';
//       img.alt = titleEl?.textContent?.trim() || '';
//       img.classList.add('card-item__image');
  
//       // Title
//       const title = document.createElement('h3');
//       title.textContent = titleEl?.textContent?.trim() || '';
//       title.classList.add('card-item__title');
  
//       // Description
//       const desc = document.createElement('p');
//       desc.innerHTML = descEl?.innerHTML?.trim() || '';
//       desc.classList.add('card-item__description');
  
//       // Append elements to card
//       cardDiv.append(img, title, desc);
  
//       // Add to wrapper
//       wrapper.append(cardDiv);
//     });
  
//     // Replace block content
//     block.textContent = '';
//     block.append(wrapper);
//   }
  