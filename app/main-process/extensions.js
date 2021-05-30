const i18n = require('./i18n/i18n.js');

let extensions = [];

function add(modifier)
{
	extensions.push(modifier);
}

function build(template, callbacks, context)
{
	if (!extensions.length) return;

	let index = template.map((i) => { return i.label; })
						.indexOf(i18n._('Window'));

	let extensionsMenu = {
		label: 'Extensions',
		submenu: []
	}

	for (var inject of extensions)
	{
		inject(template, extensionsMenu.submenu, callbacks, context);
		extensionsMenu.submenu.push({
			type: 'separator'
		});
	}

	template.splice(index, 0, extensionsMenu);
}

exports.menu = {build: build, add: add};