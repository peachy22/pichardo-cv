document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = modal.querySelector('.modal-close');

  // Map project titles to up to 3 images (if available)
  const projectImages = {
    'Healthcare Compliance Monitoring Platform': [
          'assets/img/techcare-bi/launch.png',
          'assets/img/techcare-bi/tcbi_homepage.png',
          'assets/img/techcare-bi/tcbi_billboard.png'
    ],
    'Test Prep Cloud Analytics Pipeline': [
          'assets/img/tutor-testprep/architecture-diagram.png',
          'assets/img/tutor-testprep/active-students.png',
          'assets/img/tutor-testprep/revenue-cycle.png'
        ],
    'Customer Sentiment Analysis': [
          'assets/img/blog/image-2.png',
          'assets/img/blog/image.png',
          'assets/img/blog/group-diverse-people-having-business-meeting.jpg'
    ],
    'Disaster Preparedness Modeling': [
          'assets/img/blog/nat.jpeg',
          'assets/img/blog/photo-1524813686514-a57563d77965.jpg',
          'assets/img/blog/michael-sum-LEpfefQf4rU-unsplash.jpg.webp'
    ],
    'Revenue Projection': [
          'assets/img/blog/wance-paleri-HPM0CDfNtx0-unsplash.jpg',
          'assets/img/blog/image-2.png',
          'assets/img/blog/photo-1524813686514-a57563d77965.jpg'
    ],
    'Health Network Readmission': [
          'assets/img/blog/image.png',
          'assets/img/blog/image-2.png',
          'assets/img/blog/wance-paleri-HPM0CDfNtx0-unsplash.jpg'
    ],
    'Tech Product Market Basket Analysis': [
          'assets/img/blog/craiyon_100102_analysis_of_shopping_cart_trends_for_data_driven_decision_making.png',
          'assets/img/blog/image-2.png',
          'assets/img/blog/group-diverse-people-having-business-meeting.jpg'
    ]
  };

  function openModal(contentHtml){
    modalBody.innerHTML = contentHtml;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

  // Attach to summary clicks
  document.querySelectorAll('.project-grid summary').forEach(summary => {
    summary.addEventListener('click', (e) => {
      e.preventDefault(); // prevent native details toggle
      const details = summary.parentElement; // the details element
      const title = summary.querySelector('strong')?.textContent?.trim() || summary.textContent.trim();
      const tech = summary.querySelector('.tech-inline')?.textContent || '';

      // get lead and accomplishments inside details
      const lead = details.querySelector('.lead')?.outerHTML || '';
      const acc = details.querySelector('.accomplishments')?.outerHTML || '';

      // build hero gallery from mapping (skip missing files via onerror)
      const imgs = projectImages[title] || [];
      const heroes = imgs.map(src => `<img class="modal-hero" src="${src}" alt="${title}" onerror="this.style.display='none'">`).join('');
      const heroesHtml = heroes ? `<div class="modal-heroes">${heroes}</div>` : '';

      const content = `
        <h2>${title}</h2>
        <p class="tech">${tech}</p>
        ${lead}
        ${acc}
        ${heroesHtml}
      `;
      openModal(content);
    });
  });
});
