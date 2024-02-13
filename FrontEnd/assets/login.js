"use strict";

/**
 * ?LOGIN
 * *Function to handle user login.
 */
async function login() {
  try {
    const res = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
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
  }
}

document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  login();
});
