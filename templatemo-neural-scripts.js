// ================= MOBILE MENU =================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.nav-links');

if (mobileMenuToggle && mobileNav) {

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && 
            !mobileNav.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
}


// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();

            const headerOffset = 100;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ================= HEADER SCROLL EFFECT =================

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;

    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ================= ACTIVE NAV HIGHLIGHT =================

function updateActiveMenuItem() {

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveMenuItem);
window.addEventListener('load', updateActiveMenuItem);


// ================= SIMPLE PARALLAX (LIGHT) =================

window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.scrollY;

    shapes.forEach((shape, index) => {
        const speed = 0.15 * (index + 1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});


// ================= SCROLL ANIMATION (INTERSECTION OBSERVER) =================

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-content, .hexagon, .feature-content')
    .forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s ease";
        observer.observe(el);
    });


// ================= CONTACT BUTTON EFFECT =================

const submitBtn = document.querySelector('.submit-btn');

if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        this.innerText = "Sending...";
        this.style.opacity = "0.8";

        setTimeout(() => {
            this.innerText = "Message Sent ✓";
            this.style.opacity = "1";

            setTimeout(() => {
                this.innerText = "Send Message";
            }, 2000);

        }, 1500);
    });
}

/* ================= TYPING EFFECT ================= */

const texts = [
    "I'm an ECE Student",
    "Embedded System Engineer",
    "IoT Developer",
    "Hardware Innovator"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
    const typed = document.getElementById("typed");
    if (!typed) return;

    currentText = texts[index];

    if (isDeleting) {
        typed.textContent = currentText.substring(0, charIndex--);
    } else {
        typed.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 1000);
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ================= TIMELINE EXPAND ANIMATION (MULTIPLE SUPPORT) =================

document.addEventListener("DOMContentLoaded", function () {

    const clickableBoxes = document.querySelectorAll(".timeline-content.clickable");

    clickableBoxes.forEach(box => {

        box.addEventListener("click", function () {

            const currentItem = this.closest(".timeline-item");

            // OPTIONAL: Close others (Professional style)
            document.querySelectorAll(".timeline-item.expandable").forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove("active");
                }
            });

            currentItem.classList.toggle("active");
        });

    });

});

// ================= DATA ANALYTICS AUTO SLIDER =================

document.addEventListener("DOMContentLoaded", function () {

    let sliderInterval = null;

    const dataItem = document.querySelector(".data-item");
    const slides = document.querySelectorAll(".data-item .slide");

    if (!dataItem || slides.length === 0) return;

    let current = 0;

    dataItem.addEventListener("click", function () {

        // wait for expand animation to complete
        setTimeout(() => {

            if (dataItem.classList.contains("active")) {

                if (sliderInterval) return;

                sliderInterval = setInterval(() => {

                    slides[current].classList.remove("active");
                    current = (current + 1) % slides.length;
                    slides[current].classList.add("active");

                }, 2000);

            } else {

                clearInterval(sliderInterval);
                sliderInterval = null;

                slides.forEach(slide => slide.classList.remove("active"));
                slides[0].classList.add("active");
                current = 0;
            }

        }, 300);

    });

});

/* ================= PREMIUM GLOW CAPACITOR SCRIPT ================= */

window.addEventListener("load", function(){

    const boot = document.getElementById("bootUI");
    if(!boot) return;

    const voltageText = document.getElementById("voltageValue");
    const capFill = document.getElementById("capFill");
    const capGlow = document.getElementById("capGlow");
    const statusText = document.getElementById("statusText");
    const led = document.getElementById("powerLED");
    const rippleText = document.getElementById("rippleValue");

    const VMAX = 5.0;
    const RC = 1.2;
    const dt = 0.02;

    let t = 0;

    const interval = setInterval(()=>{

        t += dt;

        let voltage = VMAX * (1 - Math.exp(-t / RC));

        let ripple = 0;

        if(voltage > 4.6){
            ripple = Math.sin(t * 20) * 0.02;
            voltage += ripple;
        }

        if(voltage >= VMAX){
            voltage = VMAX;
            clearInterval(interval);
            finishBoot();
        }

        voltageText.textContent = voltage.toFixed(2);
        rippleText.textContent = (Math.abs(ripple)*1000).toFixed(0);

        const percent = (voltage / VMAX) * 100;
        capFill.style.height = percent + "%";

        // Dynamic glow intensity
        capGlow.style.opacity = 0.3 + (percent / 150);

    },20);

    function finishBoot(){

        statusText.textContent = "Voltage Stable.";
        led.classList.add("on");

        setTimeout(()=>{
            boot.style.transition = "opacity 1s ease";
            boot.style.opacity = "0";
        },1000);

        setTimeout(()=>{
            boot.remove();
        },2000);
    }

});

