const $ = window.jQuery;
const electron = require('electron');
const ipc = electron.ipcRenderer;

// const PlayerView = require(renderer + "playerView.js").PlayerView;

// $("body").append('<link rel="stylesheet" id="customcss" href="../extensions/custom css/custom.css">');

ipc.on("reload-js", (event) => {
	
	var src = "../extensions/external functions.js";

	src = $('script[src$="' + src + '"]').attr("src");
	$('script[src$="' + src + '"]').remove();
	$('<script/>').attr('src', src).appendTo('html');
	
	// PlayerView.bindExternalFunctions();
	// PlayerView.restart();
});

