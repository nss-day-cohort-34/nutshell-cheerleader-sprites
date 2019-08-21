const message = Object.create({
    scrollToBottom: () => {
        const messagesList = document.querySelector(".messages--list");
        messagesList.scrollTo(0, messagesList.scrollHeight);
    }
});

export default message;