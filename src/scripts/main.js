// Authors: Kevin, Curtis, Allie, Joe
// Purpose: Import components and invoke necessary functions for site functionality

// ==================== Import modules ====================
import data from "./data.js";
import factory from "./factory.js";
import dom from "./dom.js";
import message from "./message.js";

// ==================== Users Section =====================

const registerButton = document.querySelector(".register__button");
const loginButton = document.querySelector(".login__button");
let userId;
// Takes input values, creates user object and saves it to the database
registerButton.addEventListener("click", event => {
  let usernameValue = document.querySelector(".login__username").value;
  let emailValue = document.querySelector(".login__email").value;
  const userObject = factory.createUser(usernameValue, emailValue);
  console.log(userObject);

  data
    .getData("users")
    .then(parsedUsers => {
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
      document.querySelector(".login__username").value = "";
      document.querySelector(".login__email").value = "";
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
        userId = parseInt(sessionStorage.getItem("activeUser"));
        console.log(sessionStorage.activeUser);
        getTask(userId);
        // Call necessary functions using the activeUser id and render to the dashboard once that functionality is complete
        displayEvents();
      }
    });

    data
      .getData("users")
      .then(parsedUsers => {
        const usernames = [];
        parsedUsers.forEach(user => {
          usernames.push(user.username);
        });
        parsedUsers.forEach(user => {
          if (user.username === usernameValue && user.email === emailValue) {
            sessionStorage.setItem("activeUser", user.id);
            userId = parseInt(sessionStorage.getItem("activeUser"));

            // Function that bundles necessary display functions for each piece of the dashboard to display the dashboard for the current user goes here
<<<<<<< HEAD
            message.displayMessages();
=======
            displayMessages();
            getTask(userId);
>>>>>>> master

            // Call necessary functions using the activeUser id and render to the dashboard once that functionality is complete
          }
        });
        if (usernames.includes(usernameValue) === false) {
          window.alert(
            "Username not recognized. Please check and try again or register as a new user"
          );
        }
      })
      .then(() => {
        document.querySelector(".login__username").value = "";
        document.querySelector(".login__email").value = "";
        const landingPages = document.querySelectorAll(".landing--page");
        landingPages.forEach(page => {
          page.classList.add("hidden");
        });

        const dashboardPages = document.querySelectorAll(
          ".logged--in--container"
        );
        dashboardPages.forEach(page => {
          page.classList.remove("hidden");
        });
      });
  });
});

// ==================== Friendships Section =====================

