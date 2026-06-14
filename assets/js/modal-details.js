document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const modalBody = document.getElementById('modal-body');
  const closeBtn = modal.querySelector('.modal-close');

  function openModal(node) {
    modalBody.innerHTML = '';
    modalBody.appendChild(node);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // move focus to close button for accessibility
    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  const summaries = document.querySelectorAll('.project-card summary');
  summaries.forEach((summary) => {
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const details = summary.closest('details');
      const container = document.createElement('div');
      container.className = 'modal-detail-container';

      const titleEl = summary.querySelector('strong');
      const titleHTML = titleEl ? titleEl.innerHTML : summary.innerHTML;
      const techEl = summary.querySelector('.tech-inline');
      const techHTML = techEl ? techEl.outerHTML : '';

      const header = document.createElement('div');
      header.innerHTML = `<h2>${titleHTML}</h2>${techHTML}`;
      container.appendChild(header);


      const lead = details.querySelector('.lead');
      if (lead) container.appendChild(lead.cloneNode(true));
      const ul = details.querySelector('.accomplishments');
      if (ul) container.appendChild(ul.cloneNode(true));

      const heroSources = [];
      if (summary.dataset.heroes) {
        heroSources.push(...summary.dataset.heroes.split(',').map((src) => src.trim()).filter(Boolean));
      }
      ['hero', 'hero2', 'hero3', 'hero4', 'hero5'].forEach((key) => {
        const src = summary.dataset[key];
        if (src) heroSources.push(src.trim());
      });

      // Skip rendering hero images for the tutor-testprep project (we embed an iframe instead)
      const isTutorProject = heroSources.some((s) => s.includes('tutor-testprep'));
      if (heroSources.length && !isTutorProject) {
        const spacer = document.createElement('div');
        spacer.className = 'modal-spacer';
        container.appendChild(spacer);

        const heroWrap = document.createElement('div');
        heroWrap.className = 'modal-heroes';
        heroWrap.classList.add(heroSources.length <= 3 ? `count-${heroSources.length}` : 'count-4plus');

        // If the hero references the lakehouse architecture image, mark as full-width
        if (heroSources.some((s) => s.includes('lakehouse-architecture.png') || s.includes('architecture-diagram.png'))) {
          heroWrap.classList.add('project-fullwidth');
        }

        heroSources.forEach((src) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = '';
          img.className = 'modal-hero';
          heroWrap.appendChild(img);
        });

        container.appendChild(heroWrap);
      }

      openModal(container);
    });

    summary.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        summary.click();
      }
    });
  });
});
