const { ipcRenderer } = require("electron");

let button = document.getElementById("close");
button.addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let url = document.querySelector("#url").value;
  ipcRenderer.send("newBookmark", { name, url });
});
