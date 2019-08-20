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
// button that when clicked will pull up a form to add a new event
createAddEventsButton: () => {
    return `
    <div class="addEvent__button">
        <section class="addEvent__button">
            <button id="AddEvent__button--id">
            Add New Event
            </button>
        </section>
    </div>
    `
    },
// form that will appear when add event button is clicked
 createHTMLEventForm: (event) => {
 return `
 <div class="addEvent__form--div" >   
    <section class="addEvent__form">
        <header class="addEvent__form--title">
            Create New Event Here
        </header>
        <div class="event__form--fieldsets">
        <input type="hidden" id="eventId" value="${event ? event.id : ""}" />
                    Event Name: <input id="eventName" value="${event ? event.name : ""}" type="text" name="eventName" class="event__form--input"><br>
                    Event Date: <input id="eventDate" value="${event ? event.date : ""}" type="date" name="eventDate" class="event__form--input"><br>
                    Event Location: <input id="eventLocation" value="${event ? event.location : ""}" type="text" name="eventLocation" class="event__form--input"><br>
                <button id="addEvent__submit">Submit</button>
        </div>
    </section>
</div> 
`
},
// function to create event object
 createEventInputObj: (userIdInput, nameInput, dateInput, locationInput) => {
    return {
        userId: userIdInput,
        name: nameInput,
        date: dateInput,
        location: locationInput,
    }
},
 createEventComponent: (event) => {
    return `<section>
    <h3>${event.name}</h3>
    <p>${event.date}</p>
    <p>${event.location}</p>
    <button id="deleteEvent--${event.id}">
        Delete Event
    </button>
    <button id="editEvent--${event.id}">
        Edit Event
    </button>
    </section>
    `
}






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

});
export default factory;