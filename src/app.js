const TabGroup = require("electron-tabs")

let tabGroup = new TabGroup()
let tab = tabGroup.addTab({
    title: "WriteDown", // should be the file name or something
    src: "./page.html",
    visible: true,
    webviewAttributes: {
      nodeintegration: true
    },
    ready: tab => {
      let webview = tab.webview
      if (!!webview) {
        webview.addEventListener('dom-ready', () => {
          webview.openDevTools()
        })
      }
    }
})
