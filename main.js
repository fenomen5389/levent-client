const electron = require('electron')
const url = require('url')
const path = require('path');
const { protocol } = require('electron');
const db = require("./lib/myqsl").db;
const passhash = require('password-hash')
const Store = require('electron-store')
const store = new Store()

let electronEjs = require("electron-ejs");

const { app, BrowserWindow, ipcMain, session } = electron;

let mainWindow;


var isLoggedIn = false;
var user_id, user_name, user_mail, user_type = "";

if (store.get("user_credentials") !== undefined) {
    const user_object_array = store.get("user_credentials")
    isLoggedIn = true
    user_name = user_object_array.username;
}


let ejs;

if (!isLoggedIn) {
    ejs = new electronEjs({ "school_name": "Rize Levent Koleji" });
} else
    ejs = new electronEjs({ "school_name": "Rize Levent Koleji", "user_name": user_name, "user_mail": user_mail, "user_type": user_type }, {});

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        height: 720,
        width: 1200
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views", "login.ejs"),
        protocol: "file:",
        slashes: true
    }))

    ipcMain.on('login-admit', (err, data) => {
        const query = "SELECT * FROM users WHERE user_id = '" + data.userid + "'"
        db.query(query, (err, res, field) => {
            var auth_result = false
            try {
                if (passhash.verify(data.password, res[0].user_password)) {
                    auth_result = true
                    store.set('user_credentials', {
                        userid: res[0].user_id,
                        usermail: res[0].user_mail,
                        username: res[0].user_name,
                        usertype: res[0].user_type
                    })
                } else {

                }
            } catch {

            }
            mainWindow.webContents.send('auth_result', auth_result)
        })

    })

    store.delete("user_credentials")


})