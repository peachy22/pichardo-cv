(function(){
  const contentName = document.documentElement.dataset.content;

  async function loadMeta(){
    try{
  const resp = await fetch('/pichardo-cv//pichardo-cv/posts.json');
      const posts = await resp.json();
      const post = posts.find(p => p.name === contentName);
      if(!post) return console.warn('post not found for', contentName);

      const titleEl = document.getElementById('title');
      const dateEl = document.getElementById('date');
      const summaryEl = document.getElementById('summary');

      if(titleEl) titleEl.textContent = post.title || '';
      if(dateEl) dateEl.textContent = post.date ? new Date(post.date).toLocaleDateString() : '';
      if(summaryEl) summaryEl.textContent = post.summary || '';

      // make summary visible if present
      if(summaryEl && summaryEl.textContent) summaryEl.style.display = '';
    }catch(err){
      console.error('Error loading post metadata', err);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadMeta);
  } else {
    loadMeta();
  }
})();
