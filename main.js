const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true
        },
        alwaysOnTop: true,
        darkTheme: true,
    })

    win.loadFile(config.destination)
}

function toggleDevTools() {
    win.webContents.toggleDevTools()
}

function createShortcuts() {
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

app.whenReady()
    .then(createWindow)
    .then(createShortcuts)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindows()
    }
})
