const dom = Object.create({

// ==================== Users Section =====================







// ==================== Friendships Section =====================







// ==================== Events Section =====================
renderToDom : (location, htmlRep) => {
    location.innerHTML += htmlRep
},






// ==================== News Section =====================







// ==================== Tasks Section =====================







// ==================== Messages Section =====================

    createMessagesForm: () => {
        const messagesForm =   `<section class="messages--section--container">
                                    <section class="messages--list"></section>
                                    <section class="messages--input">
                                        <input type="hidden" class="message--input--hidden" value=""/>
                                        <input type="text" class="messages--input--text" placeholder="type message here">
                                        <button class="messages--input--button">Send</button>
                                    </section>
                                </section>`;
        const messagesContainer = document.getElementById("messages--section");
        console.log(messagesContainer);
        messagesContainer.innerHTML += messagesForm;
    },

    displayEditMsgButton: (messageUserId, activeUser, messageObject) => {
        if (messageUserId === activeUser) {
            return `<button class="message--edit message--edit--${messageObject.id}">Edit</button>`;
        } else {
            return "";
        }
    },

    // Take in a message object and return an HTML representation of the message
    createMessageHTML: (messageObject, displayEditMsgButton) => {
        const activeUser = sessionStorage.activeUser;
        return `<section class="message--item message--item--${messageObject.id}">
                    <p class="message--item--message">${messageObject.user.username}: ${messageObject.message}</p>
                    <p class="message--item--date">${messageObject.date}</p>
                    ${displayEditMsgButton(messageObject.userId, activeUser, messageObject)}
                </section>`;
    }
});

export default dom