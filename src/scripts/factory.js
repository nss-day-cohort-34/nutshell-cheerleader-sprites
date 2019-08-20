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
  //classes names
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
  }
  // ==================== Messages Section =====================
});

export default factory;
