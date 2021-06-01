const {menu, main, renderer} = require("../helpers.js");

menu.modify(
	(menu, extensionsMenu, callbacks, context) => 
	{
		extensionsMenu.push(
			{       
				label: "Escape Characters In Selection",
				click: (item, focusedWindow) =>
				{
					if (focusedWindow)
					{
						focusedWindow.webContents.send("escape-characters");
					}
				},
			});
	}
);