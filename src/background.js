// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
import { fileMenu } from './menu/file'
import { developmentMenu } from './menu/development';
import { editMenu } from './menu/edit';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

const fs = require('fs')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function (file) {
    if (file) {
      let err, data = fs.readFileSync(file.toString())
      if (!err) {
        event.sender.send('selected-file', data.toString())
      }
    }
  })
})

ipc.on('save-file-dialog', function (event, data) {
  dialog.showSaveDialog({}, function (path) {
    if (path) {
      let err = fs.writeFileSync(path, data)
    }
  })
})

const setApplicationMenu = () => {
  const menus = [fileMenu, editMenu];
  if (env.name !== 'production') {
    menus.push(developmentMenu);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
  setApplicationMenu();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true,
  }));

  if (env.name === 'development') {
    mainWindow.openDevTools();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