// ==================== Events Section =====================
// wrapped all the functions in another function
const displayEvents = () => {
  // first render my add event button to the dom
  // dom.renderAddEventButtonToDom()
  // GET data
  data.getEventData("events").then(parsedEvents => {
    const displayEventsContainer = document.querySelector("#display__events")
    displayEventsContainer.innerHTML = ""
    // parsedEvents.sort(function(a,b) {
    // return a.date - b.date
    // })
    parsedEvents.forEach(event => {
      // sort array by date
      // parsedEvents.sort(function(a,b){
      // return a.date > b.date;
      // })
      displayEventsContainer.innerHTML += factory.createEventComponent(event)
    });
  });
  // event listener on delete
  const displayEventsContainer = document.querySelector("#display__events");
  displayEventsContainer.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteEvent--")) {
      const eventId = event.target.id.split("--")[1];
      data
        .deleteEventData("events", eventId)
        .then(() => data.getEventData("events"))
        .then(parsedEvents => {
          const displayEventsContainer = document.querySelector(
            "#display__events"
          );
          displayEventsContainer.innerHTML = "";
          console.log("parsedEvents:", parsedEvents);
          parsedEvents.forEach(event => {
            displayEventsContainer.innerHTML += factory.createEventComponent(
              event
            );
          });
        });
    }
  });
  // container where the form will appear once button is clicked
  const addEventButton = document.querySelector("#AddEvent__button--id");
  // event listener to render add event form when button is clicked
  addEventButton.addEventListener("click", event => {
    // render the add event form when button is clicked
    dom.renderEventFormToDom();
    // id of submit button on rendered add new event form
    const addEventSubmitButton = document.querySelector("#addEvent__submit");
    // eventlistener on add event form submit button
    addEventSubmitButton.addEventListener("click", event => {
      console.log("hello");
      // get reference to input fields
      const eventName = document.querySelector("#eventName");
      const eventDate = document.querySelector("#eventDate");
      const eventLocation = document.querySelector("#eventLocation");
      const eventId = document.querySelector("#eventId");
      const createEventsObj = factory.createEventInputObj(
        userId,
        eventName.value,
        eventDate.value,
        eventLocation.value
      );
      console.log(eventId.value);
      if (eventId.value !== "") {
        data
          .editJournalEntry("events", eventId.value, createEventsObj)
          .then(() => data.getEventData("events"))
          .then(parsedEvents => {
            const displayEventsContainer = document.querySelector(
              "#display__events"
            );
            displayEventsContainer.innerHTML = "";
            console.log("parsedEvents:", parsedEvents);
            parsedEvents.forEach(event => {
              displayEventsContainer.innerHTML += factory.createEventComponent(
                event
              );
            });
          });
      } else {
        // invoke function to post data below
        data
          .saveNewEventData("events", createEventsObj)
          .then(() => data.getEventData("events"))
          .then(parsedEvents => {
            const displayEventsContainer = document.querySelector(
              "#display__events"
            );
            displayEventsContainer.innerHTML = "";
            console.log("parsedEvents:", parsedEvents);
            parsedEvents.forEach(event => {
              displayEventsContainer.innerHTML += factory.createEventComponent(event)
              document.querySelector(".addEvent__form--div").innerHTML = ""
            });
          });
      }
    });
  });
  // event listener for edit button
  displayEventsContainer.addEventListener("click", event => {
    if (event.target.id.startsWith("editEvent--")) {
      const eventId = event.target.id.split("--")[1];
      data
        .getEventById("events", eventId)
        .then(event => dom.renderEventFormToDom(event))
        .then(() => {
          const addEventSubmitButton = document.querySelector(
            "#addEvent__submit"
          );
          // eventlistener on add event form submit button
          addEventSubmitButton.addEventListener("click", event => {
            console.log("hello");
            // get reference to input fields
            const eventName = document.querySelector("#eventName");
            const eventDate = document.querySelector("#eventDate");
            const eventLocation = document.querySelector("#eventLocation");
            const eventId = document.querySelector("#eventId");
            const createEventsObj = factory.createEventInputObj(
              userId,
              eventName.value,
              eventDate.value,
              eventLocation.value
            );
            console.log(eventId.value);
            if (eventId.value !== "") {
              data
                .editEventData("events", eventId.value, createEventsObj)
                .then(() => data.getEventData("events"))
                .then(parsedEvents => {
                  const displayEventsContainer = document.querySelector(
                    "#display__events"
                  );
                  displayEventsContainer.innerHTML = "";
                  parsedEvents.forEach(event => {
                    displayEventsContainer.innerHTML += factory.createEventComponent(event)
                    document.querySelector(".addEvent__form--div").innerHTML = ""
                  });
                });
            } else {
              // invoke function to post data below
              data
                .saveNewEventData("events", createEventsObj)
                .then(() => data.getEventData("events"))
                .then(parsedEvents => {
                  const displayEventsContainer = document.querySelector(
                    "#display__events"
                  );
                  displayEventsContainer.innerHTML = "";
                  console.log("parsedEvents:", parsedEvents);
                  parsedEvents.forEach(event => {
                    displayEventsContainer.innerHTML += factory.createEventComponent(
                      event
                    );
                  });
                });
            }
          });
        });
    }
  });
};

// ==================== News Section =====================
data.getData("news").then(articles => {
  dom.aPlaceToPutNews.innerHTML = "";
  for (const article of articles) {
    const newsHTML = factory.createNewsHTML(article);
    dom.renderToDom(dom.aPlaceToPutNews, newsHTML);
  }
});
document.querySelector("#newsSubmitButton").addEventListener("click", () => {
  const newsDateValue = document.querySelector("#newsDate").value;
  const newsTitleValue = document.querySelector("#newsTitle").value;
  const newsSummaryValue = document.querySelector("#newsSummary").value;
  const newsURLValue = document.querySelector("#newsURL").value;
  const hiddenNewsID = document.querySelector("#newsID").value;
  if (hiddenNewsID !== "") {
    data
      .editNews(hiddenNewsID)
      .then(() => data.getData("news"))
      .then(articles => {
        dom.aPlaceToPutNews.innerHTML = "";
        for (const article of articles) {
          const newsHTML = factory.createNewsHTML(article);
          dom.renderToDom(dom.aPlaceToPutNews, newsHTML);
          document.querySelector("#newsDate").value = "";
          document.querySelector("#newsTitle").value = "";
          document.querySelector("#newsSummary").value = "";
          document.querySelector("#newsURL").value = "";
          document.querySelector("#newsID").value = "";
        }
      });
  } else {
    const newNewsObject = factory.createNewsObject(
      userId,
      newsURLValue,
      newsDateValue,
      newsSummaryValue,
      newsTitleValue
    );
    data
      .saveData("news", newNewsObject)
      .then(() => data.getData("news"))
      .then(articles => {
        dom.aPlaceToPutNews.innerHTML = "";
        for (const article of articles) {
          const newsHTML = factory.createNewsHTML(article);
          dom.renderToDom(dom.aPlaceToPutNews, newsHTML);
        }
      })
      .then(() => {
        document.querySelector("#newsDate").value = "";
        document.querySelector("#newsTitle").value = "";
        document.querySelector("#newsSummary").value = "";
        document.querySelector("#newsURL").value = "";
      });
  }
});
dom.aPlaceToPutNews.addEventListener("click", event => {
  if (event.target.id.startsWith("deleteNews--")) {
    const newsToDelete = event.target.id.split("--")[1];
    data
      .deleteData("news", newsToDelete)
      .then(() => data.getData("news"))
      .then(articles => {
        dom.aPlaceToPutNews.innerHTML = "";
        articles.forEach(article => {
          const newNewsHTML = factory.createNewsHTML(article);
          dom.renderToDom(dom.aPlaceToPutNews, newNewsHTML);
        });
      });
  }
});
dom.aPlaceToPutNews.addEventListener("click", event => {
  if (event.target.id.startsWith("editNews--")) {
    const newsToEdit = event.target.id.split("--")[1];
    data.updateFormFields(newsToEdit);
  }
});
// ==================== Tasks Section =====================
// dom selectors
const clear = document.querySelector(".taskClear");
const dateElement = document.getElementById("taskDate");
const input = document.getElementById("input-task");
const date = document.getElementById("task-input-Date");
const taskContainer = document.getElementById("taskList");
const hiddenDomEdit = document.querySelector("#hiddenEditFieldId");

