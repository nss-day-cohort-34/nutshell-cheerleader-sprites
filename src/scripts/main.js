// Authors: Kevin, Curtis, Allie, Joe
// Purpose: Import components and invoke necessary functions for site functionality

// ==================== Import modules ====================
import data from "./data.js";
import factory from "./factory.js";
import dom from "./dom.js";

// ==================== Users Section =====================

const registerButton = document.querySelector(".register__button");
const loginButton = document.querySelector(".login__button");

// Takes input values, creates user object and saves it to the database
registerButton.addEventListener("click", event => {
  let usernameValue = document.querySelector(".login__username").value;
  let emailValue = document.querySelector(".login__email").value;
  const userObject = factory.createUser(usernameValue, emailValue);
  console.log(userObject);

  data.getData("users").then(parsedUsers => {
    const usernames = [];
    parsedUsers.forEach(user => {
      usernames.push(user.username);
    });

    if (!usernames.includes(usernameValue) && emailValue.includes("@")) {
      data.saveData("users", userObject);
      window.confirm("Successfully created new user. Please log in.");
    } else {
      window.alert("Invalid username or email.");
    }
  })
  .then(() => {
    console.log("test");
    document.querySelector(".login__username").value = ""
    document.querySelector(".login__email").value = ""
  });
});

loginButton.addEventListener("click", event => {
  let usernameValue = document.querySelector(".login__username").value;
  let emailValue = document.querySelector(".login__email").value;
  data.getData("users").then(parsedUsers => {
    const usernames = [];
    parsedUsers.forEach(user => {
      usernames.push(user.username);
    });

    parsedUsers.forEach(user => {
      if (user.username === usernameValue && user.email === emailValue) {
        sessionStorage.setItem("activeUser", user.id);
        console.log(sessionStorage.activeUser);

        // Function that bundles necessary display functions for each piece of the dashboard to display the dashboard for the current user goes here
        displayMessages();
      }
    });

    if (usernames.includes(usernameValue) === false) {
      window.alert("Username not recognized. Please check and try again or register as a new user");
    }
  })
    .then(() => {
      console.log("test");
      document.querySelector(".login__username").value = ""
      document.querySelector(".login__email").value = ""

      const landingPages = document.querySelectorAll(".landing--page");
      console.log(landingPages);
      landingPages.forEach(page => {
        page.classList.add("hidden");
      });

      const dashboardPages = document.querySelectorAll(".logged--in--container");
      dashboardPages.forEach(page => {
        page.classList.remove("hidden");
      })
    });
});

// ==================== Friendships Section =====================

// ==================== Events Section =====================

// ==================== News Section =====================

// ==================== Tasks Section =====================

// ==================== Messages Section =====================
// displayMessages contains all functionality that should be executed when a successful login is detected
const displayMessages = () => {
  // Render message container to DOM with input fields
  dom.createMessagesForm();

  // Get all messages from the database, create HTML Representations and render them to the DOM
  data.getData("messages").then(parsedMessages => {
    parsedMessages.forEach(message => {

    });

  });
};
