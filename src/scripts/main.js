// Authors: Kevin, Curtis, Allie, Joe
// Purpose: Import components and invoke necessary functions for site functionality

// ==================== Import modules ====================
import data from "./data.js";
import factory from "./factory.js";
import dom from "./dom";

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

        // Call necessary functions using the activeUser id and render to the dashboard once that functionality is complete
        displayEvents()
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
// wrapped all the functions in another function
const displayEvents = () => {
  // first render my add event button to the dom
  dom.renderAddEventButtonToDom()
  // GET data
  data.getEventData("events").then(parsedEvents => {
    const displayEventsContainer = document.querySelector("#display__events")
    displayEventsContainer.innerHTML = ""
    parsedEvents.forEach(event => {
      displayEventsContainer.innerHTML += factory.createEventComponent(event)
    });
    })
  // event listener on delete
  const displayEventsContainer = document.querySelector("#display__events")
  displayEventsContainer.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteEvent--")) {
      const eventId = event.target.id.split("--")[1]
      data.deleteEventData("events", eventId)
        .then(()=> data.getEventData("events"))
        .then(parsedEvents => {
          const displayEventsContainer = document.querySelector("#display__events")
          displayEventsContainer.innerHTML = ""
          console.log("parsedEvents:", parsedEvents);
          parsedEvents.forEach(event => {
            displayEventsContainer.innerHTML += factory.createEventComponent(event)
          });
          })
    }
  })
  // container where the form will appear once button is clicked
  const addEventButton = document.querySelector("#AddEvent__button--id")
  // event listener to render add event form when button is clicked
  addEventButton.addEventListener("click", event => {
    // render the add event form when button is clicked
    dom.renderAddEventFormToDom()
    // id of submit button on rendered add new event form
    const addEventSubmitButton = document.querySelector("#addEvent__submit")
    // eventlistener on add event form submit button
    addEventSubmitButton.addEventListener("click", event => {
    // get reference to input fields
    const eventName = document.querySelector("#eventName")
    const eventDate = document.querySelector("#eventDate")
    const eventLocation = document.querySelector("#eventLocation")
    const activeUser = sessionStorage.activeUser
    const createEventsObj = factory.createEventInputObj(activeUser, eventName.value, eventDate.value, eventLocation.value)
    // invoke function to post data below
    data.saveNewEventData("events", createEventsObj)
    .then(()=> data.getEventData("events"))
        .then(parsedEvents => {
          const displayEventsContainer = document.querySelector("#display__events")
          displayEventsContainer.innerHTML = ""
          console.log("parsedEvents:", parsedEvents);
          parsedEvents.forEach(event => {
            displayEventsContainer.innerHTML += factory.createEventComponent(event)
          });
          })
    });
  });
}



// ==================== News Section =====================

// ==================== Tasks Section =====================

// ==================== Messages Section =====================
