const socket = io();

const DB = require("./db/controladorDB");
const { optionsSQLite } = require("./db/mysqlite");
const knexSQLite = require("knex")(optionsSQLite);
const mensajesDB = new DB("mensajes");

const spanServerMessage = document.getElementById("serverNotification");
const usersContainer = document.getElementById("usersContainer");
const sendMessage = document.getElementById("sendMessage");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messagesContainer");

socket.emit("joinChat", { username });

socket.on("notification", (data) => {
  spanServerMessage.innerHTML = data;
});

socket.on("users", (data) => {
  const users = data
    .map((user) => {
      const userTemplate = `
      <li class="clearfix active">
          <div class="about">
              <div class="name">${user.username}</div>
              <div class="status"> <i class="fa fa-circle online"></i> online </div>
          </div>
      </li>
      `;

      return userTemplate;
    })
    .join("");

  usersContainer.innerHTML = users;
});

sendMessage.addEventListener("click", () => {
  socket.emit("messageInput", messageInput.value);
  messageInput.value = "";
});

socket.on("message", (data) => {
  const message = `
    <li class="clearfix">
        <div class="message-data">
            <span class="message-data-time">${data.fecha}, ${data.usuario}:</span>
        </div>
        <div class="message my-message">${data.mensaje}</div>
    </li>
  `;
  messagesContainer.innerHTML += message;
});

socket.on("myMessage", (data) => {
  const message = `
  <li class="clearfix">
    <div class="message-data text-right">
        <span class="message-data-time">${data.fecha}</span>
    </div>
    <div class="message other-message float-right"> ${data.mensaje} </div>
  </li>
  `;

  knexSQLite("mensajes")
    .insert(message)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      knexSQLite.destroy();
    });

  messagesContainer.innerHTML += message;
});
