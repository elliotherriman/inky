const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = Menu.buildFromTemplate([
	{
		role: "cut"
	},
	{
		role: "copy"
	},
	{
		role: "paste"
	},
	{
		label: "Tag Characters",
		click(item, window, ev)
		{
			window.webContents.send("char-tagger", false)
		}
	},	
	{
		label: "Tag Selection",
		click: function(item, window, ev)
		{
			window.webContents.send("char-tagger", true)
		}		
	}			
]);

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false);