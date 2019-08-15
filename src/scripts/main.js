// Authors: Kevin, Curtis, Allie, Joe
// Purpose: Import components and invoke necessary functions for site functionality

// ==================== Import modules ====================
import data from "./data.js";
import factory from "./factory.js";

// ==================== Users Section =====================

const registerButton = document.querySelector(".register__button");
const loginButton = document.querySelector(".login__button");

// Takes input values, creates user object and saves it to the database
registerButton.addEventListener("click", event => {
    const usernameValue = document.querySelector(".login__username").value;
    const emailValue = document.querySelector(".login__email").value;
    const userObject = factory.createUser(usernameValue, emailValue);
    console.log(userObject);
    data.saveData("users", userObject);

});

loginButton.addEventListener("click", event => {
    const usernameValue = document.querySelector(".login__username").value;
    const emailValue = document.querySelector(".login__email").value;
    data.getData("users").then(parsedUsers => {
        parsedUsers.forEach(user => {
            if (user.username === usernameValue && user.email === emailValue) {
                sessionStorage.setItem("activeUser", user.id);
                console.log(sessionStorage.activeUser);
                // Call necessary functions using the activeUser id and render to the dashboard once that functionality is complete

            } else {
                window.alert("Username or email not recognized. Please try again or register as a new user.");
            }
        });
    });


});





// ==================== Friendships Section =====================







// ==================== Events Section =====================







// ==================== News Section =====================







// ==================== Tasks Section =====================







// ==================== Messages Section =====================



