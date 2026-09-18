document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1. MENU HAMBÚRGUER RESPONSIVO
     ============================================ */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  function toggleMenu() {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });


  /* ============================================
     2. LIGHTBOX / MODAL PARA GALERIA DE IMAGENS
     ============================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(imgSrc, imgAlt, caption) {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.dataset.caption || img.alt;
      openLightbox(img.src, img.alt, caption);
    });

    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });


  /* ============================================
     3. PASSO A PASSO INTERATIVO (ACCORDION + CONCLUÍDO)
     ============================================ */
  const steps = document.querySelectorAll('.step');
  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const totalSteps = steps.length;

  function updateProgress() {
    const doneCount = document.querySelectorAll('.step.is-done').length;
    const percent = (doneCount / totalSteps) * 100;
    progressFill.style.width = percent + '%';
    progressLabel.textContent = `${doneCount} de ${totalSteps} passos concluídos`;

    if (doneCount === totalSteps) {
      progressLabel.textContent = `🎉 Tudo pronto! Você concluiu os ${totalSteps} passos!`;
    }
  }

  steps.forEach(step => {
    const header = step.querySelector('.step__header');
    const check = step.querySelector('.step__check');

    header.addEventListener('click', (e) => {
      if (e.target === check) return;

      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!isExpanded));
    });

    check.addEventListener('click', (e) => {
      e.stopPropagation();
      step.classList.toggle('is-done');
      updateProgress();
    });
  });

  updateProgress();


  /* ============================================
     BOTÃO VOLTAR AO TOPO
     ============================================ */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ============================================
     HEADER: SOMBRA AO ROLAR
     ============================================ */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(27, 67, 50, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });


  /* ============================================
     CTA HERO: ROLAGEM SUAVE GARANTIDA
     ============================================ */
  const ctaBtn = document.getElementById('ctaBtn');
  ctaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#o-que-e');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

});
