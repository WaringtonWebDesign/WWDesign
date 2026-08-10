//============================
// Fade In Animation
//============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.2
});

function initFadeAnimations() {

    const fadeElements = document.querySelectorAll(
        "section, footer"
    );

    fadeElements.forEach(element => {

        if (!element.classList.contains("fade-in")) {

            element.classList.add("fade-in");
            observer.observe(element);

        }

    });

}

initFadeAnimations();


//============================
// Mobile Navigation
//============================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-links");
const backButton = document.querySelector(".back-button");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        if (backButton) {

            backButton.classList.toggle("menu-open");

        }

    });

}


//============================
// Active Navigation Link
//============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});