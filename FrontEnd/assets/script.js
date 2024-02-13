"use strict";

// ********** CONSTANTS **********

const projects   = "http://localhost:5678/api/works";

// ********** VARIABLES **********

let categoryId;
let filtersId;

// ********** FUNCTIONS **********

/**
 * ?ADD PROJECTS
 * *Function to add projects to the gallery.
 */
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

        /* code pour ajouter les images des projets dans le mode d'édition */
        if (localStorage.getItem("token")) {
          const adminGalery = document.querySelector(".admin-galery");

          const li = document.createElement("li");
          const image = document.createElement("img");
          const deleteBtn = document.createElement("i");
          deleteBtn.classList.add("fa-solid", "fa-trash-can");

          image.src = project.imageUrl;
          image.alt = project.title;

          li.appendChild(deleteBtn);
          li.appendChild(image);
          adminGalery.appendChild(li);

          deleteBtn.addEventListener("click", (event) => {
            const projectId = project.id;
            deleteProject(projectId);
            event.preventDefault();
        });
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
}

/**
 * ?ADD FILTERS
 * *Function to add filters to the filter container using the provided categories data.
 */
function addFilters() {
  const filterContainer = document.querySelector(".filter-container");

  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const li = document.createElement("li");
        const button = document.createElement("input");
        button.dataset.filtersId = category.id;

        button.type = "submit";
        button.value = category.name;
        button.classList.add("filter");

        li.appendChild(button);
        filterContainer.appendChild(li);
        filtersId = category.id;
        });

        /* code pour les options de catégories pour l'ajout d'images */
        if (localStorage.getItem("token")) {
          const categoryList = document.querySelector("#categories");
          let selectedOption;

          data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categoryList.addEventListener('change', function() {
              selectedOption = categoryList.value;
});
            categoryList.appendChild(option);
          });}

      addListeners();
    })
    .catch(error => {
      console.error(error);
    });
}

/**
 * ?FILTER SELECTION
 * *Function to handle the selection of filters and update the display accordingly.
 */
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

/**
 * ?SET ADMIN DISPLAY
 * *Sets the display for admin users based on the presence of a token in local storage.
 */
function setAdminDisplay() {
  if (!localStorage.getItem("token")) {
    document.querySelector(".edit").style.display = "none";
    document.querySelector(".modify").style.display = "none";
    document.querySelector("#logout").style.display = "none";
  } else {
    document.querySelector(".filter-container").style.display = "none";
    document.querySelector("#login").style.display = "none";
  }
}

/**
 * ?ADD PHOTO
 * *Function to add a photo and display it in the preview.
 */
function addPhoto() {
  const elementsExcludingImg = document.querySelectorAll('.add-photo > *:not(img)');
  const addPhoto = document.querySelector("#photo-button");
  const preview = document.querySelector(".preview");
  const file = addPhoto.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    }
    reader.readAsDataURL(file);
    elementsExcludingImg.forEach(element => {
      element.style.display = "none";
    })
  } else {
    preview.src = "#";
  }
};

/**
 * ?NEW PROJECT
 * *Function for creating new projects asynchronously.
 */
async function newProjects() {
  try {
    const data = new FormData(document.querySelector('form'));
    data.append("image", document.getElementById("photo-button").files[0]);
    data.set("title", document.getElementById("title").value);
    const res = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: data
    });
    if (res.ok) {
      const login = await res.json();
      window.location.href = "index.html";

    } else {
      alert("erreur");
    }
  } catch {
    alert("Un problème est survenu !");
  }
}

/**
 * ?DELETE PROJECT
 * *Asynchronous function for deleting a project.
 */
async function deleteProject(projectId) {
  try {
    const res = await fetch(`http://localhost:5678/api/works/${projectId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    if (res.ok) {
      const login = await res.json();
    } else {
      alert("erreur");
    }
  } catch (error) {
    alert("Un problème est survenu !");
    console.error(error);
  }
}

/**
 * ?ADD LISTENERS
 * Adds event listeners to various elements for handling filter, edit, and modification actions.
 */
function addListeners() {
  const overlay    = document.querySelector(".overlay");
  const buttons    = document.querySelectorAll(".filter");
  const addPanel   = document.querySelector(".add-panel");
  const editPanel  = document.querySelector(".edit-panel");
  const editMod    = document.querySelector(".edit");

  buttons.forEach(button => {
    button.addEventListener("click", () => filtersSelection(button));
  });

  editMod.addEventListener("click", () => {
    editPanel.style.display = "flex";
    overlay.style.display = "block";
  });

  document.querySelector(".modify").addEventListener("click", () => {
  editPanel.style.display = "flex";
  overlay.style.display = "block";
  });

  document.querySelectorAll(".fa-xmark").forEach(btn => {
    btn.addEventListener('click', () => {editPanel.style.display = "none", addPanel.style.display = "none", overlay.style.display = "none";})
  });

  document.querySelector("#logout").addEventListener("click", () => {localStorage.removeItem("token"), window.location.reload()});
  document.querySelector("#add").addEventListener("click", () => {addPanel.style.display = "flex", editPanel.style.display = "none"()});
  document.querySelector(".fa-arrow-left").addEventListener("click", () => {editPanel.style.display = "flex", addPanel.style.display = "none"});
  document.querySelector("#photo-button").addEventListener("change", addPhoto);
  document.querySelector("#add-project").addEventListener("click", (event) => {
  event.preventDefault();
  newProjects();
})
}

// ********** MAIN CODE **********

addProjects();
addFilters();
setAdminDisplay();
