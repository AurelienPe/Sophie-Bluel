"use strict";

// ********** CONSTANTS **********

const submitButton  = document.querySelector('input[type="submit"]');
const email         = "sophie.bluel@test.tld";
const password      = "S0phie";

// ********** VARIABLES **********

let inputEmail;
let inputPassword;

// ********** FUNCTIONS **********

function addListeners() {
    submitButton.addEventListener("click", submit);
}

function submit() {
    inputEmail = document.getElementById("email").value;
    inputPassword = document.getElementById("password").value;

    if (inputEmail === email && inputPassword === password) {
        window.location.href = "index.html";
        alert("Login Successful!");
    }
        else {
            alert("Login Failed!");
        }

    console.log(inputEmail, inputPassword);
}

// ********** MAIN CODE **********

addListeners();
