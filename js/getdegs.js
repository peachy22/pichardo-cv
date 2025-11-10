fetch('degs.json')
  .then(response => response.json())
  .then(posts => {
    const certList = document.getElementById('degree-list');
    
    posts.forEach(post => {
      const section = document.createElement('section');
      section.innerHTML = `
        <img src="${post.image}"></img>
      `;
      certList.appendChild(section);
    });
  })
  .catch(error => {
    console.error('Error loading degrees:', error);
  });
