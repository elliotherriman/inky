const electron = require('electron');
const ipc = electron.ipcMain;
const fs = require("fs");
const path = require("path");

var rendererExtensions = [];

function load()
{
	let folder = path.join(__dirname, '../extensions/');

	if(!fs.existsSync(folder)) {
		resolve();
	}
	
	let contents = fs.readdirSync(folder);

	contents.forEach(item => 
	{
		if (!path.extname(item))
		{
			if (fs.existsSync(folder + item + "/extension.json"))
			{
				let root = folder + item + "/";

				let extension = JSON.parse(fs.readFileSync(root + "extension.json"))

				if (extension.main && fs.existsSync(root + extension.main))
				{
					require('../extensions/' + item + "/" + extension.main);
				}

				if (extension.renderer && fs.existsSync(root + extension.renderer))
				{
					rendererExtensions.push(root + extension.renderer);
				}					
			}
		}
	});
}

ipc.on("get-renderer-extensions", (event) =>
{
	console.log(rendererExtensions)
	event.returnValue = rendererExtensions;
});

exports.load = load;