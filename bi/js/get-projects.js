
fetch('projects.json')
  .then(response => response.json())
  .then(posts => {
    const blogList = document.getElementById('project-list');


    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    posts.forEach(post => {
      const section = document.createElement('section');
      section.innerHTML = `<a href="${post.link}" style="text-decoration: none; color: inherit;">
        <div class = "pcard">
        <div>
        <b><span style="font-size: 20px; color: #000000ff; ">${post.title}</span></b>
        <p>${post.summary}</p>
        </div>
        </div>
        </a>
        
      `;
      blogList.appendChild(section);
    });
  })
  .catch(error => {
    console.error('Error loading posts:', error);
  });
