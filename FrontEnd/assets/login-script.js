"use strict";

// ********** CONSTANTS **********

const btnElt           = document.querySelector("button");
const emailElt         = document.querySelector('input[type="email"]');
const passwordElt      = document.querySelector('input[type="password"]');
console.log(btnElt);
console.log(emailElt);
console.log(passwordElt);

// ********** FUNCTIONS **********

async function login() {
    console.log("submit");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = {
        email: email,
        password: password
    }
    console.log(auth);

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(auth)
    })

    if (response.ok) {
        const login = await response.json();
        console.log(login);
        localStorage.setItem("token", login.token);
        window.location.href = "index.html";
    } else {
        alert("Identifiants incorrects");
    }
}

// ********** MAIN CODE **********

btnElt.addEventListener("click", () => {
console.log("click");
login();
});
