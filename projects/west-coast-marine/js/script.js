// ===========================
// BOATS PAGE - Search & Filter
// ===========================

const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const boatCards = document.querySelectorAll(".boat-card");

function filterBoats() {

    const searchText = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    boatCards.forEach(card => {

        const boatName = card.querySelector("h2").textContent.toLowerCase();
        const boatCategory = card.dataset.category;

        const matchesSearch = boatName.includes(searchText);
        const matchesCategory =
            selectedCategory === "All" ||
            boatCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}

// Only run on the Boats page
if (searchBar && categoryFilter) {
    searchBar.addEventListener("input", filterBoats);
    categoryFilter.addEventListener("change", filterBoats);
}

//===================SPECIFICATIONS DROPDOWN===================//

const specSection = document.querySelector(".specifications");
const specButton = document.querySelector(".spec-toggle");

if (specSection && specButton) {

    specButton.addEventListener("click", () => {

        specSection.classList.toggle("active");

    });

}

// ===========================
// Finance Calculator
// ===========================

const boatPrice = document.getElementById("boatPrice");
const deposit = document.getElementById("deposit");
const interest = document.getElementById("interest");
const loanYears = document.getElementById("loanYears");
const monthlyPayment = document.getElementById("monthlyPayment");
console.log(boatPrice);
console.log(deposit);
console.log(interest);
console.log(loanYears);
console.log(monthlyPayment);

function calculateFinance() {
    console.log("Calculator running");

    if (!boatPrice) return;

    const principal =
        Number(boatPrice.value) -
        Number(deposit.value);

    const annualRate =
        Number(interest.value) / 100;

    const monthlyRate =
        annualRate / 12;

    const payments =
        Number(loanYears.value) * 12;

    let payment;

    if (monthlyRate === 0) {

        payment = principal / payments;

    } else {

        payment =
            principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, payments) /
            (Math.pow(1 + monthlyRate, payments) - 1);

    }

    monthlyPayment.textContent =
        "A$" +
        payment.toLocaleString(undefined,{
            maximumFractionDigits:2,
            minimumFractionDigits:2
        }) +
        "/month";

}

if (boatPrice) {

    calculateFinance();

    boatPrice.addEventListener("input", calculateFinance);
    deposit.addEventListener("input", calculateFinance);
    interest.addEventListener("input", calculateFinance);
    loanYears.addEventListener("change", calculateFinance);

}

// ===========================
// CONTACT PAGE
// ===========================

const contactCards = document.querySelectorAll(".contact-card");
const enquiryType = document.getElementById("enquiryType");
const contactForm = document.querySelector(".contact-form");

if (contactCards.length > 0 && enquiryType && contactForm) {

    function updateActiveCard(type) {

        contactCards.forEach(card => {
            card.classList.toggle("active", card.dataset.type === type);
        });

    }

    // Clicking a card
    contactCards.forEach(card => {

        card.addEventListener("click", () => {

            enquiryType.value = card.dataset.type;

            updateActiveCard(card.dataset.type);

            const offset = 120; // Adjust this value if needed

            const y =
                contactForm.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });

    });

    // Changing the dropdown
    enquiryType.addEventListener("change", () => {

        updateActiveCard(enquiryType.value);

    });

    // Set the correct card when the page first loads
    updateActiveCard(enquiryType.value);

})}

// ===========================
// Mobile Navigation
// ===========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const backButton = document.querySelector(".button-back");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (backButton) {
            backButton.classList.toggle("menu-open");
        }

    });

}

// ==========================
// Fade In Animation
// ==========================

function initialiseFadeAnimations() {

    const elements = document.querySelectorAll(`
        section,
        .boat-card,
        .service-card,
        .finance-card,
        .contact-card,
        .about-card,
        .pricing-card,
        .why-card,
        .boat-summary,
        .gallery,
        .footer-column
    `);

    elements.forEach(element => {

        // Skip anything marked to ignore
        if (element.hasAttribute("data-no-fade")) return;

        element.classList.add("fade-in");

    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(".fade-in").forEach(element => {

        observer.observe(element);

    });

}

document.addEventListener("DOMContentLoaded", initialiseFadeAnimations);

// ==========================
// Active Navigation Link
// ==========================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {

    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});