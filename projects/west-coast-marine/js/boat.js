
const params = new URLSearchParams(window.location.search);
const boatId = params.get("id");

// Load boats
fetch("../../data/boats.json")
    .then(response => {

        if(!response.ok){

            throw new Error("Failed to load boats.json");

        }

        return response.json();

    })
    .then(boats => {

        const boat = boats.find(b => b.id === boatId);
        console.log("Boat ID:", boatId);
        console.log("Boat:", boat);

        if (!boat) {
            document.body.innerHTML = "<h1>Boat not found.</h1>";
            return;
        }

        // Page title
        document.title = boat.name + " | West Coast Marine";

        // Basic info
        document.getElementById("boatName").textContent = boat.name;
        document.getElementById("boatPrice").textContent = boat.price;
        document.getElementById("boatDescription").textContent = boat.description;

        document.getElementById("boatCategory").textContent =
            boat.category;

        // Main Image
        const mainImage = document.getElementById("mainImage");
        mainImage.src = boat.images[0];

        // Thumbnails
        const thumbnailContainer = document.getElementById("thumbnailContainer");

        thumbnailContainer.innerHTML = "";

        boat.images.forEach((image, index) => {

            const thumb = document.createElement("img");

            thumb.src = image;

            thumb.classList.add("thumbnail");

            if(index === 0){
                thumb.classList.add("active");
            }

            thumb.addEventListener("click", () => {

                mainImage.style.opacity = 0;

                setTimeout(() => {

                    mainImage.src = image;

                    mainImage.style.opacity = 1;

                },150);

                document
                    .querySelectorAll(".thumbnail")
                    .forEach(t => t.classList.remove("active"));

                thumb.classList.add("active");

            });

            thumbnailContainer.appendChild(thumb);

        });

        // Specifications

        const specTable = document.getElementById("specTable");

        specTable.innerHTML = "";

        for(const key in boat.specifications){

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${key}</td>
                <td>${boat.specifications[key]}</td>
            `;

            specTable.appendChild(row);

        }

    })
    .catch(error => {

        console.error(error);

    });


// ---------------------------
// Fullscreen Image
// ---------------------------

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const mainImage = document.getElementById("mainImage");
const closeModal = document.querySelector(".close-modal");

mainImage.addEventListener("click", () => {

    modal.classList.add("active");

    modalImage.src = mainImage.src;

});

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});

modal.addEventListener("click", (e)=>{

    if(e.target===modal){

        modal.classList.remove("active");

    }

});

initialiseFadeAnimations(".gallery, .boat-summary");