// ================= PROJECT CLICK SYSTEM (FINAL CLEAN) =================

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {

        card.addEventListener("click", function () {

            // Close others
            cards.forEach(other => {
                if (other !== card) {
                    other.classList.remove("active");
                }
            });

            card.classList.toggle("active");

        });

    });

});


// ================= SLIDESHOW AUTO FADE (PROJECT 1 & 2) =================

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".slideshow").forEach(slideshow => {

        const slides = slideshow.querySelectorAll("img");
        let index = 0;

        if (slides.length === 0) return;

        setInterval(() => {
            slides[index].classList.remove("active");
            index = (index + 1) % slides.length;
            slides[index].classList.add("active");
        }, 2500);

    });

});

/* ================= IMAGE MODAL ================= */

function openModal(imgSrc) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalImg").src = imgSrc;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// ================= CLEAN EXPOSURE DROP SLIDER =================

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".exposure-card");

    cards.forEach(card => {

        const slides = card.querySelectorAll(".exposure-slideshow img");
        let index = 0;
        let interval = null;

        card.addEventListener("click", function () {

            // Close others
            cards.forEach(other => {
                if (other !== card) {
                    other.classList.remove("active");
                }
            });

            card.classList.toggle("active");

            const section = card.closest(".activity-modern-section");
            if (section) {
                const anyActive = section.querySelector(".exposure-card.active");
                if (anyActive) {
                    section.classList.add("drop-open");
                } else {
                    section.classList.remove("drop-open");
                }
            }

            if (card.classList.contains("active")) {

                if (slides.length > 1 && !interval) {
                    interval = setInterval(() => {
                        slides[index].classList.remove("active");
                        index = (index + 1) % slides.length;
                        slides[index].classList.add("active");
                    }, 2500);
                }

            } else {

                clearInterval(interval);
                interval = null;
                index = 0;

                slides.forEach(s => s.classList.remove("active"));
                if (slides[0]) slides[0].classList.add("active");
            }

        });

    });

});


/* ================= EXTRA CURRICULAR CLICK ================= */

document.addEventListener("DOMContentLoaded", function () {

    const extraCards = document.querySelectorAll(".extra-card");

    extraCards.forEach(card => {

        const slides = card.querySelectorAll(".extra-slideshow img");
        let index = 0;
        let interval = null;

        card.addEventListener("click", function () {

            // Close others
            extraCards.forEach(other => {
                if (other !== card) {
                    other.classList.remove("active");
                }
            });

            card.classList.toggle("active");

            const section = card.closest(".activity-modern-section");
            if (section) {
                const anyActive = section.querySelector(".extra-card.active");
                if (anyActive) {
                    section.classList.add("drop-open");
                } else {
                    section.classList.remove("drop-open");
                }
            }

            if (card.classList.contains("active")) {

                if (slides.length > 1 && !interval) {
                    interval = setInterval(() => {
                        slides[index].classList.remove("active");
                        index = (index + 1) % slides.length;
                        slides[index].classList.add("active");
                    }, 2500);
                }

            } else {

                clearInterval(interval);
                interval = null;
                index = 0;

                slides.forEach(s => s.classList.remove("active"));
                if (slides[0]) slides[0].classList.add("active");
            }

        });

    });

});