(function(){
  const contentName = document.documentElement.dataset.content;

  async function loadContent(){
    try{
      const res = await fetch('content/' + contentName + '_content.html');
      if(!res.ok) throw new Error('Failed to fetch content: ' + res.status);
      const html = await res.text();
      const container = document.getElementById('content');
      if(container) container.innerHTML = html;
    }catch(err){
      console.error('Error loading post content', err);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }
})();
