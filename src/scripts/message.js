// Author: Joe Snyder
// Purpose: handle all functionality to GET, POST, and PUT messages based on user actions

import data from "./data.js";
import dom from "./dom.js";
import factory from "./factory.js";

const message = Object.create({
    scrollToBottom: () => {
        const messagesList = document.querySelector(".messages--list");
        messagesList.scrollTo(0, messagesList.scrollHeight);
    },

    // displayMessages contains all functionality that should be executed when a successful login is detected
    displayMessages: () => {
        // Render message container to DOM with input fields
        dom.createMessagesForm();

        // Get all messages from the database, create HTML Representations and render them to the DOM
        data.getMessages().then(parsedMessages => {
            parsedMessages.forEach(message => {
                const messageContainer = document.querySelector(".messages--list");
                const messageHTML = dom.createMessageHTML(
                    message,
                    dom.displayEditMsgButton
                );
                dom.renderToDom(messageContainer, messageHTML);
            });
        })
            .then(() => message.scrollToBottom());

        // Add event listener to send button to post a new message
        const sendMessageButton = document.querySelector(".messages--input--button");
        sendMessageButton.addEventListener("click", event => {
            let messageValue = document.querySelector(".messages--input--text").value;
            let hiddenInputValue = document.querySelector(".message--input--hidden")
                .value;

            // Create new message object with the input field value and activeUser id
            const messageObject = factory.createMessage(
                parseInt(sessionStorage.activeUser),
                messageValue
            );

            if (hiddenInputValue === "") {
                // If hiddenInput is blank, post to the database as a new message
                data
                    .saveData("messages", messageObject)
                    .then(data.getMessages)
                    .then(parsedMessages => {
                        const messageContainer = document.querySelector(".messages--list");
                        messageContainer.innerHTML = "";

                        parsedMessages.forEach(message => {
                            const messageHTML = dom.createMessageHTML(
                                message,
                                dom.displayEditMsgButton
                            );
                            dom.renderToDom(messageContainer, messageHTML);
                        });
                    })
                    .then(() => dom.clearMessageInputs())
                    .then(() => message.scrollToBottom());
            } else {
                // hiddenInput is not blank, put to the database to edit the existing message
                const messageId = hiddenInputValue;
                data
                    .editData("messages", messageId, messageObject)
                    .then(data.getMessages)
                    .then(parsedMessages => {
                        const messageContainer = document.querySelector(".messages--list");
                        messageContainer.innerHTML = "";

                        parsedMessages.forEach(message => {
                            const messageHTML = dom.createMessageHTML(
                                message,
                                dom.displayEditMsgButton
                            );
                            dom.renderToDom(messageContainer, messageHTML);
                        });
                    })
                    .then(() => dom.clearMessageInputs())
                    .then(() => scrollToBottom());
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
                        const messageHTML = dom.createMessageHTML(
                            message,
                            dom.displayEditMsgButton
                        );
                        dom.renderToDom(messageContainer, messageHTML);
                    });

                    message.scrollToBottom();
                }

                // Set numMessages equal to the number of objects returned by the GET request
                numMessages = parsedMessages.length;
            });
        };

        // Check to see if there are new messages every 5 seconds
        window.setInterval(checkMessages, 5000);
        console.log(sessionStorage.activeUser);
        console.log(parseInt(sessionStorage.activeUser));
    }
});

export default message;