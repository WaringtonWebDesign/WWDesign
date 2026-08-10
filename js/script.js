/*========================
Sticky Header
========================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});


/*========================
Active Navigation Link
========================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

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


/*========================
Fade In Animation
========================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold: 0.2
});

sections.forEach(section => {

    // Don't hide sections if arriving via an anchor link
    if (!window.location.hash) {
        section.classList.add("hidden");
    }

    observer.observe(section);

});

// ===========================
// Mobile Navigation
// ===========================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".menu-overlay");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
});

/*========================
FAQ Accordion
========================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        // Close all other FAQs
        faqItems.forEach(faq => {

            if(faq !== item){
                faq.classList.remove("active");
            }

        });

        // Toggle current FAQ
        item.classList.toggle("active");

    });

});