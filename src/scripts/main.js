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
        // Call necessary functions using the activeUser id and render to the dashboard once that functionality is complete
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
data.getData("news")
  .then((articles) => {
    dom.aPlaceToPutNews.innerHTML = ""
    for (const article of articles) {
      const newsHTML = factory.createNewsHTML(article)
      dom.renderToDom(dom.aPlaceToPutNews, newsHTML)
    }
  })
document.querySelector("#newsSubmitButton").addEventListener("click", () => {
  const userID = sessionStorage.activeUser
  const newsDateValue = document.querySelector("#newsDate").value
  const newsTitleValue = document.querySelector("#newsTitle").value
  const newsSummaryValue = document.querySelector("#newsSummary").value
  const newsURLValue = document.querySelector("#newsURL").value
  const hiddenNewsID = document.querySelector("#newsID").value
  if (hiddenNewsID  !== "") {
    data.editNews(hiddenNewsID)
      .then(() => data.getData("news"))
      .then((articles) => {
        dom.aPlaceToPutNews.innerHTML = ""
        for (const article of articles) {
          const newsHTML = factory.createNewsHTML(article)
          dom.renderToDom(dom.aPlaceToPutNews, newsHTML)
          document.querySelector("#newsDate").value = ""
          document.querySelector("#newsTitle").value = ""
          document.querySelector("#newsSummary").value = ""
          document.querySelector("#newsURL").value = ""
          document.querySelector("#newsID").value = ""
        }
      })
  }
  else {
    const newNewsObject = factory.createNewsObject(userID, newsURLValue, newsDateValue, newsSummaryValue, newsTitleValue)
    data.saveData("news", newNewsObject)
      .then(() => data.getData("news"))
      .then((articles) => {
        dom.aPlaceToPutNews.innerHTML = ""
        for (const article of articles) {
          const newsHTML = factory.createNewsHTML(article)
          dom.renderToDom(dom.aPlaceToPutNews, newsHTML)
        }
      })
      .then(() => {
        document.querySelector("#newsDate").value = ""
        document.querySelector("#newsTitle").value = ""
        document.querySelector("#newsSummary").value = ""
        document.querySelector("#newsURL").value = ""
      })
  }
})
  dom.aPlaceToPutNews.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteNews--")) {
      const newsToDelete = event.target.id.split("--")[1]
      data.deleteData("news", newsToDelete)
        .then(() => data.getData("news"))
        .then((articles) => {
          dom.aPlaceToPutNews.innerHTML = ""
          articles.forEach(article => {
            const newNewsHTML = factory.createNewsHTML(article)
            dom.renderToDom(dom.aPlaceToPutNews, newNewsHTML)
          })
        })
    }
  })
  dom.aPlaceToPutNews.addEventListener("click", event => {
    if (event.target.id.startsWith("editNews--")) {
      const newsToEdit = event.target.id.split("--")[1]
      data.updateFormFields(newsToEdit)
    }
  })
// ==================== Tasks Section =====================

// ==================== Messages Section ===================