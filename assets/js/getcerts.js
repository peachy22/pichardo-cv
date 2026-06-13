fetch('data/certs.json')
  .then(response => response.json())
  .then(list => {
    const certList = document.getElementById('cert-list');
    if(!certList) return;
    list.forEach(c => {
      const section = document.createElement('section');
      section.className = 'cert';
      section.innerHTML = `<img src="${c.image}" alt="${c.name}">`;
      certList.appendChild(section);
    });
  })
  .catch(error => {
    console.error('Error loading certs:', error);
  });
