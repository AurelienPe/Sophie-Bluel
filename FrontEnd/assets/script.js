"use strict";

// ********** CONSTANTS **********

const projects = "http://localhost:5678/api/works";

// ********** VARIABLES **********



// ********** FUNCTIONS **********

function addProjects() {
    const projectContainer = document.querySelector(".gallery");

    fetch(projects)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < projects.length; i++) {
                const project = data[i];

                const figure = document.createElement("figure");

                const image = document.createElement("img");
                image.src = project.imageUrl;
                image.alt = project.title;

                const figCaption = document.createElement("figcaption");
                figCaption.textContent = project.title;

                figure.appendChild(image);
                figure.appendChild(figCaption);

                projectContainer.appendChild(figure);
            }

        })
        .catch(error => {
            console.error(error);
        });

}

// ********** MAIN CODE **********

addProjects();
console.log(projects);
