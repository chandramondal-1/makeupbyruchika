document.addEventListener('DOMContentLoaded', () => {
    // 0. CUSTOM CURSOR LOGIC (Desktop Only)
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        const follower = document.createElement('div');
        cursor.className = 'custom-cursor';
        follower.className = 'cursor-follower';
        document.body.appendChild(cursor);
        document.body.appendChild(follower);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
            gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3 });
        });

        document.querySelectorAll('a, button, .portfolio-card, .service-card').forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
    } else {
        document.body.style.cursor = 'auto';
    }

    // 1. STICKY NAVBAR & BOTTOM NAV
    const header = document.querySelector('.header');
    const bottomNav = document.querySelector('.mobile-bottom-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (bottomNav) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                bottomNav.classList.add('hidden');
            } else {
                bottomNav.classList.remove('hidden');
            }
        }
        lastScroll = currentScroll;
    });

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

    // 8. GSAP ANIMATIONS
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Parallax
        gsap.to('.hero-img', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Staggered Reveal for all sections
        gsap.utils.toArray('.reveal-up').forEach((elem) => {
            gsap.fromTo(elem, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Magnetic Buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            });
        });
    }

    // 9. TYPEWRITER EFFECT
    const quoteEl = document.querySelector('.quote-text');
    if (quoteEl) {
        const text = quoteEl.innerText;
        quoteEl.innerText = '';
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let i = 0;
                const type = () => {
                    if (i < text.length) {
                        quoteEl.innerText += text.charAt(i);
                        i++;
                        setTimeout(type, 40);
                    }
                };
                type();
                observer.unobserve(quoteEl);
            }
        }, { threshold: 0.5 });
        observer.observe(quoteEl);
    }
});
