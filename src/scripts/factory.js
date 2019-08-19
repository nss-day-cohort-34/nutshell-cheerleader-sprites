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
 createEventsForm: () => {
 return `
 <div class="addEvent__form--div" >   
    <section class="addEvent__form">
        <header class="addEvent__form--title">
            Create New Event Here
        </header>
        <div class="event__form--fieldsets">
            <form action="" method="get">
                    Event Name: <input id="eventName" type="text" name="eventName" class="event__form--input"><br>
                    Event Date: <input id="eventDate" type="date" name="eventDate" class="event__form--input"><br>
                    Event Location: <input id="eventLocation" type="text" name="eventLocation" class="event__form--input"><br>
                <input id="addEvent__submit" type="submit" value="Submit">
            </form>
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







// ==================== Tasks Section =====================







// ==================== Messages Section =====================

});

export default factory;