document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach((el) => {
    if (el.querySelector('.accordion__control a')) {
      const controlLink = el.querySelector('.accordion__control a');
      controlLink.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }

    const controlEl = el.querySelector('.accordion__control');
    const contentEl = el.querySelector('.accordion__content');

    // click on accordion__control
    controlEl.addEventListener('click', (e) => {
      el.classList.toggle('open');

      if (el.classList.contains('open')) {
        controlEl.setAttribute('aria-expanded', true);
        contentEl.setAttribute('aria-hidden', false);
        contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
      } else {
        controlEl.setAttribute('aria-expanded', false);
        contentEl.setAttribute('aria-hidden', true);
        contentEl.style.maxHeight = null;
      }
    });
  });
});