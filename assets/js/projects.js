document.addEventListener('DOMContentLoaded', () => {
  const projectGrid = document.getElementById('project-grid');
  if (!projectGrid) return;

  fetch('json/projects.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load projects: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((projects) => {
      projectGrid.innerHTML = projects.map(renderProjectCard).join('');
      if (window.attachProjectSummaryListeners) {
        window.attachProjectSummaryListeners();
      }
    })
    .catch((error) => {
      console.error(error);
      projectGrid.innerHTML = '<p class="error">Unable to load projects.</p>';
    });
});

function renderProjectCard(project) {
  const featuredClass = project.featured ? ' featured-card' : '';
  const heroesAttribute = Array.isArray(project.heroes) && project.heroes.length
    ? ` data-heroes="${project.heroes.join(', ')}"`
    : '';

  const accomplishments = Array.isArray(project.accomplishments)
    ? project.accomplishments.map((item) => `<li>${item}</li>`).join('')
    : '';

  const bottomImage = project.bottomImage && project.bottomImage.src
    ? `<img class="modal-bottom-image" src="${project.bottomImage.src}" alt="${project.bottomImage.alt || ''}">`
    : '';

  return `
    <article class="project-card${featuredClass}">
      <details>
        <summary${heroesAttribute}>
          <strong>${project.title}</strong><br>
          <span class="tech-inline">${project.tech}</span>
        </summary>
        <p class="lead">${project.lead}</p>
        <ul class="accomplishments">
          ${accomplishments}
        </ul>
        ${bottomImage}
      </details>
    </article>`;
}
