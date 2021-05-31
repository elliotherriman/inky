const {remote} = require('electron')
const {Menu, MenuItem} = remote

var template = [
	{
		role: "cut"
	},
	{
		role: "copy"
	},
	{
		role: "paste"
	}
];

var menu = Menu.buildFromTemplate(template);

function modify(inject)
{
	inject(template);
	menu = Menu.buildFromTemplate(template);
}

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false);

exports.modify = modify;