const getTask = user => {
  data.getData(`tasks?userId=${user}`).then(tasks => {
    console.log(user);
    dom.placeToPutList.innerHTML = "";
    for (const task of tasks) {
      if (task.completed === false) {
        const newTaskHTML = factory.createTaskHtml(task);
        dom.renderToDom(dom.placeToPutList, newTaskHTML);
      }
    }
  });
};

document.querySelector(".task_button").addEventListener("click", () => {
  const dateValue = date.value;
  const taskNameValue = input.value;
  const newTaskObj = factory.createTaskObj(
    taskNameValue,
    dateValue,
    userId,
    false
  );
  if (hiddenDomEdit.value !== "") {
    data
      .editData("tasks", hiddenDomEdit.value, newTaskObj)
      .then(() => data.getData(`tasks?userId=${userId}`))
      .then(tasks => {
        console.log(tasks);
        dom.placeToPutList.innerHTML = "";
        for (const task of tasks) {
          if (task.completed === false) {
            const newTaskHTML = factory.createTaskHtml(task);
            dom.renderToDom(dom.placeToPutList, newTaskHTML);
          }
        }
      })
      .then((hiddenDomEdit.value = ""))
      .then(() => {
        //clears the input fields
        input.value = "";
        date.value = "";
      });
  } else
    data
      .saveData("tasks", newTaskObj)
      .then(() => data.getData(`tasks?userId=${userId}`))
      .then(tasks => {
        dom.placeToPutList.innerHTML = "";
        for (const task of tasks) {
          if (task.completed === false) {
            const newTaskHTML = factory.createTaskHtml(task);
            dom.renderToDom(dom.placeToPutList, newTaskHTML);
          }
        }
      })
      .then(() => {
        //clears the input fields
        input.value = "";
        date.value = "";
      });
});

//complete todo

//  check off and edit buttons
taskContainer.addEventListener("click", event => {
  console.log("hi");
  if (event.target.id.startsWith("check")) {
    console.log("hi inside");
    const checkID = event.target.id.split("_")[1];
    console.log("checkID: ", checkID);

    data
      .getData(`tasks/${checkID}`)
      .then(task => {
        console.log(task);
        const newTask = factory.createTaskObj(
          task.taskName,
          task.taskDate,
          task.userId,
          true
        );
        return newTask;
      })
      .then(newTask => {
        data
          .editData("tasks", checkID, newTask)
          .then(() => data.getData(`tasks?userId=${userId}`))
          .then(tasks => {
            console.log
            dom.placeToPutList.innerHTML = "";
            for (const task of tasks) {
              if (task.completed === false) {
                const newTaskHTML = factory.createTaskHtml(task);
                dom.renderToDom(dom.placeToPutList, newTaskHTML);
              }
            }
          });
      });
    console.log(checkID);
  }
  // edit button
  if (event.target.id.startsWith("edit")) {
    console.log("hi inside");
    const editID = event.target.id.split("_")[1];
    console.log("editId: ", editID);
    data.getData(`tasks/${editID}`).then(task => {
      hiddenDomEdit.value = task.id;
      input.value = task.taskName;
      date.value = task.taskDate;
    });
  }
});

//show todays date
const options = {
  weekday: "long",
  month: "short",
  day: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Check to see if there is already an active user to remain logged in upon page refresh
const checkLoggedIn = () => {
  const userId = parseInt(sessionStorage.getItem("activeUser"));
  if (userId > 0) {
    const landingPages = document.querySelectorAll(".landing--page");
    landingPages.forEach(page => {
      page.classList.add("hidden");
    });

    const dashboardPages = document.querySelectorAll(".logged--in--container");
    dashboardPages.forEach(page => {
      page.classList.remove("hidden");
    });

    message.displayMessages();
    displayEvents();
  }
};

checkLoggedIn();
