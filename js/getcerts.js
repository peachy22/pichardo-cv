fetch('/pichardo-cv/json/certs.json')
  .then(response => response.json())
  .then(posts => {
    const certList = document.getElementById('cert-list');
    
    posts.forEach(post => {
      const section = document.createElement('section');
      section.innerHTML = `
        <a href="${post.link}">
        <img src="${post.image}"></img>
        </a>
      `;
      certList.appendChild(section);
    });
  })
  .catch(error => {
    console.error('Error loading certs:', error);
  });
