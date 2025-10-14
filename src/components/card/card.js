// Modal functionality
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const projectCards = document.querySelectorAll('.project-card');
  const closeBtn = document.querySelector('.close');

  const dataElement = document.getElementById('projectsData');
  if (!dataElement?.textContent) {
    console.error('Projects data not found');
    return;
  }
  const projectsData = JSON.parse(dataElement.textContent);


  function populateModal(projectInfo, projectType) {
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalDevelopmentTime = document.getElementById('modalDevelopmentTime');
    const modalCTA = document.getElementById('modalCTA');
    const featuresList = document.getElementById('modalFeatures');
    const modalBody = document.querySelector('.modal-body');


    if (modalTitle) modalTitle.textContent = projectInfo.title;
    if (modalImage) {
      modalImage.src = projectInfo.image;
      modalImage.alt = projectInfo.title;
    }
    if (modalDescription) modalDescription.textContent = projectInfo.description;
    if (modalPrice) modalPrice.textContent = projectInfo.price;
    if (modalDevelopmentTime) modalDevelopmentTime.textContent = projectInfo.developmentTime;
    if (modalCTA) modalCTA.textContent = projectInfo.ctaText;


    if (featuresList) {
      featuresList.innerHTML = '';
      projectInfo.features.forEach(function(feature) {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
      });
    }

  
    if (modalBody) {

      modalBody.classList.remove('landing-layout', 'pwa-layout', 'api-layout', 'ecommerce-layout');
      

      if (projectType === 'landing') {
        modalBody.classList.add('landing-layout');
      } else if (projectType === 'webapp') {
        modalBody.classList.add('pwa-layout');
      } else if (projectType === 'api') {
        modalBody.classList.add('api-layout');
      } else if (projectType === 'ecommerce') {
        modalBody.classList.add('ecommerce-layout');
      }
    }
  }


  function showModal() {
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      // Force reflow before adding show class
      modal.offsetHeight;
      modal.classList.add('show');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 200);
    }
  }


  projectCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const projectType = this.dataset.project;
      const projectInfo = projectsData[projectType];
      
      if (projectInfo) {
        populateModal(projectInfo, projectType);
        showModal();
      }
    });
  });

  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }


  const handleCTAClick = function() {
    const projectType = document.querySelector('.modal-body').className.split(' ').find(cls => 
      cls.includes('-layout')
    )?.replace('-layout', '');
    
    if (projectType) {
      const projectInfo = projectsData[projectType] || projectsData[Object.keys(projectsData)[0]];
      const message = `Hola, estoy interesado en el servicio: ${projectInfo.title}. ¿Podrían darme más información?`;
      const whatsappURL = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    }
  };


  document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'modalCTA') {
      handleCTAClick();
    }
  });
}


document.addEventListener('DOMContentLoaded', initProjectModal);