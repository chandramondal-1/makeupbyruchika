document.addEventListener('DOMContentLoaded', () => {
    // 1. STICKY NAVBAR
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. REVEAL ON SCROLL
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay * 1000);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. COUNTER ANIMATION
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const increment = target / 100;
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 1 });
    counters.forEach(counter => counterObserver.observe(counter));

    // 4. PORTFOLIO FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'inline-block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // 5. MOBILE MENU
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // 6. LIGHTBOX
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-content');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        document.querySelectorAll('.portfolio-card img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }

    // 7. DATE VALIDATION
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    // Custom utility for initial reveal
    function revealOnScroll() {
        const initialReveals = document.querySelectorAll('.hero .reveal-up');
        initialReveals.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 200);
        });
    }

    // 13. SPARKLE PARTICLE GENERATOR
    const createSparkles = () => {
        const container = document.getElementById('sparkle-container');
        if (!container) return;
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(sparkle);
        }
    };
    createSparkles();

    // 14. GSAP LUXURY ANIMATIONS
    if (typeof gsap !== 'undefined') {
        // Hero Stagger Reveal
        gsap.from('.hero-title span', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        });

        gsap.from('.hero-subtitle', {
            duration: 1,
            opacity: 0,
            y: 20,
            delay: 1.2,
            ease: 'power2.out'
        });

        // Magnetic Buttons Logic
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            });
        });

        // Portfolio Card Tilt
        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to(card, {
                    rotationY: x * 10,
                    rotationX: -y * 10,
                    transformPerspective: 1000,
                    duration: 0.4
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6 });
            });
        });
    }

    // 15. TYPEWRITER EFFECT
    const typeQuote = (el) => {
        const text = el.innerText;
        el.innerText = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                el.innerText += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        type();
    };
    const quoteEl = document.querySelector('.quote-text');
    if (quoteEl) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeQuote(quoteEl);
                observer.unobserve(quoteEl);
            }
        }, { threshold: 0.5 });
        observer.observe(quoteEl);
    }
});
