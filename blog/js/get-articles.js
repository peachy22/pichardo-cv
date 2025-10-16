
fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const blogList = document.getElementById('blog-list');


    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    posts.forEach(post => {
      const section = document.createElement('section');
      section.innerHTML = `
        <div class = "thumbnail"><img src="${post.image}"></img></div>
        <div>
        <h><a href="${post.link}">${post.title}</a></h>
        <p><em>${new Date(post.date).toLocaleDateString()}</em></p>
        <p>${post.summary}</p>
        </div>
      `;
      blogList.appendChild(section);
    });
  })
  .catch(error => {
    console.error('Error loading posts:', error);
  });
