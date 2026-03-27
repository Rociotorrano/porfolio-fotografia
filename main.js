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
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    const hideLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    closeLightbox.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeLightbox) {
            hideLightbox();
        }
    });

    // ESC key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideLightbox();
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
