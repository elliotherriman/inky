const {menu, main, renderer} = require("../helpers.js");

const shell = require('electron').shell;
const path = require('path');

const ProjectWindow = require(main + "projectWindow.js").ProjectWindow;

menu.modify(
	(menu, extensionsMenu, callbacks, context) => 
	{
		extensionsMenu.push(
			{
				label: "External Functions",
				submenu: [

					{
						label: "Edit External Functions",
						click: () => {
							shell.openItem(path.join(__dirname, '/external functions.js'));
						}
					},                      	
					{
						label: 'Reload External Functions',
						click: () => {
							ProjectWindow.all().forEach(window => {
								window.browserWindow.webContents.send('reload-js');
							});
						}
					},
				],
			});
	}
);