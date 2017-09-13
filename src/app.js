const SimpleMDE = require('simplemde')

new SimpleMDE({
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
    singleLineBreaks: false,
    codeSyntaxHighlighting: true
  },
  shortcuts: {
    toggleFullScreen: null   // editor is always full-screen
  },
  tabSize: 4,
  toolbar: ["bold", "italic", "horizontal-rule", "|", "heading", "heading-bigger", "heading-smaller", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "code", "|", "side-by-side", "preview", "|", "guide"],
}).toggleFullScreen()

// // Small helpers you might want to keep
// import './helpers/context_menu.js';
// import './helpers/external_links.js';
//
// // All stuff below is just to show you how it works. You can delete all of it.
// import { remote } from 'electron';
// import jetpack from 'fs-jetpack';
// import { greet } from './hello_world/hello_world';
// import env from './env';
//
// const app = remote.app;
// const appDir = jetpack.cwd(app.getAppPath());
//
// // Holy crap! This is browser window with HTML and stuff, but I can read
// // here files form disk like it's node.js! Welcome to Electron world :)
// const manifest = appDir.read('package.json', 'json');
