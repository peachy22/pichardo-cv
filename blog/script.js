// /blog/script.js
fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const blogList = document.getElementById('blog-list');
    
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h2><a href="${post.link}">${post.title}</a></h2>
        <p><em>${new Date(post.date).toLocaleDateString()}</em></p>
        <p>${post.summary}</p>
      `;
      blogList.appendChild(article);
    });
  })
  .catch(error => {
    console.error('Error loading posts:', error);
  });
