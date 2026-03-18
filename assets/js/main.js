/*================================================================
  SIDDHARTH BHADU — EDITORIAL PORTFOLIO JS
  ================================================================
  Features:
  - Smooth page loader
  - Custom cursor with hover effects
  - GSAP scroll-triggered reveal animations
  - Hero text line-by-line entrance
  - Work item hover preview follows mouse
  - Navigation scroll effects + mobile menu
  - Marquee ticker
  - Contact form (EmailJS)
================================================================*/

document.addEventListener('DOMContentLoaded', () => {

    /*==================================================
      1. PAGE LOADER
    ==================================================*/
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('done');
            document.body.style.overflow = 'auto';
            initAnimations();
        }, 2400);
    });

    // Prevent scroll during loader
    document.body.style.overflow = 'hidden';


    /*==================================================
      2. CUSTOM CURSOR
    ==================================================*/
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        });

        function animateFollower() {
            followerX += (cursorX - followerX) * 0.12;
            followerY += (cursorY - followerY) * 0.12;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .work__item, .tech-item, .services__item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
    }


    /*==================================================
      3. NAVIGATION
    ==================================================*/
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('show');
            document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : 'auto';
        });

        // Close menu on link click
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        });
    }


    /*==================================================
      4. WORK ITEM HOVER PREVIEW (Follow Mouse)
    ==================================================*/
    const workItems = document.querySelectorAll('.work__item');

    workItems.forEach(item => {
        const preview = item.querySelector('.work__item-preview');
        if (!preview) return;

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            // Position the preview image near the cursor
            preview.style.left = (x + 20) + 'px';
            preview.style.top = (y - 110) + 'px';
        });
    });


    /*==================================================
      5. SCROLL REVEAL ANIMATIONS
    ==================================================*/
    function initAnimations() {
        const revealElements = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => observer.observe(el));


        /*==================================================
          6. GSAP ANIMATIONS
        ==================================================*/
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Hero title lines — staggered entrance
            gsap.from('.hero__title-inner', {
                y: '100%',
                duration: 0.9,
                stagger: 0.12,
                ease: 'power4.out',
                delay: 2.6
            });

            // Hero tag
            gsap.from('.hero__tag', {
                opacity: 0,
                x: -30,
                duration: 0.6,
                ease: 'power3.out',
                delay: 3.2
            });

            // Hero bottom
            gsap.from('.hero__bottom', {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out',
                delay: 3.4
            });

            // Marquee
            gsap.from('.hero__marquee', {
                opacity: 0,
                duration: 0.6,
                delay: 3.6
            });

            // Work items stagger on scroll
            gsap.utils.toArray('.work__item').forEach((item, i) => {
                gsap.fromTo(item, 
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%',
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: i * 0.08,
                        ease: 'power3.out'
                    }
                );
            });

            // Stats counter
            gsap.utils.toArray('.about__stat-num').forEach(stat => {
                gsap.from(stat, {
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 90%',
                    },
                    textContent: 0,
                    duration: 1.5,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    stagger: 0.2
                });
            });

            // Services items
            gsap.utils.toArray('.services__item').forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 88%',
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: 'power3.out'
                    }
                );
            });

            // Experience
            gsap.utils.toArray('.experience__item').forEach(item => {
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 88%',
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out'
                    }
                );
            });

            // Tech items
            gsap.utils.toArray('.tech-item').forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 20 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 92%',
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: i * 0.05,
                        ease: 'power3.out'
                    }
                );
            });

            // Contact
            gsap.utils.toArray('.contact__link').forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, x: -20 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 92%',
                        },
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: 'power3.out'
                    }
                );
            });


            /*==================================================
              9. PARALLAX PHOTO SECTIONS
            ==================================================*/
            // Background image parallax scroll
            gsap.utils.toArray('.parallax-photo').forEach(section => {
                const img = section.querySelector('.parallax-photo__img');
                const speed = parseFloat(section.dataset.speed) || 0.5;

                gsap.fromTo(img,
                    { yPercent: -50 * speed },
                    {
                        yPercent: 50 * speed,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );
            });

            // Caption fade-in on scroll
            gsap.utils.toArray('.parallax-photo__caption').forEach(caption => {
                gsap.fromTo(caption,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: caption,
                            start: 'top 85%',
                            end: 'top 55%',
                            scrub: true
                        }
                    }
                );
            });
        }
    }


    /*==================================================
      7. CONTACT FORM (EmailJS — secured)
    ==================================================*/
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit');

    // Obfuscated config — not true encryption, but prevents
    // casual scraping of keys from source code.
    // Real protection: enable domain restriction in EmailJS dashboard
    // (Settings → API Keys → restrict to sidhu1512.github.io)
    const _c = {
        p: atob('enFiRG1nZkRRSDVaR0JiZ3k='),
        s: atob('c2VydmljZV83dWtjZHY2'),
        t: atob('dGVtcGxhdGVfNHMyNXp5MQ==')
    };

    // Rate limiter: max 3 submissions per 10 minutes
    const _submissions = [];
    const RATE_LIMIT = 3;
    const RATE_WINDOW = 10 * 60 * 1000; // 10 min

    function isRateLimited() {
        const now = Date.now();
        // Remove old entries
        while (_submissions.length && now - _submissions[0] > RATE_WINDOW) {
            _submissions.shift();
        }
        return _submissions.length >= RATE_LIMIT;
    }

    if (contactForm && typeof emailjs !== 'undefined') {
        // Init EmailJS with decoded key
        emailjs.init({ publicKey: _c.p });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Honeypot check — if filled, it's a bot
            const honeypot = contactForm.querySelector('#c-website');
            if (honeypot && honeypot.value) {
                formStatus.className = 'form__status success';
                formStatus.textContent = '✓ Message sent successfully!';
                contactForm.reset();
                return;
            }

            // Rate limit check
            if (isRateLimited()) {
                formStatus.className = 'form__status error';
                formStatus.textContent = '✗ Too many messages. Please try again later.';
                return;
            }

            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            emailjs.sendForm(_c.s, _c.t, contactForm)
                .then(() => {
                    _submissions.push(Date.now());
                    formStatus.className = 'form__status success';
                    formStatus.textContent = '✓ Message sent successfully!';
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    setTimeout(() => formStatus.textContent = '', 5000);
                }, (error) => {
                    formStatus.className = 'form__status error';
                    formStatus.textContent = '✗ Something went wrong. Please try again.';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }


    /*==================================================
      8. SMOOTH SCROLL FOR ANCHOR LINKS
    ==================================================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

});
