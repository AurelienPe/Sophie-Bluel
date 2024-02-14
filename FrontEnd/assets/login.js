"use strict";

/**
 * ?LOGIN
 * *Function to handle user login.
 */
async function login() {

  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      const res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (res.ok) {
        const login = await res.json();
        localStorage.setItem("token", login.token);
        window.location.href = "index.html";
      } else {
        alert("Identifiants incorrects");

      }

    } else {
      alert("Veuillez remplir tous les champs");
    }

  } catch (error) {
    alert("Un problème est survenu !");
    console.error(error);
  }
}

document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  login();
});
