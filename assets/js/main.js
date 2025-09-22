/*================================================================
  Siddharth Bhadu - Portfolio JavaScript
  ----------------------------------------------------------------
  TABLE OF CONTENTS
  ----------------------------------------------------------------
  1.  MENU & NAVIGATION
      - Mobile Menu Toggle
      - Close Menu on Link Click
      - Active Link on Scroll
  2.  EMAILJS CONTACT FORM
  3.  SCROLL REVEAL ANIMATION (Legacy)
  4.  PAGE LOAD SCRIPTS (DOMContentLoaded)
      - GSAP Animations
      - Typing Animation (About Section)
      - Dual Cursor Logic
================================================================*/

/*==================================================
  1. MENU & NAVIGATION
==================================================*/

/*----- Mobile Menu Toggle -----*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*----- Close Menu on Link Click -----*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*----- Active Link on Scroll -----*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);


/*==================================================
  2. EMAILJS CONTACT FORM
==================================================*/
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.sendForm("service_6gugyzb", "template_pytjitl", this)
            .then(() => {
                // Success message can be added here
            }, (error) => {
                // Error handling can be added here
            });

        this.reset();
    });
}


/*==================================================
  3. SCROLL REVEAL ANIMATION (Legacy)
==================================================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

// Note: .home__data is now animated by GSAP
sr.reveal('.about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });


/*==================================================
  4. PAGE LOAD SCRIPTS
  - Scripts that require the DOM to be ready.
==================================================*/
document.addEventListener('DOMContentLoaded', () => {

    /*---------- GSAP Animations ----------*/
    gsap.registerPlugin(ScrollTrigger);

    // Animate the home page title on load
    gsap.from(".home__title-line", {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Animate the resume button on load
    gsap.set(".home .button", { opacity: 0, y: 50 });
    gsap.to(".home .button", {
        duration: 1,
        opacity: 1,
        y: 0,
        delay: 0.8,
        ease: "power3.out"
    });

    // Animate the contact form button on scroll
    gsap.from(".contact__button", {
        scrollTrigger: {
            trigger: ".contact__form",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power3.out"
    });


    /*---------- Typing Animation (About Section) ----------*/
    const subtitleElement = document.getElementById('about-subtitle');
    const textElement = document.getElementById('about-text');

    if (subtitleElement && textElement) {
        const subtitleText = "I'am Siddharth Bhadu";
        const aboutText = "A results-oriented Software Engineer specializing in building and optimizing scalable backend systems with Java and the Spring ecosystem. I enjoy turning complex problems into high-performance applications.";
        const pauseDuration = 1000;

        const typeWriter = (element, text, speed, callback) => {
            let i = 0;
            element.innerHTML = "";
            element.classList.remove('typing-done');
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                    element.classList.add('typing-done');
                    if (callback) callback();
                }
            }, speed);
        };

        const deleteWriter = (element, speed, callback) => {
            let text = element.innerHTML;
            let i = text.length;
            element.classList.remove('typing-done');
            const deletingInterval = setInterval(() => {
                if (i > 0) {
                    element.innerHTML = text.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(deletingInterval);
                    if (callback) callback();
                }
            }, speed);
        };

        const startTypingLoop = () => {
            typeWriter(subtitleElement, subtitleText, 100, () => {
                typeWriter(textElement, aboutText, 50, () => {
                    setTimeout(() => {
                        deleteWriter(textElement, 30, () => {
                            deleteWriter(subtitleElement, 75, startTypingLoop);
                        });
                    }, pauseDuration);
                });
            });
        };

        let animationHasStarted = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationHasStarted) {
                    animationHasStarted = true;
                    startTypingLoop();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.getElementById('about'));
    }


    /*---------- Dual Cursor Logic ----------*/
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverables = document.querySelectorAll('a, .button');

    if (cursorDot && cursorOutline) {
        const defaultDotColor = 'hsl(224, 89%, 60%)';
        const defaultOutlineBorderColor = 'hsla(224, 89%, 60%, 0.5)';

        window.addEventListener('mousemove', e => {
            cursorDot.style.top = `${e.clientY}px`;
            cursorDot.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
        });

        hoverables.forEach(el => {
            el.addEventListener('mouseover', () => {
                const hoveredColor = window.getComputedStyle(el).color;
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = hoveredColor;
                cursorDot.style.backgroundColor = hoveredColor;
            });

            el.addEventListener('mouseout', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = defaultOutlineBorderColor;
                cursorDot.style.backgroundColor = defaultDotColor;
            });
        });
    }

/*---------- FOOTER BOUNCING BALL ANIMATION ----------*/
    const container = document.getElementById('footer-animation-container');
    const ballElements = document.querySelectorAll('.ball');

    if (container && ballElements.length > 0) {
        const balls = []; // Array to store data for each ball

        // Initialize each ball with a random position and velocity
        ballElements.forEach(el => {
            balls.push({
                element: el,
                posX: Math.random() * container.offsetWidth,
                posY: Math.random() * container.offsetHeight,
                velX: (Math.random() - 0.5) * 4, // Random speed between -2 and 2
                velY: (Math.random() - 0.5) * 4
            });
        });

        function animate() {
            const containerRect = container.getBoundingClientRect();

            // Loop through each ball and update its state
            balls.forEach(ball => {
                // Update position
                ball.posX += ball.velX;
                ball.posY += ball.velY;

                // Collision detection with container walls
                if (ball.posX + ball.element.offsetWidth > containerRect.width || ball.posX < 0) {
                    ball.velX = -ball.velX;
                }
                if (ball.posY + ball.element.offsetHeight > containerRect.height || ball.posY < 0) {
                    ball.velY = -ball.velY;
                }

                // Apply new position
                ball.element.style.left = ball.posX + 'px';
                ball.element.style.top = ball.posY + 'px';
            });

            // Keep the animation running
            requestAnimationFrame(animate);
        }

        // Start the animation
        requestAnimationFrame(animate);
    }
});
