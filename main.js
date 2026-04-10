document.addEventListener('DOMContentLoaded', () => {
    // 1. SCROLL REVEAL ANIMATIONS
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. STICKY HEADER SCROLL EFFECT
    const header = document.querySelector('#main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. LIGHTBOX FUNCTIONALITY
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevLightbox = document.querySelector('.prev-lightbox');
    const nextLightbox = document.querySelector('.next-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const allImages = document.querySelectorAll('.gallery-item img');

    let currentImageIndex = 0;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if(img) {
                currentImageIndex = Array.from(allImages).indexOf(img);
                showLightbox(img.src);
            }
        });
    });

    const showLightbox = (src) => {
        if(lightbox) lightbox.style.display = 'flex';
        if(lightboxImg) lightboxImg.src = src;
        document.body.style.overflow = 'hidden'; 
    };

    const hideLightbox = () => {
        if(lightbox) lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    };

    const showNext = (e) => {
        if(e) e.stopPropagation();
        if(allImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        if(lightboxImg) lightboxImg.src = allImages[currentImageIndex].src;
    };

    const showPrev = (e) => {
        if(e) e.stopPropagation();
        if(allImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        if(lightboxImg) lightboxImg.src = allImages[currentImageIndex].src;
    };

    if(closeLightbox) closeLightbox.addEventListener('click', hideLightbox);
    if(prevLightbox) prevLightbox.addEventListener('click', showPrev);
    if(nextLightbox) nextLightbox.addEventListener('click', showNext);

    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                hideLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'Escape') hideLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

    // 4. SUBTLE PARALLAX FOR ABOUT IMAGE
    const aboutImg = document.querySelector('.parallax-img');
    if (aboutImg) {
        window.addEventListener('scroll', () => {
            const speed = 0.2;
            const yPos = (window.scrollY * speed);
            // Limit the parallax shift to keep it subtle
            const scrollPercent = (window.scrollY / document.documentElement.scrollHeight) * 100;
            // only apply if in view roughly
            const rect = aboutImg.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                aboutImg.style.transform = `translateY(${scrollPercent * 0.5}px)`;
            }
        });
    }

    // 5. MOBILE MENU TOGGLE (Placeholder logic)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});
