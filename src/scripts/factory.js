// Authors: Kevin, Curtis, Allie, Joe

const factory = Object.create({
  // ==================== Users Section =====================
  // Take in a username and email and create a new user object
  createUser: (username, email) => {
    return {
      username: username,
      email: email
    };
  },

  // ==================== Friendships Section =====================

  // ==================== Events Section =====================

  // ==================== News Section =====================

  // ==================== Tasks Section =====================
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
    <i class="far fa-circle co" job="complete" id="0"></i>
    <p class="text">${taskObj.taskName} due: ${taskObj.taskDate} </p>
   <i class="fas fa-user-edit de" job="edit" id="0"></i>
   </li>`;
  }
  // ==================== Messages Section =====================
});

export default factory;
