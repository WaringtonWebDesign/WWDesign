const container = document.getElementById("projects-container");

fetch("../json/projects.json")
    .then(response => response.json())
    .then(projects => {

        projects.forEach(project => {

            const card = document.createElement("div");

            card.classList.add("project-card");

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">

                <div class="project-content">

                    <span>${project.category}</span>

                    <h2>${project.title}</h2>

                    <p>${project.description}</p>

                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
                    </div>

                    <div class="project-buttons">
                        <a href="${project.path}" class="btn">
                            View Website
                        </a>

                    </div>

                </div>
            `;

            container.appendChild(card);

        });

    });