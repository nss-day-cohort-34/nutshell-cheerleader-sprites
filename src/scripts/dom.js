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
                                        <input type="text" class="messages--input--text" placeholder="type message here">
                                        <button class="messages--input">Send</button>
                                    </section>
                                </section>`;
        const messagesContainer = document.getElementById("messages--section");
        console.log(messagesContainer);
        messagesContainer.innerHTML += messagesForm;
    },

    // Take in a message object and return an HTML representation of the message
    createMessageHTML: (messageObject) => {

    }
});

export default dom