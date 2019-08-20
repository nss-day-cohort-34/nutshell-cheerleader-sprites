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
  }
});

export default factory;
