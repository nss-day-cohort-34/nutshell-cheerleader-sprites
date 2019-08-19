import factory from "./factory.js"

const dom = Object.create({ 

// ==================== Users Section =====================







// ==================== Friendships Section =====================







// ==================== Events Section =====================
// universal render function (just happens to be in my section)
// renderToDom : (location, htmlRep) => {
//     location.innerHTML += htmlRep
// }

// function to render the add event button to the DOM
renderAddEventButtonToDom: () => {
    const AddEventsButtonContainer = document.querySelector("#event--section")
        AddEventsButtonContainer.innerHTML += factory.createAddEventsButton()
    },

renderAddEventFormToDom: () => {
    const AddEventsFormContainer = document.querySelector("#event--section")
    AddEventsFormContainer.innerHTML += factory.createEventsForm()
}




// ==================== News Section =====================







// ==================== Tasks Section =====================







// ==================== Messages Section =====================

})

export default dom