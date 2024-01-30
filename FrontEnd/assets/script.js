"use strict";

// ********** CONSTANTS **********

const projects   = "http://localhost:5678/api/works";
const categories = "http://localhost:5678/api/categories";
const filter     = document.querySelector(".filter-container");
const editMod    = document.querySelector(".edit");
const editPanel  = document.querySelector(".edit-panel");
const closeBtn   = document.querySelector(".fa-xmark");

// ********** VARIABLES **********

let categoryId;
let filtersId;

// ********** FUNCTIONS **********

function addProjects() {
  const projectContainer = document.querySelector(".gallery");

  fetch(projects)
    .then(response => response.json())
    .then(data => {
      data.forEach(project => {
        const figure = document.createElement("figure");
        figure.dataset.categoryId = project.categoryId;
        const image = document.createElement("img");

        image.src = project.imageUrl;
        image.alt = project.title;

        const figCaption = document.createElement("figcaption");
        figCaption.textContent = project.title;

        figure.appendChild(image);
        figure.appendChild(figCaption);
        projectContainer.appendChild(figure);

        console.log(categoryId);
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
        button.dataset.filtersId = category.id;
        console.log(button.dataset.filtersId);

        button.type = "submit";
        button.value = category.name;
        button.classList.add("filter");

        li.appendChild(button);
        filterContainer.appendChild(li);
        filtersId = category.id;
      });
      addListeners();
    })
    .catch(error => {
      console.error(error);
    });
}

function filtersSelection(selectedButton) {
  const buttons = document.querySelectorAll(".filter");

  buttons.forEach(button => {
    button.classList.remove("filter-selected");
  });
  selectedButton.classList.add("filter-selected");

  const projects = document.querySelectorAll(".gallery figure");

  if (selectedButton.value === "Tous") {
    projects.forEach(project => {
      project.classList.remove("d-none");
    });
  } else {
    projects.forEach(project => {
      if (project.dataset.categoryId === selectedButton.dataset.filtersId) {
        project.classList.remove("d-none");
      } else {
        project.classList.add("d-none");
      }
    });
  }
}

function addListeners() {
  console.log("adding listeners");
  const buttons = document.querySelectorAll(".filter");

  buttons.forEach(button => {
    button.addEventListener("click", () => filtersSelection(button));
  });
  editMod.addEventListener("click", () => editPanel.style.display = "flex");
  closeBtn.addEventListener("click", () => editPanel.style.display = "none");
}

// ********** MAIN CODE **********

addProjects();
addFilters();

console.log(projects);
console.log(categories);
