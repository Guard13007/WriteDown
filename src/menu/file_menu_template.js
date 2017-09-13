import { app, BrowserWindow } from 'electron';

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
    // accelerator: 'CmdOrCtrl+O',
    click: () => {
      // BrowserWindow.getFocusedWindow().toggleDevTools();
    }
  },
  {
    label: 'Save',
    // accelerator: 'CmdOrCtrl+S',
    click: () => {
      // TODO
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
