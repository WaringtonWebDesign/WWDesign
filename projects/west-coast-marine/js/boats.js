// ==========================
// WEST COAST MARINE
// boats.js
// ==========================

let allBoats = [];

// Load boats when page opens
async function loadBoats() {

    try {

        const response = await fetch("../../data/boats.json");

        if (!response.ok) {
            throw new Error("Could not load boats.json");
        }

        allBoats = await response.json();

        populateCategories();

        displayBoats(allBoats);

    }

    catch(error){

        console.error(error);

        document.querySelector(".boat-grid").innerHTML =
        "<h2>Unable to load boats.</h2>";

    }

}



// ==========================
// Display Boats
// ==========================

function displayBoats(boats){

    const grid = document.querySelector(".boat-grid");

    grid.innerHTML = "";

    if(boats.length === 0){

        grid.innerHTML =
        "<h2>No boats found.</h2>";

        return;

    }

    boats.forEach(boat => {

        grid.innerHTML += `

        <div class="boat-card">

            <img src="${boat.images[0]}" alt="${boat.name}">

            <div class="boat-info">

                <span class="boat-category">
                    ${boat.category}
                </span>

                <h2>${boat.name}</h2>

                <p>${boat.description}</p>

                <div class="boat-details">

                    <span>Length: ${boat.length}</span>

                    <span>Maximum Horsepower: ${boat.engine}</span>

                    <span>Fuel Capacity: ${boat.fuel}</span>

                </div>

                <div class="boat-footer">

                    <h3>${boat.price}</h3>

                    <a
                        href="boat.html?id=${boat.id}"
                        class="view-button">

                        View Boat

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}



// ==========================
// Populate Category Filter
// ==========================

function populateCategories(){

    const filter = document.querySelector(".category-filter");

    if(!filter) return;

    filter.innerHTML = "";

    filter.innerHTML +=
    `<option value="all">All Categories</option>`;

    const categories = [];

    allBoats.forEach(boat=>{

        if(!categories.includes(boat.category)){

            categories.push(boat.category);

        }

    });

    categories.sort();

    categories.forEach(category=>{

        filter.innerHTML +=

        `<option value="${category}">
            ${category}
        </option>`;

    });

}



// ==========================
// Search + Filter
// ==========================

function filterBoats(){

    const search =
        document
        .querySelector(".search-bar")
        .value
        .toLowerCase();

    const category =
        document
        .querySelector(".category-filter")
        .value;

    const filtered = allBoats.filter(boat=>{

        const matchesSearch =

            boat.name.toLowerCase().includes(search);

        const matchesCategory =

            category === "all" ||

            boat.category === category;

        return matchesSearch && matchesCategory;

    });

    displayBoats(filtered);

}



// ==========================
// Event Listeners
// ==========================

document.addEventListener("DOMContentLoaded",()=>{

    loadBoats();

    const searchBar =
        document.querySelector(".search-bar");

    const category =
        document.querySelector(".category-filter");

    if(searchBar){

        searchBar.addEventListener("input",filterBoats);

    }

    if(category){

        category.addEventListener("change",filterBoats);

    }

});

// Re-initialise fade animations
document.querySelectorAll(".boat-card").forEach(card => {

    card.classList.add("fade-in");

    observer.observe(card);

});

initialiseFadeAnimations(".boat-card");