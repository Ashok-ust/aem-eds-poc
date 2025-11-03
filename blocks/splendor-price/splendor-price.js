
export default function decorate(block) {
    const title = block.querySelector('.select-country-title');
    const options = block.querySelectorAll('.select-country-option');
    const button = block.querySelector('.select-country-button');
  
    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
      });
    });
  
    if (button) {
      button.addEventListener('click', () => {
        const selected = block.querySelector('.select-country-option.selected');
        if (selected) {
          const cta = selected.dataset.cta;
          if (cta) window.location.href = cta;
        }
      });
    }
  }
  