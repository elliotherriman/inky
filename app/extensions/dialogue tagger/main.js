const {menu, main, renderer} = require("../helpers.js");

menu.modify(
	(menu, extensionsMenu, callbacks, context) => 
	{
		extensionsMenu.push(
			{       
				label: 'Tag Dialogue',
				click: (item, focusedWindow) =>
				{
					if (focusedWindow)
					{
						focusedWindow.webContents.send("dialogue-tagger");
					}
				},
			});
	}
);