"use strict";

// ********** CONSTANTS **********

const projects   = "http://localhost:5678/api/works";
const categories = "http://localhost:5678/api/categories";
const filter     = document.querySelector(".filter-container");

// ********** VARIABLES **********



// ********** FUNCTIONS **********

function addProjects() {
  const projectContainer = document.querySelector(".gallery");

  fetch(projects)
    .then(response => response.json())
    .then(data => {
      data.forEach(project => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = project.imageUrl;
        image.alt = project.title;

        const figCaption = document.createElement("figcaption");
        figCaption.textContent = project.title;

        figure.appendChild(image);
        figure.appendChild(figCaption);
        projectContainer.appendChild(figure);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

function addFilters() {
  const filterContainer = document.querySelector(".filter-container");

  fetch(categories)
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const li = document.createElement("li");
        const button = document.createElement("input");

        button.type = "submit";
        button.value = category.name;
        button.classList.add("filter");

        li.appendChild(button);
        filterContainer.appendChild(li);
      });
      addListeners();
    })
    .catch(error => {
      console.error(error);
    });
}

function filtersSelection(selectedButton) {
  console.log("button clicked", selectedButton);
  const buttons = document.querySelectorAll(".filter");

  buttons.forEach(button => {
    button.classList.remove("filter-selected");
  });

  selectedButton.classList.add("filter-selected");
}

function addListeners() {
  console.log("adding listeners");
  const buttons = document.querySelectorAll(".filter");

  buttons.forEach(button => {
    button.addEventListener("click", () => filtersSelection(button));
  });
}

// ********** MAIN CODE **********

addProjects();
addFilters();

console.log(projects);
console.log(categories);
