const socketClient = io();
const divChat = document.getElementById("chat");
const inputMessage = document.getElementById("message");
const form = document.getElementById("chatForm");
const usuario = document.getElementById("usarioName");

form.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user: usuario.textContent,
    message: inputMessage.value,
  };
  console.log(infoMessage);
  inputMessage.value = "";
  socketClient.emit("message", infoMessage);
};

socketClient.on("chat", (message) => {
  const chat = message.map((m) => {
    return `<p> ${m.user}: ${m.message}</p>`;
  });
  divChat.innerHTML = chat;
});
