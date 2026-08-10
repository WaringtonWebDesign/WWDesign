const menuGrid = document.getElementById("menu-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

let menuItems = [];

// ==========================
// LOAD JSON
// ==========================

async function loadMenu() {

try {

    const response = await fetch("../menu.json");

    menuItems = await response.json();

    displayMenu(menuItems, true);

}

catch (error) {

    console.error("Error loading menu:", error);

}


}

loadMenu();

// ==========================
// DISPLAY MENU
// ==========================

function displayMenu(items, grouped = false) {

menuGrid.innerHTML = "";

if (grouped) {

    const categories = [
        "coffee",
        "tea",
        "iced",
        "cold",
        "breakfast",
        "brunch",
        "toasties",
        "sandwiches",
        "pastries",
        "cakes",
        "snacks",
        "seasonal"
    ];

    categories.forEach(category => {

        const sectionItems = items.filter(item => item.category === category);

        if (sectionItems.length === 0) return;

        // Section wrapper
        const categorySection = document.createElement("div");

        categorySection.classList.add(
            "menu-category-section",
            "fade-in"
        );

        observer.observe(categorySection);

        // Heading
        const heading = document.createElement("h2");
        heading.classList.add("menu-heading");
        heading.textContent = formatHeading(category);

        categorySection.appendChild(heading);

        // Grid
        const grid = document.createElement("div");
        grid.classList.add("menu-category-grid");

        sectionItems.forEach(item => {

            grid.appendChild(createCard(item));

        });

        categorySection.appendChild(grid);

        menuGrid.appendChild(categorySection);
        categorySection.classList.add("fade-in");
        observer.observe(categorySection);

    });

}

else {

    const grid = document.createElement("div");
    grid.classList.add("menu-category-grid");

    items.forEach(item => {

        grid.appendChild(createCard(item));

    });

    menuGrid.appendChild(grid);

}

}

// ==========================
// CREATE CARD
// ==========================

function createCard(item) {

const card = document.createElement("div");

card.classList.add("menu-card");

card.innerHTML = `

    <img src="${item.image}" alt="${item.name}">

    <div class="menu-content">

        <div class="menu-title">

            <h3>${item.name}</h3>

            <span class="price">${item.price}</span>

        </div>

        <p>${item.description}</p>

        <div class="tags">

            <span class="tag">${formatCategory(item.category)}</span>

            ${item.popular ? `<span class="tag popular">⭐ Popular</span>` : ""}

        </div>

    </div>

`;

return card;


}

// ==========================
// FILTER BUTTONS
// ==========================

filterButtons.forEach(button => {

button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    const filter = button.dataset.filter;

    if (filter === "all") {

        displayMenu(menuItems, true);

        return;

    }

    const filteredItems = menuItems.filter(item => item.category === filter);

    displayMenu(filteredItems);

});


});

// ==========================
// FORMAT HEADING
// ==========================

function formatHeading(category) {

switch (category) {

    case "coffee":
        return "Coffee";

    case "tea":
        return "Tea";

    case "iced":
        return "Iced Drinks";

    case "cold":
        return "Soft Drinks";

    case "breakfast":
        return "Breakfast";

    case "brunch":
        return "Brunch";

    case "toasties":
        return "Toasties";

    case "sandwiches":
        return "Sandwiches";

    case "pastries":
        return "Pastries";

    case "cakes":
        return "Cakes";

    case "snacks":
        return "Snacks";

    case "seasonal":
        return "Seasonal Specials";

    default:
        return category;

}


}

// ==========================
// FORMAT CATEGORY
// ==========================

function formatCategory(category) {

switch (category) {

    case "coffee":
        return "☕ Coffee";

    case "tea":
        return "🍵 Tea";

    case "iced":
        return "🧊 Iced Drink";

    case "cold":
        return "🥤 Soft Drink";

    case "breakfast":
        return "🍳 Breakfast";

    case "brunch":
        return "🥑 Brunch";

    case "toasties":
        return "🧀 Toastie";

    case "sandwiches":
        return "🥪 Sandwich";

    case "pastries":
        return "🥐 Pastry";

    case "cakes":
        return "🍰 Cake";

    case "snacks":
        return "🍪 Snack";

    case "seasonal":
        return "⭐ Seasonal";

    default:
        return category;

}


}