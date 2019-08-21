// Authors: Kevin, Curtis, Allie, Joe
// Purpose: Holds object of functions that render information to DOM
import factory from "./factory.js"

const dom = Object.create({
  renderToDom: (location, htmlRep) => {
    location.innerHTML += htmlRep;
  },
  placeToPutList: document.querySelector("#taskList"),
  renderToDom: (location, htmlRep) => {
    location.innerHTML += htmlRep;
  },
  aPlaceToPutNews: document.querySelector("#newsDisplay"),

  createMessagesForm: () => {
    const messagesForm = `<section class="messages--section--container">
                                    <section class="messages--list"></section>
                                    <section class="messages--input">
                                        <input type="hidden" class="message--input--hidden" value=""/>
                                        <input type="text" class="messages--input--text" placeholder="type message here">
                                        
                                    </section>
                                    <button class="messages--input--button">Send</button>
                                </section>`;
    const messagesContainer = document.getElementById("messages--section");
    console.log(messagesContainer);
    messagesContainer.innerHTML += messagesForm;
  },

  displayEditMsgButton: (messageUserId, activeUser, messageObject) => {
    if (messageUserId === activeUser) {
      return `<button class="message--edit message--edit--${
        messageObject.id
      }">Edit</button>`;
    } else {
      return "";
    }
  },

  // Take in a message object and return an HTML representation of the message
  createMessageHTML: (messageObject, displayEditMsgButton) => {
    const activeUser = sessionStorage.activeUser;
    return `<section class="message--item message--item--${messageObject.id}">
                    <p class="message--item--message">${
                      messageObject.user.username
                    }: ${messageObject.message}</p>
                    <section class="message--meta">
                        <p class="message--item--date">${messageObject.date}</p>
                        ${displayEditMsgButton(
                          messageObject.userId,
                          activeUser,
                          messageObject
                        )}
                    </section>
                </section>`;
  },

  // Clear message input fields
  clearMessageInputs: () => {
    document.querySelector(".messages--input--text").value = "";
    document.querySelector(".message--input--hidden").value = "";
  },
  renderAddEventButtonToDom: () => {
    const AddEventsButtonContainer = document.querySelector("#event--section");
    AddEventsButtonContainer.innerHTML += factory.createAddEventsButton();
  },

    renderEventFormToDom: (event) => {
        const EventsFormContainer = document.querySelector(".addEvent__form--div")
        EventsFormContainer.innerHTML += factory.createHTMLEventForm(event)
    },
});
export default dom;
