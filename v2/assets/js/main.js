/* =============================================
   KARYA KALA PORTFOLIO — MAIN JS
   Animations, cursor, smooth scroll, contact
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /*==================================================
      1. PAGE LOADER
    ==================================================*/
    const loader = document.getElementById('loader');
    const loaderCount = document.getElementById('loader-count');
    const loaderProgress = document.getElementById('loader-progress');
    let count = 0;

    const loaderInterval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2;
        if (count >= 100) {
            count = 100;
            clearInterval(loaderInterval);
            setTimeout(() => {
                gsap.to(loader, {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        loader.style.display = 'none';
                        animateHero();
                    }
                });
            }, 300);
        }
        loaderCount.textContent = count;
        loaderProgress.style.width = count + '%';
    }, 40);


    /*==================================================
      2. LENIS SMOOTH SCROLL
    ==================================================*/
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);


    /*==================================================
      3. CUSTOM CURSOR
    ==================================================*/
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (cursor && follower && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Cursor follows immediately
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Follower has delay
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }


    /*==================================================
      4. NAVIGATION
    ==================================================*/
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Scroll state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    /*==================================================
      5. HERO ANIMATIONS
    ==================================================*/
    function animateHero() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to('.hero__title-word', {
            y: 0,
            duration: 1.2,
            stagger: 0.15,
        })
        .to('.hero__eyebrow', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.6')
        .to('.hero__footer', {
            opacity: 1,
            y: 0,
            duration: 0.8,
        }, '-=0.4');
    }


    /*==================================================
      6. SCROLL ANIMATIONS
    ==================================================*/
    gsap.registerPlugin(ScrollTrigger);

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // Gallery items — staggered reveal
    gsap.utils.toArray('.gallery__item').forEach((item, i) => {
        gsap.from(item, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
            }
        });
    });

    // About section
    gsap.from('.about__image', {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 75%',
        }
    });

    gsap.from('.about__content', {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 75%',
        }
    });

    // Experience items
    gsap.utils.toArray('.experience__item').forEach(item => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            }
        });
    });

    // Education card
    const eduCard = document.querySelector('.education__card');
    if (eduCard) {
        gsap.from(eduCard, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: eduCard,
                start: 'top 85%',
            }
        });
    }

    // Contact section
    gsap.from('.contact__info', {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact__grid',
            start: 'top 80%',
        }
    });

    gsap.from('.contact__form', {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact__grid',
            start: 'top 80%',
        }
    });

    // Photo break parallax
    gsap.utils.toArray('.photo-break').forEach(section => {
        const img = section.querySelector('.photo-break__img');
        gsap.fromTo(img,
            { yPercent: -10 },
            {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            }
        );
    });


    /*==================================================
      7. COUNTER ANIMATION
    ==================================================*/
    const statNums = document.querySelectorAll('.about__stat-num[data-count]');
    statNums.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));

        ScrollTrigger.create({
            trigger: num,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: function() {
                        num.textContent = Math.round(this.targets()[0].val);
                    }
                });
            }
        });
    });


    /*==================================================
      8. CONTACT FORM (EmailJS — secured)
    ==================================================*/
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit');

    const _c = {
        p: atob('enFiRG1nZkRRSDVaR0JiZ3k='),
        s: atob('c2VydmljZV83dWtjZHY2'),
        t: atob('dGVtcGxhdGVfNHMyNXp5MQ==')
    };

    const _submissions = [];
    const RATE_LIMIT = 3;
    const RATE_WINDOW = 10 * 60 * 1000;

    function isRateLimited() {
        const now = Date.now();
        while (_submissions.length && now - _submissions[0] > RATE_WINDOW) {
            _submissions.shift();
        }
        return _submissions.length >= RATE_LIMIT;
    }

    if (contactForm && typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: _c.p });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const honeypot = contactForm.querySelector('#c-website');
            if (honeypot && honeypot.value) {
                formStatus.className = 'form__status success';
                formStatus.textContent = '✓ Message sent successfully!';
                contactForm.reset();
                return;
            }

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
                }, () => {
                    formStatus.className = 'form__status error';
                    formStatus.textContent = '✗ Something went wrong. Please try again.';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }


    /*==================================================
      9. SMOOTH SCROLL NAV LINKS
    ==================================================*/
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -80 });
            }
        });
    });

});
