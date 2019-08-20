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
          console.log(sessionStorage.activeUser);

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
      console.log("test");
      document.querySelector(".login__username").value = "";
      document.querySelector(".login__email").value = "";

      const landingPages = document.querySelectorAll(".landing--page");
      console.log(landingPages);
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

// ==================== Friendships Section =====================

// ==================== Events Section =====================

// ==================== News Section =====================

// ==================== Tasks Section =====================
// dom selectors
const clear = document.querySelector(".taskClear");
const dateElement = document.getElementById("taskDate");
const input = document.getElementById("input-task");
const date = document.getElementById("task-input-Date");
const taskContainer = document.getElementById("taskList");
const hiddenDomEdit = document.querySelector("#hiddenEditFieldId");

document.querySelector(".task_button").addEventListener("click", () => {
  const userID = sessionStorage.activeUser;
  const dateValue = date.value;
  const taskNameValue = input.value;
  const newTaskObj = factory.createTaskObj(
    taskNameValue,
    dateValue,
    userID,
    false
  );
  if (hiddenDomEdit.value !== "") {
    data
      .editData("tasks", hiddenDomEdit.value, newTaskObj)
      .then(() => data.getData("tasks"))
      .then(tasks => {
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
      .then(() => data.getData("tasks"))
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
          task.userID,
          true
        );
        return newTask;
      })
      .then(newTask => {
        data
          .editData("tasks", checkID, newTask)
          .then(() => data.getData("tasks"))
          .then(tasks => {
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

// ==================== Messages Section =====================
