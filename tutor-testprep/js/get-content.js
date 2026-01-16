
fetch('json/content.json')
  .then(response => response.json())
  .then(content => {
    const contentList = document.getElementById('content-list');
    
    content.forEach(item => {
      const section = document.createElement('section');
      section.innerHTML = `
      <img src=${item.image} alt="as" style="width:100%;height:100%;border-radius: 4px;"></br>
         <div style="text-align:center; font-weight:bold; line-height: .5; ">${item.title}</div>
      `;

      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.id = `modal-${item.name}`;

      modal.innerHTML = `
        <div class="modal-content">
        
           <div class="looker-container" style="width:100%;height:100%;">
      <iframe 
        src="${item.link}"
        loading="lazy"
        frameborder="0"
        style="border:none;width:100%;height:100%;">
      </iframe>
    </div>
    </br>
    <div>${item.summary}</div>
        </div>
      `;


      contentList.appendChild(section);
      document.body.appendChild(modal);
  
 

 section.addEventListener('click', () => {
        modal.style.display = 'block';
      });

   window.addEventListener('click', (event) => {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      });

    
    });
  })