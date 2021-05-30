const $ = window.jQuery;
const electron = require('electron');
const ipc = electron.ipcRenderer;

$("body").append('<link rel="stylesheet" id="customcss" href="../extensions/custom css/custom.css">');

ipc.on("reload-css", (event) => {
	$("#customcss").href += "";
});