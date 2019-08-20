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
      document.querySelector(".login__username").value = ""
      document.querySelector(".login__email").value = ""

      const landingPages = document.querySelectorAll(".landing--page");
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
  data.getMessages().then(parsedMessages => {

    parsedMessages.forEach(message => {
      const messageContainer = document.querySelector(".messages--list");
      const messageHTML = dom.createMessageHTML(message, dom.displayEditMsgButton);
      dom.renderToDom(messageContainer, messageHTML);
    });
  });

  // Add event listener to send button to post a new message
  const sendMessageButton = document.querySelector(".messages--input--button");
  sendMessageButton.addEventListener("click", event => {
    let messageValue = document.querySelector(".messages--input--text").value;
    let hiddenInputValue = document.querySelector(".message--input--hidden").value;

    // Create new message object with the input field value and activeUser id
    const messageObject = factory.createMessage(sessionStorage.activeUser, messageValue);

    if (hiddenInputValue === "") {

      // If hiddenInput is blank, post to the database as a new message
      data.saveData("messages", messageObject)
        .then(data.getMessages)
        .then(parsedMessages => {
          const messageContainer = document.querySelector(".messages--list");
          messageContainer.innerHTML = "";

          parsedMessages.forEach(message => {
            const messageHTML = dom.createMessageHTML(message, dom.displayEditMsgButton);
            dom.renderToDom(messageContainer, messageHTML);
          });
        })
        .then(() => dom.clearMessageInputs());

    } else {

      // hiddenInput is not blank, put to the database to edit the existing message
      const messageId = hiddenInputValue;
      data.editData("messages", messageId, messageObject)
      .then(data.getMessages)
      .then(parsedMessages => {
        const messageContainer = document.querySelector(".messages--list");
        messageContainer.innerHTML = "";

        parsedMessages.forEach(message => {
          const messageHTML = dom.createMessageHTML(message, dom.displayEditMsgButton);
          dom.renderToDom(messageContainer, messageHTML);
        });
      })
      .then(() => dom.clearMessageInputs());
    }
  });

  // Listen to messagesList for clicks on an edit button
  const messagesList = document.querySelector(".messages--list");
  messagesList.addEventListener("click", event => {

    // If edit button is clicked, GET the message that was clicked on from the database
    if (event.target.classList[1].startsWith("message--edit")) {
      const hiddenInput = document.querySelector(".message--input--hidden");
      const messageInput = document.querySelector(".messages--input--text");
      const messageID = event.target.classList[1].split("--")[2];

      const endpoint = `messages/${messageID}`;
      data.getData(endpoint).then(message => {

        // Set hiddenInput value equal to message id and messageInput to the messages text
        hiddenInput.value = message.id;
        messageInput.value = message.message;

      });
    }
  });

  // Set initial counter for number of messages
  let numMessages = 0;

  // GET messages from database. If number of objects returned !== numMessages, there must be a new message, so re-render each message
  const checkMessages = () => {

    data.getMessages().then(parsedMessages => {

      if (numMessages !== parsedMessages.length) {
        const messageContainer = document.querySelector(".messages--list");
        messageContainer.innerHTML = "";

        parsedMessages.forEach(message => {
          const messageHTML = dom.createMessageHTML(message, dom.displayEditMsgButton);
          dom.renderToDom(messageContainer, messageHTML);
        });
      }

      // Set numMessages equal to the number of objects returned by the GET request
      numMessages = parsedMessages.length;
    });
  };

  // Check to see if there are new messages every 5 seconds
  window.setInterval(checkMessages, 5000);


};

const checkLoggedIn = () => {
  if (sessionStorage.activeUser > 0) {
    const landingPages = document.querySelectorAll(".landing--page");
    landingPages.forEach(page => {
      page.classList.add("hidden");
    });

    const dashboardPages = document.querySelectorAll(".logged--in--container");
    dashboardPages.forEach(page => {
      page.classList.remove("hidden");
    });

    displayMessages();
  }
};

checkLoggedIn();


