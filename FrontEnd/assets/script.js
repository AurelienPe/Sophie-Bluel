"use strict";

// ********** CONSTANTS **********

const projects   = "http://localhost:5678/api/works";
const categories = "http://localhost:5678/api/categories";
const filter     = document.querySelector(".filter-container");
const editMod    = document.querySelector(".edit");
const editPanel  = document.querySelector(".edit-panel");
const addPanel   = document.querySelector(".add-panel");
const closeBtn   = document.querySelectorAll(".fa-xmark");
const addBtn     = document.querySelector("#add");
const overlay    = document.querySelector(".overlay");

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
        }
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

        button.type = "submit";
        button.value = category.name;
        button.classList.add("filter");

        li.appendChild(button);
        filterContainer.appendChild(li);
        filtersId = category.id;
        });
        if (localStorage.getItem("token")) {
          const categoryList = document.querySelector("#categories");
          data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.name;
            option.textContent = category.name;
            categoryList.appendChild(option);
          });}

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

function AddProjectsDiplay() {
  addPanel.style.display = "flex";
  editPanel.style.display = "none";
}

function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

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

async function newProjects() { /* code non fini et non fonctionel*/
  try {
    const fileInput = document.getElementById("photo-button");
    const file = addPhoto.files[0];

    const categoriesResponse = await fetch(categories);
    console.log(categoriesResponse)
    const categoriesData = await categoriesResponse.json();
    console.log(categoriesData)
    const categoryLookup = {};
    categoriesData.forEach(category => {
      categoryLookup[category.id] = category.name;
      console.log(categoryLookup)
    });

    const categoryId = categoryLookup[document.getElementById("categories").value];

    const res = await fetch("http://localhost:5678/api/users/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: file,
        title: document.getElementById("title").value,
        category: categoryId
      })
    })
    
    if (res.ok) {
      const login = await res.json();
      localStorage.setItem("token", login.token);
      window.location.href = "index.html";

    } else {
      alert("Identifiants incorrects");
    }

  } catch {
    alert("Un problème est survenu !");
    console.log(document.getElementById("photo-button").files[0])
    console.log(document.getElementById("title").value)
    console.log(categoryId)
  }
}

function addListeners() {
  const buttons = document.querySelectorAll(".filter");

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

  closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {editPanel.style.display = "none", addPanel.style.display = "none", overlay.style.display = "none";})
  });
  document.querySelector("#logout").addEventListener("click", () => logout());
  document.querySelector("#add").addEventListener("click", (AddProjectsDiplay));
  document.querySelector(".fa-arrow-left").addEventListener("click", () => {editPanel.style.display = "flex", addPanel.style.display = "none"});
  document.querySelector("#photo-button").addEventListener("change", addPhoto);
  document.querySelector("#add-project").addEventListener("click", (event) => {
  event.preventDefault();
  newProjects();
})}

// ********** MAIN CODE **********

addProjects();
addFilters();
setAdminDisplay();
