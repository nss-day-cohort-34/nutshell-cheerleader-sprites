// Authors: Kevin, Curtis, Allie, Joe

const factory = Object.create({
// ==================== Users Section =====================
    // Take in a username and email and create a new user object
    createUser: (username, email) => {
        return {
            "username": username,
            "email": email
        };
    },






// ==================== Friendships Section =====================







// ==================== Events Section =====================







// ==================== News Section =====================
    createNewsObject: (userId, url, date, title, summary) => {
       return {
        "userId": userId,
        "url": url,
        "date": date,
        "title": title,
        "summary": summary
    }
    },
    createNewsHTML: (object) => {
        return `
        <section class="newsHTML">
            <h1 class="newsHTMLHeader">${object.title}</h1>
            <p>${object.summary}</p>
            <a href="${object.url}">Go To Main Article</a>
            <footer>${object.date}</footer>
            <button id="deleteNews--${object.id}">Delete</button>
            <button id="editNews--${object.id}">Edit</button>
        </ section>`
    }






// ==================== Tasks Section =====================







// ==================== Messages Section =====================
    createMessage: (activeUserId, messageContent) => {
        const currentDate = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
        return {
            userId: activeUserId,
            message: messageContent,
            date: currentDate
        };
    }
});
export default factory;