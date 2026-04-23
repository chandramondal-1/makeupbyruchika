    // 1. LOADER (Optimized with Fallback)
    const loader = document.getElementById('loader');
    
    const hideLoader = () => {
        if (!loader || loader.classList.contains('loaded')) return;
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.style.display = 'none';
            revealOnScroll();
        }, 1000);
    };

    // Auto-hide after 5s regardless of assets
    setTimeout(hideLoader, 5000);

    window.addEventListener('load', () => {
        setTimeout(hideLoader, 1500); // 1.5s for brand appreciation
    });

    // 2. STICKY NAVBAR & SCROLL EFFECTS
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. REVEAL ON SCROLL (Staggered & Luxury)
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const customDelay = entry.target.getAttribute('data-delay') || 0;
                const staggerDelay = customDelay || (index % 3) * 0.1;
                
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, staggerDelay * 1000);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // 4. COUNTER ANIMATION
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

    // 5. PORTFOLIO FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'inline-block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // 6. MOBILE MENU TOGGLE
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // 7. FORM SUBMISSION (PREVENT DEFAULT & LOG)
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Checking Availability...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! I will get back to you shortly.');
                btn.innerText = originalText;
                btn.disabled = false;
                bookingForm.reset();
            }, 2000);
        });
    }

    // 8. BEFORE/AFTER SLIDER LOGIC
    const comparisonSlider = document.querySelector('.comparison-slider');
    if (comparisonSlider) {
        const sliderInput = comparisonSlider.querySelector('.slider-input');
        const afterImg = comparisonSlider.querySelector('.after-img');
        const handle = comparisonSlider.querySelector('.slider-handle');

        sliderInput.addEventListener('input', (e) => {
            const value = e.target.value;
            afterImg.style.width = `${value}%`;
            handle.style.left = `${value}%`;
        });
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
});

// 9. PERFORMANCE: PREFETCH ON HOVER
const links = document.querySelectorAll('a[href*=".html"]');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !document.querySelector(`link[href="${href}"]`)) {
            const prefetch = document.createElement('link');
            prefetch.rel = 'prefetch';
            prefetch.href = href;
            document.head.appendChild(prefetch);
        }
    }, { once: true });
});

    // 11. LIGHTBOX GALLERY LOGIC
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
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

// 12. FORM ENHANCEMENT: DATE VALIDATION
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
