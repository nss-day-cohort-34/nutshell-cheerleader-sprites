const dom = Object.create({
  // ==================== Users Section =====================

  // ==================== Friendships Section =====================

  // ==================== Events Section =====================
  renderToDom: (location, htmlRep) => {
    location.innerHTML += htmlRep;
  },

  // ==================== News Section =====================

  // ==================== Tasks Section =====================
  placeToPutList: document.querySelector("#taskList")
  // ==================== Messages Section =====================
});

export default dom;
