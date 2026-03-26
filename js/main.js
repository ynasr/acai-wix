/* ===== Niyyah Bowls — Main JS ===== */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav__links');
  const links = document.querySelectorAll('.nav__links a');

  // Sticky nav background on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Gallery carousel (mobile only)
  const galleryGrid = document.querySelector('.gallery__grid');
  const items = document.querySelectorAll('.gallery__item');
  const prevBtn = document.querySelector('.gallery__prev');
  const nextBtn = document.querySelector('.gallery__next');
  const dotsContainer = document.querySelector('.gallery__dots');
  let currentSlide = 0;

  // Create dots
  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('gallery__dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to image ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    const slideWidth = galleryGrid.parentElement.offsetWidth;
    galleryGrid.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    document.querySelectorAll('.gallery__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // Recalculate on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 640) {
      goToSlide(currentSlide);
    } else {
      galleryGrid.style.transform = '';
    }
  });

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide === 0 ? items.length - 1 : currentSlide - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide === items.length - 1 ? 0 : currentSlide + 1);
  });

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  galleryGrid.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  galleryGrid.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(currentSlide === items.length - 1 ? 0 : currentSlide + 1);
      } else {
        goToSlide(currentSlide === 0 ? items.length - 1 : currentSlide - 1);
      }
    }
  }, { passive: true });
});
