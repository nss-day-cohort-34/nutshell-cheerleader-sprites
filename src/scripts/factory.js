// Authors: Kevin, Curtis, Allie, Joe

const factory = Object.create({
    createUser: (username, email) => {
        return {
            username: username,
            email: email
        };
    },
    createNewsObject: (userId, url, date, title, summary) => {
        return {
            userId: userId,
            url: url,
            date: date,
            title: title,
            summary: summary
        };
    },
    createMessage: (activeUserId, messageContent) => {
        const currentDate = new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
        });
        return {
            userId: activeUserId,
            message: messageContent,
            date: currentDate
        };
    },
    createNewsHTML: object => {
        return `
  <section class="newsHTML">
      <h1 class="newsHTMLHeader">${object.title}</h1>
      <p>${object.summary}</p>
      <a href="${object.url}">Go To Main Article</a>
      <footer>${object.date}</footer>
      <button id="deleteNews--${object.id}">Delete</button>
      <button id="editNews--${object.id}">Edit</button>
  </ section>`;
    },
    classobj: () => {
        const CHECK = "fa-check-circle";
        const UNCHECK = "fa-circle-thin";
        const LINE_THROUGH = "lineThrough";
    },

    createTaskObj: (taskName, taskDate, userId, completed) => {
        return {
            taskName: taskName,
            taskDate: taskDate,
            userId: userId,
            completed: completed
        };
    },

    createTaskHtml: taskObj => {
        return `
    <li class="item">
    <i class="far fa-circle co" job="complete" id="check_${taskObj.id}"></i>
    <p class="text">${taskObj.taskName} due: ${taskObj.taskDate} </p>
   <i class="fas fa-user-edit de" job="edit" id="edit_${taskObj.id}"></i>
   </li>`;
    },
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
    },

});

export default factory;
