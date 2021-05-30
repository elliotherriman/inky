const {menu, main, renderer} = require("../helpers.js");

const shell = require('electron').shell;
const path = require('path');

const ProjectWindow = require(main + "projectWindow.js").ProjectWindow;

menu.modify(
	(menu, extensionsMenu, callbacks, context) => 
	{
		extensionsMenu.push(
			{
				label: 'Custom CSS',
				submenu: [

					{
						label: 'Edit Custom CSS',
						click: () => {
							shell.openItem(path.join(__dirname, '/custom.css'));
						}
					},                      	
					{
						label: 'Reload Custom CSS',
						click: () => {
							ProjectWindow.all().forEach(window => {
								window.browserWindow.webContents.send('reload-css');
							});
						}
					},
				],
			});
	}
);