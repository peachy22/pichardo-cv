document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cert-list');
  if (!container) return;

  fetch('json/certs.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load certs');
      return res.json();
    })
    .then((items) => {
      items.forEach((it) => {
        const wrap = document.createElement('div');
        wrap.className = 'cert';

        const a = document.createElement('a');
        a.href = it.link || '#';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const img = document.createElement('img');
        img.src = it.image;
        img.alt = it.name || '';
        img.loading = 'lazy';

        a.appendChild(img);
        wrap.appendChild(a);
        container.appendChild(wrap);
      });
    })
    .catch((err) => {
      console.error('Could not load certifications:', err);
    });
});
