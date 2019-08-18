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







// ==================== Tasks Section =====================







// ==================== Messages Section =====================
    createMessage: (activeUserId, messageContent) => {
        const currentDate = new Date();
        return {
            userId: activeUserId,
            message: messageContent,
            date: currentDate
        };
    }
});

export default factory;