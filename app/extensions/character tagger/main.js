const {menu, main, renderer} = require("../helpers.js");

menu.modify(
	(menu, extensionsMenu, callbacks, context) => 
	{
		extensionsMenu.push(
			{       
				label: 'Tag Characters',
				click: (item, focusedWindow) =>
				{
					if (focusedWindow)
					{
						focusedWindow.webContents.send("char-tagger");
					}
				},
			});
	}
);