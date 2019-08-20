<<<<<<< HEAD
import factory from "./factory.js"

=======
>>>>>>> master
const dom = Object.create({

// ==================== Users Section =====================







// ==================== Friendships Section =====================







// ==================== Events Section =====================
<<<<<<< HEAD
// universal render function (just happens to be in my section)
// renderToDom : (location, htmlRep) => {
//     location.innerHTML += htmlRep
// }

// function to render the add event button to the DOM
renderAddEventButtonToDom: () => {
    const AddEventsButtonContainer = document.querySelector("#event--section")
        AddEventsButtonContainer.innerHTML += factory.createAddEventsButton()
    },

renderEventFormToDom: (event) => {
    const EventsFormContainer = document.querySelector("#event--section")
    EventsFormContainer.innerHTML += factory.createHTMLEventForm(event)
}
=======
renderToDom : (location, htmlRep) => {
    location.innerHTML += htmlRep
},
>>>>>>> master




// ==================== News Section =====================
aPlaceToPutNews : document.querySelector("#newsDisplay")






// ==================== Tasks Section =====================







// ==================== Messages Section =====================

})

export default dom