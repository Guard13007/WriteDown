import { app, BrowserWindow } from 'electron';

const fs = require('fs')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

export const fileMenuTemplate = {
  label: 'File',
  submenu: [{
    label: 'New',
    accelerator: 'CmdOrCtrl+N',
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.send('new-file')
    }
  },
  {
    label: 'Open...',
    accelerator: 'CmdOrCtrl+O',
    click: () => {
      dialog.showOpenDialog({
        properties: ['openFile']
      }, function (file) {
        if (file) {
          let err, data = fs.readFileSync(file.toString())
          if (!err) {
            BrowserWindow.getFocusedWindow().webContents.send('selected-file', data.toString())
          }
        }
      })
    }
  },
  {
    label: 'Save',
    accelerator: 'CmdOrCtrl+S',
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.send('get-file-text')
    }
  },
  {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click: () => {
      app.quit();
    }
  }],
};

ipc.on('file-text', function(event, text) {
  dialog.showSaveDialog({}, function(path) {
    if (path) {
      let err = fs.writeFileSync(path, text)
    }
  })
})
