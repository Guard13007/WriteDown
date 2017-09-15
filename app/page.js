const ipc = require('electron').ipcRenderer
const SimpleMDE = require('simplemde')

let editor = new SimpleMDE({
  autoDownloadFontAwesome: false,
  // blockStyles: {
  //   bold: "__"   // attempted fix for weird behavior when clicking bold and italics icons, instead led to weirder behavior
  // },
  autosave: {
    enabled: true,
    uniqueId: "tab0"
  },
  insertTexts: {
    link: ['[', '](https://)'],         // replacing default of HTTP links with HTTPS
    image: ["![](https://", ")"],       // default had horrible cursor placement, and used HTTP
    horizontalRule: ["\n-----\n", ""]   // default placed unneccessary newlines
  },
  parsingConfig: {
    allowAtxHeaderWithoutSpace: true   // I believe this will be compliant with Marked.js and most Markdown renderers, but I am not sure.
  },
  renderingConfig: {
    singleLineBreaks: false,       // GFM feature
    codeSyntaxHighlighting: true
  },
  shortcuts: {
    new: "Ctrl-N",
    open: "Ctrl-O",
    // quit: "Ctrl-Q",
    save: "Ctrl-S",
    toggleFullScreen: null   // editor is always full-screen
  },
  tabSize: 4,                // should be configurable
  toolbar: [
    {
      name: "new",
      action: function () {
        editor.value('')
      },
      className: "fa fa-file-o",
      title: "New File (Ctrl-N)"
    },
    {
      name: "open",
      action: function () {
        ipc.send('open-file-dialog')
      },
      className: "fa fa-folder-open-o",
      title: "Open File (Ctrl-O)"
    },
    {
      name: "save",
      action: function () {
        ipc.send('save-file-dialog', editor.value())
      },
      className: "fa fa-floppy-o",
      title: "Save File (Ctrl-S)"
    },
    "|", "bold", "italic", "horizontal-rule", "|", "heading", "heading-bigger", "heading-smaller", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "code", "|", "side-by-side", "preview", "|", "guide"
  ],
})

ipc.on('new-file', function() {
  editor.value('')
})

ipc.on('selected-file', function (event, data) {
  editor.value(data)
})

ipc.on('get-file-text', function (event) {
  event.sender.send('file-text', editor.value())
})

try {
  editor.toggleFullScreen(editor)   // this will function, but also trigger a console error
}
catch(err) { } // we don't care about this error
