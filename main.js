// Modules to control application life and create native browser window
const {
  app,
  Tray,
  Menu,
  BrowserWindow,
  ipcRenderer,
  ipcMain,
  shell,
} = require("electron");
const path = require("path");
const url = require("url");
const Store = require("./storage");
const iconPath = path.join(__dirname, "icons/icon.png");
let appIcon = null;
let win = null;
let bookmarks = [];
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    // 800x600 is the default size of our window
    saveBookMarks: [
      {
        label: "file3",
        type: "normal",
        click: function () {
          shell.openExternal("https://cyberquad.atlassian.net/jira/your-work");
        },
      },
      {
        label: "file2",
        type: "normal",
        click: function () {
          add = new BrowserWindow({
            width: 200,
            height: 200,
            webPreferences: {
              nodeIntegration: true,
            },
          });
          add.loadURL(
            url.format({
              pathname: path.join(__dirname, "index.html"),
              protocol: "file:",
              slashes: true,
            })
          );
        },
      },
    ],
  },
});
ipcMain.on("newBookmark", (e, item) => {
  e.preventDefault();
  saveBookMarks = store.get("saveBookMarks");
  saveBookMarks.push({
    label: item.name,
    type: "normal",
    click: () => shell.openExternal(item.url),
  });
  store.set("saveBookMarks", saveBookMarks);
  // console.confirm(store.get("saveBookMarks"));
  add.close();
  // win.reload();
});
app.whenReady().then(() => {
  createTrayIcon();
});
function openUrl(url) {}
createTrayIcon = () => {
  loadedBookMarks = getBookmarks();
  win = new BrowserWindow({ show: false });
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate(loadedBookMarks);
  appIcon.setToolTip("Bookmark app for daily use");
  appIcon.setContextMenu(contextMenu);
};
getBookmarks = () => {
  if (store.get("saveBookMarks")) {
    bookmarks = store.get("saveBookMarks");
  }
  return bookmarks;
};
let add = null;
createAddWindow = () => {
  add = new BrowserWindow({
    width: 200,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  add.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
};
